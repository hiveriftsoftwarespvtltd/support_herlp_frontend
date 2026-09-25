"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export function HomeClientsSection() {
  const scrollContainerRef = useRef(null);

  const clients = [
    { name: "Haya Solutions", logo: "/clients/haya-solutions.png" },
    { name: "Assetsoft", logo: "/clients/assetsoft.png" },
    { name: "CountX", logo: "/clients/countx.png" },
    { name: "Holistics", logo: "/clients/holistics.png" },
    { name: "The Blue Wisdom Tree", logo: "/clients/the-blue-wisdom-tree.png" },
    { name: "Buyquest", logo: "/clients/buyquest.png" },
    { name: "Blue Wisdom", logo: "/clients/blue-wisdom.png" },
    { name: "Aphcarios", logo: "/clients/aphcarios.png" },
    { name: "DSIL Global", logo: "/clients/dsil-global.png" },
    { name: "Avida", logo: "/clients/avida.png" },
    { name: "Glib", logo: "/clients/glib.png" },
    { name: "MyByk", logo: "/clients/mybyk.png" },
    { name: "OnlineCompanyRego", logo: "/clients/onlinecompanyrego.png" },
    { name: "Southern Cross Flute", logo: "/clients/southern-cross-flute.png" },
    { name: "Quality Homes USA", logo: "/clients/quality-homes-usa.png" },
    { name: "Right Accountants and Advisory", logo: "/clients/right-accountants-and-advisory.png" },
    { name: "The Zig", logo: "/clients/the-zig.png" },
    { name: "SterlynSilver", logo: "/clients/sterlynsilver.png" },
    { name: "Tatkalorry", logo: "/clients/tatkalorry.png" },
  ];

  // Duplicate items for infinite seamless scroll
  const marqueeItems = [...clients, ...clients];

  const handleManualScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-14 sm:py-18 bg-gray-50 border-b border-gray-200 overflow-hidden select-none relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-block px-3 py-0.5 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider">
              Trusted Partnerships
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-poppins text-gray-900 uppercase tracking-tight">
              VALUED CLIENTS
            </h2>
            <div className="w-12 h-1 bg-[#368b82] rounded-full mx-auto md:mx-0" />
          </div>

          <div className="flex items-center gap-4">
            <p className="text-xs sm:text-sm text-gray-500 font-poppins text-center md:text-right hidden sm:block max-w-md">
              Powering fast-growing enterprises, startups, and established CPA practices worldwide.
            </p>

            {/* Manual navigation arrows */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleManualScroll("left")}
                aria-label="Scroll left"
                className="w-9 h-9 rounded-xl border border-gray-300 bg-white hover:bg-[#edf7f6] hover:border-[#368b82] hover:text-[#368b82] text-gray-600 flex items-center justify-center transition-all shadow-2xs active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                onClick={() => handleManualScroll("right")}
                aria-label="Scroll right"
                className="w-9 h-9 rounded-xl border border-gray-300 bg-white hover:bg-[#edf7f6] hover:border-[#368b82] hover:text-[#368b82] text-gray-600 flex items-center justify-center transition-all shadow-2xs active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Viewport with Fade Edges */}
        <div className="relative w-full overflow-hidden py-3">
          {/* Left subtle fade mask */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-gray-50 via-gray-50/90 to-transparent z-10" />

          {/* Right subtle fade mask */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-gray-50 via-gray-50/90 to-transparent z-10" />

          {/* Scrolling Marquee Track */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 w-max animate-marquee-slow"
          >
            {marqueeItems.map((client, idx) => (
              <div
                key={`${client.name}-${idx}`}
                className="w-[180px] sm:w-[200px] h-[86px] sm:h-[92px] shrink-0 bg-white border border-gray-200/90 rounded-2xl px-5 py-3.5 flex items-center justify-center shadow-2xs hover:shadow-[0_12px_24px_-6px_rgba(54,139,130,0.18)] hover:border-[#368b82] hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={client.logo}
                    alt={`${client.name} client logo`}
                    width={160}
                    height={60}
                    className="max-h-[46px] sm:max-h-[50px] w-auto max-w-[88%] object-contain filter group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeClientsSection;

