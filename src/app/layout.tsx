import type { Metadata } from "next";
import "./globals.css";
import parse from "html-react-parser";
import { getCustomScripts } from "@/lib/wp";
import { FontLoader } from "@/components/FontLoader";

const SITE_URL = "https://quietpupcare.com";

export const metadata: Metadata = {
  title: {
    default: "Quiet Pup Care — Clinical Guides for Anxious Dogs",
    template: "%s | Quiet Pup Care",
  },
  description: "Evidence-based guides, vet-reviewed calming gear reviews, and behavioral tips for dogs with separation anxiety, noise phobias, and stress.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Quiet Pup Care",
    title: "Quiet Pup Care — Clinical Guides for Anxious Dogs",
    description: "Evidence-based guides, vet-reviewed calming gear reviews, and behavioral tips for dogs with separation anxiety, noise phobias, and stress.",
    images: [
      {
        url: "https://amaz.quietpupcare.com/wp-content/uploads/2026/09/logo.webp",
        width: 512,
        height: 512,
        alt: "Quiet Pup Care Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quiet Pup Care — Clinical Guides for Anxious Dogs",
    description: "Evidence-based guides for anxious dogs.",
  },
  icons: {
    icon: "https://amaz.quietpupcare.com/wp-content/uploads/2026/09/logo.webp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const customScripts = await getCustomScripts();

  return (
    <html lang="en">
      <head>
        <FontLoader />
        {customScripts?.headScripts && parse(customScripts.headScripts)}
      </head>
      <body className="antialiased">
        {customScripts?.bodyScripts && parse(customScripts.bodyScripts)}
        {children}
        {customScripts?.footerScripts && parse(customScripts.footerScripts)}
      </body>
    </html>
  );
}
