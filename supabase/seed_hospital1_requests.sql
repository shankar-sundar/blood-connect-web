-- Seed blood requests + acceptances for hospital1@test.com
-- 7 requests across all urgency levels and blood groups

-- ── BLOOD REQUESTS ───────────────────────────────────────────────
insert into public.blood_requests (hospital_id, blood_group, units, component, urgency, urgency_rank, notes, status)
select id, 'O-',  3, 'Packed RBCs',        'critical',  1, 'Trauma Ward · Multi-vehicle accident, surgery in 30 min', 'open' from auth.users where email = 'hospital1@test.com'
union all
select id, 'AB+', 2, 'Platelets',           'critical',  1, 'ICU · Dengue patient, platelet count critically low',     'open' from auth.users where email = 'hospital1@test.com'
union all
select id, 'B+',  2, 'Whole Blood',         'urgent',    2, 'Oncology · Chemotherapy patient, scheduled transfusion',  'open' from auth.users where email = 'hospital1@test.com'
union all
select id, 'A+',  1, 'Fresh Frozen Plasma', 'urgent',    2, 'Maternity · Post-partum haemorrhage',                     'open' from auth.users where email = 'hospital1@test.com'
union all
select id, 'O+',  4, 'Packed RBCs',         'urgent',    2, 'Nephrology · Kidney transplant prep',                     'open' from auth.users where email = 'hospital1@test.com'
union all
select id, 'A-',  2, 'Whole Blood',         'scheduled', 3, 'Orthopaedics · Hip replacement surgery May 8',            'open' from auth.users where email = 'hospital1@test.com'
union all
select id, 'B-',  1, 'Cryoprecipitate',     'scheduled', 3, 'Haematology · Haemophilia patient, routine support',      'open' from auth.users where email = 'hospital1@test.com';


-- ── ACCEPTANCES ──────────────────────────────────────────────────
-- O- Trauma: sunil.tiwari accepted, naveen.nair donated
insert into public.acceptances (request_id, donor_id, status)
select r.id, (select u.id from auth.users u where u.email = 'sunil.tiwari@seed.bloodconnect'), 'accepted'
from public.blood_requests r
where r.hospital_id = (select id from auth.users where email = 'hospital1@test.com')
  and r.notes like 'Trauma Ward%';

insert into public.acceptances (request_id, donor_id, status)
select r.id, (select u.id from auth.users u where u.email = 'naveen.nair@seed.bloodconnect'), 'donated'
from public.blood_requests r
where r.hospital_id = (select id from auth.users where email = 'hospital1@test.com')
  and r.notes like 'Trauma Ward%';

-- B+ Oncology: vikram.das accepted, siddharth.nair donated
insert into public.acceptances (request_id, donor_id, status)
select r.id, (select u.id from auth.users u where u.email = 'vikram.das@seed.bloodconnect'), 'accepted'
from public.blood_requests r
where r.hospital_id = (select id from auth.users where email = 'hospital1@test.com')
  and r.notes like 'Oncology%';

insert into public.acceptances (request_id, donor_id, status)
select r.id, (select u.id from auth.users u where u.email = 'siddharth.nair@seed.bloodconnect'), 'donated'
from public.blood_requests r
where r.hospital_id = (select id from auth.users where email = 'hospital1@test.com')
  and r.notes like 'Oncology%';

-- A+ Maternity: nisha.sharma accepted
insert into public.acceptances (request_id, donor_id, status)
select r.id, (select u.id from auth.users u where u.email = 'nisha.sharma@seed.bloodconnect'), 'accepted'
from public.blood_requests r
where r.hospital_id = (select id from auth.users where email = 'hospital1@test.com')
  and r.notes like 'Maternity%';


-- ── VERIFY ───────────────────────────────────────────────────────
select r.urgency, r.blood_group, r.units, r.component,
       r.notes, count(a.id) as acceptances
from public.blood_requests r
left join public.acceptances a on a.request_id = r.id
where r.hospital_id = (select id from auth.users where email = 'hospital1@test.com')
group by r.id, r.urgency, r.urgency_rank, r.blood_group, r.units, r.component, r.notes
order by r.urgency_rank, r.created_at;
