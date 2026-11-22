-- ============================================================================
-- ABM Global Ltd — Supabase PostgreSQL Integration Schema & Seed Data
-- Run this entire script inside your Supabase Dashboard -> SQL Editor
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Automatic updated_at trigger function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- 2. Site Content (Singleton configuration row id = 'main')
CREATE TABLE IF NOT EXISTS public.site_content (
  id TEXT PRIMARY KEY DEFAULT 'main',
  company_name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  hero_eyebrow TEXT NOT NULL,
  hero_headline TEXT NOT NULL,
  hero_subheadline TEXT NOT NULL,
  hero_image_url TEXT NOT NULL,
  about_overview TEXT NOT NULL,
  mission_statement TEXT NOT NULL,
  vision_statement TEXT NOT NULL,
  philosophy_heading TEXT NOT NULL,
  philosophy_body TEXT NOT NULL,
  consulting_heading TEXT NOT NULL,
  consulting_description TEXT NOT NULL,
  consulting_expectations JSONB NOT NULL DEFAULT '[]'::jsonb,
  phone_display TEXT NOT NULL,
  phone_tel TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  office_hours TEXT NOT NULL,
  social_links JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_site_content_updated_at ON public.site_content;
CREATE TRIGGER trg_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3. Core Services (6 Pillars)
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  short_title TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  audiences JSONB NOT NULL DEFAULT '[]'::jsonb,
  deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
  outcome_metric TEXT NOT NULL,
  whatsapp_topic TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_services_updated_at ON public.services;
CREATE TRIGGER trg_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 4. Gallery Categories
CREATE TABLE IF NOT EXISTS public.gallery_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Gallery Works & Projects
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL REFERENCES public.gallery_categories(name)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  location TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL,
  completed_date TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gallery_items_category
  ON public.gallery_items(category);

DROP TRIGGER IF EXISTS trg_gallery_items_updated_at ON public.gallery_items;
CREATE TRIGGER trg_gallery_items_updated_at
  BEFORE UPDATE ON public.gallery_items
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 6. Announcements & Events
CREATE TABLE IF NOT EXISTS public.announcements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Training Batch', 'Seminar', 'Company News')),
  date TEXT NOT NULL,
  location TEXT NOT NULL,
  summary TEXT NOT NULL,
  details TEXT NOT NULL DEFAULT '',
  cta_label TEXT,
  cta_href TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_announcements_type
  ON public.announcements(type);

DROP TRIGGER IF EXISTS trg_announcements_updated_at ON public.announcements;
CREATE TRIGGER trg_announcements_updated_at
  BEFORE UPDATE ON public.announcements
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 7. Business Enquiries (Lead Capture Inbox)
CREATE TABLE IF NOT EXISTS public.business_enquiries (
  id TEXT PRIMARY KEY,
  reference_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  service_name TEXT NOT NULL,
  expected_start_date DATE NOT NULL,
  expected_end_date DATE NOT NULL,
  specific_details TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  location TEXT NOT NULL,
  additional_message TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Contacted', 'Resolved')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status_created
  ON public.business_enquiries(status, created_at DESC);

DROP TRIGGER IF EXISTS trg_enquiries_updated_at ON public.business_enquiries;
CREATE TRIGGER trg_enquiries_updated_at
  BEFORE UPDATE ON public.business_enquiries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 8. Consultation Bookings
CREATE TABLE IF NOT EXISTS public.consultation_bookings (
  id TEXT PRIMARY KEY,
  reference_id TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  visitor_count INTEGER NOT NULL CHECK (visitor_count >= 1 AND visitor_count <= 20),
  purpose TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Contacted', 'Resolved')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_status_created
  ON public.consultation_bookings(status, created_at DESC);

DROP TRIGGER IF EXISTS trg_bookings_updated_at ON public.consultation_bookings;
CREATE TRIGGER trg_bookings_updated_at
  BEFORE UPDATE ON public.consultation_bookings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 9. Admin Settings (Stores SHA-256 hash only; never plain-text passwords)
CREATE TABLE IF NOT EXISTS public.admin_settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  admin_password_hash TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_admin_settings_updated_at ON public.admin_settings;
CREATE TRIGGER trg_admin_settings_updated_at
  BEFORE UPDATE ON public.admin_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- Row Level Security (RLS) Policies
-- ============================================================================

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Public Read Policies (website visitors)
DROP POLICY IF EXISTS "Public read site_content" ON public.site_content;
CREATE POLICY "Public read site_content"
  ON public.site_content FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public read services" ON public.services;
CREATE POLICY "Public read services"
  ON public.services FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public read gallery_categories" ON public.gallery_categories;
CREATE POLICY "Public read gallery_categories"
  ON public.gallery_categories FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public read gallery_items" ON public.gallery_items;
CREATE POLICY "Public read gallery_items"
  ON public.gallery_items FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public read announcements" ON public.announcements;
CREATE POLICY "Public read announcements"
  ON public.announcements FOR SELECT
  TO anon, authenticated
  USING (true);

-- Public Lead Submission Policies (Enquire & Book Consultation forms)
DROP POLICY IF EXISTS "Public insert business_enquiries" ON public.business_enquiries;
CREATE POLICY "Public insert business_enquiries"
  ON public.business_enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (status = 'Pending');

DROP POLICY IF EXISTS "Public insert consultation_bookings" ON public.consultation_bookings;
CREATE POLICY "Public insert consultation_bookings"
  ON public.consultation_bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (status = 'Pending');

-- Note: Admin mutations & reading leads/bookings/admin_settings execute via
-- server-side API routes using SUPABASE_SERVICE_ROLE_KEY (which bypasses RLS safely).

-- ============================================================================
-- Optional Supabase Storage Bucket for Uploaded Gallery Photos
-- ============================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-images', 'gallery-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read gallery-images" ON storage.objects;
CREATE POLICY "Public read gallery-images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'gallery-images');

-- ============================================================================
-- Initial Seed Data for ABM Global Ltd (Accra, Ghana)
-- ============================================================================

INSERT INTO public.admin_settings (id, admin_password_hash)
VALUES (
  'main',
  encode(digest('ABMGlobal@2026', 'sha256'), 'hex')
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.site_content (
  id, company_name, tagline, hero_eyebrow, hero_headline, hero_subheadline,
  hero_image_url, about_overview, mission_statement, vision_statement,
  philosophy_heading, philosophy_body, consulting_heading, consulting_description,
  consulting_expectations, phone_display, phone_tel, whatsapp_number,
  email, address, office_hours, social_links
)
VALUES (
  'main',
  'ABM Global Ltd',
  'A Trusted and Reliable IT Support and Solutions provider for individuals, groups, and organizations.',
  'Accra, Ghana · Enterprise Support & Practical IT Training',
  'Dependable IT Infrastructure & Practical Training Built for Ghana',
  'From hands-on technical cohorts and structured office networking to infrastructure audits, CCTV security, and genuine hardware procurement—we deliver engineering discipline with dedicated after-sales care.',
  '/images/hero-it-training.jpg',
  'Headquartered in Accra, Ghana, ABM Global Ltd bridges the gap between theoretical technology education and reliable, everyday operational execution. We partner with individuals, students, IT educators, community groups, SMEs, and enterprise institutions to build resilient systems and skilled people.',
  'To deliver practical, honest, and safety-first IT training, infrastructure engineering, and hardware procurement—backed by responsive after-sales support that keeps every client operating with confidence.',
  'To be West Africa’s most trusted benchmark for people-first IT consultancy, hands-on technical capacity building, and dependable enterprise systems support.',
  'Holistic Relationships & Practical Excellence Over Pure Profit',
  'Too many organizations are left stranded after an installation or sold hardware without accountability. At ABM Global Ltd, every engagement begins with listening, clear documentation, workplace safety, and long-term mentorship—ensuring our clients understand, own, and benefit from their technology.',
  'Book an In-Person or Virtual Technical Consultation',
  'Meet our systems engineers and training leads at our Accra office to plan office cabling, scope a CCTV deployment, review an IT audit checklist, or design a custom corporate training curriculum.',
  '["45-minute dedicated session with a senior IT infrastructure or training specialist","Clear assessment of your current systems, risks, and practical budget options","Written scope summary and transparent cost breakdown within 24 hours","Zero-obligation technical guidance tailored to Ghanaian power & connectivity realities"]'::jsonb,
  '0594607188',
  '+233594607188',
  '233594607188',
  'info@abmgloballtd.com',
  'Ring Road Central / Circle-Nsawam Corridor, Accra, Ghana',
  'Monday – Friday: 8:00 AM – 5:30 PM · Saturday: 9:00 AM – 2:00 PM',
  '{"linkedin":"https://linkedin.com","facebook":"https://facebook.com","instagram":"https://instagram.com","x":"https://x.com"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.gallery_categories (name, sort_order) VALUES
  ('Basic & General Knowledge IT Training', 1),
  ('Computer Networking & Troubleshooting', 2),
  ('Hardware & Software Support & Installation', 3),
  ('IT Infrastructure Auditing', 4),
  ('CCTV & Surveillance Systems Training & Installation', 5),
  ('Computer & Accessories Sourcing & Procurement', 6)
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.services (
  id, code, slug, title, short_title, summary, description, image_url,
  audiences, deliverables, outcome_metric, whatsapp_topic, sort_order
) VALUES
  (
    'srv-1', '01', 'basic-general-it-training',
    'Basic & General Knowledge IT Training', 'IT Training',
    'Hands-on digital literacy, office productivity, cybersecurity hygiene, and practical workplace computing for beginners, teams, and educators.',
    'Structured, practical lab sessions designed to take learners from foundational computing to confident workplace mastery. Available for individuals, school cohorts, IT educators upgrading their curriculum, and corporate staff.',
    '/images/hero-it-training.jpg',
    '["Individuals","Students","IT Educators","Groups","Organizations"]'::jsonb,
    '["Microsoft Office & Google Workspace real-world workflow mastery","Safe internet practices, cloud collaboration, and data backup habits","Practical educator bootcamps & lab curriculum facilitation","Post-training mentorship and verifiable completion certificates"]'::jsonb,
    '100% lab-based practical assessment per cohort', 'Computer Training', 1
  ),
  (
    'srv-2', '02', 'computer-networking-troubleshooting',
    'Computer Networking & Troubleshooting', 'Networking',
    'Structured Cat6/fiber cabling, enterprise Wi-Fi deployment, VLAN segmentation, router/firewall configuration, and rapid fault isolation.',
    'We engineer clean, well-labeled local area networks and multi-floor wireless environments built for high uptime. Whether troubleshooting persistent packet drops or wiring a brand-new office, our engineers document every port.',
    '/images/service-networking.jpg',
    '["Students","IT Educators","Groups","Organizations"]'::jsonb,
    '["Cat6/Cat6a structured cabling, patch panel termination & rack dressing","Enterprise Wi-Fi heatmapping, MikroTik/Cisco/Ubiquiti configuration","On-site & remote network diagnostics, IP conflict & bottleneck resolution","Hands-on networking lab workshops for trainees and technical teams"]'::jsonb,
    '99.8% documented LAN uptime across managed sites', 'Networking & Troubleshooting', 2
  ),
  (
    'srv-3', '03', 'hardware-software-support',
    'Hardware & Software Support & Installation', 'Hardware & Software',
    'Workstation diagnostics, NVMe/RAM upgrades, OS imaging, licensed software deployment, printer sharing, and scheduled preventative maintenance.',
    'Extend the productive lifespan of your desktops, laptops, and servers while eliminating software instability. We offer both walk-in diagnostics in Accra and recurring Service Level Agreements (SLAs) for offices and schools.',
    '/images/service-hardware.jpg',
    '["Individuals","Students","Groups","Organizations"]'::jsonb,
    '["Component-level hardware diagnostics, thermal servicing & SSD/RAM upgrades","Clean Windows/Linux/macOS installation, driver hardening & data migration","Licensed productivity suites, endpoint antivirus & automated backup setup","Quarterly preventative maintenance visits with detailed health logs"]'::jsonb,
    'Same-day diagnostic turnaround in Accra', 'General Enquiries', 3
  ),
  (
    'srv-4', '04', 'it-infrastructure-auditing',
    'IT Infrastructure Auditing', 'IT Auditing',
    'Comprehensive evaluation of network security, server room power/cooling, cabling standards, licensing compliance, and disaster recovery readiness.',
    'Before scaling operations or signing off on vendor deployments, gain an objective engineering audit. We inspect physical racks, firewall rules, UPS autonomy, and access controls—delivering an actionable remediation roadmap.',
    '/images/service-auditing.jpg',
    '["Groups","Organizations","IT Educators"]'::jsonb,
    '["Physical server room, rack grounding, thermal & UPS runtime inspection","Network topology mapping, vulnerability & access-control review","Backup integrity testing and business continuity gap report","Prioritized executive scorecard and cost-effective remediation plan"]'::jsonb,
    '42-point physical & logical audit checklist', 'IT Auditing', 4
  ),
  (
    'srv-5', '05', 'cctv-surveillance-systems',
    'CCTV & Surveillance Systems Training & Installation', 'CCTV & Surveillance',
    'Commercial IP & HD surveillance architecture, NVR storage sizing, mobile remote viewing setup, and practical technician installation training.',
    'Protect homes, schools, warehouses, and offices with weatherproof high-definition surveillance engineered with zero blind spots. We also train aspiring technicians and facility managers to install, configure, and maintain CCTV systems safely.',
    '/images/service-cctv.jpg',
    '["Individuals","Students","Groups","Organizations"]'::jsonb,
    '["Site blind-spot survey, camera placement & conduit protection","PoE IP camera & NVR configuration with encrypted mobile viewing","Solar/inverter backup integration for continuous recording during outages","Practical CCTV installation & troubleshooting training workshops"]'::jsonb,
    '30+ days continuous NVR retention sizing', 'CCTV & Surveillance', 5
  ),
  (
    'srv-6', '06', 'computer-accessories-procurement',
    'Computer & Accessories Sourcing & Procurement', 'IT Procurement',
    'Genuine business laptops, desktops, managed switches, UPS units, and authentic accessories sourced with verified warranties and pre-delivery setup.',
    'Eliminate counterfeit risk and compatibility guesswork. We source enterprise-grade laptops, workstations, printers, cabling, and power protection directly from vetted distributors—pre-tested and ready to deploy on arrival.',
    '/images/service-procurement.jpg',
    '["Individuals","Students","IT Educators","Groups","Organizations"]'::jsonb,
    '["Vendor-verified laptops, desktops, servers & POS hardware","Managed switches, Cat6 drums, patch panels, racks & APC/online UPS units","Pre-delivery imaging, asset tagging & warranty registration","Dedicated after-sales warranty handling right here in Accra"]'::jsonb,
    '100% manufacturer-verified serials & local warranty support', 'Hardware Procurement', 6
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.gallery_items (
  id, title, category, location, description, image_url, completed_date
) VALUES
  (
    'gal-1',
    '48-Port Structured Office Rack & Fiber Uplink — Airport Residential',
    'Computer Networking & Troubleshooting',
    'Airport Residential, Accra',
    'Full Cat6a horizontal cabling, dual managed PoE+ switches, patch panel labeling, and 10G fiber backbone termination for a 3-floor financial advisory firm.',
    '/images/service-networking.jpg',
    'October 2026'
  ),
  (
    'gal-2',
    'Corporate Digital Literacy & Excel Analytics Cohort',
    'Basic & General Knowledge IT Training',
    'Osu, Accra',
    'Five-day intensive hands-on workshop equipping 24 administrative and operations staff with modern spreadsheet modeling, cloud security, and collaborative workflows.',
    '/images/hero-it-training.jpg',
    'September 2026'
  ),
  (
    'gal-3',
    '16-Channel IP Perimeter Surveillance Deployment',
    'CCTV & Surveillance Systems Training & Installation',
    'East Legon, Accra',
    'Weatherproof 4MP PoE dome and bullet cameras installed in galvanized conduit with 4TB NVR retention and inverter backup for 24/7 perimeter visibility.',
    '/images/service-cctv.jpg',
    'August 2026'
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.announcements (
  id, title, type, date, location, summary, details, cta_label, cta_href
) VALUES
  (
    'ann-1',
    'December Practical Networking & CCTV Installation Bootcamp',
    'Training Batch',
    'December 7 – December 18, 2026',
    'ABM Global Lab, Accra',
    'A 2-week intensive lab cohort covering Cat6 termination, MikroTik routing basics, and live IP CCTV camera commissioning for students and aspiring technicians.',
    'Limited to 16 seats to ensure every participant works directly with crimping tools, patch panels, managed switches, and PoE NVRs.',
    'Reserve a Seat',
    '/enquire?service=CCTV+%26+Surveillance+Systems+Training+%26+Installation'
  ),
  (
    'ann-2',
    'IT Educators Modernization Seminar: Teaching Practical Labs in 2027',
    'Seminar',
    'January 16, 2027',
    'Accra Digital Centre / ABM Hub',
    'Half-day technical roundtable for ICT teachers, school lab coordinators, and curriculum leads on maintaining reliable school computer labs on lean budgets.',
    'Topics include Linux lab imaging, network content filtering, preventative hardware care, and practical troubleshooting exercises.',
    'Book Consultation',
    '/book-consultation'
  )
ON CONFLICT (id) DO NOTHING;
