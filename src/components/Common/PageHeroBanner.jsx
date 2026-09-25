"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home, Sparkles } from "lucide-react";

export function PageHeroBanner({ title, subtitle, category, categoryHref }) {
  return (
    <div className="relative bg-gradient-to-r from-[#172f73] via-[#203f99] to-[#122353] text-white py-14 sm:py-16 px-4 sm:px-8 border-b-4 border-[#368b82] overflow-hidden select-none">
      {/* Background Subtle Ambient Glow & Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#368b82_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#368b82]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto space-y-4">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-300 font-poppins">
          <Link href="/" className="hover:text-white flex items-center gap-1.5 transition-colors">
            <Home className="w-3.5 h-3.5 text-[#368b82]" />
            <span>Home</span>
          </Link>

          {category && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              {categoryHref ? (
                <Link href={categoryHref} className="hover:text-white transition-colors">
                  {category}
                </Link>
              ) : (
                <span>{category}</span>
              )}
            </>
          )}

          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#7ee3d7] font-semibold">{title}</span>
        </nav>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-poppins tracking-tight max-w-4xl text-balance leading-tight">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm sm:text-base text-gray-200 font-poppins max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default PageHeroBanner;

