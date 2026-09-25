"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export function HomeAboutSection() {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-gray-200 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#368b82]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-12 sm:space-y-16">
        {/* Main Title with Pill Header */}
        <div className="text-center max-w-4xl mx-auto space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider">
            Who We Are
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-poppins text-gray-900 tracking-tight leading-snug">
            Best Accounting Firm by Certified Bookkeeper and Accountant
          </h1>
          <div className="w-16 h-1 bg-[#368b82] mx-auto rounded-full" />
        </div>

        {/* Content Row: Image + Text & Profiles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Illustration Photo with Floating Stat Card */}
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="relative w-full max-w-[480px] aspect-[509/478]">
              {/* Soft Ambient Radial Behind Image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#368b82]/15 via-transparent to-blue-500/10 rounded-3xl blur-2xl -z-10" />

              <Image
                src="/about_left_img.png"
                alt="Support Help Team"
                fill
                className="object-contain filter drop-shadow-md hover:scale-[1.02] transition-transform duration-500"
              />

              {/* Floating Glassmorphism Metric Badge */}
              <div className="absolute -bottom-3 -left-2 sm:bottom-4 sm:left-2 bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-2xl p-4 shadow-xl flex items-center gap-3.5 animate-fadeIn">
                <div className="w-12 h-12 rounded-xl bg-[#368b82] text-white flex items-center justify-center shadow-sm shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black font-poppins text-gray-900 leading-none">
                    15+ <span className="text-[#368b82] text-base">Years</span>
                  </div>
                  <p className="text-xs text-gray-500 font-poppins mt-0.5">
                    Global Financial Excellence
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text & Leadership Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-gray-900">
                About Us
              </h2>
              <div className="space-y-4 text-gray-600 font-poppins text-sm sm:text-base leading-relaxed">
                <p>
                  Support Help is one of the leading and reputed accounting &amp; bookkeeping firms providing Outsourcing Solutions to multiple segments. Our main focus is to serve the accounting services to your firm to get established and improve efficiency and reduce costs.
                </p>
                <p>
                  We are dedicated to helping a variety of businesses by providing affordable yet quality services to them. Our expert professionals provide the required support at each stage to ensure the progress of your business. We also help businesses with the legal and regulatory requirements, along with regular accounting and bookkeeping services...{" "}
                  <Link
                    href="/about-us"
                    className="inline-flex items-center gap-1 text-[#368b82] font-semibold hover:underline"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </p>
              </div>
            </div>

            {/* Value Pillars Highlights - Without Personal Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-200/90 bg-gray-50/70 hover:bg-[#edf7f6]/60 hover:border-[#368b82] transition-all">
                <div className="w-8 h-8 rounded-lg bg-[#368b82]/10 text-[#368b82] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold font-poppins text-gray-800">
                  Certified CPAs &amp; Bookkeeping Pros
                </span>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-200/90 bg-gray-50/70 hover:bg-[#edf7f6]/60 hover:border-[#368b82] transition-all">
                <div className="w-8 h-8 rounded-lg bg-[#368b82]/10 text-[#368b82] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold font-poppins text-gray-800">
                  100% Confidential &amp; NDA Compliant
                </span>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-200/90 bg-gray-50/70 hover:bg-[#edf7f6]/60 hover:border-[#368b82] transition-all">
                <div className="w-8 h-8 rounded-lg bg-[#368b82]/10 text-[#368b82] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold font-poppins text-gray-800">
                  Fast 24–48h Turnaround on Close
                </span>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-200/90 bg-gray-50/70 hover:bg-[#edf7f6]/60 hover:border-[#368b82] transition-all">
                <div className="w-8 h-8 rounded-lg bg-[#368b82]/10 text-[#368b82] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold font-poppins text-gray-800">
                  Save Up to 50% on Operating Costs
                </span>
              </div>
            </div>

            {/* Learn More CTA */}
            <div className="pt-2">
              <Link
                href="/about-us"
                className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-lg bg-[#368b82] hover:bg-[#286b64] text-white font-bold font-poppins text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeAboutSection;

