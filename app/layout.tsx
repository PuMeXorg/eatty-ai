import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Eatty AI — Healthy Cooking Recipes",
  description:
    "Personalized meal plans, healthy recipes, AI calorie tracking, grocery lists, and nutrition challenges in one simple app.",
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/assets/eatty-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbf6ee",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${bricolage.variable}`}>
      <body>{children}</body>
    </html>
  );
}
