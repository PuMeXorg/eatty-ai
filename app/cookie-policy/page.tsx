import type { Metadata } from "next";
import LegalLayout, { Lead, Section, P, UL, LI } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Cookie Policy — Eatty AI",
  robots: { index: false, follow: false },
};

export default function CookiePolicyPage() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="June 17, 2026">
      <Lead>
        This Cookie Policy explains how cookies and similar technologies are used in connection with Eatty&rsquo;s websites.
      </Lead>
      <Section heading="1. What are cookies">
        <P>Cookies are small text files placed on your device when you visit a website. Similar technologies, such as pixels and local storage, work in a comparable way. They help websites function and can be used to measure and improve performance and marketing.</P>
      </Section>
      <Section heading="2. Cookies on this website">
        <P>Our main website uses only essential cookies needed for it to work properly and securely. We do not run analytics or advertising cookies on this website.</P>
      </Section>
      <Section heading="3. Marketing and landing pages">
        <P>We also use separate promotional or &ldquo;funnel&rdquo; landing pages to advertise Eatty. Those pages may use analytics and advertising technologies, including Google Analytics, Meta Pixel, and Amplitude, to measure campaigns and improve our marketing. Those pages present their own notices and, where required, request your consent.</P>
      </Section>
      <Section heading="4. Types of cookies we may use">
        <UL>
          <LI>Essential cookies: required for a site to function.</LI>
          <LI>Analytics cookies: help us understand how visitors use our marketing pages, for example Google Analytics and Amplitude.</LI>
          <LI>Advertising cookies: help us measure and target our campaigns, for example Meta Pixel.</LI>
        </UL>
      </Section>
      <Section heading="5. Managing cookies">
        <P>You can control or delete cookies through your browser settings, and you can opt out of certain analytics and advertising cookies through the providers&rsquo; tools. Blocking essential cookies may affect how a site works. Where required by law, we ask for your consent before setting non-essential cookies.</P>
      </Section>
      <Section heading="6. Changes to this policy">
        <P>We may update this Cookie Policy from time to time. Material changes will be reflected by updating the &ldquo;Last updated&rdquo; date above.</P>
      </Section>
      <Section heading="7. Contact us">
        <P>Questions about this Cookie Policy? Contact us at support@eattyai.com.</P>
      </Section>
    </LegalLayout>
  );
}
