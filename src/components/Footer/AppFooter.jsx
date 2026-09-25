"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { contactInfo, softwareData } from "@/data/navigationData";
import { MapPin, Phone, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export function AppFooter() {
  const coreServices = [
    { name: "Bookkeeping Services", href: "/services/bookkeeping" },
    { name: "Accounting Services", href: "/services/accounting" },
    { name: "Accounts Payable", href: "/services/accounts-payable" },
    { name: "Accounts Receivable", href: "/services/accounts-receivable" },
    { name: "Payroll Management", href: "/services/payroll-management" },
    { name: "Cleanup & Catch Up Work", href: "/services/cleanup-catchup-work" },
    { name: "Migration Services", href: "/services/migration-services" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Blog", href: "/blog" },
    { name: "Client Testimonials", href: "/clientele" },
    { name: "Free Consultation", href: "/free-consultation" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" },
  ];

  return (
    <footer className="bg-[#211e1d] text-white font-poppins pt-14 sm:pt-16 pb-8 border-t border-[#34302f]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        {/* Main Footer Grid (4-Column Balanced Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          {/* Column 1: Brand & Single Corporate Office Address (~35% width) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block group">
              <div className="bg-white p-2.5 rounded-xl inline-block shadow-sm group-hover:opacity-95 transition-opacity">
                <Image
                  src="/logo11.png"
                  alt="Support Help"
                  width={220}
                  height={130}
                  className="object-contain w-auto h-[48px] sm:h-[54px]"
                />
              </div>
            </Link>

            <p className="text-xs sm:text-[13px] text-gray-300 leading-relaxed font-poppins pr-4">
              Empowering businesses with certified cloud bookkeeping, end-to-end accounting management, multi-platform migration, and timely financial compliance.
            </p>

            {/* Single Address & Direct Contact Card */}
            <div className="bg-[#2c2826] rounded-2xl p-5 border border-[#3d3835] space-y-3.5 shadow-xs">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#368b82]/15 text-[#368b82] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div className="leading-snug">
                  <span className="block text-[11px] font-bold text-[#7ee3d7] uppercase tracking-wider">
                    Corporate Office (USA)
                  </span>
                  <span className="text-[13px] font-medium text-white/90 leading-relaxed">
                    {contactInfo.address?.full || "34175 Oakdale St., Livonia, Michigan 48154"}
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 pt-1 border-t border-[#3d3835]/70">
                <div className="w-8 h-8 rounded-lg bg-[#368b82]/15 text-[#368b82] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase font-medium">Toll Free Phone</span>
                  <a
                    href={`tel:${contactInfo.phoneTel}`}
                    className="text-sm font-bold text-white hover:text-[#7ee3d7] transition-colors"
                  >
                    {contactInfo.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 pt-1 border-t border-[#3d3835]/70">
                <div className="w-8 h-8 rounded-lg bg-[#368b82]/15 text-[#368b82] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase font-medium">Official Email</span>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-xs sm:text-[13px] font-semibold text-white hover:text-[#7ee3d7] transition-colors break-all"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Core Services (~25% width) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide uppercase font-poppins">
                Our Services
              </h3>
              <div className="w-10 h-0.5 bg-[#368b82] rounded-full" />
            </div>

            <ul className="space-y-2.5 text-[13.5px]">
              {coreServices.map((service, idx) => (
                <li key={idx}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-[#7ee3d7] hover:translate-x-1.5 transition-all duration-200 inline-flex items-center gap-1.5 group font-medium"
                  >
                    <ArrowRight className="w-3 h-3 text-[#368b82] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Software Expertise (~25% width) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide uppercase font-poppins">
                Software Expertise
              </h3>
              <div className="w-10 h-0.5 bg-[#368b82] rounded-full" />
            </div>

            <ul className="space-y-2.5 text-[13.5px]">
              {softwareData.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-[#7ee3d7] hover:translate-x-1.5 transition-all duration-200 inline-flex items-center gap-1.5 group font-medium"
                  >
                    <ArrowRight className="w-3 h-3 text-[#368b82] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Links (~15% width) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide uppercase font-poppins">
                Quick Links
              </h3>
              <div className="w-10 h-0.5 bg-[#368b82] rounded-full" />
            </div>

            <ul className="space-y-2.5 text-[13.5px]">
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-[#7ee3d7] hover:translate-x-1.5 transition-all duration-200 inline-flex items-center gap-1.5 group font-medium"
                  >
                    <ArrowRight className="w-3 h-3 text-[#368b82] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-[#3d3835] my-6" />

        {/* Bottom Bar: Copyright & Circular Social Icons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-poppins">
          <p className="text-center sm:text-left">
            Copyright © {new Date().getFullYear()} Support Help. All Rights Reserved.
          </p>

          {/* Circular Social Icons */}
          <div className="flex items-center gap-2.5">
            <a
              href={contactInfo.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-[#2c2826] hover:bg-[#368b82] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 border border-[#3d3835]"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            <a
              href={contactInfo.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full bg-[#2c2826] hover:bg-[#368b82] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 border border-[#3d3835]"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            <a
              href={contactInfo.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-8 h-8 rounded-full bg-[#2c2826] hover:bg-[#368b82] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 border border-[#3d3835]"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
              </svg>
            </a>

            <a
              href={`mailto:${contactInfo.email}`}
              aria-label="Email"
              className="w-8 h-8 rounded-full bg-[#2c2826] hover:bg-[#368b82] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 border border-[#3d3835]"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
