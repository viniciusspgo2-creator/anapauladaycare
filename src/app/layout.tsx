import type { Metadata, Viewport } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fffcf5",
};

export const metadata: Metadata = {
  title: {
    default: "Ana Paula Daycare | Warm, Home-Like Child Care in San Francisco, CA",
    template: "%s | Ana Paula Daycare",
  },
  description:
    "Warm, home-like daycare in San Francisco (94112). Infant, toddler & preschool care with play-based learning, attentive staff and open parent communication. Book a visit today!",
  keywords: [
    "daycare San Francisco",
    "daycare near me",
    "infant care San Francisco",
    "preschool San Francisco",
    "family child care 94112",
    "toddler care Excelsior SF",
    "home daycare Mission Terrace",
    "Ana Paula Daycare",
  ],
  authors: [{ name: "Ana Paula Daycare" }],
  metadataBase: new URL("https://anapauladaycare.com"),
  icons: {
    icon: "/images/logo.webp",
    apple: "/images/logo.webp",
  },
  openGraph: {
    title: "Ana Paula Daycare | A warm place for curious little minds",
    description:
      "Home-based child care in San Francisco, CA — infants, toddlers and preschool. Play-based learning, attentive care, open communication with families. Schedule a visit today!",
    url: "https://anapauladaycare.com",
    siteName: "Ana Paula Daycare",
    images: [{ url: "/images/logo.webp", width: 1024, height: 1024, alt: "Ana Paula Daycare logo" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ana Paula Daycare | San Francisco, CA",
    description: "A warm place for curious little minds — home-based child care in San Francisco.",
    images: ["/images/logo.webp"],
  },
  robots: { index: true, follow: true },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ChildCare",
  "@id": "https://anapauladaycare.com/#business",
  name: "Ana Paula Daycare",
  alternateName: "Ana Paula Daycare",
  slogan: "A warm place for curious little minds",
  description:
    "Warm, home-like family daycare in San Francisco offering gentle infant care, active toddler learning and engaging preschool programs with play-based curriculum.",
  url: "https://anapauladaycare.com",
  telephone: "+1-415-912-0300",
  email: "anapauladaycare@gmail.com",
  image: "https://anapauladaycare.com/images/logo.webp",
  logo: "https://anapauladaycare.com/images/logo.webp",
  address: {
    "@type": "PostalAddress",
    streetAddress: "431 Paris St.",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    postalCode: "94112",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.7212,
    longitude: -122.4374,
  },
  areaServed: ["San Francisco", "Excelsior", "Mission Terrace", "Outer Mission"],
  priceRange: "$$",
  foundingLocation: "San Francisco, CA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body
        className={`${baloo.variable} ${nunito.variable} antialiased bg-cream text-ink`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
