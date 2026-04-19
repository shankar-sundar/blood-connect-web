-- Fix seed: delete old orphaned profiles and re-insert linked to actual auth user IDs
-- Run in Supabase SQL Editor

-- Step 1: Remove the old orphaned profiles (from the first seed run)
delete from public.profiles
where id not in (select id from auth.users);

-- Step 2: Insert profiles linked to the real user IDs
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
from auth.users
where email = 'donor@test.com'
on conflict (id) do nothing;

insert into public.profiles (
  id, role,
  org_name, org_type, mobile,
  address, license_no
)
select
  id, 'hospital',
  'AIIMS Delhi', 'Government Hospital', '+91 11 2658 8500',
  'Ansari Nagar East, New Delhi — 110029', 'DL-BB-2020-00001'
from auth.users
where email = 'hospital@test.com'
on conflict (id) do nothing;

-- Verify
select p.role, p.first_name, p.org_name, u.email
from public.profiles p
join auth.users u on u.id = p.id
where u.email in ('donor@test.com', 'hospital@test.com');
