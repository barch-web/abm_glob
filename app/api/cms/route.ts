import { NextRequest, NextResponse } from 'next/server';
import type {
  AnnouncementItem,
  BusinessEnquiry,
  CMSState,
  ConsultationBooking,
  GalleryItem,
  ServiceItem,
  SiteContent,
} from '@/lib/cms-types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function hasPublicSupabase(): boolean {
  return Boolean(
    SUPABASE_URL &&
      ANON_KEY &&
      !SUPABASE_URL.includes('YOUR_PROJECT_REF') &&
      !ANON_KEY.includes('YOUR_SUPABASE_')
  );
}

function hasAdminSupabase(): boolean {
  return Boolean(
    SUPABASE_URL &&
      SERVICE_KEY &&
      !SUPABASE_URL.includes('YOUR_PROJECT_REF') &&
      !SERVICE_KEY.includes('YOUR_SUPABASE_SERVICE_ROLE_KEY')
  );
}

async function sbFetch<T>(
  path: string,
  apiKey: string,
  init?: RequestInit
): Promise<T> {
  const url = `${SUPABASE_URL!.replace(/\/$/, '')}/rest/v1/${path}`;
  const authHeaders: Record<string, string> = {
    apikey: apiKey,
    'Content-Type': 'application/json',
  };
  if (apiKey.startsWith('eyJ')) {
    authHeaders.Authorization = `Bearer ${apiKey}`;
  }

  const res = await fetch(url, {
    ...init,
    headers: {
      ...authHeaders,
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Supabase request failed (${res.status}): ${errText}`);
  }

  if (res.status === 204) {
    return null as T;
  }

  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}

export async function GET() {
  if (!hasPublicSupabase() && !hasAdminSupabase()) {
    return NextResponse.json({ configured: false, adminConfigured: false, state: null });
  }

  const publicKey = (SERVICE_KEY && hasAdminSupabase() ? SERVICE_KEY : ANON_KEY)!;

  try {
    const [
      contentRows,
      serviceRows,
      categoryRows,
      galleryRows,
      announcementRows,
    ] = await Promise.all([
      sbFetch<Record<string, unknown>[]>('site_content?id=eq.main&limit=1', publicKey),
      sbFetch<Record<string, unknown>[]>('services?order=sort_order.asc', publicKey),
      sbFetch<Record<string, unknown>[]>('gallery_categories?order=sort_order.asc', publicKey),
      sbFetch<Record<string, unknown>[]>('gallery_items?order=created_at.desc', publicKey),
      sbFetch<Record<string, unknown>[]>('announcements?order=created_at.desc', publicKey),
    ]);

    if (!contentRows?.length) {
      return NextResponse.json({
        configured: true,
        adminConfigured: hasAdminSupabase(),
        state: null,
      });
    }

    let enquiryRows: Record<string, unknown>[] = [];
    let bookingRows: Record<string, unknown>[] = [];
    let adminRows: Record<string, unknown>[] = [];

    if (hasAdminSupabase()) {
      [enquiryRows, bookingRows, adminRows] = await Promise.all([
        sbFetch<Record<string, unknown>[]>(
          'business_enquiries?order=created_at.desc',
          SERVICE_KEY!
        ),
        sbFetch<Record<string, unknown>[]>(
          'consultation_bookings?order=created_at.desc',
          SERVICE_KEY!
        ),
        sbFetch<Record<string, unknown>[]>(
          'admin_settings?id=eq.main&limit=1',
          SERVICE_KEY!
        ),
      ]);
    }

    const c = contentRows[0];
    const content: SiteContent = {
      companyName: String(c.company_name),
      tagline: String(c.tagline),
      heroEyebrow: String(c.hero_eyebrow),
      heroHeadline: String(c.hero_headline),
      heroSubheadline: String(c.hero_subheadline),
      heroImageUrl: String(c.hero_image_url),
      aboutOverview: String(c.about_overview),
      missionStatement: String(c.mission_statement),
      visionStatement: String(c.vision_statement),
      philosophyHeading: String(c.philosophy_heading),
      philosophyBody: String(c.philosophy_body),
      consultingHeading: String(c.consulting_heading),
      consultingDescription: String(c.consulting_description),
      consultingExpectations: (c.consulting_expectations as string[]) || [],
      phoneDisplay: String(c.phone_display),
      phoneTel: String(c.phone_tel),
      whatsappNumber: String(c.whatsapp_number),
      email: String(c.email),
      address: String(c.address),
      officeHours: String(c.office_hours),
      socialLinks: (c.social_links as SiteContent['socialLinks']) || {
        linkedin: '',
        facebook: '',
        instagram: '',
        x: '',
      },
    };

    const services: ServiceItem[] = (serviceRows || []).map((s) => ({
      id: String(s.id),
      code: String(s.code),
      slug: String(s.slug),
      title: String(s.title),
      shortTitle: String(s.short_title),
      summary: String(s.summary),
      description: String(s.description),
      imageUrl: String(s.image_url),
      audiences: (s.audiences as ServiceItem['audiences']) || [],
      deliverables: (s.deliverables as string[]) || [],
      outcomeMetric: String(s.outcome_metric),
      whatsappTopic: String(s.whatsapp_topic),
    }));

    const galleryCategories: string[] = (categoryRows || []).map((r) =>
      String(r.name)
    );

    const gallery: GalleryItem[] = (galleryRows || []).map((g) => ({
      id: String(g.id),
      title: String(g.title),
      category: String(g.category),
      location: String(g.location),
      description: String(g.description),
      imageUrl: String(g.image_url),
      completedDate: String(g.completed_date),
    }));

    const announcements: AnnouncementItem[] = (announcementRows || []).map(
      (a) => ({
        id: String(a.id),
        title: String(a.title),
        type: a.type as AnnouncementItem['type'],
        date: String(a.date),
        location: String(a.location),
        summary: String(a.summary),
        details: String(a.details),
        ctaLabel: a.cta_label ? String(a.cta_label) : undefined,
        ctaHref: a.cta_href ? String(a.cta_href) : undefined,
      })
    );

    const enquiries: BusinessEnquiry[] = (enquiryRows || []).map((e) => ({
      id: String(e.id),
      referenceId: String(e.reference_id),
      name: String(e.name),
      serviceName: String(e.service_name),
      expectedStartDate: String(e.expected_start_date),
      expectedEndDate: String(e.expected_end_date),
      specificDetails: String(e.specific_details),
      phone: String(e.phone),
      email: String(e.email),
      location: String(e.location),
      additionalMessage: String(e.additional_message || ''),
      status: e.status as BusinessEnquiry['status'],
      createdAt: String(e.created_at),
    }));

    const bookings: ConsultationBooking[] = (bookingRows || []).map((b) => ({
      id: String(b.id),
      referenceId: String(b.reference_id),
      fullName: String(b.full_name),
      phone: String(b.phone),
      preferredDate: String(b.preferred_date),
      preferredTime: String(b.preferred_time),
      visitorCount: Number(b.visitor_count),
      purpose: String(b.purpose),
      status: b.status as ConsultationBooking['status'],
      createdAt: String(b.created_at),
    }));

    const state: Partial<CMSState> = {
      content,
      services,
      galleryCategories,
      gallery,
      announcements,
      ...(hasAdminSupabase()
        ? {
            enquiries,
            bookings,
            adminPasswordHash: adminRows?.[0]?.admin_password_hash
              ? String(adminRows[0].admin_password_hash)
              : undefined,
          }
        : {}),
      updatedAt: String(c.updated_at || new Date().toISOString()),
    };

    return NextResponse.json({
      configured: true,
      adminConfigured: hasAdminSupabase(),
      state,
    });
  } catch (error) {
    console.error('Supabase GET error:', error);
    return NextResponse.json(
      { configured: true, adminConfigured: hasAdminSupabase(), state: null },
      { status: 200 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!hasPublicSupabase() && !hasAdminSupabase()) {
    return NextResponse.json({ configured: false, synced: false });
  }

  try {
    const body = (await req.json()) as {
      action?: string;
      state?: CMSState;
      enquiry?: BusinessEnquiry;
      booking?: ConsultationBooking;
    };

    // Public lead submission (works with Anon Key + RLS insert policy)
    if (body.action === 'insert_enquiry' && body.enquiry && (ANON_KEY || SERVICE_KEY)) {
      const e = body.enquiry;
      const key = (hasAdminSupabase() ? SERVICE_KEY : ANON_KEY)!;
      await sbFetch('business_enquiries', key, {
        method: 'POST',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({
          id: e.id,
          reference_id: e.referenceId,
          name: e.name,
          service_name: e.serviceName,
          expected_start_date: e.expectedStartDate,
          expected_end_date: e.expectedEndDate,
          specific_details: e.specificDetails,
          phone: e.phone,
          email: e.email,
          location: e.location,
          additional_message: e.additionalMessage,
          status: 'Pending',
          created_at: e.createdAt,
        }),
      });
      return NextResponse.json({ configured: true, synced: true });
    }

    // Public consultation booking (works with Anon Key + RLS insert policy)
    if (body.action === 'insert_booking' && body.booking && (ANON_KEY || SERVICE_KEY)) {
      const b = body.booking;
      const key = (hasAdminSupabase() ? SERVICE_KEY : ANON_KEY)!;
      await sbFetch('consultation_bookings', key, {
        method: 'POST',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({
          id: b.id,
          reference_id: b.referenceId,
          full_name: b.fullName,
          phone: b.phone,
          preferred_date: b.preferredDate,
          preferred_time: b.preferredTime,
          visitor_count: b.visitorCount,
          purpose: b.purpose,
          status: 'Pending',
          created_at: b.createdAt,
        }),
      });
      return NextResponse.json({ configured: true, synced: true });
    }

    // Admin full-state sync requires Service Role Key
    if (!hasAdminSupabase() || !body.state) {
      return NextResponse.json({ configured: true, synced: false });
    }

    const s = body.state;

    await sbFetch('site_content?id=eq.main', SERVICE_KEY!, {
      method: 'PATCH',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({
        company_name: s.content.companyName,
        tagline: s.content.tagline,
        hero_eyebrow: s.content.heroEyebrow,
        hero_headline: s.content.heroHeadline,
        hero_subheadline: s.content.heroSubheadline,
        hero_image_url: s.content.heroImageUrl,
        about_overview: s.content.aboutOverview,
        mission_statement: s.content.missionStatement,
        vision_statement: s.content.visionStatement,
        philosophy_heading: s.content.philosophyHeading,
        philosophy_body: s.content.philosophyBody,
        consulting_heading: s.content.consultingHeading,
        consulting_description: s.content.consultingDescription,
        consulting_expectations: s.content.consultingExpectations,
        phone_display: s.content.phoneDisplay,
        phone_tel: s.content.phoneTel,
        whatsapp_number: s.content.whatsappNumber,
        email: s.content.email,
        address: s.content.address,
        office_hours: s.content.officeHours,
        social_links: s.content.socialLinks,
      }),
    });

    if (s.services.length > 0) {
      await sbFetch('services?on_conflict=id', SERVICE_KEY!, {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify(
          s.services.map((srv, idx) => ({
            id: srv.id,
            code: srv.code,
            slug: srv.slug,
            title: srv.title,
            short_title: srv.shortTitle,
            summary: srv.summary,
            description: srv.description,
            image_url: srv.imageUrl,
            audiences: srv.audiences,
            deliverables: srv.deliverables,
            outcome_metric: srv.outcomeMetric,
            whatsapp_topic: srv.whatsappTopic,
            sort_order: idx + 1,
          }))
        ),
      });
    }

    if (s.galleryCategories.length > 0) {
      await sbFetch('gallery_categories?on_conflict=name', SERVICE_KEY!, {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify(
          s.galleryCategories.map((name, idx) => ({
            name,
            sort_order: idx + 1,
          }))
        ),
      });
    }

    if (s.gallery.length > 0) {
      await sbFetch('gallery_items?on_conflict=id', SERVICE_KEY!, {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify(
          s.gallery.map((g) => ({
            id: g.id,
            title: g.title,
            category: g.category,
            location: g.location,
            description: g.description,
            image_url: g.imageUrl,
            completed_date: g.completedDate,
          }))
        ),
      });
    }

    if (s.announcements.length > 0) {
      await sbFetch('announcements?on_conflict=id', SERVICE_KEY!, {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify(
          s.announcements.map((a) => ({
            id: a.id,
            title: a.title,
            type: a.type,
            date: a.date,
            location: a.location,
            summary: a.summary,
            details: a.details,
            cta_label: a.ctaLabel || null,
            cta_href: a.ctaHref || null,
          }))
        ),
      });
    }

    if (s.enquiries.length > 0) {
      await sbFetch('business_enquiries?on_conflict=id', SERVICE_KEY!, {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify(
          s.enquiries.map((e) => ({
            id: e.id,
            reference_id: e.referenceId,
            name: e.name,
            service_name: e.serviceName,
            expected_start_date: e.expectedStartDate,
            expected_end_date: e.expectedEndDate,
            specific_details: e.specificDetails,
            phone: e.phone,
            email: e.email,
            location: e.location,
            additional_message: e.additionalMessage,
            status: e.status,
            created_at: e.createdAt,
          }))
        ),
      });
    }

    if (s.bookings.length > 0) {
      await sbFetch('consultation_bookings?on_conflict=id', SERVICE_KEY!, {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify(
          s.bookings.map((b) => ({
            id: b.id,
            reference_id: b.referenceId,
            full_name: b.fullName,
            phone: b.phone,
            preferred_date: b.preferredDate,
            preferred_time: b.preferredTime,
            visitor_count: b.visitorCount,
            purpose: b.purpose,
            status: b.status,
            created_at: b.createdAt,
          }))
        ),
      });
    }

    if (s.adminPasswordHash) {
      await sbFetch('admin_settings?id=eq.main', SERVICE_KEY!, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ admin_password_hash: s.adminPasswordHash }),
      });
    }

    return NextResponse.json({ configured: true, synced: true });
  } catch (error) {
    console.error('Supabase POST error:', error);
    return NextResponse.json(
      { configured: true, error: 'Failed to sync with Supabase.' },
      { status: 500 }
    );
  }
}
