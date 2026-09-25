import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import servicesData from "@/data/allServicesData.json";
import { PageHeroBanner } from "@/components/Common/PageHeroBanner";
import { IndustryCoffeeSection } from "@/components/Common/IndustryCoffeeSection";
import { Check, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = servicesData.services[slug];

  if (!service) {
    return {
      title: "Services – Support Help",
      description: "Professional accounting and bookkeeping services.",
    };
  }

  return {
    title: `${service.heroTitle} – Support Help`,
    description: service.introParagraphs?.[0] || `Outsource ${service.heroTitle} to certified accounting experts.`,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = servicesData.services[slug];

  if (!service) {
    notFound();
  }

  const { solutionsSection } = service;
  const hasSolutions = solutionsSection && (solutionsSection.leftCol?.length > 0 || solutionsSection.rightCol?.length > 0);

  return (
    <main className="w-full bg-[#fafbfc] font-poppins text-[#333333]">
      {/* 1. Page Hero Banner with Breadcrumbs & Brand Accent */}
      <PageHeroBanner
        title={service.heroTitle}
        subtitle={
          service.introParagraphs?.[0]
            ? service.introParagraphs[0].slice(0, 160) + "..."
            : `Certified and professional ${service.heroTitle} services by Support Help.`
        }
        category="Services"
        categoryHref="/services"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-12 sm:space-y-16">
        {/* 2. Intro Card with Top Gradient Line */}
        {service.introParagraphs && service.introParagraphs.length > 0 && (
          <div className="relative bg-white p-7 sm:p-10 rounded-3xl border border-gray-200/90 shadow-xs hover:shadow-[0_14px_35px_-8px_rgba(54,139,130,0.15)] transition-shadow duration-300 space-y-4 overflow-hidden">
            {/* Top Brand Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#368b82] via-[#203f99] to-[#368b82]" />

            <div className="space-y-2">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider">
                Service Overview
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-poppins">
                {service.heroTitle} Excellence
              </h2>
              <div className="w-16 h-1 bg-[#368b82] rounded-full" />
            </div>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-gray-600 font-poppins">
              {service.introParagraphs.map((p, idx) => (
                <p key={idx} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* 3. Solutions Section with 3D Hover Elevation Cards */}
        {hasSolutions && (
          <section className="space-y-8 pt-2">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
                Tailored Deliverables
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight font-poppins">
                {solutionsSection.title}
              </h2>
              <div className="w-16 h-1 bg-[#368b82] mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column Items */}
              <div className="space-y-5">
                {solutionsSection.leftCol?.map((item, idx) => (
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
                      <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed font-poppins pl-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column Items */}
              <div className="space-y-5">
                {solutionsSection.rightCol?.map((item, idx) => (
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
                      <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed font-poppins pl-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 4. Showcase 1: Text + Checklist on Left, Photo on Right */}
        {service.showcase1 && (
          <section className="relative bg-gradient-to-br from-white via-[#fcfdfe] to-[#edf7f6]/50 border border-gray-200/90 rounded-3xl p-7 sm:p-10 shadow-xs hover:shadow-xl hover:border-[#368b82]/40 transition-all duration-300 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Text & Checklist */}
              <div className="md:col-span-7 space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider">
                  Strategic Scope
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-poppins">
                  {service.showcase1.title}
                </h2>
                <div className="w-12 h-1 bg-[#368b82] rounded-full" />
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-poppins">
                  {service.showcase1.description}
                </p>

                {service.showcase1.checklist && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
                    {service.showcase1.checklist.map((cItem, cIdx) => (
                      <div
                        key={cIdx}
                        className="flex items-center space-x-2.5 p-2 rounded-lg hover:bg-white transition-colors"
                      >
                        <div className="w-5 h-5 rounded-md bg-[#368b82] text-white flex items-center justify-center shrink-0 shadow-2xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-gray-800 font-poppins">
                          {cItem}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {service.showcase1.note && (
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed pt-2 font-poppins italic border-t border-gray-100">
                    {service.showcase1.note}
                  </p>
                )}
              </div>

              {/* Right Column: Photo with Zoom */}
              <div className="md:col-span-5">
                <div className="relative w-full h-[280px] sm:h-[340px] rounded-2xl overflow-hidden shadow-lg border border-gray-200/80 bg-white group">
                  <Image
                    src={service.showcase1.image}
                    alt={service.showcase1.title}
                    fill
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 5. Showcase 2: Photo on Left, Text & Benefits on Right */}
        {service.showcase2 && (
          <section className="relative bg-gradient-to-bl from-[#edf7f6]/40 via-white to-gray-50/80 border border-gray-200/90 rounded-3xl p-7 sm:p-10 shadow-xs hover:shadow-xl hover:border-[#368b82]/40 transition-all duration-300 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Photo */}
              <div className="md:col-span-5 order-2 md:order-1">
                <div className="relative w-full h-[280px] sm:h-[340px] rounded-2xl overflow-hidden shadow-lg border border-gray-200/80 bg-white group">
                  <Image
                    src={service.showcase2.image}
                    alt={service.showcase2.title}
                    fill
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                </div>
              </div>

              {/* Right Column: Text */}
              <div className="md:col-span-7 space-y-4 order-1 md:order-2">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
                  Operational Advantages
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-poppins">
                  {service.showcase2.title}
                </h2>
                <div className="w-12 h-1 bg-[#368b82] rounded-full" />
                {service.showcase2.paragraphs?.map((p, pIdx) => (
                  <p key={pIdx} className="text-gray-600 text-sm sm:text-base leading-relaxed font-poppins">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 6. Why Opt For Section with Elevated Checklist */}
        {service.whySection && (
          <section className="relative bg-white border border-gray-200/90 rounded-3xl p-7 sm:p-10 shadow-xs hover:shadow-md transition-shadow space-y-6">
            <div className="space-y-2">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider">
                Why Partner With Us
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-poppins">
                {service.whySection.title}
              </h2>
              <div className="w-16 h-1 bg-[#368b82] rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {service.whySection.reasons?.map((reason, rIdx) => (
                <div
                  key={rIdx}
                  className="flex items-start gap-3 p-4 rounded-xl border border-gray-200/80 bg-gray-50/60 hover:bg-[#edf7f6]/60 hover:border-[#368b82] transition-all"
                >
                  <div className="w-6 h-6 rounded-md bg-[#368b82] text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 font-poppins leading-relaxed">
                    {reason}
                  </span>
                </div>
              ))}
            </div>

            {service.whySection.closingNote && (
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed pt-2 font-poppins border-t border-gray-100">
                {service.whySection.closingNote}
              </p>
            )}
          </section>
        )}

        {/* 7. LET'S HAVE A CUP OF COFFEE! Contact Section */}
        <div className="pt-4">
          <IndustryCoffeeSection industryName={service.heroTitle} />
        </div>
      </div>
    </main>
  );
}

