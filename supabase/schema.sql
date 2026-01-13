-- Core schema for student onboarding, enrollment, and payments.
-- Run in Supabase SQL editor.

create extension if not exists pgcrypto;

create table if not exists public.student_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  level text,
  goals text,
  availability text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.student_onboarding (
  user_id uuid primary key references auth.users(id) on delete cascade,
  level text,
  goals text[],
  life_situation text,
  availability_slots text[],
  time_preference text,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  level text,
  description text,
  price_cents integer not null default 0,
  currency text not null default 'EUR',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.cohorts (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  start_date date,
  end_date date,
  schedule_text text,
  seats integer,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  cohort_id uuid not null references public.cohorts(id) on delete cascade,
  status text not null default 'pending',
  paid boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  enrollment_id uuid not null references public.enrollments(id) on delete cascade,
  provider text not null default 'stripe',
  provider_ref text,
  amount_cents integer not null default 0,
  currency text not null default 'EUR',
  status text not null default 'initiated',
  created_at timestamptz not null default now()
);

create table if not exists public.lead_magnet_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text,
  created_at timestamptz not null default now()
);

create index if not exists idx_enrollments_user_id on public.enrollments(user_id);
create index if not exists idx_payments_enrollment_id on public.payments(enrollment_id);
create index if not exists idx_cohorts_course_id on public.cohorts(course_id);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_student_profiles_updated_at on public.student_profiles;
create trigger trg_student_profiles_updated_at
before update on public.student_profiles
for each row execute function public.set_updated_at();

drop trigger if exists trg_student_onboarding_updated_at on public.student_onboarding;
create trigger trg_student_onboarding_updated_at
before update on public.student_onboarding
for each row execute function public.set_updated_at();

alter table public.student_profiles enable row level security;
alter table public.student_onboarding enable row level security;
alter table public.courses enable row level security;
alter table public.cohorts enable row level security;
alter table public.enrollments enable row level security;
alter table public.payments enable row level security;
alter table public.lead_magnet_signups enable row level security;

-- Profiles: users can read/update their own profile.
drop policy if exists "profiles_select_own" on public.student_profiles;
create policy "profiles_select_own"
on public.student_profiles for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "profiles_upsert_own" on public.student_profiles;
create policy "profiles_upsert_own"
on public.student_profiles for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "profiles_update_own" on public.student_profiles;
create policy "profiles_update_own"
on public.student_profiles for update
to authenticated
using (auth.uid() = user_id);

drop policy if exists "onboarding_select_own" on public.student_onboarding;
create policy "onboarding_select_own"
on public.student_onboarding for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "onboarding_upsert_own" on public.student_onboarding;
create policy "onboarding_upsert_own"
on public.student_onboarding for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "onboarding_update_own" on public.student_onboarding;
create policy "onboarding_update_own"
on public.student_onboarding for update
to authenticated
using (auth.uid() = user_id);

-- Courses/cohorts: publicly readable.
drop policy if exists "courses_select_public" on public.courses;
create policy "courses_select_public"
on public.courses for select
to anon, authenticated
using (true);

drop policy if exists "cohorts_select_public" on public.cohorts;
create policy "cohorts_select_public"
on public.cohorts for select
to anon, authenticated
using (true);

-- Enrollments: users can read/insert their own.
drop policy if exists "enrollments_select_own" on public.enrollments;
create policy "enrollments_select_own"
on public.enrollments for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "enrollments_insert_own" on public.enrollments;
create policy "enrollments_insert_own"
on public.enrollments for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "enrollments_update_own" on public.enrollments;
create policy "enrollments_update_own"
on public.enrollments for update
to authenticated
using (auth.uid() = user_id);

-- Payments: users can read their own payments. Inserts should be done by server-side service.
drop policy if exists "payments_select_own" on public.payments;
create policy "payments_select_own"
on public.payments for select
to authenticated
using (auth.uid() = user_id);

-- Lead magnet signups: allow anonymous inserts for email capture.
drop policy if exists "lead_signups_insert" on public.lead_magnet_signups;
create policy "lead_signups_insert"
on public.lead_magnet_signups for insert
to anon, authenticated
with check (true);
