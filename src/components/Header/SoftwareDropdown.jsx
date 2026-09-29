"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { softwareData as fallbackSoftwareData } from "@/data/navigationData";
import { softwareApi } from "@/api";

export function SoftwareDropdown({ isOpen, onClose }) {
  const [softwares, setSoftwares] = useState(fallbackSoftwareData);

  // Fetch live software platforms from MongoDB
  useEffect(() => {
    async function loadSoftwares() {
      try {
        const res = await softwareApi.getSoftwares({ isPublished: true });
        if (res?.data && res.data.length > 0) {
          const items = res.data.map((item) => ({
            name: item.name,
            href: `/software-expertise/${(item.slug || "").replace(/^\/+/, "")}`,
            desc: item.desc || `Certified ${item.name} Accounting & Bookkeeping`,
          }));
          setSoftwares(items);
        }
      } catch (err) {
        // Fallback to static navigation data
      }
    }
    loadSoftwares();
  }, []);

  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[94vw] max-w-[880px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-gray-200/90 rounded-b-xl z-50 transition-all duration-200 animate-fadeIn overflow-hidden"
    >
      <div className="p-6 sm:p-7 flex flex-col md:flex-row gap-8 items-stretch">
        {/* Left Column: Software Navigation Links (100% Clean Solid White Background, No Logos Overlap) */}
        <div className="w-full md:w-[320px] shrink-0 flex flex-col">
          <div className="pb-2.5 mb-2 border-b border-gray-100 flex items-center justify-between">
            <span className="text-[12px] font-bold text-[#368b82] uppercase tracking-wider font-poppins">
              Accounting Platforms
            </span>
            <span className="text-[11px] text-gray-400 font-medium">
              {softwares.length} Available
            </span>
          </div>

          <div className="max-h-[350px] overflow-y-auto space-y-0.5 pr-2 custom-scrollbar">
            {softwares.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={onClose}
                className="py-2.5 px-3 rounded-lg border-b border-gray-100/80 last:border-b-0 text-[14px] font-poppins font-medium text-gray-700 hover:text-[#368b82] hover:bg-[#edf7f6] hover:pl-4 transition-all duration-150 flex items-center justify-between group block text-left"
              >
                <span className="capitalize">{item.name}</span>
                <span className="text-gray-300 group-hover:text-[#368b82] transition-colors text-xs">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column: Dedicated Partner Logos Aligned Neatly on the Right Side */}
        <div className="hidden md:flex flex-col justify-between flex-1 pl-8 border-l border-gray-100">
          <div className="space-y-3">
            <span className="text-[12px] font-bold text-gray-900 uppercase tracking-wider font-poppins block">
              Certified Software Expertise:
            </span>
            <p className="text-xs text-gray-500 leading-relaxed font-poppins">
              Our accounting specialists are certified across the world&apos;s leading financial platforms. We handle end-to-end setup, cleanup, and daily bookkeeping.
            </p>

            {/* Logos Grid - Right-Aligned and Professional */}
            <div className="grid grid-cols-3 gap-3.5 pt-2">
              <div className="h-11 bg-gray-50 hover:bg-white border border-gray-200/80 rounded-xl p-2 flex items-center justify-center transition-all shadow-2xs hover:shadow-xs">
                <Image
                  src="/software/quickbooks.png"
                  alt="QuickBooks ProAdvisor"
                  width={110}
                  height={32}
                  className="max-h-7 w-auto object-contain"
                />
              </div>
              <div className="h-11 bg-gray-50 hover:bg-white border border-gray-200/80 rounded-xl p-2 flex items-center justify-center transition-all shadow-2xs hover:shadow-xs">
                <Image
                  src="/software/xero.png"
                  alt="Xero Certified Advisor"
                  width={90}
                  height={32}
                  className="max-h-7 w-auto object-contain"
                />
              </div>
              <div className="h-11 bg-gray-50 hover:bg-white border border-gray-200/80 rounded-xl p-2 flex items-center justify-center transition-all shadow-2xs hover:shadow-xs">
                <Image
                  src="/software/zoho.png"
                  alt="Zoho Books Advisor"
                  width={90}
                  height={32}
                  className="max-h-7 w-auto object-contain"
                />
              </div>
              <div className="h-11 bg-gray-50 hover:bg-white border border-gray-200/80 rounded-xl p-2 flex items-center justify-center transition-all shadow-2xs hover:shadow-xs">
                <Image
                  src="/software/sage.png"
                  alt="Sage One Adviser"
                  width={90}
                  height={32}
                  className="max-h-7 w-auto object-contain"
                />
              </div>
              <div className="h-11 bg-gray-50 hover:bg-white border border-gray-200/80 rounded-xl p-2 flex items-center justify-center transition-all shadow-2xs hover:shadow-xs">
                <Image
                  src="/software/myob.png"
                  alt="MYOB Certified"
                  width={90}
                  height={32}
                  className="max-h-7 w-auto object-contain"
                />
              </div>
              <div className="h-11 bg-gray-50 hover:bg-white border border-gray-200/80 rounded-xl p-2 flex items-center justify-center transition-all shadow-2xs hover:shadow-xs">
                <Image
                  src="/software/epicor.png"
                  alt="Epicor Partner"
                  width={90}
                  height={32}
                  className="max-h-7 w-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Bottom: Consultation CTA Banner */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#edf7f6] to-[#e4f2f0] border border-[#368b82]/20 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#286b64] font-poppins block">
                Need Help Selecting or Migrating Software?
              </span>
              <p className="text-[11px] text-gray-600 font-poppins">
                Book a free 30-min setup & workflow review.
              </p>
            </div>
            <Link
              href="/free-consultation"
              onClick={onClose}
              className="px-4 py-2 bg-[#368b82] hover:bg-[#286b64] text-white text-xs font-bold font-poppins rounded-lg whitespace-nowrap shadow-xs hover:shadow transition-all cursor-pointer"
            >
              Book Call
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SoftwareDropdown;
