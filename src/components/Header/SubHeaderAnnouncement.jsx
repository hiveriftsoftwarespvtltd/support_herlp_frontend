"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Send } from "lucide-react";
import { contactInfo } from "@/data/navigationData";

export function SubHeaderAnnouncement() {
  return (
    <div className="bg-white border-b border-[#bdbdbd] py-2 sm:py-2.5 px-3 sm:px-8">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-center sm:text-left">
        {/* Left: Announcement Text with Arrow */}
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <div className="relative w-5 h-5 sm:w-6 sm:h-6 shrink-0 flex items-center justify-center">
            <Image
              src="/arrow-1.png"
              alt="Kickstart arrow"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          <p className="text-[12px] sm:text-[14px] md:text-[15px] font-medium font-poppins text-gray-800 tracking-tight leading-tight">
            {contactInfo.announcementText}
          </p>
        </div>

        {/* Right: Get a Free Consultation Button */}
        <div className="shrink-0 w-full sm:w-auto">
          <Link
            href={contactInfo.consultationUrl}
            className="inline-flex items-center justify-center gap-2 bg-[#368b82] hover:bg-[#286b64] text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-[3px] text-[12px] sm:text-[13.5px] font-semibold font-poppins uppercase tracking-wider shadow-xs hover:shadow-sm transition-all duration-200 group w-full sm:w-auto"
          >
            <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Get a Free Consultation</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SubHeaderAnnouncement;
