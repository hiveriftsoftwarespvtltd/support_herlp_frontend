"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, Star, Zap, DollarSign } from "lucide-react";

export function HomeStatsBar() {
  const stats = [
    {
      title: "Highest Satisfied Customer",
      desc: "Trusted by 500+ global enterprises & CPA practices",
      badge: "99% Retention",
      img: "/highiest_img.png",
      badgeColor: "bg-[#edf7f6] text-[#368b82] border-[#368b82]/20",
    },
    {
      title: "Fast Turn Around",
      desc: "Guaranteed 24–48 hour monthly close SLA",
      badge: "24-48h SLA",
      img: "/fast_turn_img.png",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      title: "Best Affordable Services",
      desc: "Save up to 50% on operational accounting costs",
      badge: "Save Up To 50%",
      img: "/best_service_img.png",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  ];

  return (
    <section className="w-full">
      {/* 1. Branded Trust Banner */}
      <div className="relative bg-gradient-to-r from-[#edf7f6] via-white to-[#edf7f6] py-5 sm:py-6 border-b border-gray-200 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#368b82_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
        <div className="relative z-10 max-w-[1400px] mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/25 text-[#368b82] text-xs font-bold tracking-wider uppercase">
            Trusted Global Partner
          </span>
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold font-poppins text-gray-800 tracking-tight flex flex-wrap items-center justify-center gap-2">
            <span className="text-[#368b82]">Support Help</span>
            <span className="text-gray-600 font-normal">– Expert Accounting &amp; Bookkeeping Solutions You Can Rely On</span>
          </h2>
        </div>
      </div>

      {/* 2. Three Metric Highlights with Live Hover Cards */}
      <div className="bg-white border-b border-gray-200 py-8 sm:py-10 px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="group relative flex items-center gap-5 p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/90 shadow-xs hover:shadow-[0_16px_36px_-8px_rgba(54,139,130,0.2)] hover:border-[#368b82] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Corner Ambient Glow */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#368b82]/5 rounded-full blur-xl group-hover:bg-[#368b82]/20 transition-all duration-500 pointer-events-none" />

              {/* Bottom Subtle Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#368b82] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon Container with Gradient & Micro-interaction */}
              <div className="relative w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-[#edf7f6] via-white to-[#dbefe9] p-2.5 flex items-center justify-center border border-[#368b82]/25 shadow-xs group-hover:scale-110 group-hover:rotate-2 group-hover:border-[#368b82] transition-transform duration-300">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={54}
                  height={54}
                  className="object-contain filter drop-shadow-xs"
                />
              </div>

              {/* Content */}
              <div className="space-y-1.5 z-10 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold font-poppins border ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold font-poppins text-gray-900 group-hover:text-[#368b82] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 font-poppins leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeStatsBar;

