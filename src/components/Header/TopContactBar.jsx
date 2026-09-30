"use client";

import React, { useState, useEffect } from "react";
import { Phone, Mail } from "lucide-react";
import { contactInfo } from "@/data/navigationData";
import { socialLinkApi } from "@/api/socialLinkApi";
import { SocialIcon } from "@/components/Common/SocialIcon";

export function TopContactBar() {
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    let isMounted = true;
    socialLinkApi
      .getSocialLinks({ isActive: true })
      .then((res) => {
        if (isMounted && res?.data) {
          setSocialLinks(res.data);
        }
      })
      .catch(() => {
        // Leave blank if offline
      });

    return () => {
      isMounted = false;
    };
  }, []);

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

        {/* Right: Dynamic Social Icons & Quick Mobile Email */}
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

          {/* Dynamic Social Channels from Admin (Only render when configured & active) */}
          {socialLinks.map((item) => (
            <a
              key={item._id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.title || item.platform}
              title={item.title || item.platform}
              className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-all text-white hover:scale-110"
            >
              <SocialIcon platform={item.platform} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopContactBar;
