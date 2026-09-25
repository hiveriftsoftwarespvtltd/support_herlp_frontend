"use client";

import React from "react";
import Link from "next/link";
import { softwareData } from "@/data/navigationData";

export function SoftwareDropdown({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[94vw] max-w-[860px] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.18)] border border-gray-200/90 rounded-b-md z-50 transition-all duration-200 animate-fadeIn overflow-hidden"
      style={{
        backgroundImage: "url('/software/drop-down_software.jpg')",
        backgroundPosition: "right bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <div className="p-6 sm:p-8 min-h-[380px] flex flex-col justify-between">
        {/* Left Column of Software Links */}
        <div className="w-full max-w-[280px] space-y-0.5 bg-white/70 sm:bg-transparent backdrop-blur-2xs sm:backdrop-blur-none rounded-lg p-2 sm:p-0">
          {softwareData.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              onClick={onClose}
              className="py-2.5 px-2 border-b border-[#e3e3e3] last:border-b-0 text-[15px] font-poppins font-normal text-[#333333] hover:text-[#368b82] hover:pl-3.5 transition-all duration-150 block text-left capitalize"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SoftwareDropdown;
