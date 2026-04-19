-- 50 blood requests + acceptances for hospital1@test.com
-- Spread across all urgency levels, blood groups, components, and wards

-- ── STAGE REQUESTS ────────────────────────────────────────────────────
create temp table _r50 (
  slug         text primary key,
  blood_group  text,
  units        int,
  component    text,
  urgency      text,
  urgency_rank int,
  notes        text
);

insert into _r50 values
-- CRITICAL (15)
('r01','O+', 3,'Packed RBCs',        'critical',1,'ICU · Sepsis, multi-organ failure, immediate transfusion needed'),
('r02','AB+',2,'Platelets',          'critical',1,'ICU · Acute leukaemia, platelet count below 10k, urgent'),
('r03','O-', 4,'Packed RBCs',        'critical',1,'Trauma · Gunshot wound, emergency surgery in 15 min'),
('r04','A+', 2,'Fresh Frozen Plasma','critical',1,'ICU · DIC coagulopathy, clotting factors critically depleted'),
('r05','B+', 3,'Packed RBCs',        'critical',1,'Trauma · Road accident, internal bleeding, liver laceration'),
('r06','O+', 2,'Packed RBCs',        'critical',1,'Emergency · Ruptured ectopic pregnancy, haemoperitoneum'),
('r07','AB+',1,'Platelets',          'critical',1,'Haematology · Aplastic anaemia crisis, platelet count below 5k'),
('r08','A+', 3,'Packed RBCs',        'critical',1,'Cardiology · Post-CABG acute haemorrhage, Hb 5.2'),
('r09','O+', 2,'Whole Blood',        'critical',1,'Paediatrics · Severe anaemia, 4-year-old child, Hb 3.8'),
('r10','B+', 1,'Cryoprecipitate',    'critical',1,'ICU · Acute liver failure, fibrinogen critically low'),
('r11','O-', 2,'Packed RBCs',        'critical',1,'Burns · 60% TBSA burns, acute resuscitation phase'),
('r12','A+', 2,'Packed RBCs',        'critical',1,'Neurosurgery · Intracerebral haemorrhage, pre-op prep'),
('r13','AB+',3,'Platelets',          'critical',1,'Oncology · Post-chemo thrombocytopenia, count 8k, bleed risk'),
('r14','O+', 4,'Packed RBCs',        'critical',1,'Trauma · Fall from height, splenic rupture, OR ready'),
('r15','B+', 2,'Fresh Frozen Plasma','critical',1,'Maternity · Placenta praevia, emergency C-section in progress'),
-- URGENT (20)
('r16','O+', 2,'Packed RBCs',        'urgent',  2,'Nephrology · Dialysis patient, weekly transfusion overdue'),
('r17','A+', 1,'Packed RBCs',        'urgent',  2,'Oncology · Breast cancer, pre-chemotherapy Hb top-up'),
('r18','B+', 2,'Packed RBCs',        'urgent',  2,'General Surgery · Bowel resection prep, Hb 7.8'),
('r19','O+', 3,'Whole Blood',        'urgent',  2,'Orthopaedics · Total knee replacement scheduled today'),
('r20','AB+',2,'Platelets',          'urgent',  2,'Haematology · ITP patient, bone marrow biopsy today'),
('r21','A+', 2,'Fresh Frozen Plasma','urgent',  2,'Cardiology · Warfarin reversal, urgent mitral valve repair'),
('r22','O+', 1,'Packed RBCs',        'urgent',  2,'Paediatrics · Sickle cell vaso-occlusive crisis, 8-year-old'),
('r23','B+', 1,'Whole Blood',        'urgent',  2,'Gastroenterology · Upper GI bleed, endoscopy scheduled today'),
('r24','A+', 2,'Packed RBCs',        'urgent',  2,'Pulmonology · Massive haemoptysis, bronchial artery bleed'),
('r25','O+', 2,'Packed RBCs',        'urgent',  2,'Emergency · Post-operative bleeding, ICU step-down patient'),
('r26','B+', 3,'Packed RBCs',        'urgent',  2,'Orthopaedics · Complex pelvic fracture repair, OR today'),
('r27','A+', 1,'Platelets',          'urgent',  2,'Haematology · Bone marrow transplant conditioning started'),
('r28','O+', 2,'Whole Blood',        'urgent',  2,'Oncology · Colorectal cancer, post-Hartmann anastomosis'),
('r29','AB+',1,'Cryoprecipitate',    'urgent',  2,'Haematology · Haemophilia B breakthrough bleed episode'),
('r30','O+', 4,'Packed RBCs',        'urgent',  2,'Cardiology · Aortic valve replacement, surgery in 4 hours'),
('r31','A+', 2,'Packed RBCs',        'urgent',  2,'Nephrology · Post-kidney transplant anaemia, Hb 7.2'),
('r32','B+', 2,'Whole Blood',        'urgent',  2,'General Surgery · Whipple procedure, intra-op blood loss'),
('r33','O+', 1,'Packed RBCs',        'urgent',  2,'Oncology · Diffuse large B-cell lymphoma, CHOP cycle 3'),
('r34','A+', 3,'Packed RBCs',        'urgent',  2,'Obstetrics · Ante-partum haemorrhage at 34 weeks, PPH risk'),
('r35','O+', 2,'Packed RBCs',        'urgent',  2,'Paediatrics · Thalassaemia major, scheduled monthly top-up'),
-- SCHEDULED (15)
('r36','A+', 2,'Packed RBCs',        'scheduled',3,'Orthopaedics · Hip replacement surgery scheduled May 20'),
('r37','B+', 1,'Whole Blood',        'scheduled',3,'Cardiology · Pacemaker insertion scheduled May 22'),
('r38','O+', 3,'Packed RBCs',        'scheduled',3,'General Surgery · Liver transplant crossmatch prep May 25'),
('r39','AB+',2,'Platelets',          'scheduled',3,'Oncology · HSCT Day 0 transplant scheduled May 28'),
('r40','A+', 1,'Fresh Frozen Plasma','scheduled',3,'Orthopaedics · Lumbar spinal fusion scheduled June 2'),
('r41','B+', 2,'Packed RBCs',        'scheduled',3,'Urology · Radical cystectomy with neobladder June 5'),
('r42','O+', 2,'Whole Blood',        'scheduled',3,'Oncology · Ovarian cancer cytoreduction surgery June 7'),
('r43','A-', 1,'Whole Blood',        'scheduled',3,'Obstetrics · Elective C-section, Rh-negative mother June 10'),
('r44','AB+',1,'Cryoprecipitate',    'scheduled',3,'Haematology · Haemophilia A prophylaxis top-up June 12'),
('r45','O+', 4,'Packed RBCs',        'scheduled',3,'Cardiology · Coronary artery bypass graft scheduled June 15'),
('r46','B+', 2,'Packed RBCs',        'scheduled',3,'General Surgery · Total gastrectomy for gastric cancer June 17'),
('r47','A+', 2,'Packed RBCs',        'scheduled',3,'Oncology · Lung resection for NSCLC scheduled June 20'),
('r48','O+', 1,'Packed RBCs',        'scheduled',3,'Nephrology · Living donor kidney transplant scheduled June 22'),
('r49','AB+',2,'Platelets',          'scheduled',3,'Haematology · Stem cell collection apheresis June 25'),
('r50','B-', 1,'Whole Blood',        'scheduled',3,'Orthopaedics · ACL reconstruction, Rh-negative patient June 28');

-- ── INSERT BLOOD REQUESTS + CAPTURE IDs ────────────────────────────────
create temp table _req_ids (slug text, req_id uuid);

with ins as (
  insert into public.blood_requests
    (hospital_id, blood_group, units, component, urgency, urgency_rank, notes, status)
  select
    (select id from auth.users where email = 'hospital1@test.com'),
    r.blood_group, r.units, r.component, r.urgency, r.urgency_rank, r.notes, 'open'
  from _r50 r
  returning id, notes
)
insert into _req_ids (slug, req_id)
select r.slug, ins.id
from ins
join _r50 r on r.notes = ins.notes;

-- ── STAGE ACCEPTANCES ──────────────────────────────────────────────────
create temp table _acc_stage (slug text, donor_email text, status text);

insert into _acc_stage values
-- r01 O+ · 2 donors
('r01','rahul.sharma@seed.bloodconnect',    'accepted'),
('r01','priya.patel@seed.bloodconnect',     'donated'),
-- r02 AB+ · 3 donors
('r02','kiran.joshi@seed.bloodconnect',     'donated'),
('r02','vimal.verma@seed.bloodconnect',     'donated'),
('r02','padma.saxena@seed.bloodconnect',    'accepted'),
-- r03 O- · 2 donors
('r03','sunil.tiwari@seed.bloodconnect',    'donated'),
('r03','geetha.patil@seed.bloodconnect',    'accepted'),
-- r04 A+ · 2 donors
('r04','deepak.saxena@seed.bloodconnect',   'accepted'),
('r04','rekha.bhat@seed.bloodconnect',      'donated'),
-- r05 B+ · 2 donors
('r05','vikram.das@seed.bloodconnect',      'accepted'),
('r05','usha.shetty@seed.bloodconnect',     'donated'),
-- r06 O+ · 2 donors
('r06','amit.kumar@seed.bloodconnect',      'donated'),
('r06','sunita.singh@seed.bloodconnect',    'accepted'),
-- r07 AB+ · 1 donor
('r07','nalini.kumar@seed.bloodconnect',    'accepted'),
-- r08 A+ · 2 donors
('r08','nitin.mishra@seed.bloodconnect',    'donated'),
('r08','swati.patil@seed.bloodconnect',     'accepted'),
-- r09 O+ · 2 donors
('r09','vijay.reddy@seed.bloodconnect',     'accepted'),
('r09','deepa.nair@seed.bloodconnect',      'donated'),
-- r10 B+ · 2 donors
('r10','siddharth.nair@seed.bloodconnect',  'accepted'),
('r10','radha.chauhan@seed.bloodconnect',   'donated'),
-- r11 O- · 1 donor
('r11','naveen.nair@seed.bloodconnect',     'accepted'),
-- r12 A+ · 2 donors
('r12','divya.hegde@seed.bloodconnect',     'accepted'),
('r12','prakash.kulkarni@seed.bloodconnect','donated'),
-- r13 AB+ · 2 donors
('r13','kiran.joshi@seed.bloodconnect',     'accepted'),
('r13','vimal.verma@seed.bloodconnect',     'accepted'),
-- r14 O+ · 3 donors
('r14','sanjay.gupta@seed.bloodconnect',    'donated'),
('r14','meena.pillai@seed.bloodconnect',    'accepted'),
('r14','rohit.verma@seed.bloodconnect',     'accepted'),
-- r15 B+ · 2 donors
('r15','dinesh.rao@seed.bloodconnect',      'accepted'),
('r15','madhuri.patel@seed.bloodconnect',   'donated'),
-- r16 O+ · 1 donor
('r16','kavitha.rao@seed.bloodconnect',     'accepted'),
-- r17 A+ · 1 donor (donated)
('r17','pallavi.krishnan@seed.bloodconnect','donated'),
-- r18 B+ · 2 donors
('r18','geeta.reddy@seed.bloodconnect',     'accepted'),
('r18','satish.pillai@seed.bloodconnect',   'donated'),
-- r19 O+ · 2 donors
('r19','arjun.mehta@seed.bloodconnect',     'accepted'),
('r19','anita.joshi@seed.bloodconnect',     'donated'),
-- r20 AB+ · 1 donor
('r20','padma.saxena@seed.bloodconnect',    'accepted'),
-- r21 A+ · 2 donors
('r21','ganesh.desai@seed.bloodconnect',    'accepted'),
('r21','lakshmi.menon@seed.bloodconnect',   'donated'),
-- r22 O+ · 1 donor
('r22','pooja.kumar@seed.bloodconnect',     'accepted'),
-- r23 B+ · 1 donor
('r23','ananya.mishra@seed.bloodconnect',   'accepted'),
-- r24 A+ · 2 donors
('r24','nisha.sharma@seed.bloodconnect',    'donated'),
('r24','deepak.saxena@seed.bloodconnect',   'accepted'),
-- r25 O+ · 2 donors
('r25','manoj.tiwari@seed.bloodconnect',    'accepted'),
('r25','rahul.sharma@seed.bloodconnect',    'donated'),
-- r26 B+ · 2 donors
('r26','mohan.gupta@seed.bloodconnect',     'accepted'),
('r26','sridevi.iyer@seed.bloodconnect',    'donated'),
-- r27 A+ · 1 donor
('r27','rekha.bhat@seed.bloodconnect',      'accepted'),
-- r28 O+ · 2 donors
('r28','priya.patel@seed.bloodconnect',     'donated'),
('r28','amit.kumar@seed.bloodconnect',      'accepted'),
-- r29 AB+ · 1 donor (donated)
('r29','nalini.kumar@seed.bloodconnect',    'donated'),
-- r30 O+ · 3 donors
('r30','sunita.singh@seed.bloodconnect',    'donated'),
('r30','vijay.reddy@seed.bloodconnect',     'accepted'),
('r30','deepa.nair@seed.bloodconnect',      'accepted'),
-- r31 A+ · 1 donor
('r31','nitin.mishra@seed.bloodconnect',    'accepted'),
-- r32 B+ · 2 donors
('r32','vikram.das@seed.bloodconnect',      'donated'),
('r32','usha.shetty@seed.bloodconnect',     'accepted'),
-- r33 O+ · 1 donor
('r33','sanjay.gupta@seed.bloodconnect',    'accepted'),
-- r34 A+ · 2 donors
('r34','swati.patil@seed.bloodconnect',     'donated'),
('r34','divya.hegde@seed.bloodconnect',     'accepted'),
-- r35 O+ · 1 donor (donated)
('r35','meena.pillai@seed.bloodconnect',    'donated'),
-- r36 A+ · 1 donor
('r36','prakash.kulkarni@seed.bloodconnect','accepted'),
-- r37 B+ · 1 donor
('r37','siddharth.nair@seed.bloodconnect',  'accepted'),
-- r38 O+ · 2 donors
('r38','rohit.verma@seed.bloodconnect',     'accepted'),
('r38','kavitha.rao@seed.bloodconnect',     'donated'),
-- r39 AB+ · 1 donor
('r39','vimal.verma@seed.bloodconnect',     'accepted'),
-- r40 A+ · 1 donor
('r40','pallavi.krishnan@seed.bloodconnect','accepted'),
-- r41 B+ · 1 donor
('r41','radha.chauhan@seed.bloodconnect',   'accepted'),
-- r42 O+ · 1 donor (donated)
('r42','arjun.mehta@seed.bloodconnect',     'donated'),
-- r43 A- · 1 donor
('r43','anil.chauhan@seed.bloodconnect',    'accepted'),
-- r44 AB+ · 1 donor (donated)
('r44','kiran.joshi@seed.bloodconnect',     'donated'),
-- r45 O+ · 2 donors
('r45','manoj.tiwari@seed.bloodconnect',    'donated'),
('r45','rahul.sharma@seed.bloodconnect',    'accepted'),
-- r46 B+ · 1 donor (donated)
('r46','dinesh.rao@seed.bloodconnect',      'donated'),
-- r47 A+ · 1 donor
('r47','ganesh.desai@seed.bloodconnect',    'accepted'),
-- r48 O+ · 1 donor (donated)
('r48','pooja.kumar@seed.bloodconnect',     'donated'),
-- r49 AB+ · 1 donor (donated)
('r49','padma.saxena@seed.bloodconnect',    'donated'),
-- r50 B- · 1 donor
('r50','ravi.sharma@seed.bloodconnect',     'accepted');

-- ── BULK INSERT ACCEPTANCES ─────────────────────────────────────────────
insert into public.acceptances (request_id, donor_id, status)
select
  ri.req_id,
  (select u.id from auth.users u where u.email = a.donor_email),
  a.status
from _acc_stage a
join _req_ids ri on ri.slug = a.slug;

-- ── VERIFY ─────────────────────────────────────────────────────────────
select
  r.urgency,
  r.blood_group,
  r.units,
  r.component,
  left(r.notes, 55) as notes,
  count(a.id)                                          as total_donors,
  count(a.id) filter (where a.status = 'accepted')    as accepted,
  count(a.id) filter (where a.status = 'donated')     as donated
from public.blood_requests r
join _req_ids ri on ri.req_id = r.id
left join public.acceptances a on a.request_id = r.id
group by r.id, r.urgency, r.urgency_rank, r.blood_group, r.units, r.component, r.notes
order by r.urgency_rank, r.created_at;
