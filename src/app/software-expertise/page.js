import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PageHeroBanner } from "@/components/Common/PageHeroBanner";
import { IndustryCoffeeSection } from "@/components/Common/IndustryCoffeeSection";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Globe,
  Database,
  RefreshCw,
  FileCheck,
  Clock,
  Layers,
  Zap,
} from "lucide-react";

export const metadata = {
  title: "Accounting Software Expertise & Certified Partners – Support Help",
  description:
    "Empower your business with certified accounting software expertise. Authorized ProAdvisors for Zoho Books, QuickBooks, Xero, Sage, Epicor, Navision, and MYOB.",
};

const softwareList = [
  {
    title: "ZOHO BOOKS",
    slug: "zohobooks",
    href: "/software-expertise/zohobooks",
    logo: "/software/logo_zoho.png",
    status: "Authorized Advisor",
    desc: "Complete setup, automated banking feeds, custom invoicing, and multi-currency ledgers.",
    tags: ["Cloud Accounting", "Bank Feeds", "MIS Reports"],
  },
  {
    title: "SAGE",
    slug: "sage",
    href: "/software-expertise/sage",
    logo: "/software/logo_sage.png",
    status: "Certified Partner",
    desc: "Robust enterprise Sage One, Intacct, and 50cloud bookkeeping and financial management.",
    tags: ["Enterprise ERP", "Audit Trails", "Multi-Entity"],
  },
  {
    title: "QUICKBOOKS",
    slug: "quickbooks",
    href: "/software-expertise/quickbooks",
    logo: "/software/logo_quickbooks.png",
    status: "ProAdvisor Certified",
    desc: "Certified ProAdvisor services for QuickBooks Online, Desktop, Payroll, and catch-up work.",
    tags: ["ProAdvisor Elite", "Daily Recs", "Tax Ready"],
  },
  {
    title: "EPICOR",
    slug: "epicor",
    href: "/software-expertise/epicor",
    logo: "/software/logo_epicor.png",
    status: "Enterprise Specialist",
    desc: "ERP financial integration, job costing, inventory tracking, and multi-entity consolidation.",
    tags: ["Manufacturing ERP", "Job Costing", "GL Sync"],
  },
  {
    title: "XERO",
    slug: "xero",
    href: "/software-expertise/xero",
    logo: "/software/logo_xero.png",
    status: "Certified Platinum Advisor",
    desc: "Paperless cloud reconciliation, automated debtor chasing, payroll, and 800+ app integrations.",
    tags: ["Cloud Native", "Paperless Invoicing", "Payroll"],
  },
  {
    title: "NAVISION",
    slug: "navision",
    href: "/software-expertise/navision",
    logo: "/software/logo_navision.png",
    status: "Microsoft Dynamics Partner",
    desc: "Microsoft Dynamics NAV specialized general ledger, job budgeting, and payroll workflows.",
    tags: ["Microsoft Dynamics", "Supply Chain", "Ledger Audit"],
  },
  {
    title: "MYOB",
    slug: "myob",
    href: "/software-expertise/myob",
    logo: "/software/logo_myob.png",
    status: "Certified Consultant",
    desc: "Premier Australian & New Zealand tax compliance, BAS statements, and STP payroll tracking.",
    tags: ["ATO & BAS Ready", "STP Phase 2", "Superannuation"],
  },
];

const metrics = [
  {
    icon: Database,
    title: "7+ Certified Platforms",
    desc: "Authorized partner across leading global accounting ecosystems",
  },
  {
    icon: RefreshCw,
    title: "100% Migration Accuracy",
    desc: "Zero data loss and verified historical balance ledger transfers",
  },
  {
    icon: Clock,
    title: "4-Hour Response SLA",
    desc: "Dedicated senior account managers always accessible",
  },
  {
    icon: Globe,
    title: "Multi-Jurisdiction Ready",
    desc: "Compliant with US GAAP, UK HMRC, Australian ATO & IFRS",
  },
];

const advantages = [
  {
    icon: ShieldCheck,
    title: "Certified ProAdvisor Team",
    desc: "Every team member is officially certified and trained on the latest cloud software updates and tax rules.",
  },
  {
    icon: RefreshCw,
    title: "Zero Downtime Migration",
    desc: "Seamless transition from legacy desktop setups or paper records to cloud platforms with full data continuity.",
  },
  {
    icon: Zap,
    title: "Automated Daily Reconciliations",
    desc: "Direct bank feeds and automated rule setups to ensure zero duplicate entries and pristine ledgers.",
  },
  {
    icon: FileCheck,
    title: "Audit-Ready Financial Statements",
    desc: "Delivering monthly balance sheets, P&L statements, and cash flow reports ready for CPAs and tax authorities.",
  },
];

const migrationSteps = [
  {
    step: "01",
    title: "System & Ledger Audit",
    desc: "We analyze your existing Chart of Accounts, uncleared transactions, and software requirements.",
  },
  {
    step: "02",
    title: "Platform Setup & Taxonomy",
    desc: "Configuring banking feeds, tax jurisdictions, payment gateways, and custom reporting structures.",
  },
  {
    step: "03",
    title: "Historical Data Migration",
    desc: "Transferring opening balances, vendor lists, customer records, and past transactions with 100% validation.",
  },
  {
    step: "04",
    title: "Reconciliation & Live Go-Live",
    desc: "Conducting trial balance match, team onboarding, and transitioning to daily automated bookkeeping.",
  },
];

export default function SoftwareExpertisePage() {
  return (
    <main className="w-full bg-[#fafbfc] font-poppins text-[#333333]">
      {/* 1. Page Hero Banner */}
      <PageHeroBanner
        title="ACCOUNTING SOFTWARE EXPERTISE"
        subtitle="Empower your financial operations with certified multi-platform accounting software expertise. From automated reconciliations to complex migrations, we keep your books pristine."
        category="Software"
        categoryHref="/software-expertise"
      />

      {/* 2. Trust Metrics Strip */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-gray-200/90 shadow-sm hover:shadow-md hover:border-[#368b82]/40 transition-all duration-300 flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#edf7f6] text-[#368b82] group-hover:bg-[#368b82] group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300 shadow-2xs">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#368b82] transition-colors leading-snug">
                    {m.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Executive Lead-in Section */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-16 sm:pt-20 pb-6 text-center">
        <span className="inline-block px-3.5 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider mb-3">
          Certified Cloud Specialists
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4 font-poppins">
          Run Your Business on the World&apos;s Leading Accounting Platforms
        </h2>
        <div className="w-16 h-1 bg-[#368b82] mx-auto rounded-full mb-5" />
        <p className="max-w-3xl mx-auto text-gray-600 text-sm sm:text-base leading-relaxed">
          The foundation of rapid business scalability is accurate, automated financial management. With Support Help, your team focuses on growth while our certified accountants manage cloud ledgers, automate banking feeds, and handle complex reporting seamlessly.
        </p>
      </section>

      {/* 4. Software Platforms 3D Interactive Cards Grid */}
      <section className="w-full py-8 sm:py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {softwareList.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="group relative bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-7 flex flex-col justify-between text-center shadow-xs hover:shadow-[0_22px_45px_-10px_rgba(54,139,130,0.22)] hover:border-[#368b82] hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Top Subtle Hover Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#368b82] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Corner Ambient Glow */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#368b82]/5 rounded-full blur-2xl group-hover:bg-[#368b82]/20 transition-all duration-500 pointer-events-none" />

                <div className="space-y-4 relative z-10 flex flex-col items-center">
                  {/* Logo Container */}
                  <div className="relative w-full h-20 sm:h-24 flex items-center justify-center p-3 rounded-2xl bg-gray-50/80 group-hover:bg-[#edf7f6]/60 transition-colors duration-300 border border-gray-100 group-hover:border-[#368b82]/20">
                    <Image
                      src={item.logo}
                      alt={item.title}
                      fill
                      unoptimized
                      priority
                      className="object-contain p-2 group-hover:scale-108 transition-transform duration-300"
                    />
                  </div>

                  {/* Status Tag with pulse dot */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-[#368b82] bg-[#edf7f6] border border-[#368b82]/20 font-poppins shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {item.status}
                  </span>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-extrabold text-gray-900 group-hover:text-[#368b82] transition-colors tracking-tight uppercase">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-poppins line-clamp-2">
                    {item.desc}
                  </p>

                  {/* Tags Pill Row */}
                  <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-medium text-gray-600 bg-gray-100/90 px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Interactive Row */}
                <div className="pt-4 mt-5 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#368b82] uppercase tracking-wider relative z-10 w-full">
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    Explore Platform
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#edf7f6] group-hover:bg-[#368b82] text-[#368b82] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-2xs">
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Outsource Software Management (4-Pillar Grid) */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-14 sm:py-18">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            Enterprise Value
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight font-poppins">
            Why Entrust Your Accounting Software to Us?
          </h2>
          <div className="w-16 h-1 bg-[#368b82] mx-auto rounded-full" />
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Eliminate system errors, avoid late reporting penalties, and unlock real-time financial transparency with specialized accounting technicians.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-gray-200/90 shadow-xs hover:shadow-xl hover:border-[#368b82] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#edf7f6] group-hover:bg-[#368b82] text-[#368b82] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:scale-105">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#368b82] transition-colors leading-snug">
                    {adv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-poppins">
                    {adv.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Software Setup & Migration Workflow */}
      <section className="bg-gradient-to-b from-[#edf7f6]/50 via-white to-[#edf7f6]/30 py-16 sm:py-20 border-y border-gray-200/80">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider">
              Seamless Transition
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight font-poppins">
              Our 4-Step Software Migration &amp; Setup Process
            </h2>
            <div className="w-16 h-1 bg-[#368b82] mx-auto rounded-full" />
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Transition smoothly to any cloud accounting system with zero downtime and guaranteed data integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {migrationSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-xs hover:shadow-lg hover:border-[#368b82] transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl sm:text-3xl font-black text-[#368b82]/25 group-hover:text-[#368b82] transition-colors font-poppins">
                    {step.step}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#edf7f6] text-[#368b82] flex items-center justify-center text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-[#368b82] transition-colors mb-2 font-poppins">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-poppins">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Worldwide Global Delivery Section */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16 sm:py-20">
        <div className="relative bg-gradient-to-br from-white via-gray-50/70 to-[#edf7f6]/50 border border-gray-200/90 rounded-3xl p-8 sm:p-12 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            {/* Left Column: Country Map Illustration */}
            <div className="md:col-span-5 flex justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#368b82]/15 to-blue-500/10 rounded-full blur-2xl -z-10" />
              <div className="relative w-full max-w-[340px] aspect-square group">
                <Image
                  src="/software/country.png"
                  alt="Worldwide Accounting Software Support"
                  fill
                  unoptimized
                  priority
                  className="object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right Column: Narrative & Highlights */}
            <div className="md:col-span-7 space-y-5">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider">
                Cross-Border Compliance
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight font-poppins">
                Stay Up to Date, Anytime, Anywhere
              </h2>
              <div className="w-16 h-1 bg-[#368b82] rounded-full" />
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-poppins">
                With quality and timely accounting software services provided by Support Help, you can stay ahead of reporting deadlines and handle corporate finances with effortless confidence.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-poppins">
                Whether managing an agile tech startup or a multi-location enterprise, our team delivers custom integrations, API workflows, and tax-aligned chart of accounts across four continents.
              </p>

              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200/90 shadow-2xs text-xs font-bold text-gray-800 font-poppins">
                  <CheckCircle2 className="w-4 h-4 text-[#368b82]" />
                  <span>United States GAAP Standards</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200/90 shadow-2xs text-xs font-bold text-gray-800 font-poppins">
                  <CheckCircle2 className="w-4 h-4 text-[#368b82]" />
                  <span>Australian IFRS &amp; BAS Regulations</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200/90 shadow-2xs text-xs font-bold text-gray-800 font-poppins">
                  <CheckCircle2 className="w-4 h-4 text-[#368b82]" />
                  <span>UK HMRC &amp; Making Tax Digital (MTD)</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/free-consultation"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#368b82] hover:bg-[#286b64] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>Book a Software Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Contact Section */}
      <IndustryCoffeeSection industryName="Software Expertise" />
    </main>
  );
}
