import React from "react";
import { PageHeroBanner } from "@/components/Common/PageHeroBanner";
import { ConsultationCTA } from "@/components/Common/ConsultationCTA";

export const metadata = {
  title: "Terms & Conditions | Support Help",
  description: "Terms and conditions governing the outsourced accounting and bookkeeping services provided by Support Help.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeroBanner
        title="Terms & Conditions"
        subtitle="General service terms and operational guidelines for clients and partners."
      />
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8 py-16 space-y-8 font-poppins text-gray-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">1. Scope of Services</h2>
          <p>
            Support Help provides outsourced bookkeeping, catch-up work, payroll management, accounts payable/receivable, and back-office accounting support in accordance with individual client service agreements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">2. Client Responsibilities</h2>
          <p>
            Clients agree to provide accurate, timely financial documentation, bank feeds, receipts, and invoices required for reconciling books and preparing reports.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">3. Confidentiality & Security</h2>
          <p>
            Both parties agree to treat all financial records, business data, and correspondence as strictly confidential under binding non-disclosure commitments.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">4. Modifications</h2>
          <p>
            Support Help reserves the right to update these terms periodically to reflect changes in regulatory standards or service offerings.
          </p>
        </section>
      </div>
      <ConsultationCTA />
    </main>
  );
}
