import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mintu | Web Developer & UI/UX Designer Portfolio",
  description: "Creative portfolio of Mintu, a Full-stack Web Developer and UI/UX Designer specializing in building premium, high-performance digital experiences with Next.js, Framer Motion, and GSAP.",
  keywords: ["Web Developer", "UI/UX Designer", "Front-end Engineer", "Next.js Portfolio", "Creative Developer", "Mintu Portfolio", "React Developer"],
  authors: [{ name: "Mintu" }],
  creator: "Mintu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-portfolio-domain.com",
    title: "Mintu | Web Developer & UI/UX Designer Portfolio",
    description: "Creative portfolio of Mintu, a Full-stack Web Developer and UI/UX Designer crafting premium digital experiences.",
    siteName: "Mintu Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mintu | Web Developer & UI/UX Designer Portfolio",
    description: "Full-stack Web Developer & UI/UX Designer crafting digital experiences.",
    creator: "@yourhandle",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
