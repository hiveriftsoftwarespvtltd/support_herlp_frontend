"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { servicesData } from "@/data/navigationData";

export function ServicesMegaMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 md:-left-20 w-[94vw] max-w-[620px] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.15)] border border-gray-200/90 rounded-b-md z-50 transition-all duration-200 animate-fadeIn"
    >
      <div className="p-6">
        {/* 2 Columns of Service Links with row dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
          {servicesData.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col">
              {col.items.map((item, itemIdx) => (
                <Link
                  key={itemIdx}
                  href={item.href}
                  onClick={onClose}
                  className="py-2.5 px-1 border-b border-[#f0f0f0] text-[14px] normal-case font-poppins font-normal text-[#333333] hover:text-[#368b82] hover:pl-2 transition-all duration-150 block text-left"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Certified Badges Bar */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-[13px] font-bold text-[#1a202c] font-poppins mb-3.5 tracking-tight">
            We Are Certified Accounting Firm:
          </p>
          <div className="flex flex-wrap items-center gap-5 sm:gap-7">
            <div className="relative h-8 w-24">
              <Image
                src="/software/zoho_inner.png"
                alt="Certified Zoho Advisor"
                fill
                className="object-contain object-left"
              />
            </div>
            <div className="relative h-8 w-28">
              <Image
                src="/software/sage_inner.png"
                alt="Certified Sage One Adviser"
                fill
                className="object-contain object-left"
              />
            </div>
            <div className="relative h-8 w-28">
              <Image
                src="/software/xero_inner.png"
                alt="Certified Xero Advisor"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesMegaMenu;
