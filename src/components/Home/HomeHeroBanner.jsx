"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X, Play, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export function HomeHeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const slides = [
    {
      id: 1,
      image: "/slider-1.jpg",
      alt: "Affordable Bookkeeping Services by Certified Accountant",
      subtitle: "Affordable Bookkeeping Services By",
      title: "CERTIFIED ACCOUNTANT",
      highlight: "Save up to 50% on operational costs with dedicated CPA accounting teams.",
    },
    {
      id: 2,
      image: "/slider-2.jpg",
      alt: "Support Help For All Your Accounting Needs",
      subtitle: "Support Help For All Your",
      title: "ACCOUNTING NEEDS",
      highlight: "End-to-end cloud bookkeeping, payroll management, and statutory reporting.",
    },
  ];

  // Auto-play slider every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#f4f7f9] border-b border-[#e5e7eb] select-none">
      {/* Slider Container with responsive height */}
      <div className="relative w-full min-h-[460px] sm:min-h-[520px] md:min-h-[560px] lg:min-h-[620px] xl:min-h-[640px] flex items-center">
        {/* Background Images Layer */}
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              currentSlide === idx ? "opacity-100 z-0" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={idx === 0}
              className="object-cover object-center sm:object-[center_right] lg:object-right"
              sizes="100vw"
            />
            {/* Subtle soft gradient on mobile/tablet to guarantee 100% legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent sm:via-white/60 lg:via-transparent" />
          </div>
        ))}

        {/* Foreground Content Container */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-8 py-10 md:py-16">
          <div className="max-w-[640px] transition-all duration-500">
            {/* CPA Affiliate Badges Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6 animate-fadeIn">
              <span className="text-[13px] sm:text-[14px] font-semibold text-[#444444]">
                Affiliate with
              </span>

              {/* CPA Australia Badge */}
              <div className="inline-flex items-center bg-[#002f6c] text-white px-3 py-1 rounded-lg h-[32px] gap-1.5 shadow-sm hover:scale-105 transition-transform">
                <div className="flex flex-col justify-center leading-none">
                  <span className="font-extrabold text-[12px] tracking-wide">CPA</span>
                  <span className="text-[6.5px] tracking-tight uppercase font-medium text-gray-200">
                    AUSTRALIA
                  </span>
                </div>
                {/* Gold Crest */}
                <svg className="w-3.5 h-3.5 text-[#e5a823]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 2.18l6 2.25v4.66c0 4.1-2.6 7.9-6 8.91-3.4-1.01-6-4.81-6-8.91V6.43l6-2.25z" />
                </svg>
              </div>

              {/* CPA America Badge */}
              <div className="inline-flex items-center gap-2 h-[32px] bg-white/85 backdrop-blur-md px-3 py-1 rounded-lg border border-gray-200 shadow-2xs hover:scale-105 transition-transform">
                <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                  <svg
                    className="w-3 h-3 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 3a9 9 0 0 1 9 9" />
                    <path d="M12 12L7 17" />
                  </svg>
                </div>
                <div className="flex flex-col justify-center leading-none">
                  <span className="font-bold text-[13px] text-black tracking-tight">CPA</span>
                  <span className="text-[7.5px] text-gray-700 font-normal leading-tight">
                    America counts on CPAs®
                  </span>
                </div>
              </div>
            </div>

            {/* Slide Headings */}
            <div className="mb-6 sm:mb-8 min-h-[110px] sm:min-h-[130px] md:min-h-[140px] flex flex-col justify-center">
              <h2 className="text-[19px] sm:text-[22px] md:text-[25px] font-semibold text-[#252525] mb-1 sm:mb-2 leading-snug">
                {slides[currentSlide].subtitle}
              </h2>
              <h1 className="text-[28px] sm:text-[40px] md:text-[48px] lg:text-[52px] font-black text-[#111111] tracking-tight uppercase leading-[1.1] text-balance">
                {slides[currentSlide].title}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 font-poppins mt-3 max-w-lg leading-relaxed">
                {slides[currentSlide].highlight}
              </p>
            </div>

            {/* Buttons Group */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7 pt-1">
              {/* 'Learn More' Button */}
              <Link
                href="/services"
                className="group relative inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 bg-[#368b82] hover:bg-[#286b64] text-white text-[15px] sm:text-[16px] font-bold rounded-xl uppercase tracking-wider shadow-lg hover:shadow-[0_12px_28px_-6px_rgba(54,139,130,0.35)] hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98] border border-[#368b82]"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* 'Watch Video' Button with Soft Ripple */}
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="group inline-flex items-center gap-3 cursor-pointer select-none"
              >
                {/* Circular Play Icon */}
                <div className="relative w-12 h-12 rounded-full border-2 border-[#368b82]/40 bg-white flex items-center justify-center p-0.5 shadow-md group-hover:scale-110 group-hover:border-[#368b82] transition-all duration-300">
                  <div className="w-full h-full rounded-full bg-[#368b82] group-hover:bg-[#286b64] flex items-center justify-center text-white transition-colors">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[#1a1a1a] group-hover:text-[#368b82] font-bold text-[15px] sm:text-[16px] transition-colors leading-tight">
                    Watch Overview
                  </span>
                  <span className="text-xs text-gray-500 font-poppins">2 min explainer</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Previous Slide Arrow Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/90 hover:bg-[#368b82] text-gray-800 hover:text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all cursor-pointer border border-gray-200/80 backdrop-blur-md"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Next Slide Arrow Button */}
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/90 hover:bg-[#368b82] text-gray-800 hover:text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all cursor-pointer border border-gray-200/80 backdrop-blur-md"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 bg-black/25 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx
                  ? "w-8 bg-[#368b82] shadow-sm"
                  : "w-2.5 bg-white/70 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Video Lightbox Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-fadeIn"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-3 right-3 text-white/80 hover:text-white bg-black/60 p-2 rounded-full z-10 cursor-pointer"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/nODkbZDgPOI?autoplay=1"
                title="Support Help Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default HomeHeroBanner;

