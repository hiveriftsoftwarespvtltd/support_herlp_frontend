"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function HomeSoftwareSection() {
  const softwareBadges = [
    {
      name: "MYOB",
      href: "/software-expertise/myob",
      logo: "/software/myob.png",
      alt: "MYOB Certified Consultant Logo",
      status: "Certified Partner",
    },
    {
      name: "QuickBooks",
      href: "/software-expertise/quickbooks",
      logo: "/software/quickbooks.png",
      alt: "Intuit QuickBooks Certified ProAdvisor Logo",
      status: "ProAdvisor",
    },
    {
      name: "ZohoBooks",
      href: "/software-expertise/zohobooks",
      logo: "/software/zoho.png",
      alt: "Zoho Certified Advisor Logo",
      status: "Authorized Advisor",
    },
    {
      name: "Xero",
      href: "/software-expertise/xero",
      logo: "/software/xero-badge.png",
      alt: "Xero Certified Advisor Logo",
      status: "Certified Advisor",
    },
    {
      name: "Sage",
      href: "/software-expertise/sage",
      logo: "/software/sage.png",
      alt: "Sage One Certified Adviser Logo",
      status: "Certified Partner",
    },
    {
      name: "Epicor",
      href: "/software-expertise/epicor",
      logo: "/software/epicor.png",
      alt: "Epicor Certified Partner Logo",
      status: "Enterprise Partner",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-gray-200 relative overflow-hidden">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Text & Badges */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider">
                Tech Ecosystem
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-poppins text-gray-900 uppercase tracking-tight leading-tight">
                SOFTWARE WE WORK WITH
              </h2>
              <div className="w-16 h-1 bg-[#368b82] rounded-full" />
              <p className="text-sm sm:text-base text-gray-600 font-poppins leading-relaxed pt-1">
                Our accounting staff has deep certified expertise across industry-leading cloud and ERP systems. We adapt seamlessly to your existing workflows to deliver rapid turnaround times and <strong>&ldquo;tailor-made&rdquo;</strong> financial efficiency.
              </p>
            </div>

            {/* Software badges list with interactive elevated cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              {softwareBadges.map((s, idx) => (
                <Link
                  key={idx}
                  href={s.href}
                  className="group relative flex flex-col items-center justify-center p-3 sm:p-4 border border-gray-200/90 rounded-2xl bg-white hover:border-[#368b82] hover:shadow-[0_14px_30px_-6px_rgba(54,139,130,0.18)] hover:-translate-y-1.5 transition-all duration-300 h-[88px] sm:h-[96px] cursor-pointer overflow-hidden"
                >
                  {/* Subtle Inner Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#edf7f6]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative w-full h-[46px] sm:h-[50px] flex items-center justify-center z-10">
                    <Image
                      src={s.logo}
                      alt={s.alt}
                      width={160}
                      height={55}
                      className="max-h-[44px] sm:max-h-[48px] w-auto max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Micro Status Tag */}
                  <span className="text-[10px] font-semibold text-gray-400 group-hover:text-[#368b82] transition-colors mt-1 font-poppins flex items-center gap-1 z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {s.status}
                  </span>
                </Link>
              ))}
            </div>

            {/* Check More Software CTA Button */}
            <div className="pt-2">
              <Link
                href="/software-expertise"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-gray-50 hover:bg-[#edf7f6] border border-gray-200 hover:border-[#368b82] text-gray-900 hover:text-[#368b82] font-bold font-poppins text-sm transition-all duration-200 shadow-2xs hover:shadow-sm"
              >
                <span>Check More Software Platforms</span>
                <ArrowRight className="w-4 h-4 text-[#368b82] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right: Illustration Image with Ambient Glow */}
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="relative w-full max-w-[480px] aspect-[507/477]">
              {/* Soft Ambient Radial Behind Image */}
              <div className="absolute inset-0 bg-gradient-to-bl from-[#368b82]/15 via-transparent to-teal-400/10 rounded-3xl blur-2xl -z-10" />

              <Image
                src="/software_right_with_color.png"
                alt="Software We Work With"
                fill
                className="object-contain filter drop-shadow-md hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSoftwareSection;

