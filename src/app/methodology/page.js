import React from "react";
import { PageHeroBanner } from "@/components/Common/PageHeroBanner";
import { ConsultationCTA } from "@/components/Common/ConsultationCTA";
import { Search, Sliders, CheckSquare, BarChart, RefreshCw } from "lucide-react";

export const metadata = {
  title: "How We Work? (Methodology) – Support Help",
  description: "Discover our seamless 5-step bookkeeping onboarding and operational methodology that guarantees financial clarity and punctuality.",
};

export default function MethodologyPage() {
  const steps = [
    {
      num: "01",
      icon: Search,
      title: "Discovery & Financial Assessment",
      desc: "We analyze your existing software, historical records, chart of accounts, and reporting needs during an initial briefing.",
    },
    {
      num: "02",
      icon: Sliders,
      title: "Custom Process Formulation",
      desc: "We design a clear statement of work, establish document sharing channels (Dropbox, Google Drive, Hubdoc), and configure logins.",
    },
    {
      num: "03",
      icon: CheckSquare,
      title: "Catch-up & Ledger Clean-up",
      desc: "If past periods have discrepancies, we meticulously reconcile all outstanding accounts to bring books up to date.",
    },
    {
      num: "04",
      icon: RefreshCw,
      title: "Ongoing Day-to-Day Operations",
      desc: "Your dedicated bookkeeper performs scheduled reconciliations, accounts payable/receivable posting, and payroll runs.",
    },
    {
      num: "05",
      icon: BarChart,
      title: "Management Reporting & Review",
      desc: "Receive monthly P&L, balance sheets, and KPIs with strategic recommendations during monthly review calls.",
    },
  ];

  return (
    <div className="w-full pb-16">
      <PageHeroBanner
        title="How We Work? (Our Methodology)"
        subtitle="A proven, transparent 5-step engagement framework engineered for speed, accuracy, and compliance."
        category="About Us"
        categoryHref="/about-us"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold font-poppins text-gray-900">
            Precision Accounting in 5 Simple Steps
          </h2>
          <p className="text-gray-600 font-poppins">
            We make onboarding effortless and stress-free. Here is what happens from day one:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs hover:border-[#368b82] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-[#368b82] font-poppins">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#edf7f6] text-[#368b82] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 font-poppins mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-poppins">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <ConsultationCTA currentTopic="Onboarding Workflow" />
      </div>
    </div>
  );
}
