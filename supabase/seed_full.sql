-- ================================================================
-- BloodConnect — Full Seed
-- 50 donors · 5 hospitals · 10 blood requests · 6 acceptances
-- Preserves donor1@test.com and hospital1@test.com login accounts
-- ================================================================

-- ── CLEAN ────────────────────────────────────────────────────────
delete from public.acceptances;
delete from public.blood_requests;
delete from public.profiles
  where id in (
    select id from auth.users
    where email not in ('donor1@test.com','hospital1@test.com')
  );
delete from auth.users
  where email not in ('donor1@test.com','hospital1@test.com');


-- ── DONOR STAGING ────────────────────────────────────────────────
drop table if exists _donors;
create temp table _donors (
  id         uuid primary key default gen_random_uuid(),
  email      text, first_name text, last_name text,
  mobile     text, blood_group text, city text,
  lat        double precision, lng double precision,
  dob        date, gender text, available boolean
);

insert into _donors (email,first_name,last_name,mobile,blood_group,city,lat,lng,dob,gender,available) values
-- O+ (15)
('rahul.sharma@seed.bloodconnect',    'Rahul',    'Sharma',   '+91 98101 00001','O+','New Delhi', 28.6139,77.2090,'1995-04-10','Male',  true),
('priya.patel@seed.bloodconnect',     'Priya',    'Patel',    '+91 98101 00002','O+','Mumbai',    19.0760,72.8777,'1993-07-22','Female',true),
('amit.kumar@seed.bloodconnect',      'Amit',     'Kumar',    '+91 98101 00003','O+','New Delhi', 28.6139,77.2090,'1990-01-15','Male',  true),
('sunita.singh@seed.bloodconnect',    'Sunita',   'Singh',    '+91 98101 00004','O+','New Delhi', 28.6139,77.2090,'1988-11-03','Female',true),
('vijay.reddy@seed.bloodconnect',     'Vijay',    'Reddy',    '+91 98101 00005','O+','Hyderabad', 17.3850,78.4867,'1992-06-18','Male',  true),
('deepa.nair@seed.bloodconnect',      'Deepa',    'Nair',     '+91 98101 00006','O+','Bangalore', 12.9716,77.5946,'1997-03-25','Female',true),
('sanjay.gupta@seed.bloodconnect',    'Sanjay',   'Gupta',    '+91 98101 00007','O+','New Delhi', 28.6139,77.2090,'1985-09-07','Male',  true),
('meena.pillai@seed.bloodconnect',    'Meena',    'Pillai',   '+91 98101 00008','O+','Chennai',   13.0827,80.2707,'1991-12-14','Female',true),
('rohit.verma@seed.bloodconnect',     'Rohit',    'Verma',    '+91 98101 00009','O+','Mumbai',    19.0760,72.8777,'1994-08-29','Male',  true),
('kavitha.rao@seed.bloodconnect',     'Kavitha',  'Rao',      '+91 98101 00010','O+','Hyderabad', 17.3850,78.4867,'1989-02-11','Female',true),
('arjun.mehta@seed.bloodconnect',     'Arjun',    'Mehta',    '+91 98101 00011','O+','New Delhi', 28.6139,77.2090,'1996-05-30','Male',  true),
('anita.joshi@seed.bloodconnect',     'Anita',    'Joshi',    '+91 98101 00012','O+','Pune',      18.5204,73.8567,'1987-10-20','Female',true),
('suresh.iyer@seed.bloodconnect',     'Suresh',   'Iyer',     '+91 98101 00013','O+','Chennai',   13.0827,80.2707,'1983-07-04','Male',  false),
('pooja.kumar@seed.bloodconnect',     'Pooja',    'Kumar',    '+91 98101 00014','O+','Bangalore', 12.9716,77.5946,'1998-04-16','Female',true),
('manoj.tiwari@seed.bloodconnect',    'Manoj',    'Tiwari',   '+91 98101 00015','O+','New Delhi', 28.6139,77.2090,'1986-01-28','Male',  true),
-- A+ (12)
('deepak.saxena@seed.bloodconnect',   'Deepak',   'Saxena',   '+91 98101 00016','A+','Mumbai',    19.0760,72.8777,'1992-09-13','Male',  true),
('rekha.bhat@seed.bloodconnect',      'Rekha',    'Bhat',     '+91 98101 00017','A+','Bangalore', 12.9716,77.5946,'1990-04-02','Female',true),
('nitin.mishra@seed.bloodconnect',    'Nitin',    'Mishra',   '+91 98101 00018','A+','New Delhi', 28.6139,77.2090,'1988-08-19','Male',  true),
('swati.patil@seed.bloodconnect',     'Swati',    'Patil',    '+91 98101 00019','A+','Pune',      18.5204,73.8567,'1995-11-07','Female',true),
('harish.naidu@seed.bloodconnect',    'Harish',   'Naidu',    '+91 98101 00020','A+','Hyderabad', 17.3850,78.4867,'1984-03-24','Male',  false),
('divya.hegde@seed.bloodconnect',     'Divya',    'Hegde',    '+91 98101 00021','A+','Bangalore', 12.9716,77.5946,'1997-06-15','Female',true),
('prakash.kulkarni@seed.bloodconnect','Prakash',  'Kulkarni', '+91 98101 00022','A+','Pune',      18.5204,73.8567,'1981-12-31','Male',  true),
('pallavi.krishnan@seed.bloodconnect','Pallavi',  'Krishnan', '+91 98101 00023','A+','Chennai',   13.0827,80.2707,'1993-09-08','Female',true),
('ganesh.desai@seed.bloodconnect',    'Ganesh',   'Desai',    '+91 98101 00024','A+','Mumbai',    19.0760,72.8777,'1979-05-17','Male',  true),
('lakshmi.menon@seed.bloodconnect',   'Lakshmi',  'Menon',    '+91 98101 00025','A+','Hyderabad', 17.3850,78.4867,'1986-02-26','Female',true),
('rajesh.singh@seed.bloodconnect',    'Rajesh',   'Singh',    '+91 98101 00026','A+','New Delhi', 28.6139,77.2090,'1991-07-03','Male',  false),
('nisha.sharma@seed.bloodconnect',    'Nisha',    'Sharma',   '+91 98101 00027','A+','Mumbai',    19.0760,72.8777,'1999-10-12','Female',true),
-- B+ (12)
('vikram.das@seed.bloodconnect',      'Vikram',   'Das',      '+91 98101 00028','B+','New Delhi', 28.6139,77.2090,'1990-03-08','Male',  true),
('usha.shetty@seed.bloodconnect',     'Usha',     'Shetty',   '+91 98101 00029','B+','Mumbai',    19.0760,72.8777,'1987-08-21','Female',true),
('siddharth.nair@seed.bloodconnect',  'Siddharth','Nair',     '+91 98101 00030','B+','Bangalore', 12.9716,77.5946,'1994-01-14','Male',  true),
('radha.chauhan@seed.bloodconnect',   'Radha',    'Chauhan',  '+91 98101 00031','B+','New Delhi', 28.6139,77.2090,'1992-06-27','Female',true),
('dinesh.rao@seed.bloodconnect',      'Dinesh',   'Rao',      '+91 98101 00032','B+','Hyderabad', 17.3850,78.4867,'1985-11-09','Male',  true),
('madhuri.patel@seed.bloodconnect',   'Madhuri',  'Patel',    '+91 98101 00033','B+','Pune',      18.5204,73.8567,'1997-04-22','Female',true),
('praveen.kumar@seed.bloodconnect',   'Praveen',  'Kumar',    '+91 98101 00034','B+','Mumbai',    19.0760,72.8777,'1983-09-05','Male',  false),
('geeta.reddy@seed.bloodconnect',     'Geeta',    'Reddy',    '+91 98101 00035','B+','Hyderabad', 17.3850,78.4867,'1990-02-18','Female',true),
('satish.pillai@seed.bloodconnect',   'Satish',   'Pillai',   '+91 98101 00036','B+','Bangalore', 12.9716,77.5946,'1988-07-31','Male',  true),
('ananya.mishra@seed.bloodconnect',   'Ananya',   'Mishra',   '+91 98101 00037','B+','New Delhi', 28.6139,77.2090,'1996-12-14','Female',true),
('mohan.gupta@seed.bloodconnect',     'Mohan',    'Gupta',    '+91 98101 00038','B+','New Delhi', 28.6139,77.2090,'1980-05-27','Male',  true),
('sridevi.iyer@seed.bloodconnect',    'Sridevi',  'Iyer',     '+91 98101 00039','B+','Chennai',   13.0827,80.2707,'1993-10-10','Female',true),
-- AB+ (5)
('kiran.joshi@seed.bloodconnect',     'Kiran',    'Joshi',    '+91 98101 00040','AB+','Mumbai',   19.0760,72.8777,'1991-03-23','Male',  true),
('vimal.verma@seed.bloodconnect',     'Vimal',    'Verma',    '+91 98101 00041','AB+','New Delhi',28.6139,77.2090,'1987-08-06','Male',  true),
('padma.saxena@seed.bloodconnect',    'Padma',    'Saxena',   '+91 98101 00042','AB+','Bangalore',12.9716,77.5946,'1995-01-19','Female',true),
('ramesh.bhat@seed.bloodconnect',     'Ramesh',   'Bhat',     '+91 98101 00043','AB+','Pune',     18.5204,73.8567,'1982-06-02','Male',  false),
('nalini.kumar@seed.bloodconnect',    'Nalini',   'Kumar',    '+91 98101 00044','AB+','Hyderabad',17.3850,78.4867,'1989-11-15','Female',true),
-- O- (3)
('sunil.tiwari@seed.bloodconnect',    'Sunil',    'Tiwari',   '+91 98101 00045','O-','New Delhi', 28.6139,77.2090,'1993-04-28','Male',  true),
('geetha.patil@seed.bloodconnect',    'Geetha',   'Patil',    '+91 98101 00046','O-','Mumbai',    19.0760,72.8777,'1986-09-11','Female',true),
('naveen.nair@seed.bloodconnect',     'Naveen',   'Nair',     '+91 98101 00047','O-','Bangalore', 12.9716,77.5946,'1991-02-24','Male',  true),
-- A- (1)
('anil.chauhan@seed.bloodconnect',    'Anil',     'Chauhan',  '+91 98101 00048','A-','New Delhi', 28.6139,77.2090,'1984-07-07','Male',  true),
-- B- (1)
('ravi.sharma@seed.bloodconnect',     'Ravi',     'Sharma',   '+91 98101 00049','B-','Mumbai',    19.0760,72.8777,'1992-12-20','Male',  true),
-- AB- (1)
('preethi.reddy@seed.bloodconnect',   'Preethi',  'Reddy',    '+91 98101 00050','AB-','Hyderabad',17.3850,78.4867,'1998-05-03','Female',true);


-- ── HOSPITAL STAGING ─────────────────────────────────────────────
drop table if exists _hospitals;
create temp table _hospitals (
  id          uuid primary key default gen_random_uuid(),
  email       text, org_name text, org_type text,
  mobile      text, address text, license_no text,
  lat         double precision, lng double precision
);

insert into _hospitals (email,org_name,org_type,mobile,address,license_no,lat,lng) values
('aiims.delhi@seed.bloodconnect',     'AIIMS Delhi',                      'Government Hospital','+91 11 2658 8500','Ansari Nagar East, New Delhi — 110029',    'DL-BB-2020-00001',28.5672,77.2100),
('fortis.gurugram@seed.bloodconnect', 'Fortis Memorial Research Institute','Private Hospital',  '+91 12 4962 9000','Sector 44, Gurugram, Haryana — 122002',     'HR-BB-2018-00042',28.4595,77.0266),
('apollo.mumbai@seed.bloodconnect',   'Apollo Hospitals Juhu',            'Private Hospital',  '+91 22 6260 0000','Juhu, Mumbai, Maharashtra — 400049',         'MH-BB-2015-00089',19.0990,72.8270),
('manipal.bangalore@seed.bloodconnect','Manipal Hospitals',               'Private Hospital',  '+91 80 2502 4444','Old Airport Road, Bangalore — 560017',       'KA-BB-2017-00031',12.9592,77.6481),
('yashoda.hyderabad@seed.bloodconnect','Yashoda Hospitals',               'Private Hospital',  '+91 40 4567 4567','Somajiguda, Hyderabad — 500082',             'TG-BB-2016-00057',17.4337,78.4489);


-- ── INSERT AUTH USERS ────────────────────────────────────────────
insert into auth.users (id,email,aud,role,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,created_at,updated_at)
select id,email,'authenticated','authenticated',now(),
       '{"provider":"email","providers":["email"]}'::jsonb,'{}'::jsonb,now(),now()
from _donors;

insert into auth.users (id,email,aud,role,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,created_at,updated_at)
select id,email,'authenticated','authenticated',now(),
       '{"provider":"email","providers":["email"]}'::jsonb,'{}'::jsonb,now(),now()
from _hospitals;


-- ── INSERT PROFILES ──────────────────────────────────────────────
insert into public.profiles (id,role,first_name,last_name,mobile,blood_group,city,lat,lng,dob,gender,available)
select id,'donor',first_name,last_name,mobile,blood_group,city,lat,lng,dob,gender,available
from _donors;

insert into public.profiles (id,role,org_name,org_type,mobile,address,license_no)
select id,'hospital',org_name,org_type,mobile,address,license_no
from _hospitals;


-- ── BLOOD REQUESTS ───────────────────────────────────────────────
-- AIIMS Delhi — 3 requests
insert into public.blood_requests (hospital_id,blood_group,units,component,urgency,urgency_rank,notes,status)
select id,'O-',3,'Packed RBCs','critical',1,'Trauma Ward · Emergency surgery in 45 min','open' from _hospitals where email='aiims.delhi@seed.bloodconnect';

insert into public.blood_requests (hospital_id,blood_group,units,component,urgency,urgency_rank,notes,status)
select id,'B+',2,'Whole Blood','urgent',2,'ICU · Thalassemia patient','open' from _hospitals where email='aiims.delhi@seed.bloodconnect';

insert into public.blood_requests (hospital_id,blood_group,units,component,urgency,urgency_rank,notes,status)
select id,'A+',4,'Packed RBCs','scheduled',3,'Orthopaedics · Hip replacement surgery May 5','open' from _hospitals where email='aiims.delhi@seed.bloodconnect';

-- Fortis Gurugram — 2 requests
insert into public.blood_requests (hospital_id,blood_group,units,component,urgency,urgency_rank,notes,status)
select id,'O+',2,'Whole Blood','critical',1,'Emergency · Road accident victim','open' from _hospitals where email='fortis.gurugram@seed.bloodconnect';

insert into public.blood_requests (hospital_id,blood_group,units,component,urgency,urgency_rank,notes,status)
select id,'AB+',1,'Platelets','urgent',2,'Oncology · Cancer patient chemotherapy','open' from _hospitals where email='fortis.gurugram@seed.bloodconnect';

-- Apollo Mumbai — 2 requests
insert into public.blood_requests (hospital_id,blood_group,units,component,urgency,urgency_rank,notes,status)
select id,'A+',2,'Fresh Frozen Plasma','urgent',2,'Cardiac · Post-bypass recovery','open' from _hospitals where email='apollo.mumbai@seed.bloodconnect';

insert into public.blood_requests (hospital_id,blood_group,units,component,urgency,urgency_rank,notes,status)
select id,'O+',3,'Packed RBCs','scheduled',3,'Cardiac · Bypass surgery May 10','open' from _hospitals where email='apollo.mumbai@seed.bloodconnect';

-- Manipal Bangalore — 1 request
insert into public.blood_requests (hospital_id,blood_group,units,component,urgency,urgency_rank,notes,status)
select id,'B+',1,'Whole Blood','critical',1,'Casualty · Accident victim, surgery imminent','open' from _hospitals where email='manipal.bangalore@seed.bloodconnect';

-- Yashoda Hyderabad — 2 requests
insert into public.blood_requests (hospital_id,blood_group,units,component,urgency,urgency_rank,notes,status)
select id,'O+',2,'Whole Blood','urgent',2,'Maternity · Post-partum haemorrhage','open' from _hospitals where email='yashoda.hyderabad@seed.bloodconnect';

insert into public.blood_requests (hospital_id,blood_group,units,component,urgency,urgency_rank,notes,status)
select id,'AB-',1,'Packed RBCs','urgent',2,'Nephrology · Rare blood group urgently needed','open' from _hospitals where email='yashoda.hyderabad@seed.bloodconnect';


-- ── ACCEPTANCES ──────────────────────────────────────────────────
-- O+ donors accepting Fortis O+ critical request
insert into public.acceptances (request_id,donor_id,status)
select r.id, d.id, 'accepted'
from public.blood_requests r, _donors d
where r.notes like 'Emergency · Road accident%'
  and d.email = 'rahul.sharma@seed.bloodconnect';

insert into public.acceptances (request_id,donor_id,status)
select r.id, d.id, 'accepted'
from public.blood_requests r, _donors d
where r.notes like 'Emergency · Road accident%'
  and d.email = 'amit.kumar@seed.bloodconnect';

-- O+ donor donated for Yashoda request
insert into public.acceptances (request_id,donor_id,status)
select r.id, d.id, 'donated'
from public.blood_requests r, _donors d
where r.notes like 'Maternity%'
  and d.email = 'priya.patel@seed.bloodconnect';

-- B+ donors on AIIMS ICU request
insert into public.acceptances (request_id,donor_id,status)
select r.id, d.id, 'accepted'
from public.blood_requests r, _donors d
where r.notes like 'ICU · Thalassemia%'
  and d.email = 'vikram.das@seed.bloodconnect';

insert into public.acceptances (request_id,donor_id,status)
select r.id, d.id, 'donated'
from public.blood_requests r, _donors d
where r.notes like 'ICU · Thalassemia%'
  and d.email = 'usha.shetty@seed.bloodconnect';

-- A+ donor on AIIMS scheduled request
insert into public.acceptances (request_id,donor_id,status)
select r.id, d.id, 'accepted'
from public.blood_requests r, _donors d
where r.notes like 'Orthopaedics%'
  and d.email = 'deepak.saxena@seed.bloodconnect';


-- ── VERIFY ───────────────────────────────────────────────────────
select
  (select count(*) from _donors)                    as donors_staged,
  (select count(*) from _hospitals)                 as hospitals_staged,
  (select count(*) from public.profiles where role='donor')    as donor_profiles,
  (select count(*) from public.profiles where role='hospital') as hospital_profiles,
  (select count(*) from public.blood_requests)      as blood_requests,
  (select count(*) from public.acceptances)         as acceptances;

drop table if exists _donors;
drop table if exists _hospitals;
