"use client";

import React from "react";
import Link from "next/link";
import { industriesData } from "@/data/navigationData";

export function IndustriesMegaMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[98vw] max-w-[1280px] bg-white shadow-2xl border border-gray-200/90 rounded-b-md z-50 transition-all duration-200 animate-fadeIn overflow-hidden"
      style={{
        boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="p-6 md:p-8">
        {/* 3 Column Grid (21 Industries) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-1">
          {industriesData.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col space-y-0.5">
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

        {/* Bottom Banner: Leading Software Partners */}
        <div className="mt-8 pt-5 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 -mx-6 md:-mx-8 -mb-6 md:-mb-8 px-8 py-4 bg-gray-50/70 rounded-b-md">
          <div className="text-[13px] normal-case font-bold text-gray-800 font-poppins shrink-0">
            We Work With Leading Accounting Software:
          </div>
          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <span className="font-extrabold text-[#612b77] text-base tracking-tight font-sans">
              myob
            </span>
            <div className="flex items-center gap-1.5 font-bold text-[#2ca01c] font-sans">
              <span className="w-5 h-5 rounded-full bg-[#2ca01c] text-white text-[10px] flex items-center justify-center font-black">
                qb
              </span>
              <span className="text-gray-800 text-xs font-bold">quickbooks</span>
            </div>
            <span className="font-black text-[#008db9] text-xs tracking-wider font-sans">
              EPICOR
            </span>
            <span className="font-bold text-[#13b5ea] text-xs font-sans">
              xero
            </span>
            <span className="font-bold text-[#00d639] text-sm font-sans">
              sage
            </span>
            <div className="flex items-center gap-0.5 text-[11px] font-black font-sans">
              <span className="px-1 border border-red-500 text-red-500 rounded text-[10px]">Z</span>
              <span className="px-1 border border-green-500 text-green-500 rounded text-[10px]">O</span>
              <span className="px-1 border border-blue-500 text-blue-500 rounded text-[10px]">H</span>
              <span className="px-1 border border-yellow-500 text-yellow-500 rounded text-[10px]">O</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndustriesMegaMenu;
