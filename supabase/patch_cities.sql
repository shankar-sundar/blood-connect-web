-- Patch city for test accounts and seed hospitals on the live database
-- Run this once in Supabase SQL Editor

-- donor1@test.com
update public.profiles set city = 'New Delhi'
where id = (select id from auth.users where email = 'donor1@test.com');

-- hospital1@test.com
update public.profiles set city = 'New Delhi'
where id = (select id from auth.users where email = 'hospital1@test.com');

-- Seed hospitals (city was missing from original seed_full.sql)
update public.profiles set city = 'New Delhi' where id = (select id from auth.users where email = 'aiims.delhi@seed.bloodconnect');
update public.profiles set city = 'Gurugram'  where id = (select id from auth.users where email = 'fortis.gurugram@seed.bloodconnect');
update public.profiles set city = 'Mumbai'    where id = (select id from auth.users where email = 'apollo.mumbai@seed.bloodconnect');
update public.profiles set city = 'Bangalore' where id = (select id from auth.users where email = 'manipal.bangalore@seed.bloodconnect');
update public.profiles set city = 'Hyderabad' where id = (select id from auth.users where email = 'yashoda.hyderabad@seed.bloodconnect');

-- Verify
select u.email, p.city, p.role
from public.profiles p
join auth.users u on u.id = p.id
where p.role = 'hospital' or u.email = 'donor1@test.com'
order by p.role, u.email;
