import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy — TriviqTech",
  description:
    "How TriviqTech handles visitor data, form submissions, and analytics — GDPR, UK DPA and DPDP aligned.",
};

export default function PrivacyPage() {
  return (
    <main>
      <Navbar />
      <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-20">
        <span className="inline-block text-xs font-semibold tracking-widest text-brand-primary uppercase">
          Privacy
        </span>
        <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
          What we collect <span className="gradient-text">and why.</span>
        </h1>
        <p className="mt-5 text-slate-600 leading-relaxed">
          TriviqTech respects your privacy. This page explains in plain terms
          what data we collect when you visit this website, why we collect it,
          and how you can request its removal.
        </p>

        <Section title="Data we collect automatically">
          <p>
            When you visit triviqtech.com, our servers log a minimal set of
            technical information under our legitimate-interest basis
            (GDPR Art. 6(1)(f)) to secure the site, prevent abuse, and improve
            the experience. We do <strong>not</strong> use tracking cookies.
          </p>
          <ul>
            <li>IP address (used to derive approximate country, region, city)</li>
            <li>Browser, operating system, device type (from User-Agent header)</li>
            <li>Preferred language and timezone</li>
            <li>Referring URL — where you came from</li>
            <li>Pages visited, time on page, scroll depth (aggregated)</li>
            <li>UTM / campaign parameters if present in the URL</li>
          </ul>
          <p>
            We do not sell this data, do not share it with ad networks, and do
            not use it to profile you across other sites.
          </p>
        </Section>

        <Section title="Data you give us">
          <p>
            When you fill in the contact form, we collect the name, email, and
            message you submit — plus the visitor context above — so we can
            respond to your enquiry. We retain enquiry data for up to 24 months
            then delete it, unless you become a client (in which case a separate
            client agreement applies).
          </p>
        </Section>

        <Section title="Where data goes">
          <p>
            Enquiries are emailed to the TriviqTech founders at their business
            Gmail inboxes. Visit logs and lead submissions are also written to
            a private Google Sheet owned by TriviqTech — used only by us for
            analytics and customer response, never shared or sold. Geo
            enrichment is performed via ip-api.com and bigdatacloud.net public
            endpoints; no personal identifiers beyond the IP (and, if you
            explicitly opt in, GPS coordinates) are sent.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            Under GDPR (EU/UK) and the DPDP Act 2023 (India), you may request:
            access to data we hold about you, correction, deletion, restriction
            of processing, portability, or withdrawal of consent. Email{" "}
            <a
              href="mailto:contact@triviqtech.com"
              className="text-brand-primary hover:text-brand-primaryDark"
            >
              contact@triviqtech.com
            </a>{" "}
            and we will respond within 30 days.
          </p>
        </Section>

        <Section title="Precise location (optional, consent-based)">
          <p>
            The contact form has an optional checkbox that asks whether you
            want to share your precise location (GPS coordinates). This is
            entirely opt-in. If you tick the box, your browser will ask for
            permission separately — you can deny at the browser level and
            nothing is captured. If you consent, we record latitude/longitude,
            accuracy, and the reverse-geocoded city/country, and include them
            in the lead email so we can respond with regional context.
          </p>
          <p>
            If you leave the checkbox unchecked, no precise location is
            requested or stored.
          </p>
        </Section>

        <Section title="Cookies">
          <p>
            We use one session-only key in your browser&apos;s{" "}
            <code>sessionStorage</code> to count visits consistently within a
            single browsing session. It is cleared when you close the tab and
            never leaves your device. We do not set persistent tracking cookies.
          </p>
        </Section>

        <p className="mt-12 text-xs text-slate-500">
          Last updated: {new Date().toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </article>
      <Footer />
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">{title}</h2>
      <div className="mt-3 space-y-3 text-slate-700 leading-relaxed text-[15px] [&_ul]:mt-2 [&_ul]:space-y-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-slate-600 [&_a]:text-brand-primary [&_a:hover]:text-brand-primaryDark [&_code]:rounded [&_code]:bg-slate-100 [&_code]:border [&_code]:border-slate-200 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_code]:text-slate-800 [&_strong]:text-slate-900">
        {children}
      </div>
    </section>
  );
}
