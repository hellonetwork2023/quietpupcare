import type { Metadata } from "next";
import "./globals.css";
import parse from "html-react-parser";
import { getCustomScripts } from "@/lib/wp";

export const metadata: Metadata = {
  title: "Quiet Pup Care",
  description: "Clinical guides and gear for anxious dogs.",
  icons: {
    icon: "https://amaz.quietpupcare.com/wp-content/uploads/2026/09/logo.webp",
  }
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Source+Serif+4:opsz,wght@8..60,400;8..60,700&display=swap" rel="stylesheet" />
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

