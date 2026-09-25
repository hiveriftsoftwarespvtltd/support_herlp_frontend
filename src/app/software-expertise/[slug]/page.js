import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import softwareDataMap from "@/data/allSoftwareData.json";
import { softwareData, contactInfo } from "@/data/navigationData";
import { PageHeroBanner } from "@/components/Common/PageHeroBanner";
import { IndustryCoffeeSection } from "@/components/Common/IndustryCoffeeSection";
import {
  Check,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Phone,
  Calendar,
  Sparkles,
  Lock,
  Layers,
  Zap,
} from "lucide-react";

export function generateStaticParams() {
  return Object.keys(softwareDataMap).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const software = softwareDataMap[slug];

  if (!software) {
    return {
      title: "Software Expertise – Support Help",
      description: "Professional accounting software expertise and bookkeeping services.",
    };
  }

  return {
    title: `${software.heroTitle} Bookkeeping & Accounting Services – Support Help`,
    description:
      software.introParagraphs?.[0] ||
      `Professional ${software.heroTitle} accounting, bookkeeping, and migration services.`,
  };
}

export default async function SoftwareDetailPage({ params }) {
  const { slug } = await params;
  const software = softwareDataMap[slug];

  if (!software) {
    notFound();
  }

  const { featuresSection, showcases } = software;
  const hasFeatures =
    featuresSection &&
    (featuresSection.leftCol?.length > 0 || featuresSection.rightCol?.length > 0);

  return (
    <main className="w-full bg-[#fafbfc] font-poppins text-[#333333]">
      {/* 1. Page Hero Banner with Breadcrumbs & Brand Accent */}
      <PageHeroBanner
        title={`${software.heroTitle} EXPERTISE`}
        subtitle={
          software.introParagraphs?.[0]
            ? software.introParagraphs[0].slice(0, 160) + "..."
            : `Certified and professional ${software.heroTitle} accounting services by Support Help.`
        }
        category="Software"
        categoryHref="/software-expertise"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-12 sm:space-y-16">
            {/* 2. Partner Badge & Executive Intro Card */}
            <div className="relative bg-white p-7 sm:p-10 rounded-3xl border border-gray-200/90 shadow-xs hover:shadow-[0_14px_35px_-8px_rgba(54,139,130,0.15)] transition-shadow duration-300 space-y-6 overflow-hidden">
              {/* Top Brand Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#368b82] via-[#203f99] to-[#368b82]" />

              {/* Certified Partner Badge */}
              {software.badge && (
                <div className="flex justify-center pt-2">
                  <div className="relative h-[80px] sm:h-[95px] w-[260px] max-w-full p-2.5 bg-gradient-to-br from-white to-[#edf7f6]/70 border border-[#368b82]/25 rounded-2xl flex items-center justify-center shadow-xs hover:scale-105 transition-transform duration-300">
                    <Image
                      src={software.badge}
                      alt={`${software.heroTitle} Certified Partner`}
                      fill
                      unoptimized
                      priority
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              )}

              <div className="text-center space-y-2 max-w-3xl mx-auto">
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider font-poppins">
                  Platform Proficiency &amp; Advisory
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-poppins">
                  Tailored {software.heroTitle} Accounting &amp; Advisory
                </h2>
                <div className="w-16 h-1 bg-[#368b82] mx-auto rounded-full" />
              </div>

              <div className="space-y-4 text-center text-gray-600 text-sm sm:text-base leading-relaxed max-w-4xl mx-auto font-poppins">
                {software.introParagraphs?.map((p, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {/* Quick Highlights Strip */}
              <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-semibold text-gray-700">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#368b82]" />
                  <span>Automated Daily Feeds</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#368b82]" />
                  <span>Multi-Currency Ledgers</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#368b82]" />
                  <span>Real-Time MIS Reports</span>
                </div>
              </div>
            </div>

            {/* 3. Features Section with 3D Hover Elevation Cards */}
            {hasFeatures && (
              <section className="space-y-8 pt-2">
                <div className="space-y-2">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider font-poppins">
                    Comprehensive Modules
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-poppins">
                    {featuresSection.title}
                  </h2>
                  <div className="w-16 h-1 bg-[#368b82] rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column Items */}
                  <div className="space-y-5">
                    {featuresSection.leftCol?.map((item, idx) => (
                      <div
                        key={idx}
                        className="group relative bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs hover:shadow-[0_18px_36px_-8px_rgba(54,139,130,0.2)] hover:border-[#368b82] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                      >
                        {/* Ambient corner glow */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#368b82]/5 rounded-full blur-xl group-hover:bg-[#368b82]/20 transition-all duration-300 pointer-events-none" />

                        <div>
                          <div className="flex items-center gap-3.5 mb-2.5">
                            <div className="w-9 h-9 rounded-xl bg-[#edf7f6] group-hover:bg-[#368b82] text-[#368b82] group-hover:text-white flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-2 transition-all duration-300 shadow-2xs">
                              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#368b82] font-poppins transition-colors leading-snug">
                              {item.title}
                            </h3>
                          </div>
                          {item.desc && (
                            <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed font-poppins pl-1">
                              {item.desc}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column Items */}
                  <div className="space-y-5">
                    {featuresSection.rightCol?.map((item, idx) => (
                      <div
                        key={idx}
                        className="group relative bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs hover:shadow-[0_18px_36px_-8px_rgba(54,139,130,0.2)] hover:border-[#368b82] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                      >
                        {/* Ambient corner glow */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#368b82]/5 rounded-full blur-xl group-hover:bg-[#368b82]/20 transition-all duration-300 pointer-events-none" />

                        <div>
                          <div className="flex items-center gap-3.5 mb-2.5">
                            <div className="w-9 h-9 rounded-xl bg-[#edf7f6] group-hover:bg-[#368b82] text-[#368b82] group-hover:text-white flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-2 transition-all duration-300 shadow-2xs">
                              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#368b82] font-poppins transition-colors leading-snug">
                              {item.title}
                            </h3>
                          </div>
                          {item.desc && (
                            <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed font-poppins pl-1">
                              {item.desc}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 4. Alternating Content Showcase Rows & Cards */}
            {showcases?.map((showcase, sIdx) => {
              if (showcase.imagePosition === "right") {
                return (
                  <section
                    key={sIdx}
                    className="relative bg-gradient-to-br from-white via-[#fcfdfe] to-[#edf7f6]/50 border border-gray-200/90 rounded-3xl p-7 sm:p-10 shadow-xs hover:shadow-xl hover:border-[#368b82]/40 transition-all duration-300 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">
                      {/* Left Column: Text & Bullets */}
                      <div className="md:col-span-7 space-y-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider font-poppins">
                          Strategic Capability
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-poppins leading-snug">
                          {showcase.title}
                        </h2>
                        <div className="w-12 h-1 bg-[#368b82] rounded-full" />

                        {showcase.paragraphs?.length > 0 && (
                          <div className="space-y-3">
                            {showcase.paragraphs.map((p, pIdx) => (
                              <p
                                key={pIdx}
                                className="text-gray-600 text-sm sm:text-base leading-relaxed font-poppins"
                              >
                                {p}
                              </p>
                            ))}
                          </div>
                        )}

                        {showcase.bullets?.length > 0 && (
                          <div className="space-y-3 pt-2">
                            {showcase.bullets.map((bItem, bIdx) => (
                              <div
                                key={bIdx}
                                className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-white transition-colors"
                              >
                                <div className="w-5 h-5 rounded-md bg-[#368b82] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </div>
                                <span className="text-xs sm:text-sm font-semibold text-gray-800 font-poppins leading-relaxed">
                                  {bItem}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right Column: Photo with Zoom */}
                      {showcase.image && (
                        <div className="md:col-span-5">
                          <div className="relative w-full h-[260px] sm:h-[320px] rounded-2xl overflow-hidden shadow-lg border border-gray-200/80 bg-white group">
                            <Image
                              src={showcase.image}
                              alt={showcase.title}
                              fill
                              unoptimized
                              priority
                              className="object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                );
              }

              if (showcase.imagePosition === "left") {
                return (
                  <section
                    key={sIdx}
                    className="relative bg-gradient-to-bl from-[#edf7f6]/40 via-white to-gray-50/80 border border-gray-200/90 rounded-3xl p-7 sm:p-10 shadow-xs hover:shadow-xl hover:border-[#368b82]/40 transition-all duration-300 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">
                      {/* Left Column: Photo */}
                      {showcase.image && (
                        <div className="md:col-span-5 order-2 md:order-1">
                          <div className="relative w-full h-[260px] sm:h-[320px] rounded-2xl overflow-hidden shadow-lg border border-gray-200/80 bg-white group">
                            <Image
                              src={showcase.image}
                              alt={showcase.title}
                              fill
                              unoptimized
                              priority
                              className="object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                            />
                          </div>
                        </div>
                      )}

                      {/* Right Column: Text & Bullets */}
                      <div className="md:col-span-7 space-y-4 order-1 md:order-2">
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider font-poppins">
                          Operational Efficiency
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-poppins leading-snug">
                          {showcase.title}
                        </h2>
                        <div className="w-12 h-1 bg-[#368b82] rounded-full" />

                        {showcase.paragraphs?.length > 0 && (
                          <div className="space-y-3">
                            {showcase.paragraphs.map((p, pIdx) => (
                              <p
                                key={pIdx}
                                className="text-gray-600 text-sm sm:text-base leading-relaxed font-poppins"
                              >
                                {p}
                              </p>
                            ))}
                          </div>
                        )}

                        {showcase.bullets?.length > 0 && (
                          <div className="space-y-3 pt-2">
                            {showcase.bullets.map((bItem, bIdx) => (
                              <div
                                key={bIdx}
                                className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-white transition-colors"
                              >
                                <div className="w-5 h-5 rounded-md bg-[#368b82] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </div>
                                <span className="text-xs sm:text-sm font-semibold text-gray-800 font-poppins leading-relaxed">
                                  {bItem}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                );
              }

              // Full-width Text / Migration Block
              return (
                <section
                  key={sIdx}
                  className="relative bg-white border border-gray-200/90 rounded-3xl p-7 sm:p-10 shadow-xs hover:shadow-md transition-shadow space-y-4"
                >
                  <span className="inline-block px-3.5 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider font-poppins">
                    Migration &amp; Transition
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-poppins">
                    {showcase.title}
                  </h2>
                  <div className="w-14 h-1 bg-[#368b82] rounded-full" />
                  {showcase.paragraphs?.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-gray-600 text-sm sm:text-base leading-relaxed font-poppins"
                    >
                      {p}
                    </p>
                  ))}
                  {showcase.bullets?.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {showcase.bullets.map((bItem, bIdx) => (
                        <div
                          key={bIdx}
                          className="flex items-center space-x-2.5 p-2 rounded-lg hover:bg-[#edf7f6]/50 transition-colors"
                        >
                          <div className="w-5 h-5 rounded-md bg-[#368b82] text-white flex items-center justify-center shrink-0 shadow-2xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-gray-800 font-poppins">
                            {bItem}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          {/* Right Sticky Sidebar (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              {/* Quick Navigation Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-xs space-y-5">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-base font-bold text-gray-900 tracking-tight font-poppins">
                    Accounting Platforms
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 font-poppins">
                    Explore all certified software solutions
                  </p>
                </div>

                <div className="space-y-1.5">
                  {softwareData.map((item, idx) => {
                    const isActive = item.href.endsWith(`/${slug}`);
                    return (
                      <Link
                        key={idx}
                        href={item.href}
                        className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm transition-all duration-200 group ${
                          isActive
                            ? "bg-[#368b82] text-white font-bold shadow-md shadow-[#368b82]/25"
                            : "text-gray-700 hover:bg-[#edf7f6] hover:text-[#368b82] hover:translate-x-1"
                        }`}
                      >
                        <span className="truncate">{item.name}</span>
                        <ArrowRight
                          className={`w-3.5 h-3.5 transition-transform shrink-0 ${
                            isActive
                              ? "text-white translate-x-1"
                              : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-[#368b82]"
                          }`}
                        />
                      </Link>
                    );
                  })}
                </div>

                {/* Sidebar Consultation Callout */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="bg-gradient-to-br from-[#172f73] via-[#203f99] to-[#122353] text-white rounded-2xl p-6 text-center space-y-3.5 shadow-lg border border-white/10 relative overflow-hidden">
                    <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mx-auto text-[#7ee3d7] shadow-xs">
                      <Calendar className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <h4 className="text-base font-bold font-poppins leading-tight">
                      Need {software.heroTitle} Setup &amp; Advisory?
                    </h4>
                    <p className="text-xs text-gray-200 leading-relaxed font-poppins">
                      Schedule a 30-minute discovery call with our certified {software.heroTitle} specialists.
                    </p>
                    <Link
                      href="/free-consultation"
                      className="block bg-[#368b82] hover:bg-[#286b64] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-xl font-poppins hover:-translate-y-0.5"
                    >
                      Get Free Consultation
                    </Link>
                  </div>
                </div>

                {/* Guarantees Box */}
                <div className="pt-2 space-y-2 text-xs text-gray-600 font-poppins">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#368b82]" />
                    <span>NDA Signed &amp; 100% Confidential</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#368b82]" />
                    <span>Daily Ledger Sync &amp; Audit Ready</span>
                  </div>
                </div>

                {/* Quick Support Phone Callout */}
                <div className="p-4 bg-gradient-to-r from-gray-50 to-[#edf7f6]/60 border border-gray-200/90 rounded-2xl flex items-center gap-3.5 hover:border-[#368b82] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#dbefe9] text-[#368b82] flex items-center justify-center shrink-0 shadow-2xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="leading-tight">
                    <span className="text-[11px] text-gray-500 block uppercase font-medium">Quick Support</span>
                    <a
                      href={`tel:${contactInfo.phoneTel}`}
                      className="text-sm font-bold text-gray-900 hover:text-[#368b82] transition-colors font-poppins"
                    >
                      {contactInfo.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Coffee Section & Interactive Form (Full width container at bottom) */}
      <IndustryCoffeeSection industryName={software.heroTitle} />
    </main>
  );
}
