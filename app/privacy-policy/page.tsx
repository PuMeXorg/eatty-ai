import type { Metadata } from "next";
import LegalLayout, { Lead, Section, P, UL, LI } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — Eatty AI",
  robots: { index: false, follow: false },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="June 17, 2026">
      <Lead>
        This Privacy Policy explains how Veltrix Alliance Inc (&ldquo;Eatty&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and shares information when you use the Eatty: Healthy Cooking Recipes mobile app and our website (together, the &ldquo;Service&rdquo;).
      </Lead>
      <Section heading="1. Information we collect">
        <P>Information you provide. When you create an account, we collect your email address and name. Eatty uses passwordless sign-in: instead of a password, we send a one-time code to your email to verify it&rsquo;s you. You can also start using the app with an anonymous account &mdash; a temporary, device-based identifier created through Firebase Authentication &mdash; which you can later link to your email.</P>
        <P>Profile and health information. To personalize your meal plan, you may provide your height, weight, goals, diet type, preferred and avoided ingredients, and any health conditions that may affect your diet. Some of this is health-related information, which we treat as sensitive (see Section 4).</P>
        <P>Content you create. We process the recipes you save, the meals you log, and the items you add to your grocery list.</P>
        <P>Meal photos. When you use AI calorie tracking, you can take a photo of a meal to get an estimate of calories and macros (see Section 3).</P>
        <P>Purchase information. When you subscribe, payment is processed by Apple (in-app purchases) or Stripe (web). We receive confirmation of your purchase and your subscription status, but we do not receive your full payment-card details.</P>
        <P>Technical and usage information. We automatically collect limited device, app, and usage data (such as device identifiers, app version, and interaction events) to operate, secure, measure, and improve the Service.</P>
      </Section>
      <Section heading="2. How we use information">
        <P>We use the information we collect to:</P>
        <UL>
          <LI>Create and manage your account, including passwordless and anonymous sign-in.</LI>
          <LI>Build and adjust your personalized meal plan and recipe recommendations.</LI>
          <LI>Estimate calories and macros for meals you log.</LI>
          <LI>Maintain features such as favorites, avoided ingredients, and your grocery list.</LI>
          <LI>Process subscriptions, free trials, and related billing.</LI>
          <LI>Measure and improve the Service, and run and attribute our marketing campaigns.</LI>
          <LI>Provide support, communicate with you, and respond to your requests.</LI>
          <LI>Maintain security and comply with our legal obligations.</LI>
        </UL>
      </Section>
      <Section heading="3. Meal photos and AI features">
        <P>When you use AI calorie tracking, your meal photo is sent to our AI provider, OpenAI, to generate an estimate of calories and macros. The estimate is returned to the app, and the photo is stored locally on your device &mdash; we do not keep your meal photos on our servers. Estimates are approximate and can be reviewed and edited before saving.</P>
      </Section>
      <Section heading="4. Health-related information">
        <P>Information such as your weight, goals, diet type, and health conditions is health-related and may be considered sensitive (or a special category of data under some laws). We use it only to personalize your meal plan and the features you choose to use. Where required, we rely on your consent to process this information, and you can withdraw consent or delete this data at any time. Eatty is not a medical service and does not provide medical advice.</P>
      </Section>
      <Section heading="5. How we share information">
        <P>We do not share your information except as described here. We work with the following categories of providers and partners, who may process your information on our behalf or as independent controllers:</P>
        <UL>
          <LI>Cloud hosting: Amazon Web Services (AWS).</LI>
          <LI>Analytics and product measurement: Meta, Amplitude, Firebase, AppsFlyer, RevenueCat, and Web2Wave.</LI>
          <LI>Advertising and attribution: Meta, Google, Snapchat, and TikTok &mdash; used to run and measure our marketing campaigns. We do not show ads inside the app.</LI>
          <LI>AI processing: OpenAI (meal-photo estimates).</LI>
          <LI>Payments: Stripe and Apple In-App Purchases.</LI>
        </UL>
        <P>We may also share data with law enforcement agencies when required by law, and with third parties in connection with mergers, acquisitions, or corporate transactions.</P>
        <P>Some sharing with advertising or analytics partners may be considered a &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information under certain laws. See Section 10 for your choices.</P>
      </Section>
      <Section heading="6. Advertising and analytics">
        <P>We do not display third-party ads inside the Eatty app. We do work with advertising and analytics partners to understand how people discover Eatty, to measure and attribute our marketing, and to reach potential users on other platforms. This may involve sharing device or advertising identifiers with those partners. You can limit ad tracking through your device settings, for example iOS App Tracking Transparency or Android ad settings.</P>
      </Section>
      <Section heading="7. Data retention">
        <P>We keep your information for as long as your account is active and as needed to provide the Service, and for legitimate business or legal purposes. When you delete your account, we delete or de-identify your personal information, except where we are required to keep it.</P>
      </Section>
      <Section heading="8. International data transfers">
        <P>We are based in the United States, and our providers may process information in the United States and other countries. Where we transfer information from the European Economic Area, the United Kingdom, or Switzerland, we rely on appropriate safeguards, such as Standard Contractual Clauses.</P>
      </Section>
      <Section heading="9. Your rights (EEA and UK)">
        <P>If you are in the EEA or the UK, you have rights to access, correct, delete, restrict, or object to the processing of your personal data, to data portability, and to withdraw consent at any time. Our legal bases include performing our contract with you, your consent (for health data and marketing), our legitimate interests, and compliance with legal obligations. You may also lodge a complaint with your local data protection authority.</P>
      </Section>
      <Section heading="10. Your California privacy rights">
        <P>If you are a California resident, you have the right to know, access, correct, and delete your personal information, to opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information, and to limit the use of sensitive personal information. We do not sell personal information for money, but our use of advertising and analytics partners may be considered a sale or sharing under California law. To exercise your rights, contact us at support@eattyai.com. We will not discriminate against you for exercising your rights.</P>
      </Section>
      <Section heading="11. Deleting your account">
        <P>You can delete your account and associated personal information directly in the app, or by emailing us at support@eattyai.com.</P>
      </Section>
      <Section heading="12. Security">
        <P>We use reasonable technical and organizational measures to protect your information. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.</P>
      </Section>
      <Section heading="13. Children">
        <P>Eatty is intended for adults aged 18 and older. We do not knowingly collect personal information from anyone under 18. If you believe a minor has provided us with information, contact us and we will delete it.</P>
      </Section>
      <Section heading="14. Changes to this policy">
        <P>We may update this Privacy Policy from time to time. Material changes will be reflected by updating the &ldquo;Last updated&rdquo; date above.</P>
      </Section>
      <Section heading="15. Contact us">
        <P>If you have questions about this Privacy Policy or your information, contact us at support@eattyai.com.</P>
      </Section>
    </LegalLayout>
  );
}
