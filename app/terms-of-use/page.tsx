import type { Metadata } from "next";
import LegalLayout, { Lead, Section, P, UL, LI } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Use — Eatty AI",
  robots: { index: false, follow: false },
};

export default function TermsOfUsePage() {
  return (
    <LegalLayout title="Terms of Use" lastUpdated="June 17, 2026">
      <Lead>
        These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use of the Eatty: Healthy Cooking Recipes mobile app and our website (together, the &ldquo;Service&rdquo;), provided by Veltrix Alliance Inc (&ldquo;Eatty&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). By using the Service, you agree to these Terms.
      </Lead>
      <Section heading="1. Eligibility">
        <P>You must be at least 18 years old to use the Service. By using Eatty, you confirm that you meet this requirement.</P>
      </Section>
      <Section heading="2. Your account">
        <P>Eatty uses passwordless sign-in: we send a one-time code to your email to verify your identity. You may also use the app with an anonymous account that you can later link to your email. You are responsible for keeping access to your email account secure and for activity that occurs under your account.</P>
      </Section>
      <Section heading="3. License to use Eatty">
        <P>We grant you a limited, personal, non-exclusive, non-transferable, and revocable license to use the Service for your own personal, non-commercial use, subject to these Terms.</P>
      </Section>
      <Section heading="4. Acceptable use">
        <P>You agree not to:</P>
        <UL>
          <LI>Use the Service for any unlawful purpose or in violation of these Terms.</LI>
          <LI>Copy, resell, or commercially exploit the Service or its content.</LI>
          <LI>Reverse engineer, interfere with, or attempt to gain unauthorized access to the Service.</LI>
          <LI>Upload content that is unlawful, infringing, or harmful.</LI>
        </UL>
      </Section>
      <Section heading="5. Health disclaimer">
        <P>Eatty provides nutrition, recipe, and meal-planning information for general informational purposes only. It is not medical, nutritional, or healthcare advice and is not a substitute for professional guidance. Calorie and macro estimates are approximate. Consult a qualified professional before making significant changes to your diet, especially if you have a health condition.</P>
      </Section>
      <Section heading="6. AI features">
        <P>Some features use artificial intelligence, including OpenAI, to generate estimates such as calories and macros from a meal photo. These outputs are approximate, may contain errors, and should be reviewed before you rely on them.</P>
      </Section>
      <Section heading="7. Subscriptions and payments">
        <P>Some features require a paid subscription. Subscriptions, billing, free trials, and cancellation are described in our Subscription Terms, and refunds in our Refund Policy. Payments are processed by Apple (in-app purchases) or Stripe (web).</P>
      </Section>
      <Section heading="8. Intellectual property">
        <P>The Service, including its content, recipes, design, and trademarks, is owned by Eatty or its licensors and is protected by law. Except for content you provide, you receive no ownership rights.</P>
      </Section>
      <Section heading="9. Your content">
        <P>You retain rights to the content you create, such as saved recipes and lists. You grant us a license to host and process that content as needed to provide the Service.</P>
      </Section>
      <Section heading="10. Third-party services">
        <P>The Service relies on third parties such as the Apple App Store, Google Play, Stripe, and others. Your use of those services may be subject to their own terms. Where the app is obtained through the Apple App Store, Apple&rsquo;s standard licensed-application end-user terms also apply.</P>
      </Section>
      <Section heading="11. Disclaimers">
        <P>The Service is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without warranties of any kind, whether express or implied, to the fullest extent permitted by law.</P>
      </Section>
      <Section heading="12. Limitation of liability">
        <P>To the fullest extent permitted by law, Eatty and its affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss arising from your use of the Service. Our total liability for any claim is limited to the amount you paid us in the 12 months before the claim.</P>
      </Section>
      <Section heading="13. Indemnification">
        <P>You agree to indemnify and hold Eatty harmless from claims arising out of your use of the Service or your violation of these Terms.</P>
      </Section>
      <Section heading="14. Termination">
        <P>We may suspend or terminate your access if you violate these Terms or where necessary to protect the Service. You may stop using the Service at any time and delete your account.</P>
      </Section>
      <Section heading="15. Governing law">
        <P>These Terms are governed by the laws of the State of California and applicable United States federal law, without regard to conflict-of-laws rules.</P>
      </Section>
      <Section heading="16. Dispute resolution and arbitration">
        <P>Any dispute arising out of or relating to these Terms or the Service will be resolved by binding arbitration on an individual basis, and not as a class, collective, or representative action. You and Eatty waive the right to a jury trial and to participate in a class action. You may opt out of arbitration by emailing us within 30 days of first accepting these Terms. This section does not prevent either party from seeking relief in small-claims court.</P>
      </Section>
      <Section heading="17. Changes to these Terms">
        <P>We may update these Terms from time to time. Material changes will be reflected by updating the &ldquo;Last updated&rdquo; date. Continued use of the Service means you accept the updated Terms.</P>
      </Section>
      <Section heading="18. Contact us">
        <P>Questions about these Terms? Contact us at support@eattyai.com.</P>
      </Section>
    </LegalLayout>
  );
}
