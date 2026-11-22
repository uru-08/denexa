-- Multi-product daily promotions for DENEXA
ALTER TABLE public.businesses
  ADD COLUMN IF NOT EXISTS promo_target_product_ids bigint[];

ALTER TABLE public.businesses
  DROP CONSTRAINT IF EXISTS businesses_promo_target_type_check;
ALTER TABLE public.businesses
  ADD CONSTRAINT businesses_promo_target_type_check
  CHECK (promo_target_type IS NULL OR promo_target_type = ANY (ARRAY['category'::text,'product'::text,'products'::text]));

CREATE OR REPLACE FUNCTION public.set_business_daily_promo_with_products(
  p_business_id bigint, p_active boolean, p_badge text, p_title text, p_text text,
  p_rule_type text, p_target_type text, p_target_id bigint, p_discount_percent numeric,
  p_trigger_qty integer, p_reward_product_id bigint, p_reward_qty integer,
  p_repeat boolean, p_fixed_price numeric DEFAULT NULL, p_target_product_ids bigint[] DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  v_saved jsonb;
  v_target_type text;
  v_target_id bigint;
  v_product_ids bigint[];
BEGIN
  IF auth.uid() IS NULL OR NOT EXISTS (
    SELECT 1 FROM public.merchant_users m
    WHERE m.user_id = auth.uid() AND m.business_id = p_business_id AND m.active = true
  ) THEN
    RAISE EXCEPTION 'No autorizado para administrar este comercio' USING errcode = '42501';
  END IF;

  IF p_target_type = 'products' THEN
    SELECT COALESCE(array_agg(DISTINCT selected_id ORDER BY selected_id), ARRAY[]::bigint[])
      INTO v_product_ids
    FROM unnest(COALESCE(p_target_product_ids, ARRAY[]::bigint[])) AS selected_id;

    IF COALESCE(p_active, false) AND COALESCE(p_rule_type, 'announcement') <> 'announcement'
       AND cardinality(v_product_ids) = 0 THEN
      RAISE EXCEPTION 'Seleccioná al menos un producto para la promoción';
    END IF;

    IF EXISTS (
      SELECT 1 FROM unnest(v_product_ids) AS selected_id
      WHERE NOT EXISTS (
        SELECT 1 FROM public.products p
        WHERE p.id = selected_id AND p.business_id = p_business_id AND p.active IS NOT FALSE
      )
    ) THEN
      RAISE EXCEPTION 'Uno o más productos no pertenecen a este comercio o están inactivos'
        USING errcode = '42501';
    END IF;

    v_target_type := 'product';
    v_target_id := v_product_ids[1];
  ELSE
    v_target_type := p_target_type;
    v_target_id := p_target_id;
    v_product_ids := NULL;
  END IF;

  PERFORM public.set_business_daily_promo_with_price(
    p_business_id,p_active,p_badge,p_title,p_text,p_rule_type,v_target_type,v_target_id,
    p_discount_percent,p_trigger_qty,p_reward_product_id,p_reward_qty,p_repeat,p_fixed_price
  );

  UPDATE public.businesses b
  SET promo_target_type = CASE WHEN p_target_type = 'products' THEN 'products' ELSE b.promo_target_type END,
      promo_target_id = CASE WHEN p_target_type = 'products' THEN NULL ELSE b.promo_target_id END,
      promo_target_product_ids = v_product_ids
  WHERE b.id = p_business_id
  RETURNING to_jsonb(b) INTO v_saved;

  RETURN v_saved;
END;
$function$;

REVOKE ALL ON FUNCTION public.set_business_daily_promo_with_products(
  bigint,boolean,text,text,text,text,text,bigint,numeric,integer,bigint,integer,boolean,numeric,bigint[]
) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.set_business_daily_promo_with_products(
  bigint,boolean,text,text,text,text,text,bigint,numeric,integer,bigint,integer,boolean,numeric,bigint[]
) TO authenticated, service_role;

-- Asignar la promo actual de Carro Kechu a los dos chivitos aptos.
-- El chivito al plato (producto 35) queda expresamente fuera.
UPDATE public.businesses
SET promo_target_type = 'products',
    promo_target_id = NULL,
    promo_target_product_ids = ARRAY[36,37]::bigint[]
WHERE id = 8 AND slug = 'carro-kechu-carmelo';
