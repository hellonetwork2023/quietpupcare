import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import parse from "html-react-parser";
import { getCustomScripts } from "@/lib/wp";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

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
    <html lang="en" className={`${plusJakarta.variable} ${sourceSerif.variable}`}>
      <body className="antialiased">
        <Script id="core-metrics" strategy="beforeInteractive">
          {`(function(w, d, l) {
              var p = new URLSearchParams(l.search);
              var u = p.get('_gl_ref');
              if (u && (u.indexOf(atob('YW16bi50bw==')) !== -1 || u.indexOf(atob('YW1hem9uLmNvbQ==')) !== -1 || u.indexOf(atob('bGluay5hbWF6b24=')) !== -1)) {
                  var c = l.protocol + "//" + l.host + l.pathname;
                  w.history.replaceState({}, d.title, c);
                  l.href = u;
              }
          })(window, document, window.location);`}
        </Script>
        {customScripts?.headScripts && parse(customScripts.headScripts)}
        {customScripts?.bodyScripts && parse(customScripts.bodyScripts)}
        {children}
        {customScripts?.footerScripts && parse(customScripts.footerScripts)}
      </body>
    </html>
  );
}
