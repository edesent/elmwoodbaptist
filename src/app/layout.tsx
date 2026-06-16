import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

// WBC Chat (website chat popup).
// Mint an Elmwood-specific key in the admin panel
// (https://slackwebsitechat.vercel.app/admin) and paste it below. Until a real
// key is set, the widget stays off so the live site never shows a broken popup.
const CHAT_API = "https://slackwebsitechat.vercel.app";
const CHAT_KEY = "REPLACE_WITH_ELMWOOD_CHAT_KEY";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const SITE_URL = "https://www.elmwoodbaptist.org";
const SITE_NAME = "Elmwood Baptist Church";
const SITE_TAGLINE = "More Than A Church — We're A Family";
const SITE_DESCRIPTION =
  "Elmwood Baptist Church is a King James Bible, Independent Baptist church family in Brighton, Colorado. Join us Sundays at 10:00 AM. Warm fellowship, Christ-honoring preaching, and ministries for every age — all are welcome.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Elmwood Baptist Church",
    "Baptist church Brighton CO",
    "Brighton Colorado church",
    "Independent Baptist church",
    "King James Bible church",
    "Bible-believing church near me",
    "church family Brighton",
    "Sunday worship Brighton",
    "Elmwood Baptist Academy",
    "Baptist church family",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — exterior of our church building`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  category: "religion",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fcfd" },
    { media: "(prefers-color-scheme: dark)", color: "#0b2740" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lato.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        {children}
        {CHAT_KEY !== "REPLACE_WITH_ELMWOOD_CHAT_KEY" && (
          <Script
            src={`${CHAT_API}/widget/wbc-chat.js`}
            data-api={CHAT_API}
            data-key={CHAT_KEY}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
