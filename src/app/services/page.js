import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PageHeroBanner } from "@/components/Common/PageHeroBanner";
import { IndustryCoffeeSection } from "@/components/Common/IndustryCoffeeSection";
import { Check, ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";

export const metadata = {
  title: "Accounting & Bookkeeping Services – Support Help",
  description: "Avail high quality and world class accounting and bookkeeping services at affordable prices by certified professionals.",
};

const coreServices = [
  {
    title: "COMPLETE BOOKKEEPING",
    slug: "bookkeeping",
    href: "/services/bookkeeping",
    icon: "/services/icon_bookkeeping.png",
    description: "Custom accounting services for businesses of all scales utilizing automated ledgers, bank feeds, and accurate reconciliations."
  },
  {
    title: "ACCOUNTING SERVICES",
    slug: "accounting",
    href: "/services/accounting",
    icon: "/services/icon_accounting.png",
    description: "Full-cycle accounting and controllership ensuring statutory compliance, clean general ledgers, and audit readiness."
  },
  {
    title: "ACCOUNTS RECEIVABLE",
    slug: "accounts-receivable",
    href: "/services/accounts-receivable",
    icon: "/services/icon_accounts-receivable.png",
    description: "Accelerate your cash collection cycles with timely invoice dispatch, dispute resolution, and automated debtor tracking."
  },
  {
    title: "ACCOUNTS PAYABLE",
    slug: "accounts-payable",
    href: "/services/accounts-payable",
    icon: "/services/icon_accounts-payable.png",
    description: "Streamlined vendor bill validation, PO 3-way matching, and automated approvals to maintain spotless supplier relations."
  },
  {
    title: "PAYROLL SOLUTION",
    slug: "payroll-management",
    href: "/services/payroll-management",
    icon: "/services/icon_payroll-management.png",
    description: "Hassle-free payroll processing, tax withholdings, direct deposits, and compliance reporting across multi-state workforces."
  },
  {
    title: "FINANCIAL REPORTING",
    slug: "financial-reporting",
    href: "/services/financial-reporting",
    icon: "/services/icon_financial-reporting.png",
    description: "Actionable monthly balance sheets, P&L statements, cashflow forecasts, and custom KPI executive dashboards."
  },
  {
    title: "CPA FIRMS CAPACITY",
    slug: "cpa-firms",
    href: "/services/cpa-firms",
    icon: "/services/icon_cpa-firms.png",
    description: "Dedicated outsourced staff and surge capacity for CPA firms to scale up during busy tax seasons without payroll overhead."
  },
  {
    title: "VIRTUAL SERVICES",
    slug: "virtual-accountant-bookkeeper",
    href: "/services/virtual-accountant-bookkeeper",
    icon: "/services/icon_virtual-accountant-bookkeeper.png",
    description: "24/7 secure cloud accounting and virtual bookkeeper access from anywhere in the world on enterprise-grade infrastructure."
  },
  {
    title: "BACK OFFICE OPERATIONS",
    slug: "back-office-operations",
    href: "/services/back-office-operations",
    icon: "/services/icon_back-office-operations.png",
    description: "Comprehensive administrative and financial back-office operations to streamline operations and save executive hours."
  },
  {
    title: "PARA-PLANNING SERVICES",
    slug: "para-planning-services",
    href: "/services/para-planning-services",
    icon: "/services/icon_para-planning-services.png",
    description: "Specialized paraplanning support for financial planners and wealth advisors to optimize research and client reports."
  },
  {
    title: "CLEANUP / CATCH UP WORK",
    slug: "cleanup-catchup-work",
    href: "/services/cleanup-catchup-work",
    icon: "/services/icon_cleanup-catchup-work.png",
    description: "Rapid catch-up bookkeeping for neglected or backlog records, bringing your past months into 100% tax-compliant order."
  },
  {
    title: "MIGRATION SERVICES",
    slug: "migration-services",
    href: "/services/migration-services",
    icon: "/services/icon_migration-services.png",
    description: "Seamless data migration between major cloud platforms like QuickBooks, Xero, Zoho, Sage with zero downtime."
  }
];

const outsourceList = [
  "Complete Bookkeeping & Ledger Maintenance",
  "Accounts Receivable & Invoicing",
  "Accounts Payable & Bill Matching",
  "Debtor Aging & Collections Management",
  "Sales Tax & Statutory Compliance Returns",
  "Comprehensive Back Office Operations",
  "Tailored Industry-Specific Accounting"
];

export default function ServicesPage() {
  return (
    <main className="w-full bg-[#fafbfc] font-poppins">
      {/* 1. Page Hero Banner with Modern Styling */}
      <PageHeroBanner
        title="OUR CORE SERVICES"
        subtitle="High-quality, world-class bookkeeping and certified accounting services designed for startups, growing enterprises, and CPA practices."
        category="Services"
        categoryHref="/services"
      />

      {/* 2. Intro Section with Enhanced Header */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-12 sm:pt-16 pb-8 text-center">
        <span className="inline-block px-3.5 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider mb-3">
          World-Class Standards
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          Avail High Quality Services at Affordable Prices
        </h2>
        <div className="w-16 h-1 bg-[#368b82] mx-auto rounded-full mb-5" />
        <p className="max-w-3xl mx-auto text-gray-600 text-sm sm:text-base leading-relaxed">
          Our bookkeeping services focus on cost management and operating efficiency. Our dedicated team of certified accounting professionals fulfills your business processes with tailor-made accuracy, saving you up to 50% on financial overhead.
        </p>
      </section>

      {/* 3. 12 Services Grid with 3D Hover Elevation Cards */}
      <section className="w-full py-12 sm:py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {coreServices.map((service, idx) => (
              <Link
                key={idx}
                href={service.href}
                className="group relative bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-[0_22px_45px_-10px_rgba(54,139,130,0.22)] hover:border-[#368b82] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
              >
                {/* Top Subtle Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#368b82] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Corner Ambient Glow */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#368b82]/5 rounded-full blur-2xl group-hover:bg-[#368b82]/20 transition-all duration-500 pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  {/* Icon Wrapper */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#edf7f6] via-white to-[#dbefe9] p-3 flex items-center justify-center border border-[#368b82]/20 shadow-2xs group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300">
                    <div className="relative w-full h-full">
                      <Image
                        src={service.icon}
                        alt={service.title}
                        fill
                        className="object-contain filter drop-shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#368b82] transition-colors uppercase tracking-tight leading-snug">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed font-poppins line-clamp-3">
                    {service.description}
                  </p>
                </div>

                {/* Footer Interactive Row */}
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#368b82] uppercase tracking-wider relative z-10">
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    Explore Details
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#edf7f6] group-hover:bg-[#368b82] text-[#368b82] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-2xs">
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Outsource Bookkeeping Services to Us Section */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-14 sm:py-20 border-t border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Elevated Checklist Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-white via-gray-50/70 to-[#edf7f6]/50 border border-gray-200/90 rounded-3xl p-7 sm:p-9 shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-1 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#368b82]">
                Full Outsourcing Coverage
              </span>
              <h3 className="text-xl font-extrabold text-gray-900 font-poppins">
                What We Handle For You
              </h3>
            </div>
            <ul className="space-y-3.5">
              {outsourceList.map((item, idx) => (
                <li key={idx} className="flex items-center space-x-3 text-gray-800">
                  <div className="w-6 h-6 rounded-lg bg-[#368b82] text-white flex items-center justify-center shadow-2xs shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 font-poppins">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Outsource Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider">
              Strategic Outsourcing
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight font-poppins">
              Outsource Bookkeeping Services to Us
            </h2>
            <div className="w-16 h-1 bg-[#368b82] rounded-full" />
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-poppins">
              We are a trusted partner for outsourcing bookkeeping services globally. We provide highly professional, credentialed accountants to our clients, supporting them in performing complex audit and statutory reporting systematically.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-poppins">
              Some of our integral outsourcing services include quality accounting, tax filings, software integration, and surge team solutions. Invoice processing, payroll compliance, labor cost optimization, and reconciliation are delivered with guaranteed 24–48h SLAs.
            </p>
          </div>
        </div>
      </section>

      {/* 5. LET'S HAVE A CUP OF COFFEE! Contact Section */}
      <IndustryCoffeeSection industryName="Services" />
    </main>
  );
}

