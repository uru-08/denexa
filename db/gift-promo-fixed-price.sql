BEGIN;
CREATE OR REPLACE FUNCTION public.set_business_daily_promo(p_business_id bigint, p_active boolean, p_badge text, p_title text, p_text text, p_rule_type text, p_target_type text, p_target_id bigint, p_discount_percent numeric, p_trigger_qty integer, p_reward_product_id bigint, p_reward_qty integer, p_repeat boolean)
 RETURNS TABLE(id bigint, promo_active boolean, promo_badge text, promo_title text, promo_text text, promo_rule_type text, promo_target_type text, promo_target_id bigint, promo_discount_percent numeric, promo_trigger_qty integer, promo_reward_product_id bigint, promo_reward_qty integer, promo_repeat boolean)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if auth.uid() is null or not exists (
    select 1 from public.merchant_users mu
    where mu.user_id=auth.uid() and mu.business_id=p_business_id and mu.active=true
  ) then
    raise exception 'No autorizado para administrar este comercio' using errcode='42501';
  end if;

  if not coalesce(p_active,false) then
    update public.businesses b set promo_active=false where b.id=p_business_id;
    if not found then raise exception 'No existe el comercio con id %',p_business_id; end if;
    return query select b.id,b.promo_active,b.promo_badge,b.promo_title,b.promo_text,
      b.promo_rule_type,b.promo_target_type,b.promo_target_id,b.promo_discount_percent,
      b.promo_trigger_qty,b.promo_reward_product_id,b.promo_reward_qty,b.promo_repeat
    from public.businesses b where b.id=p_business_id;
    return;
  end if;

  if coalesce(p_rule_type,'announcement') not in ('announcement','percent','gift') then
    raise exception 'Tipo de promoción no válido: %',p_rule_type;
  end if;
  if p_target_type is not null and p_target_type not in ('category','product') then
    raise exception 'Destino de promoción no válido: %',p_target_type;
  end if;
  if p_rule_type='percent' and (p_discount_percent is null or p_discount_percent<1 or p_discount_percent>100) then
    raise exception 'El porcentaje debe estar entre 1 y 100';
  end if;
  if p_rule_type='gift' and (coalesce(p_trigger_qty,0)<1 or p_reward_product_id is null or coalesce(p_reward_qty,0)<1) then
    raise exception 'La promoción de regalo está incompleta';
  end if;

  if p_target_type='category' and p_target_id is not null and not exists (
    select 1 from public.categories c where c.id=p_target_id and c.business_id=p_business_id
  ) then raise exception 'La categoría no pertenece a este comercio' using errcode='42501';
  end if;
  if p_target_type='product' and p_target_id is not null and not exists (
    select 1 from public.products p where p.id=p_target_id and p.business_id=p_business_id
  ) then raise exception 'El producto no pertenece a este comercio' using errcode='42501';
  end if;
  if p_reward_product_id is not null and not exists (
    select 1 from public.products p where p.id=p_reward_product_id and p.business_id=p_business_id
  ) then raise exception 'El producto de regalo no pertenece a este comercio' using errcode='42501';
  end if;

  update public.businesses b set
    promo_active=coalesce(p_active,false),
    promo_fixed_price=null,
    promo_badge=coalesce(nullif(trim(p_badge),''),'PROMO DEL DÍA'),
    promo_title=nullif(trim(p_title),''),
    promo_text=nullif(trim(p_text),''),
    promo_rule_type=coalesce(nullif(trim(p_rule_type),''),'announcement'),
    promo_target_type=case when p_rule_type='announcement' then null else p_target_type end,
    promo_target_id=case when p_rule_type='announcement' then null else p_target_id end,
    promo_discount_percent=case when p_rule_type='percent' then p_discount_percent else null end,
    promo_trigger_qty=case when p_rule_type='gift' then greatest(1,p_trigger_qty) else null end,
    promo_reward_product_id=case when p_rule_type='gift' then p_reward_product_id else null end,
    promo_reward_qty=case when p_rule_type='gift' then greatest(1,p_reward_qty) else null end,
    promo_repeat=coalesce(p_repeat,true)
  where b.id=p_business_id;

  if not found then raise exception 'No existe el comercio con id %',p_business_id; end if;

  return query select b.id,b.promo_active,b.promo_badge,b.promo_title,b.promo_text,
    b.promo_rule_type,b.promo_target_type,b.promo_target_id,b.promo_discount_percent,
    b.promo_trigger_qty,b.promo_reward_product_id,b.promo_reward_qty,b.promo_repeat
  from public.businesses b where b.id=p_business_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.set_business_daily_promo_with_price(
p_business_id bigint, p_active boolean, p_badge text, p_title text, p_text text,
p_rule_type text, p_target_type text, p_target_id bigint, p_discount_percent numeric,
p_trigger_qty integer, p_reward_product_id bigint, p_reward_qty integer,
p_repeat boolean, p_fixed_price numeric DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE saved jsonb;
BEGIN
  IF auth.uid() IS NULL OR NOT EXISTS (
    SELECT 1 FROM public.merchant_users m
    WHERE m.user_id=auth.uid() AND m.business_id=p_business_id AND m.active=true
  ) THEN RAISE EXCEPTION 'No autorizado para administrar este comercio' USING errcode='42501'; END IF;
  IF p_fixed_price IS NOT NULL AND
    (p_fixed_price < 0 OR p_fixed_price::text IN ('NaN','Infinity','-Infinity'))
  THEN RAISE EXCEPTION 'El precio debe ser un número igual o mayor que cero'; END IF;
  PERFORM public.set_business_daily_promo(
    p_business_id,p_active,p_badge,p_title,p_text,p_rule_type,p_target_type,
    p_target_id,p_discount_percent,p_trigger_qty,p_reward_product_id,p_reward_qty,p_repeat
  );
  UPDATE public.businesses b
    SET promo_fixed_price=CASE WHEN p_rule_type='gift' THEN p_fixed_price ELSE NULL END
    WHERE b.id=p_business_id
    RETURNING to_jsonb(b) INTO saved;
  RETURN saved;
END;
$$;
REVOKE ALL ON FUNCTION public.set_business_daily_promo_with_price(bigint,boolean,text,text,text,text,text,bigint,numeric,integer,bigint,integer,boolean,numeric) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_business_daily_promo_with_price(bigint,boolean,text,text,text,text,text,bigint,numeric,integer,bigint,integer,boolean,numeric) TO authenticated,service_role;
NOTIFY pgrst, 'reload schema';

COMMIT;