-- BloodConnect schema
-- Run this in Supabase SQL Editor

-- ─── PROFILES ────────────────────────────────────────────────────────────────
create table public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  role         text not null check (role in ('donor', 'hospital')),

  -- donor fields
  first_name   text,
  last_name    text,
  mobile       text,
  blood_group  text check (blood_group in ('A+','A-','B+','B-','O+','O-','AB+','AB-')),
  city         text,
  lat          double precision,
  lng          double precision,
  dob          date,
  gender       text,
  available    boolean default true,

  -- hospital fields
  org_name     text,
  org_type     text,
  address      text,
  license_no   text,

  created_at   timestamptz default now()
);

alter table public.profiles enable row level security;

-- Users can read any profile (donors need to see hospital names on requests)
create policy "profiles_select" on public.profiles
  for select using (true);

-- Users can only update their own profile
create policy "profiles_update" on public.profiles
  for update using (auth.uid() = id);

-- Insert handled by server action after sign-up
create policy "profiles_insert" on public.profiles
  for insert with check (auth.uid() = id);


-- ─── BLOOD REQUESTS ──────────────────────────────────────────────────────────
create table public.blood_requests (
  id           uuid primary key default gen_random_uuid(),
  hospital_id  uuid not null references public.profiles(id) on delete cascade,
  blood_group  text not null check (blood_group in ('A+','A-','B+','B-','O+','O-','AB+','AB-')),
  units        int not null check (units > 0),
  component    text,
  urgency      text not null check (urgency in ('critical','urgent','scheduled')) default 'urgent',
  urgency_rank int not null default 2, -- 1=critical, 2=urgent, 3=scheduled
  notes        text,
  status       text not null check (status in ('open','fulfilled','cancelled')) default 'open',
  created_at   timestamptz default now()
);

alter table public.blood_requests enable row level security;

-- Anyone authenticated can read open requests
create policy "requests_select" on public.blood_requests
  for select using (auth.uid() is not null);

-- Only the hospital that owns it can insert
create policy "requests_insert" on public.blood_requests
  for insert with check (auth.uid() = hospital_id);

-- Only the owning hospital can update
create policy "requests_update" on public.blood_requests
  for update using (auth.uid() = hospital_id);


-- ─── ACCEPTANCES ─────────────────────────────────────────────────────────────
create table public.acceptances (
  id          uuid primary key default gen_random_uuid(),
  request_id  uuid not null references public.blood_requests(id) on delete cascade,
  donor_id    uuid not null references public.profiles(id) on delete cascade,
  status      text not null check (status in ('accepted','donated','rejected')) default 'accepted',
  created_at  timestamptz default now(),
  unique (request_id, donor_id)
);

alter table public.acceptances enable row level security;

-- Authenticated users can read acceptances (hospitals need donor details)
create policy "acceptances_select" on public.acceptances
  for select using (auth.uid() is not null);

-- Only donors can insert their own acceptance
create policy "acceptances_insert" on public.acceptances
  for insert with check (auth.uid() = donor_id);

-- Hospitals can update status (accepted → donated), donors can also update their own
create policy "acceptances_update" on public.acceptances
  for update using (
    auth.uid() = donor_id
    or auth.uid() = (select hospital_id from public.blood_requests where id = request_id)
  );


-- ─── REALTIME ────────────────────────────────────────────────────────────────
-- Enable realtime for live donor dashboard updates
alter publication supabase_realtime add table public.blood_requests;
alter publication supabase_realtime add table public.acceptances;
