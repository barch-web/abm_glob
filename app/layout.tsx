import type { Metadata } from 'next';
import { JetBrains_Mono, Poppins } from 'next/font/google';
import './globals.css';
import { CMSProvider } from '@/components/cms/CMSContext';
import { SiteShell } from '@/components/layout/SiteShell';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ABM Global Ltd | IT Training, Networking & Infrastructure Support in Accra',
    template: '%s | ABM Global Ltd',
  },
  description:
    'Trusted IT training, computer networking, hardware & software support, IT infrastructure auditing, CCTV surveillance, and hardware procurement in Accra, Ghana.',
  keywords: [
    'ABM Global Ltd',
    'IT Support Accra',
    'IT Training Ghana',
    'Computer Networking Accra',
    'IT Infrastructure Auditing Ghana',
    'CCTV Installation Accra',
    'Hardware Procurement Ghana',
  ],
  openGraph: {
    title: 'ABM Global Ltd | Trusted IT Support & Training in Accra, Ghana',
    description:
      'Practical IT training, structured networking, infrastructure auditing, CCTV surveillance, and verified hardware procurement with dependable after-sales care.',
    type: 'website',
    locale: 'en_GH',
    siteName: 'ABM Global Ltd',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ABM Global Ltd | IT Support & Solutions in Accra, Ghana',
    description:
      'Practical IT training, structured networking, auditing, CCTV installation, and genuine hardware procurement.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'ABM Global Ltd',
  description:
    'A Trusted and Reliable IT Support and Solutions provider for individuals, groups, and organizations in Accra, Ghana.',
  telephone: '+233594607188',
  email: 'info@abmgloballtd.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ring Road Central / Circle-Nsawam Corridor',
    addressLocality: 'Accra',
    addressCountry: 'GH',
  },
  areaServed: 'Greater Accra, Ghana',
  openingHours: 'Mo-Fr 08:00-17:30, Sa 09:00-14:00',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-white text-[#0A192F]" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CMSProvider>
          <SiteShell>{children}</SiteShell>
        </CMSProvider>
      </body>
    </html>
  );
}
