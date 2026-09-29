import React from "react";
import { FreeConsultationForm } from "@/components/Common/FreeConsultationForm";
import { PageHeroBanner } from "@/components/Common/PageHeroBanner";
import { contactInfo } from "@/data/navigationData";
import { Calendar, CheckCircle2, Clock, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Get a Free Consultation – Support Help",
  description: "Schedule your free 30-minute accounting & bookkeeping consultation with our certified advisors. Receive an immediate customized assessment.",
};

export default function FreeConsultationPage() {
  return (
    <div className="w-full pb-16">
      <PageHeroBanner
        title="Get a Free Consultation"
        subtitle="Book a complimentary 30-minute financial review with our senior certified accountants."
        category="Consultation"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: What to Expect */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[#368b82] font-bold text-xs uppercase tracking-widest font-poppins">
                Zero Cost • No Obligation
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-gray-900 mt-1">
                What to Expect During Your Session
              </h2>
              <p className="text-sm text-gray-600 font-poppins mt-2 leading-relaxed">
                We respect your time. During this focused consultation, we evaluate your workflow bottlenecks and map out a step-by-step cost-saving blueprint.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Thorough Ledger Health Check",
                  desc: "We look into your current chart of accounts, outstanding reconciliations, and backlog.",
                },
                {
                  title: "Software & App Integration Audit",
                  desc: "Recommendations on linking your bank feeds, payroll, and invoicing to eliminate double entry.",
                },
                {
                  title: "Transparent Fixed Pricing Plan",
                  desc: "No surprise hourly billing. You receive a clear monthly fixed-fee proposal tailored to your volume.",
                },
                {
                  title: "Onboarding Roadmap",
                  desc: "Clear timelines for transitioning daily responsibilities to our dedicated team smoothly.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <CheckCircle2 className="w-5 h-5 text-[#368b82] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm font-poppins">{item.title}</h4>
                    <p className="text-xs text-gray-500 font-poppins mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#edf7f6] border border-[#368b82]/30 rounded-xl text-xs text-gray-700 space-y-1">
              <span className="font-bold text-[#368b82] block">Prefer to call right now?</span>
              <p>
                Our US support line is live:{" "}
                <a href={`tel:${contactInfo.phoneTel}`} className="font-bold underline text-gray-900">
                  {contactInfo.phoneDisplay}
                </a>
              </p>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="lg:col-span-7">
            <FreeConsultationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
