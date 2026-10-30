-- Historical business creation dates remain unknown; only future inserts get a date.
alter table public.businesses add column if not exists created_at timestamptz;
alter table public.businesses alter column created_at set default now();

create table public.business_subscriptions (
 business_id bigint primary key references public.businesses(id) on delete restrict,
 joined_on date,
 mode text not null default 'unconfigured' check (mode in ('unconfigured','trial','paid')),
 plan_name text not null default '',
 monthly_amount numeric(12,2) check (monthly_amount >= 0),
 currency text not null default 'UYU' check (currency ~ '^[A-Z]{3}$'),
 trial_started_on date,
 trial_ends_on date,
 paid_through date,
 notes text not null default '',
 updated_at timestamptz not null default now(),
 check ((trial_started_on is null and trial_ends_on is null) or (trial_started_on is not null and trial_ends_on is not null and trial_ends_on >= trial_started_on)),
 check (mode <> 'trial' or trial_ends_on is not null),
 check (mode <> 'paid' or paid_through is not null)
);
create table public.subscription_payments (
 id bigint generated always as identity primary key,
 request_id uuid not null unique,
 business_id bigint not null references public.businesses(id) on delete restrict,
 paid_on date not null,
 amount numeric(12,2) not null check (amount > 0),
 currency text not null check (currency ~ '^[A-Z]{3}$'),
 coverage_from date not null,
 coverage_to date not null check (coverage_to >= coverage_from),
 method text not null default '',
 reference text not null default '',
 notes text not null default '',
 recorded_at timestamptz not null default now(),
 recorded_by uuid not null default auth.uid() references auth.users(id)
);
create index subscription_payments_business_date on public.subscription_payments(business_id,paid_on desc);
create index subscription_payments_recorded_by on public.subscription_payments(recorded_by);
alter table public.business_subscriptions enable row level security;
alter table public.subscription_payments enable row level security;
revoke all on public.business_subscriptions, public.subscription_payments from public, anon, authenticated;
grant select,insert,update on public.business_subscriptions to authenticated;
grant select,insert on public.subscription_payments to authenticated;
grant usage,select on sequence public.subscription_payments_id_seq to authenticated;
create policy subscriptions_admin_select on public.business_subscriptions for select to authenticated using ((select auth.jwt()->'app_metadata'->>'denexa_role')='super_admin');
create policy subscriptions_admin_insert on public.business_subscriptions for insert to authenticated with check ((select auth.jwt()->'app_metadata'->>'denexa_role')='super_admin');
create policy subscriptions_admin_update on public.business_subscriptions for update to authenticated using ((select auth.jwt()->'app_metadata'->>'denexa_role')='super_admin') with check ((select auth.jwt()->'app_metadata'->>'denexa_role')='super_admin');
create policy payments_admin_select on public.subscription_payments for select to authenticated using ((select auth.jwt()->'app_metadata'->>'denexa_role')='super_admin');
create policy payments_admin_insert on public.subscription_payments for insert to authenticated with check ((select auth.jwt()->'app_metadata'->>'denexa_role')='super_admin' and recorded_by=(select auth.uid()));
create policy businesses_super_admin_update on public.businesses for update to authenticated using ((select auth.jwt()->'app_metadata'->>'denexa_role')='super_admin') with check ((select auth.jwt()->'app_metadata'->>'denexa_role')='super_admin');
insert into public.business_subscriptions(business_id) select id from public.businesses;

create function public.admin_record_subscription_payment(
 p_request_id uuid,p_business_id bigint,p_paid_on date,p_amount numeric,p_currency text,
 p_coverage_from date,p_coverage_to date,p_method text default '',p_reference text default '',p_notes text default ''
) returns bigint language plpgsql security invoker set search_path = '' as $$
declare payment_id bigint; existing public.subscription_payments%rowtype;
begin
 if auth.uid() is null or coalesce(auth.jwt()->'app_metadata'->>'denexa_role','') <> 'super_admin' then
  raise exception 'Acceso exclusivo del administrador' using errcode='42501';
 end if;
 if p_amount is null or p_amount <= 0 or p_currency !~ '^[A-Z]{3}$' or p_paid_on is null or p_paid_on > (now() at time zone 'America/Montevideo')::date or p_coverage_from is null or p_coverage_to is null or p_coverage_to < p_coverage_from then
  raise exception 'Revisá el importe y las fechas del pago' using errcode='22023';
 end if;
 -- Serialize retries for the same request, even if they arrive simultaneously.
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_request_id::text,0));
 select * into existing from public.subscription_payments where request_id=p_request_id;
 if found then
  if existing.business_id<>p_business_id or existing.amount<>p_amount or existing.currency<>p_currency or existing.paid_on<>p_paid_on or existing.coverage_from<>p_coverage_from or existing.coverage_to<>p_coverage_to then
   raise exception 'Este pago ya fue registrado con otros datos' using errcode='22023';
  end if;
  return existing.id;
 end if;
 insert into public.business_subscriptions(business_id) values(p_business_id) on conflict do nothing;
 perform 1 from public.business_subscriptions where business_id=p_business_id for update;
 insert into public.subscription_payments(request_id,business_id,paid_on,amount,currency,coverage_from,coverage_to,method,reference,notes)
 values(p_request_id,p_business_id,p_paid_on,p_amount,p_currency,p_coverage_from,p_coverage_to,coalesce(p_method,''),coalesce(p_reference,''),coalesce(p_notes,'')) returning id into payment_id;
 update public.business_subscriptions set mode='paid',currency=p_currency,paid_through=greatest(paid_through,p_coverage_to),updated_at=now() where business_id=p_business_id;
 return payment_id;
end;
$$;
revoke all on function public.admin_record_subscription_payment(uuid,bigint,date,numeric,text,date,date,text,text,text) from public,anon;
grant execute on function public.admin_record_subscription_payment(uuid,bigint,date,numeric,text,date,date,text,text,text) to authenticated;
