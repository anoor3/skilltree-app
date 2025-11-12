import type { Metadata } from "next";
import { Manrope, Poppins } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkillTree — Grow Your Skills Visually",
  description:
    "Map, grow, and share your skills with an interactive 3D-inspired learning tree.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${manrope.variable} bg-skilltree-night text-skilltree-foreground antialiased`}
      >
        <Providers>
          <div className="relative min-h-dvh overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-skilltree-gradient blur-3xl opacity-80" />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
