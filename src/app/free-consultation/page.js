import React from "react";
import { PageHeroBanner } from "@/components/Common/PageHeroBanner";
import { contactInfo } from "@/data/navigationData";
import { Calendar, CheckCircle2, Clock, ShieldCheck, Send } from "lucide-react";

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
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 rounded-full bg-[#dbefe9] text-[#368b82] flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-poppins text-gray-900">
                  Book Your Consultation Time
                </h3>
                <p className="text-xs text-gray-500">Pick a preferred day & provide brief context</p>
              </div>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 font-poppins uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:border-[#368b82] focus:ring-1 focus:ring-[#368b82] outline-hidden text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 font-poppins uppercase tracking-wider mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Business / Firm name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:border-[#368b82] focus:ring-1 focus:ring-[#368b82] outline-hidden text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 font-poppins uppercase tracking-wider mb-1.5">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:border-[#368b82] focus:ring-1 focus:ring-[#368b82] outline-hidden text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 font-poppins uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:border-[#368b82] focus:ring-1 focus:ring-[#368b82] outline-hidden text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 font-poppins uppercase tracking-wider mb-1.5">
                    Primary Service Needed
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded focus:border-[#368b82] focus:ring-1 focus:ring-[#368b82] outline-hidden text-sm bg-white">
                    <option>Bookkeeping & Month-End Close</option>
                    <option>Cleanup & Catch Up Work</option>
                    <option>Accounts Payable & Receivable</option>
                    <option>Payroll Management</option>
                    <option>Software Migration (QBO / Zoho / Xero)</option>
                    <option>CPA Firm Back-Office Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 font-poppins uppercase tracking-wider mb-1.5">
                    Preferred Time Slot
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded focus:border-[#368b82] focus:ring-1 focus:ring-[#368b82] outline-hidden text-sm bg-white">
                    <option>Morning (9:00 AM – 12:00 PM EST)</option>
                    <option>Afternoon (1:00 PM – 4:00 PM EST)</option>
                    <option>Evening (4:00 PM – 7:00 PM EST)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 font-poppins uppercase tracking-wider mb-1.5">
                  Brief Overview of Your Accounting Needs
                </label>
                <textarea
                  rows={3}
                  placeholder="Monthly transaction volume, software currently used, or current pain points..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded focus:border-[#368b82] focus:ring-1 focus:ring-[#368b82] outline-hidden text-sm"
                />
              </div>

              <button
                type="button"
                className="w-full bg-[#368b82] hover:bg-[#286b64] text-white py-3 rounded font-bold font-poppins uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Confirm Consultation Request</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
