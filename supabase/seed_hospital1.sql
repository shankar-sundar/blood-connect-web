-- Insert profile for hospital1@test.com
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
where email = 'hospital1@test.com'
on conflict (id) do nothing;

-- Verify
select p.role, p.org_name, p.org_type, u.email
from public.profiles p
join auth.users u on u.id = p.id
where u.email = 'hospital1@test.com';
