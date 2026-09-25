"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Calculator,
  ArrowDownLeft,
  ArrowUpRight,
  Users,
  PieChart,
  Briefcase,
  MonitorCheck,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

export function HomeServicesSection() {
  const servicesList = [
    {
      title: "COMPLETE BOOKKEEPING",
      desc: "Custom bookkeeping services for growing businesses utilizing automated ledgers, bank feeds, and accurate reconciliations.",
      href: "/services/bookkeeping",
      icon: BookOpen,
      iconColor: "text-[#368b82]",
      bgColor: "bg-[#edf7f6] border-[#368b82]/20",
      accentGlow: "group-hover:bg-[#368b82]/20",
    },
    {
      title: "ACCOUNTING SERVICES",
      desc: "Full-cycle accounting and controllership ensuring statutory compliance, clean general ledgers, and audit readiness.",
      href: "/services/accounting",
      icon: Calculator,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50 border-blue-200",
      accentGlow: "group-hover:bg-blue-400/20",
    },
    {
      title: "ACCOUNTS RECEIVABLE",
      desc: "Accelerate your cash collection cycles with timely invoice dispatch, dispute resolution, and automated debtor tracking.",
      href: "/services/accounts-receivable",
      icon: ArrowDownLeft,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50 border-emerald-200",
      accentGlow: "group-hover:bg-emerald-400/20",
    },
    {
      title: "ACCOUNTS PAYABLE",
      desc: "Streamlined vendor bill validation, PO 3-way matching, and automated approvals to maintain spotless supplier relations.",
      href: "/services/accounts-payable",
      icon: ArrowUpRight,
      iconColor: "text-rose-600",
      bgColor: "bg-rose-50 border-rose-200",
      accentGlow: "group-hover:bg-rose-400/20",
    },
    {
      title: "PAYROLL SOLUTION",
      desc: "Hassle-free payroll processing, tax withholdings, direct deposits, and compliance reporting across multi-state workforces.",
      href: "/services/payroll-management",
      icon: Users,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50 border-purple-200",
      accentGlow: "group-hover:bg-purple-400/20",
    },
    {
      title: "FINANCIAL REPORTING",
      desc: "Actionable monthly balance sheets, P&L statements, cashflow forecasts, and custom KPI executive dashboards.",
      href: "/services/financial-reporting",
      icon: PieChart,
      iconColor: "text-cyan-600",
      bgColor: "bg-cyan-50 border-cyan-200",
      accentGlow: "group-hover:bg-cyan-400/20",
    },
    {
      title: "ACCOUNTING FOR CPA FIRMS",
      desc: "Dedicated outsourced staff and surge capacity for CPA firms to scale up during busy tax seasons without payroll overhead.",
      href: "/services/cpa-firms",
      icon: Briefcase,
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-50 border-indigo-200",
      accentGlow: "group-hover:bg-indigo-400/20",
    },
    {
      title: "VIRTUAL SERVICES",
      desc: "24/7 secure cloud accounting and virtual bookkeeper access from anywhere in the world on enterprise-grade infrastructure.",
      href: "/services/virtual-accountant-bookkeeper",
      icon: MonitorCheck,
      iconColor: "text-teal-600",
      bgColor: "bg-teal-50 border-teal-200",
      accentGlow: "group-hover:bg-teal-400/20",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50/70 border-b border-gray-200 relative overflow-hidden">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#368b82]/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider">
            Tailored Financial Expertise
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-poppins text-gray-900 tracking-tight uppercase">
            OUR CORE SERVICES
          </h2>
          <div className="w-16 h-1 bg-[#368b82] mx-auto rounded-full" />
          <p className="text-xs sm:text-sm text-gray-500 font-poppins leading-relaxed">
            End-to-end bookkeeping, payroll, and advisory solutions crafted for high-growth enterprises and certified accounting firms.
          </p>
        </div>

        {/* 8 Services Grid with Live Interactive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Link
                key={idx}
                href={service.href}
                className="group relative bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 hover:shadow-[0_20px_40px_-12px_rgba(54,139,130,0.22)] hover:border-[#368b82] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
              >
                {/* Top Subtle Hover Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#368b82] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Corner Ambient Glow */}
                <div
                  className={`absolute -top-12 -right-12 w-28 h-28 bg-gray-100 rounded-full blur-2xl ${service.accentGlow} transition-all duration-500 pointer-events-none`}
                />

                <div className="space-y-4 relative z-10">
                  {/* Icon Container with Micro-interaction */}
                  <div
                    className={`w-14 h-14 rounded-2xl ${service.bgColor} border flex items-center justify-center ${service.iconColor} group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300 shadow-xs`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-base font-poppins text-gray-900 group-hover:text-[#368b82] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-gray-500 font-poppins leading-relaxed line-clamp-3">
                    {service.desc}
                  </p>
                </div>

                {/* Read More Link & Animated Circle Arrow */}
                <div className="pt-5 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#368b82] uppercase tracking-wider relative z-10">
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    Explore Details
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#edf7f6] group-hover:bg-[#368b82] text-[#368b82] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-2xs">
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center pt-4">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2.5 bg-[#368b82] hover:bg-[#286b64] text-white px-8 py-3.5 rounded-lg text-sm font-bold font-poppins uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-0.5"
          >
            <span>Check Out More Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeServicesSection;

