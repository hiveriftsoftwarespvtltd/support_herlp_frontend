"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronUp, Phone, Mail, Send, X } from "lucide-react";
import {
  contactInfo,
  industriesData,
  servicesData,
  softwareData,
  aboutUsData,
  staticNavLinks,
} from "@/data/navigationData";
import { softwareApi } from "@/api";

export function MobileNavigationDrawer({ isOpen, onClose }) {
  const [openSection, setOpenSection] = useState(null);
  const [softwares, setSoftwares] = useState(softwareData);

  React.useEffect(() => {
    async function loadSoftwares() {
      try {
        const res = await softwareApi.getSoftwares({ isPublished: true });
        if (res?.data && res.data.length > 0) {
          setSoftwares(
            res.data.map((item) => ({
              name: item.name,
              href: `/software-expertise/${(item.slug || "").replace(/^\/+/, "")}`,
              desc: item.desc || `Certified ${item.name} Bookkeeping`,
            }))
          );
        }
      } catch (err) {}
    }
    loadSoftwares();
  }, []);

  if (!isOpen) return null;

  const toggleSection = (sectionName) => {
    setOpenSection((prev) => (prev === sectionName ? null : sectionName));
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-black/50 backdrop-blur-xs animate-fadeIn">
      {/* Drawer Container */}
      <div className="relative w-full max-w-[380px] bg-white h-full shadow-2xl flex flex-col overflow-y-auto animate-slideRight">
        {/* Header of Drawer with Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="relative w-[140px] h-[45px]">
            <Image
              src="/logo11.png"
              alt="Support Help"
              fill
              className="object-contain object-left"
            />
          </div>
          <button
            onClick={onClose}
            aria-label="Close Menu"
            className="p-1.5 rounded-md text-gray-600 hover:text-[#368b82] hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Links & Accordions */}
        <div className="flex-1 py-3 divide-y divide-gray-100 font-poppins text-[15px]">
          {/* INDUSTRIES Accordion */}
          <div>
            <button
              onClick={() => toggleSection("industries")}
              className="w-full flex items-center justify-between px-5 py-3 text-left font-bold text-gray-800 hover:text-[#368b82] uppercase tracking-wide"
            >
              <span>Industries</span>
              {openSection === "industries" ? (
                <ChevronUp className="w-4 h-4 text-[#368b82]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>
            {openSection === "industries" && (
              <div className="bg-gray-50/80 px-5 py-2 space-y-1 text-[14px]">
                {industriesData.flatMap((col) => col.items).map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={onClose}
                    className="block py-2 text-gray-600 hover:text-[#368b82] border-b border-gray-100 last:border-b-0"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* SERVICES Accordion */}
          <div>
            <button
              onClick={() => toggleSection("services")}
              className="w-full flex items-center justify-between px-5 py-3 text-left font-bold text-gray-800 hover:text-[#368b82] uppercase tracking-wide"
            >
              <span>Services</span>
              {openSection === "services" ? (
                <ChevronUp className="w-4 h-4 text-[#368b82]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>
            {openSection === "services" && (
              <div className="bg-gray-50/80 px-5 py-2 space-y-1 text-[14px]">
                {servicesData.flatMap((col) => col.items).map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={onClose}
                    className="block py-2 text-gray-600 hover:text-[#368b82] border-b border-gray-100 last:border-b-0"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* SOFTWARE Accordion */}
          <div>
            <button
              onClick={() => toggleSection("software")}
              className="w-full flex items-center justify-between px-5 py-3 text-left font-bold text-gray-800 hover:text-[#368b82] uppercase tracking-wide"
            >
              <span>Software</span>
              {openSection === "software" ? (
                <ChevronUp className="w-4 h-4 text-[#368b82]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>
            {openSection === "software" && (
              <div className="bg-gray-50/80 px-5 py-2 space-y-1 text-[14px]">
                {softwares.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={onClose}
                    className="block py-2 text-gray-600 hover:text-[#368b82] border-b border-gray-100 last:border-b-0"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* ABOUT US Accordion */}
          <div>
            <button
              onClick={() => toggleSection("about")}
              className="w-full flex items-center justify-between px-5 py-3 text-left font-bold text-gray-800 hover:text-[#368b82] uppercase tracking-wide"
            >
              <span>About Us</span>
              {openSection === "about" ? (
                <ChevronUp className="w-4 h-4 text-[#368b82]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>
            {openSection === "about" && (
              <div className="bg-gray-50/80 px-5 py-2 space-y-1 text-[14px]">
                {aboutUsData.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={onClose}
                    className="block py-2 text-gray-600 hover:text-[#368b82] border-b border-gray-100 last:border-b-0"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Static Links */}
          {staticNavLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              onClick={onClose}
              className="block px-5 py-3 font-bold text-gray-800 hover:text-[#368b82] uppercase tracking-wide"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Footer Actions in Drawer */}
        <div className="p-5 border-t border-gray-200 bg-gray-50 space-y-3">
          <Link
            href={contactInfo.consultationUrl}
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full bg-[#368b82] hover:bg-[#286b64] text-white py-2.5 rounded font-poppins font-semibold text-sm uppercase tracking-wide shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span>Free Consultation</span>
          </Link>

          <a
            href={`tel:${contactInfo.phoneTel}`}
            className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded text-gray-700 font-poppins text-xs font-semibold hover:bg-gray-100"
          >
            <Phone className="w-3.5 h-3.5 text-[#368b82]" />
            <span>{contactInfo.phoneDisplay}</span>
          </a>
        </div>
      </div>
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose} />
    </div>
  );
}

export default MobileNavigationDrawer;
