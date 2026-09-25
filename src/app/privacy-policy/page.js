import React from "react";
import { PageHeroBanner } from "@/components/Common/PageHeroBanner";
import { ConsultationCTA } from "@/components/Common/ConsultationCTA";

export const metadata = {
  title: "Privacy Policy | Support Help",
  description: "Read the Privacy Policy of Support Help explaining how we protect and handle your personal and financial data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeroBanner
        title="Privacy Policy"
        subtitle="Learn how Support Help collects, uses, and safeguards client information."
      />
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8 py-16 space-y-8 font-poppins text-gray-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">1. Information We Collect</h2>
          <p>
            Support Help collects information necessary to provide outsourced bookkeeping, accounting, tax coordination, and financial back-office services. This includes company contact details, financial records provided by clients, and accounting portal access.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">2. How We Protect Your Data</h2>
          <p>
            We implement industry-grade 256-bit encryption for all file transfers and client communication. Our internal infrastructure adheres strictly to ISO-compliant security standards, secure VPN protocols, and strict non-disclosure agreements with all dedicated accounting personnel.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">3. Non-Disclosure & Confidentiality</h2>
          <p>
            We will never sell, lease, or share your proprietary financial information with any third parties without explicit authorization, unless required by applicable law or regulatory authority.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">4. Contact Information</h2>
          <p>
            If you have questions regarding this Privacy Policy or your data, please contact our data privacy officer at <a href="mailto:Contact@Supporthelp.online" className="text-[#368b82] font-semibold underline">Contact@Supporthelp.online</a>.
          </p>
        </section>
      </div>
      <ConsultationCTA />
    </main>
  );
}
