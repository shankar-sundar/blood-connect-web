-- BloodConnect test seed — run in Supabase SQL Editor

-- ─── CREATE AUTH USERS ───────────────────────────────────────────────────────
-- Uses CTEs to capture generated UUIDs and insert profiles in one shot

with donor_user as (
  insert into auth.users (
    id, email, encrypted_password,
    email_confirmed_at, confirmation_sent_at,
    raw_app_meta_data, raw_user_meta_data,
    aud, role, created_at, updated_at
  ) values (
    gen_random_uuid(),
    'donor@test.com',
    crypt('Test@1234', gen_salt('bf')),
    now(), now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    'authenticated', 'authenticated',
    now(), now()
  )
  returning id
),

hospital_user as (
  insert into auth.users (
    id, email, encrypted_password,
    email_confirmed_at, confirmation_sent_at,
    raw_app_meta_data, raw_user_meta_data,
    aud, role, created_at, updated_at
  ) values (
    gen_random_uuid(),
    'hospital@test.com',
    crypt('Test@1234', gen_salt('bf')),
    now(), now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    'authenticated', 'authenticated',
    now(), now()
  )
  returning id
),

-- ─── INSERT PROFILES ─────────────────────────────────────────────────────────

donor_profile as (
  insert into public.profiles (
    id, role,
    first_name, last_name, mobile,
    blood_group, city, lat, lng,
    dob, gender, available
  )
  select
    id, 'donor',
    'Rahul', 'Sharma', '+91 98765 43210',
    'O+', 'New Delhi', 28.6139, 77.2090,
    '1995-04-10', 'Male', true
  from donor_user
  returning id
)

insert into public.profiles (
  id, role,
  org_name, org_type, mobile,
  address, license_no
)
select
  id, 'hospital',
  'AIIMS Delhi', 'Government Hospital', '+91 11 2658 8500',
  'Ansari Nagar East, New Delhi — 110029', 'DL-BB-2020-00001'
from hospital_user;

-- ─── VERIFY ──────────────────────────────────────────────────────────────────
select p.role, p.first_name, p.org_name, u.email
from public.profiles p
join auth.users u on u.id = p.id
where u.email in ('donor@test.com', 'hospital@test.com');
