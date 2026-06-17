import type { Metadata } from "next";
import LegalLayout, { Lead, Section, P, UL, LI } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Refund Policy — Eatty AI",
  robots: { index: false, follow: false },
};

export default function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="June 17, 2026">
      <Lead>
        This Refund Policy explains how refunds work for paid Eatty subscriptions. It should be read together with our Subscription Terms.
      </Lead>
      <Section heading="1. Apple In-App Purchases">
        <P>If you purchased your subscription through the Apple App Store, your payment is handled by Apple, and refunds are subject to Apple&rsquo;s policies. You can request a refund from Apple at reportaproblem.apple.com. We are not able to issue refunds for App Store purchases directly.</P>
      </Section>
      <Section heading="2. Web purchases (Stripe)">
        <P>If you purchased directly through our website, processed by Stripe, you may request a refund within 30 days of the charge by contacting us at support@eattyai.com. Approved refunds are returned to your original payment method.</P>
      </Section>
      <Section heading="3. How to request a refund">
        <P>To request a refund for a web purchase, email support@eattyai.com from the address associated with your account and include your purchase details. We aim to respond promptly.</P>
      </Section>
      <Section heading="4. Free trials">
        <P>If your plan includes a free trial, you will not be charged during the trial. Whether a trial is offered, and its length, depends on the offer shown at the time of purchase. To avoid being charged, cancel before the trial ends.</P>
      </Section>
      <Section heading="5. After 30 days">
        <P>Outside the 30-day window, payments are generally non-refundable except where required by law, but you can still cancel to stop future renewals.</P>
      </Section>
      <Section heading="6. Cancellation">
        <P>Cancelling a subscription stops future renewals but does not by itself trigger a refund. See our Subscription Terms for how to cancel.</P>
      </Section>
      <Section heading="7. Contact us">
        <P>For any refund question, contact us at support@eattyai.com.</P>
      </Section>
    </LegalLayout>
  );
}
