"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { TopContactBar } from "./TopContactBar";
import { MainNavigationBar } from "./MainNavigationBar";
import { SubHeaderAnnouncement } from "./SubHeaderAnnouncement";
import { MobileNavigationDrawer } from "./MobileNavigationDrawer";

export function AppHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Sticky effect activates when scrolling past top bar
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="w-full relative z-40">
      {/* 1. Top Contact & Social Bar */}
      <TopContactBar />

      {/* 2. Main Navigation Bar (Fixed on scroll with smooth shadow transition) */}
      {isScrolled && <div className="h-[74px] sm:h-[96px] w-full" aria-hidden="true" />}
      <div
        className={`w-full transition-all duration-200 ${
          isScrolled
            ? "fixed top-0 left-0 right-0 z-50 shadow-md bg-white animate-slideDown"
            : "relative z-30"
        }`}
      >
        <MainNavigationBar
          onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
        />
      </div>

      {/* 3. Sub-Header Announcement & Consultation Bar */}
      <SubHeaderAnnouncement />

      {/* 4. Responsive Mobile Navigation Drawer */}
      <MobileNavigationDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}

export default AppHeader;
