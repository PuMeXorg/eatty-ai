import type { Metadata } from "next";
import LegalLayout, { Lead, Section, P, UL, LI } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Subscription Terms — Eatty AI",
  robots: { index: false, follow: false },
};

export default function SubscriptionTermsPage() {
  return (
    <LegalLayout title="Subscription Terms" lastUpdated="June 17, 2026">
      <Lead>
        These Subscription Terms explain how paid Eatty subscriptions work, including billing, renewals, free trials, and cancellation. They form part of our Terms of Use.
      </Lead>
      <Section heading="1. Subscription plans">
        <P>Eatty offers paid subscriptions on a recurring basis, for example monthly, quarterly, or yearly plans. The available plans, current price, billing period, and any free trial are shown at the point of purchase &mdash; in the app via the Apple App Store, or on our website at checkout. The price and terms that apply to you are those displayed when you subscribe.</P>
      </Section>
      <Section heading="2. Free trials">
        <P>We may offer a free trial on some plans. Whether a trial is available, and its length, depends on the current offer shown at purchase. If you do not cancel before the trial ends, your subscription will automatically convert to a paid subscription and you will be charged for the first billing period.</P>
      </Section>
      <Section heading="3. Billing and auto-renewal">
        <P>Subscriptions renew automatically at the end of each billing period unless you cancel beforehand. Payment is charged to your Apple account (for in-app purchases) or to your payment method through Stripe (for web purchases). By subscribing, you authorize these recurring charges until you cancel.</P>
      </Section>
      <Section heading="4. How to cancel">
        <P>For App Store subscriptions, manage or cancel in your device&rsquo;s App Store settings at least 24 hours before the renewal date. For web (Stripe) subscriptions, cancel through your account or by contacting support@eattyai.com. Cancellation takes effect at the end of the current billing period, and you keep access until then.</P>
      </Section>
      <Section heading="5. Price changes">
        <P>We may change subscription prices or plans. Where required, we will notify you in advance, and changes will apply to future billing periods. If you do not agree, you can cancel before the change takes effect.</P>
      </Section>
      <Section heading="6. Refunds">
        <P>Refunds are handled as described in our Refund Policy. App Store purchases are subject to Apple&rsquo;s refund process; web purchases may be refunded within 30 days on request.</P>
      </Section>
      <Section heading="7. Termination">
        <P>We may suspend or end a subscription if payment fails or if you breach our Terms of Use.</P>
      </Section>
      <Section heading="8. Contact us">
        <P>Questions about your subscription? Contact us at support@eattyai.com.</P>
      </Section>
    </LegalLayout>
  );
}
