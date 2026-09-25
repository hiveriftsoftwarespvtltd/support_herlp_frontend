import React from "react";
import { PageHeroBanner } from "@/components/Common/PageHeroBanner";
import { ConsultationCTA } from "@/components/Common/ConsultationCTA";
import { Award, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Affiliation and Certification – Support Help",
  description: "View Support Help's professional accounting affiliations, certifications, and partnerships including CPA Australia, QuickBooks ProAdvisor, and Xero.",
};

export default function AffiliationCertificationPage() {
  const credentials = [
    {
      title: "CPA Australia Affiliated",
      badge: "CPA Australia",
      color: "bg-blue-900",
      desc: "Our senior accountants adhere to strict professional guidelines, continuous professional development (CPD), and rigorous auditing standards governed by CPA Australia.",
    },
    {
      title: "CPA America / AICPA Aligned",
      badge: "CPA USA",
      color: "bg-gray-900",
      desc: "Our USA desk strictly follows US GAAP rules, federal tax guidelines, and state sales tax reporting mechanisms.",
    },
    {
      title: "Intuit QuickBooks Platinum ProAdvisor",
      badge: "QuickBooks ProAdvisor",
      color: "bg-green-700",
      desc: "Certified advanced QuickBooks Online and Desktop advisors, guaranteeing optimal system setup, multi-entity setups, and inventory management.",
    },
    {
      title: "Xero Certified Platinum Advisor",
      badge: "Xero Platinum",
      color: "bg-sky-600",
      desc: "Highest-tier accredited partner recognized for outstanding client onboarding, payroll handling, and app ecosystem integrations.",
    },
    {
      title: "Sage One Certified Adviser",
      badge: "Sage Certified",
      color: "bg-emerald-600",
      desc: "Accredited advisor in Sage Business Cloud, Sage 50, and Sage Intacct for medium to large enterprises.",
    },
    {
      title: "Zoho Authorized Finance Partner",
      badge: "Zoho Certified",
      color: "bg-amber-600",
      desc: "Authorized partner proficient in Zoho Books, Zoho Inventory, Zoho Expense, and automated recurring billing structures.",
    },
  ];

  return (
    <div className="w-full pb-16">
      <PageHeroBanner
        title="Affiliation & Certifications"
        subtitle="Global credentials and software partnerships that validate our quality, reliability, and security."
        category="About Us"
        categoryHref="/about-us"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold font-poppins text-gray-900">
            Backed by Globally Recognized Accounting Authorities
          </h2>
          <p className="text-gray-600 font-poppins">
            When you work with Support Help, you are backed by verified qualifications and rigorous compliance with worldwide financial governing bodies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((cred, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs hover:border-[#368b82] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className={`inline-block px-3 py-1 rounded text-xs font-bold text-white mb-4 ${cred.color}`}>
                  {cred.badge}
                </span>
                <h3 className="text-lg font-bold text-gray-900 font-poppins mb-2">
                  {cred.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-poppins">
                  {cred.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-green-700">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Active Certification</span>
              </div>
            </div>
          ))}
        </div>

        <ConsultationCTA currentTopic="Certified Accounting" />
      </div>
    </div>
  );
}
