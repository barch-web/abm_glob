import type { CMSState } from './cms-types';

export const DEFAULT_GALLERY_CATEGORIES: string[] = [
  'Basic & General Knowledge IT Training',
  'Computer Networking & Troubleshooting',
  'Hardware & Software Support & Installation',
  'IT Infrastructure Auditing',
  'CCTV & Surveillance Systems Training & Installation',
  'Computer & Accessories Sourcing & Procurement',
];

export const DEFAULT_CMS_STATE: CMSState = {
  // Precomputed SHA-256 of "ABMGlobal@2026" — refreshed dynamically via Web Crypto on first load if needed
  adminPasswordHash:
    'a4f9d739264770c49794f97f4c9a05ef4d253437f2685f4a5fb5e5e68e28f3d2',
  updatedAt: '2026-11-22T09:00:00.000Z',
  content: {
    companyName: 'ABM Global Ltd',
    tagline:
      'A Trusted and Reliable IT Support and Solutions provider for individuals, groups, and organizations.',
    heroEyebrow: 'Accra, Ghana · Enterprise Support & Practical IT Training',
    heroHeadline:
      'Dependable IT Infrastructure & Practical Training Built for Ghana',
    heroSubheadline:
      'From hands-on technical cohorts and structured office networking to infrastructure audits, CCTV security, and genuine hardware procurement—we deliver engineering discipline with dedicated after-sales care.',
    heroImageUrl: '/images/hero-it-training.jpg',
    aboutOverview:
      'Headquartered in Accra, Ghana, ABM Global Ltd bridges the gap between theoretical technology education and reliable, everyday operational execution. We partner with individuals, students, IT educators, community groups, SMEs, and enterprise institutions to build resilient systems and skilled people.',
    missionStatement:
      'To deliver practical, honest, and safety-first IT training, infrastructure engineering, and hardware procurement—backed by responsive after-sales support that keeps every client operating with confidence.',
    visionStatement:
      'To be West Africa’s most trusted benchmark for people-first IT consultancy, hands-on technical capacity building, and dependable enterprise systems support.',
    philosophyHeading: 'Holistic Relationships & Practical Excellence Over Pure Profit',
    philosophyBody:
      'Too many organizations are left stranded after an installation or sold hardware without accountability. At ABM Global Ltd, every engagement begins with listening, clear documentation, workplace safety, and long-term mentorship—ensuring our clients understand, own, and benefit from their technology.',
    consultingHeading: 'Book an In-Person or Virtual Technical Consultation',
    consultingDescription:
      'Meet our systems engineers and training leads at our Accra office to plan office cabling, scope a CCTV deployment, review an IT audit checklist, or design a custom corporate training curriculum.',
    consultingExpectations: [
      '45-minute dedicated session with a senior IT infrastructure or training specialist',
      'Clear assessment of your current systems, risks, and practical budget options',
      'Written scope summary and transparent cost breakdown within 24 hours',
      'Zero-obligation technical guidance tailored to Ghanaian power & connectivity realities',
    ],
    phoneDisplay: '0594607188',
    phoneTel: '+233594607188',
    whatsappNumber: '233594607188',
    email: 'info@abmgloballtd.com',
    address: 'Ring Road Central / Circle-Nsawam Corridor, Accra, Ghana',
    officeHours: 'Monday – Friday: 8:00 AM – 5:30 PM · Saturday: 9:00 AM – 2:00 PM',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      x: 'https://x.com',
    },
  },
  services: [
    {
      id: 'srv-1',
      code: '01',
      slug: 'basic-general-it-training',
      title: 'Basic & General Knowledge IT Training',
      shortTitle: 'IT Training',
      summary:
        'Hands-on digital literacy, office productivity, cybersecurity hygiene, and practical workplace computing for beginners, teams, and educators.',
      description:
        'Structured, practical lab sessions designed to take learners from foundational computing to confident workplace mastery. Available for individuals, school cohorts, IT educators upgrading their curriculum, and corporate staff.',
      imageUrl: '/images/hero-it-training.jpg',
      audiences: ['Individuals', 'Students', 'IT Educators', 'Groups', 'Organizations'],
      deliverables: [
        'Microsoft Office & Google Workspace real-world workflow mastery',
        'Safe internet practices, cloud collaboration, and data backup habits',
        'Practical educator bootcamps & lab curriculum facilitation',
        'Post-training mentorship and verifiable completion certificates',
      ],
      outcomeMetric: '100% lab-based practical assessment per cohort',
      whatsappTopic: 'Computer Training',
    },
    {
      id: 'srv-2',
      code: '02',
      slug: 'computer-networking-troubleshooting',
      title: 'Computer Networking & Troubleshooting',
      shortTitle: 'Networking',
      summary:
        'Structured Cat6/fiber cabling, enterprise Wi-Fi deployment, VLAN segmentation, router/firewall configuration, and rapid fault isolation.',
      description:
        'We engineer clean, well-labeled local area networks and multi-floor wireless environments built for high uptime. Whether troubleshooting persistent packet drops or wiring a brand-new office, our engineers document every port.',
      imageUrl: '/images/service-networking.jpg',
      audiences: ['Students', 'IT Educators', 'Groups', 'Organizations'],
      deliverables: [
        'Cat6/Cat6a structured cabling, patch panel termination & rack dressing',
        'Enterprise Wi-Fi heatmapping, MikroTik/Cisco/Ubiquiti configuration',
        'On-site & remote network diagnostics, IP conflict & bottleneck resolution',
        'Hands-on networking lab workshops for trainees and technical teams',
      ],
      outcomeMetric: '99.8% documented LAN uptime across managed sites',
      whatsappTopic: 'Networking & Troubleshooting',
    },
    {
      id: 'srv-3',
      code: '03',
      slug: 'hardware-software-support',
      title: 'Hardware & Software Support & Installation',
      shortTitle: 'Hardware & Software',
      summary:
        'Workstation diagnostics, NVMe/RAM upgrades, OS imaging, licensed software deployment, printer sharing, and scheduled preventative maintenance.',
      description:
        'Extend the productive lifespan of your desktops, laptops, and servers while eliminating software instability. We offer both walk-in diagnostics in Accra and recurring Service Level Agreements (SLAs) for offices and schools.',
      imageUrl: '/images/service-hardware.jpg',
      audiences: ['Individuals', 'Students', 'Groups', 'Organizations'],
      deliverables: [
        'Component-level hardware diagnostics, thermal servicing & SSD/RAM upgrades',
        'Clean Windows/Linux/macOS installation, driver hardening & data migration',
        'Licensed productivity suites, endpoint antivirus & automated backup setup',
        'Quarterly preventative maintenance visits with detailed health logs',
      ],
      outcomeMetric: 'Same-day diagnostic turnaround in Accra',
      whatsappTopic: 'General Enquiries',
    },
    {
      id: 'srv-4',
      code: '04',
      slug: 'it-infrastructure-auditing',
      title: 'IT Infrastructure Auditing',
      shortTitle: 'IT Auditing',
      summary:
        'Comprehensive evaluation of network security, server room power/cooling, cabling standards, licensing compliance, and disaster recovery readiness.',
      description:
        'Before scaling operations or signing off on vendor deployments, gain an objective engineering audit. We inspect physical racks, firewall rules, UPS autonomy, and access controls—delivering an actionable remediation roadmap.',
      imageUrl: '/images/service-auditing.jpg',
      audiences: ['Groups', 'Organizations', 'IT Educators'],
      deliverables: [
        'Physical server room, rack grounding, thermal & UPS runtime inspection',
        'Network topology mapping, vulnerability & access-control review',
        'Backup integrity testing and business continuity gap report',
        'Prioritized executive scorecard and cost-effective remediation plan',
      ],
      outcomeMetric: '42-point physical & logical audit checklist',
      whatsappTopic: 'IT Auditing',
    },
    {
      id: 'srv-5',
      code: '05',
      slug: 'cctv-surveillance-systems',
      title: 'CCTV & Surveillance Systems Training & Installation',
      shortTitle: 'CCTV & Surveillance',
      summary:
        'Commercial IP & HD surveillance architecture, NVR storage sizing, mobile remote viewing setup, and practical technician installation training.',
      description:
        'Protect homes, schools, warehouses, and offices with weatherproof high-definition surveillance engineered with zero blind spots. We also train aspiring technicians and facility managers to install, configure, and maintain CCTV systems safely.',
      imageUrl: '/images/service-cctv.jpg',
      audiences: ['Individuals', 'Students', 'Groups', 'Organizations'],
      deliverables: [
        'Site blind-spot survey, camera placement & conduit protection',
        'PoE IP camera & NVR configuration with encrypted mobile viewing',
        'Solar/inverter backup integration for continuous recording during outages',
        'Practical CCTV installation & troubleshooting training workshops',
      ],
      outcomeMetric: '30+ days continuous NVR retention sizing',
      whatsappTopic: 'CCTV & Surveillance',
    },
    {
      id: 'srv-6',
      code: '06',
      slug: 'computer-accessories-procurement',
      title: 'Computer & Accessories Sourcing & Procurement',
      shortTitle: 'IT Procurement',
      summary:
        'Genuine business laptops, desktops, managed switches, UPS units, and authentic accessories sourced with verified warranties and pre-delivery setup.',
      description:
        'Eliminate counterfeit risk and compatibility guesswork. We source enterprise-grade laptops, workstations, printers, cabling, and power protection directly from vetted distributors—pre-tested and ready to deploy on arrival.',
      imageUrl: '/images/service-procurement.jpg',
      audiences: ['Individuals', 'Students', 'IT Educators', 'Groups', 'Organizations'],
      deliverables: [
        'Vendor-verified laptops, desktops, servers & POS hardware',
        'Managed switches, Cat6 drums, patch panels, racks & APC/online UPS units',
        'Pre-delivery imaging, asset tagging & warranty registration',
        'Dedicated after-sales warranty handling right here in Accra',
      ],
      outcomeMetric: '100% manufacturer-verified serials & local warranty support',
      whatsappTopic: 'Hardware Procurement',
    },
  ],
  galleryCategories: DEFAULT_GALLERY_CATEGORIES,
  gallery: [
    {
      id: 'gal-1',
      title: '48-Port Structured Office Rack & Fiber Uplink — Airport Residential',
      category: 'Computer Networking & Troubleshooting',
      location: 'Airport Residential, Accra',
      description:
        'Full Cat6a horizontal cabling, dual managed PoE+ switches, patch panel labeling, and 10G fiber backbone termination for a 3-floor financial advisory firm.',
      imageUrl: '/images/service-networking.jpg',
      completedDate: 'October 2026',
    },
    {
      id: 'gal-2',
      title: 'Corporate Digital Literacy & Excel Analytics Cohort',
      category: 'Basic & General Knowledge IT Training',
      location: 'Osu, Accra',
      description:
        'Five-day intensive hands-on workshop equipping 24 administrative and operations staff with modern spreadsheet modeling, cloud security, and collaborative workflows.',
      imageUrl: '/images/hero-it-training.jpg',
      completedDate: 'September 2026',
    },
    {
      id: 'gal-3',
      title: '16-Channel IP Perimeter Surveillance Deployment',
      category: 'CCTV & Surveillance Systems Training & Installation',
      location: 'East Legon, Accra',
      description:
        'Weatherproof 4MP PoE dome and bullet cameras installed in galvanized conduit with 4TB NVR retention and inverter backup for 24/7 perimeter visibility.',
      imageUrl: '/images/service-cctv.jpg',
      completedDate: 'August 2026',
    },
    {
      id: 'gal-4',
      title: 'Multi-Branch IT Infrastructure & Power Compliance Audit',
      category: 'IT Infrastructure Auditing',
      location: 'Tema & Ridge, Accra',
      description:
        'Physical rack thermal audit, firewall rule review, UPS runtime load testing, and automated offsite backup verification across four regional offices.',
      imageUrl: '/images/service-auditing.jpg',
      completedDate: 'July 2026',
    },
    {
      id: 'gal-5',
      title: '30-Unit Business Laptop Staging & Imaging Delivery',
      category: 'Computer & Accessories Sourcing & Procurement',
      location: 'Cantonments, Accra',
      description:
        'Sourced, benchmarked, imaged with standard corporate profiles, and delivered 30 enterprise laptops alongside APC Smart-UPS units for a non-profit headquarters.',
      imageUrl: '/images/service-procurement.jpg',
      completedDate: 'June 2026',
    },
    {
      id: 'gal-6',
      title: 'University Lab Workstation Overhaul & NVMe Upgrade',
      category: 'Hardware & Software Support & Installation',
      location: 'Legon, Accra',
      description:
        'Component-level diagnostics, NVMe SSD and RAM upgrades, and standardized Linux/Windows dual-boot imaging across 40 instructional lab machines.',
      imageUrl: '/images/service-hardware.jpg',
      completedDate: 'May 2026',
    },
  ],
  announcements: [
    {
      id: 'ann-1',
      title: 'December Practical Networking & CCTV Installation Bootcamp',
      type: 'Training Batch',
      date: 'December 7 – December 18, 2026',
      location: 'ABM Global Lab, Accra',
      summary:
        'A 2-week intensive lab cohort covering Cat6 termination, MikroTik routing basics, and live IP CCTV camera commissioning for students and aspiring technicians.',
      details:
        'Limited to 16 seats to ensure every participant works directly with crimping tools, patch panels, managed switches, and PoE NVRs. Includes toolkits during lab hours and certificate of practical competence.',
      ctaLabel: 'Reserve a Seat',
      ctaHref: '/enquire?service=CCTV+%26+Surveillance+Systems+Training+%26+Installation',
    },
    {
      id: 'ann-2',
      title: 'IT Educators Modernization Seminar: Teaching Practical Labs in 2027',
      type: 'Seminar',
      date: 'January 16, 2027',
      location: 'Accra Digital Centre / ABM Hub',
      summary:
        'Half-day technical roundtable for ICT teachers, school lab coordinators, and curriculum leads on maintaining reliable school computer labs on lean budgets.',
      details:
        'Topics include Linux lab imaging, network content filtering, preventative hardware care, and practical troubleshooting exercises students can master safely.',
      ctaLabel: 'Book Consultation',
      ctaHref: '/book-consultation',
    },
    {
      id: 'ann-3',
      title: 'Q1 Corporate IT Infrastructure Audit Slots Now Open',
      type: 'Company News',
      date: 'November 20, 2026',
      location: 'Greater Accra & Tema',
      summary:
        'Organizations planning 2027 hardware refreshes or office relocations can now schedule our 42-point physical, network, and power-readiness audit.',
      details:
        'Receive a clear topology map, cable & rack remediation checklist, UPS autonomy report, and unbiased procurement specifications before purchasing new equipment.',
      ctaLabel: 'Request Audit Quote',
      ctaHref: '/enquire?service=IT+Infrastructure+Auditing',
    },
    {
      id: 'ann-4',
      title: 'Foundational Workplace Computing & Office Productivity Batch 14',
      type: 'Training Batch',
      date: 'January 11 – January 29, 2027',
      location: 'Accra Training Suite (Morning & Weekend Tracks)',
      summary:
        'Practical computer literacy, document automation, Excel data analysis, and cybersecurity safety for job seekers, SMEs, and administrative staff.',
      details:
        'Small-group instruction with personalized pacing, real office case studies, and 30 days of post-training WhatsApp support from our instructors.',
      ctaLabel: 'Enquire for Batch 14',
      ctaHref: '/enquire?service=Basic+%26+General+Knowledge+IT+Training',
    },
  ],
  enquiries: [
    {
      id: 'enq-seed-1',
      referenceId: 'ABM-ENQ-261101',
      name: 'Crestview Logistics Ghana Ltd',
      serviceName: 'Computer Networking & Troubleshooting',
      expectedStartDate: '2026-12-01',
      expectedEndDate: '2026-12-05',
      specificDetails:
        'Structured Cat6 cabling for 18 workstations plus dual-band ceiling access points across our Tema warehouse office.',
      phone: '0244812093',
      email: 'ops@crestviewlogistics.gh',
      location: 'Community 11, Tema',
      additionalMessage: 'We would like a site inspection before finalizing the switch count.',
      status: 'Pending',
      createdAt: '2026-11-21T14:20:00.000Z',
    },
    {
      id: 'enq-seed-2',
      referenceId: 'ABM-ENQ-261102',
      name: 'St. Jude Preparatory School',
      serviceName: 'Basic & General Knowledge IT Training',
      expectedStartDate: '2026-12-10',
      expectedEndDate: '2026-12-14',
      specificDetails:
        'Hands-on refresher training for 6 ICT educators on lab maintenance and digital safety.',
      phone: '0501928374',
      email: 'principal@stjudeprep.edu.gh',
      location: 'Dansoman, Accra',
      additionalMessage: 'Prefer afternoon sessions from 1:30 PM.',
      status: 'Contacted',
      createdAt: '2026-11-19T09:45:00.000Z',
    },
  ],
  bookings: [
    {
      id: 'bk-seed-1',
      referenceId: 'ABM-CON-261101',
      fullName: 'Kwame Mensah · Meridian Microfinance',
      phone: '0209445512',
      preferredDate: '2026-11-26',
      preferredTime: '10:30',
      visitorCount: 2,
      purpose: 'IT Infrastructure Audit & CCTV expansion planning for 2 Accra branches.',
      status: 'Pending',
      createdAt: '2026-11-21T16:10:00.000Z',
    },
    {
      id: 'bk-seed-2',
      referenceId: 'ABM-CON-261102',
      fullName: 'Abena Osei-Bonsu',
      phone: '0557123490',
      preferredDate: '2026-11-24',
      preferredTime: '14:00',
      visitorCount: 1,
      purpose: 'Procurement advisory for 10 developer laptops and backup power.',
      status: 'Resolved',
      createdAt: '2026-11-18T11:05:00.000Z',
    },
  ],
};
