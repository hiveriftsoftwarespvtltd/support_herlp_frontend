"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { IndustriesMegaMenu } from "./IndustriesMegaMenu";
import { ServicesMegaMenu } from "./ServicesMegaMenu";
import { SoftwareDropdown } from "./SoftwareDropdown";
import { AboutUsDropdown } from "./AboutUsDropdown";

export function MainNavigationBar({ onToggleMobileMenu }) {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState(null); // 'industries' | 'services' | 'software' | 'about' | null
  const timeoutRef = useRef(null);

  const handleMouseEnter = (menuName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const closeMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(null);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Determine active category for nav highlights
  const isIndustriesActive = pathname?.startsWith("/industry");
  const isServicesActive = pathname?.startsWith("/services");
  const isSoftwareActive = pathname?.startsWith("/software-expertise");
  const isAboutActive =
    pathname === "/about-us" ||
    pathname === "/methodology" ||
    pathname === "/affiliation-and-certification" ||
    pathname === "/country-where-we-serve";
  const isClienteleActive = pathname === "/clientele";
  const isBlogActive = pathname === "/blog" || pathname?.startsWith("/blog");
  const isContactActive = pathname === "/contact-us";

  return (
    <div className="relative bg-white border-b border-[#bdbdbd] z-40">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-4 xl:px-8 flex items-center justify-between min-h-[66px] sm:min-h-[76px] lg:min-h-[82px] xl:min-h-[92px] py-1">
        {/* Brand Logo */}
        <Link href="/" className="inline-block shrink-0 group py-1">
          <div className="relative w-[150px] xs:w-[175px] sm:w-[200px] lg:w-[190px] xl:w-[250px] 2xl:w-[270px] h-[46px] xs:h-[52px] sm:h-[60px] lg:h-[58px] xl:h-[76px] 2xl:h-[82px]">
            <Image
              src="/logo11.png"
              alt="Support Help"
              fill
              priority
              className="object-contain object-left group-hover:opacity-95 transition-opacity"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center space-x-0.5 xl:space-x-1.5 2xl:space-x-2 font-poppins text-[11px] lg:text-[11.5px] xl:text-[13px] 2xl:text-[14px] font-bold uppercase tracking-tight text-[#111111]"
        >
          {/* INDUSTRIES Menu Item */}
          <div
            className="relative shrink-0"
            onMouseEnter={() => handleMouseEnter("industries")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/industry/construction-real-estate-accounting"
              className={`flex items-center gap-1 xl:gap-1.5 px-1.5 lg:px-2 xl:px-2.5 2xl:px-3 py-4 xl:py-6 transition-colors whitespace-nowrap ${
                isIndustriesActive || activeMenu === "industries"
                  ? "text-[#368b82]"
                  : "hover:text-[#368b82]"
              }`}
            >
              <span>Industries</span>
              <ChevronDown
                className={`w-3 h-3 xl:w-3.5 xl:h-3.5 shrink-0 transition-transform duration-200 ${
                  activeMenu === "industries" ? "rotate-180 text-[#368b82]" : ""
                }`}
              />
            </Link>

            <IndustriesMegaMenu
              isOpen={activeMenu === "industries"}
              onClose={closeMenu}
            />
          </div>

          {/* SERVICES Menu Item */}
          <div
            className="relative shrink-0"
            onMouseEnter={() => handleMouseEnter("services")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/services"
              onClick={closeMenu}
              className={`flex items-center gap-1 xl:gap-1.5 px-1.5 lg:px-2 xl:px-2.5 2xl:px-3 py-4 xl:py-6 transition-colors whitespace-nowrap ${
                isServicesActive || activeMenu === "services"
                  ? "text-[#368b82]"
                  : "hover:text-[#368b82]"
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3 h-3 xl:w-3.5 xl:h-3.5 shrink-0 transition-transform duration-200 ${
                  activeMenu === "services" ? "rotate-180 text-[#368b82]" : ""
                }`}
              />
            </Link>

            <ServicesMegaMenu
              isOpen={activeMenu === "services"}
              onClose={closeMenu}
            />
          </div>

          {/* SOFTWARE Menu Item */}
          <div
            className="relative shrink-0"
            onMouseEnter={() => handleMouseEnter("software")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/software-expertise"
              onClick={closeMenu}
              className={`flex items-center gap-1 xl:gap-1.5 px-1.5 lg:px-2 xl:px-2.5 2xl:px-3 py-4 xl:py-6 transition-colors whitespace-nowrap ${
                isSoftwareActive || activeMenu === "software"
                  ? "text-[#368b82]"
                  : "hover:text-[#368b82]"
              }`}
            >
              <span>Software</span>
              <ChevronDown
                className={`w-3 h-3 xl:w-3.5 xl:h-3.5 shrink-0 transition-transform duration-200 ${
                  activeMenu === "software" ? "rotate-180 text-[#368b82]" : ""
                }`}
              />
            </Link>

            <SoftwareDropdown
              isOpen={activeMenu === "software"}
              onClose={closeMenu}
            />
          </div>

          {/* ABOUT US Menu Item */}
          <div
            className="relative shrink-0"
            onMouseEnter={() => handleMouseEnter("about")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/methodology"
              className={`flex items-center gap-1 xl:gap-1.5 px-1.5 lg:px-2 xl:px-2.5 2xl:px-3 py-4 xl:py-6 transition-colors whitespace-nowrap ${
                isAboutActive || activeMenu === "about"
                  ? "text-[#368b82]"
                  : "hover:text-[#368b82]"
              }`}
            >
              <span>About Us</span>
              <ChevronDown
                className={`w-3 h-3 xl:w-3.5 xl:h-3.5 shrink-0 transition-transform duration-200 ${
                  activeMenu === "about" ? "rotate-180 text-[#368b82]" : ""
                }`}
              />
            </Link>

            <AboutUsDropdown
              isOpen={activeMenu === "about"}
              onClose={closeMenu}
            />
          </div>

          {/* CLIENT TESTIMONIALS */}
          <Link
            href="/clientele"
            className={`shrink-0 px-1.5 lg:px-2 xl:px-2.5 2xl:px-3 py-4 xl:py-6 transition-colors whitespace-nowrap ${
              isClienteleActive ? "text-[#368b82]" : "hover:text-[#368b82]"
            }`}
          >
            <span className="lg:hidden xl:inline">Client </span>Testimonials
          </Link>

          {/* BLOG */}
          <Link
            href="/blog"
            className={`shrink-0 px-1.5 lg:px-2 xl:px-2.5 2xl:px-3 py-4 xl:py-6 transition-colors whitespace-nowrap ${
              isBlogActive ? "text-[#368b82]" : "hover:text-[#368b82]"
            }`}
          >
            Blog
          </Link>

          {/* CONTACT US */}
          <Link
            href="/contact-us"
            className={`shrink-0 px-1.5 lg:px-2 xl:px-2.5 2xl:px-3 py-4 xl:py-6 transition-colors whitespace-nowrap ${
              isContactActive ? "text-[#368b82]" : "hover:text-[#368b82]"
            }`}
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile / Tablet Hamburger Button (< 1024px) */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={onToggleMobileMenu}
            aria-label="Toggle navigation"
            className="p-2 sm:p-2.5 rounded-lg border border-gray-300 text-gray-800 hover:text-[#368b82] hover:border-[#368b82] transition-colors"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainNavigationBar;
