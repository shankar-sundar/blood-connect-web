-- Insert profile for donor1@test.com
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
where email = 'donor1@test.com'
on conflict (id) do nothing;

-- Verify
select p.role, p.first_name, p.blood_group, u.email
from public.profiles p
join auth.users u on u.id = p.id
where u.email = 'donor1@test.com';
