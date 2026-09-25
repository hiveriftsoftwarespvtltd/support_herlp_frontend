"use client";

import React from "react";
import Link from "next/link";
import { aboutUsData } from "@/data/navigationData";

export function AboutUsDropdown({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-[280px] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.15)] border border-gray-200/90 rounded-b-md z-50 transition-all duration-200 animate-fadeIn"
    >
      <div className="py-2 px-4">
        {aboutUsData.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            onClick={onClose}
            className="py-2.5 px-2 border-b border-[#f0f0f0] last:border-b-0 text-[14px] normal-case font-poppins font-normal text-[#333333] hover:text-[#368b82] hover:pl-3 transition-all duration-150 block text-left"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AboutUsDropdown;
