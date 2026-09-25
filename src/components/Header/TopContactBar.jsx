"use client";

import React from "react";
import { Phone, Mail } from "lucide-react";
import { contactInfo } from "@/data/navigationData";

export function TopContactBar() {
  return (
    <div className="bg-[#368b82] text-white text-[12px] sm:text-[13px] font-medium font-poppins py-1.5 sm:py-2 px-3 sm:px-8 border-b border-[#286b64]/20">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-2">
        {/* Left: Phone & Email */}
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <a
            href={`tel:${contactInfo.phoneTel}`}
            className="flex items-center gap-1.5 hover:text-white/85 transition-colors group font-semibold shrink-0"
          >
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-white group-hover:scale-110 transition-transform shrink-0" />
            <span className="tracking-wide text-[11.5px] sm:text-[13px] whitespace-nowrap">
              {contactInfo.phoneDisplay}
            </span>
          </a>

          <span className="hidden md:inline text-white/40">|</span>

          <a
            href={`mailto:${contactInfo.email}`}
            className="hidden md:flex items-center gap-2 hover:text-white/85 transition-colors group shrink-0"
          >
            <Mail className="w-3.5 h-3.5 fill-current text-white group-hover:scale-110 transition-transform shrink-0" />
            <span className="tracking-wide text-xs sm:text-[13px] whitespace-nowrap">
              {contactInfo.email}
            </span>
          </a>
        </div>

        {/* Right: Social Icons & Quick Mobile Email */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick email button on mobile */}
          <a
            href={`mailto:${contactInfo.email}`}
            aria-label="Send Email"
            className="md:hidden flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/15 hover:bg-white/25 transition-all text-white text-[11px] font-medium"
          >
            <Mail className="w-3 h-3 fill-current" />
            <span className="hidden xs:inline">Email</span>
          </a>

          {/* Facebook */}
          <a
            href={contactInfo.socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-all text-white hover:scale-110"
          >
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.889C10.667 0 9 1.667 9 4.667V8z" />
            </svg>
          </a>

          {/* Twitter / X */}
          <a
            href={contactInfo.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-all text-white hover:scale-110"
          >
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href={contactInfo.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-all text-white hover:scale-110"
          >
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default TopContactBar;
