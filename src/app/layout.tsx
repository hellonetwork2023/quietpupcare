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

import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: 'swap',
});

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif-4",
  display: 'swap',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const customScripts = await getCustomScripts();

  return (
    <html lang="en">
      <head>
        {customScripts?.headScripts && parse(customScripts.headScripts)}
      </head>
      <body className={`antialiased ${plusJakartaSans.variable} ${sourceSerif4.variable}`}>
        {customScripts?.bodyScripts && parse(customScripts.bodyScripts)}
        {children}
        {customScripts?.footerScripts && parse(customScripts.footerScripts)}
      </body>
    </html>
  );
}

