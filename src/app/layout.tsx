import type { Metadata } from "next";
import "./globals.css";
import parse from "html-react-parser";
import { getCustomScripts } from "@/lib/wp";
import { FontLoader } from "@/components/FontLoader";

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

