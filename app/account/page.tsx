import type { Metadata } from "next";
import AccountDashboard from "@/components/AccountDashboard";

export const metadata: Metadata = {
  title: "Account — Eatty AI",
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return <AccountDashboard />;
}
