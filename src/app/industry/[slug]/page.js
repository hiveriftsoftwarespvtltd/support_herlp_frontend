import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { industriesData, contactInfo } from "@/data/navigationData";
import allIndustriesData from "@/data/allIndustriesData.json";
import { API_BASE_URL } from "@/config";
import { PageHeroBanner } from "@/components/Common/PageHeroBanner";
import { IndustryCoffeeSection } from "@/components/Common/IndustryCoffeeSection";
import { ArrowRight, CheckCircle2, Phone, Calendar } from "lucide-react";

export function generateStaticParams() {
  return Object.keys(allIndustriesData).map((slug) => ({ slug }));
}

function getIndustryInfo(slug) {
  const allIndustries = industriesData.flatMap((col) => col.items);
  const matched = allIndustries.find((item) => item.href.endsWith(`/${slug}`));

  const formattedTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    name: matched ? matched.name : formattedTitle,
    slug,
  };
}

async function getIndustryData(slug) {
  const cleanSlug = (slug || "").replace(/^\/+/, "").toLowerCase();

  try {
    const res = await fetch(`${API_BASE_URL}/services/${cleanSlug}`, {
      next: { revalidate: 30 },
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.data) {
        const item = json.data;
        return {
          h1: item.heroTitle || item.title?.toUpperCase(),
          intro: Array.isArray(item.introParagraphs)
            ? item.introParagraphs
            : typeof item.introParagraphs === "string"
            ? [item.introParagraphs]
            : [],
          servicesHeading: item.solutionsTitle,
          leftItems: item.leftCol?.map((x) => ({
            title: x.title,
            description: x.desc || x.description,
          })),
          rightItems: item.rightCol?.map((x) => ({
            title: x.title,
            description: x.desc || x.description,
          })),
          section1: {
            title: item.showcase1Title,
            paragraphs: item.showcase1Description
              ? [item.showcase1Description]
              : [],
            image: item.showcase1Image,
          },
          section2: {
            title: item.showcase2Title,
            paragraphs: Array.isArray(item.showcase2Paragraphs)
              ? item.showcase2Paragraphs
              : typeof item.showcase2Paragraphs === "string"
              ? [item.showcase2Paragraphs]
              : [],
            image: item.showcase2Image,
          },
          metaTitle: item.metaTitle,
          metaDescription: item.metaDescription,
        };
      }
    }
  } catch (err) {}

  return allIndustriesData[cleanSlug] || null;
}

async function getAllIndustriesList() {
  try {
    const res = await fetch(
      `${API_BASE_URL}/services?category=Industry+Services&isPublished=true`,
      { next: { revalidate: 60 } }
    );
    if (res.ok) {
      const json = await res.json();
      if (json?.data && json.data.length > 0) {
        return json.data.map((item) => ({
          name: item.title,
          href: `/industry/${item.slug}`,
        }));
      }
    }
  } catch (err) {}

  return industriesData.flatMap((col) => col.items);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cleanSlug = (slug || "").replace(/^\/+/, "").toLowerCase();
  const industryItem = await getIndustryData(cleanSlug);

  if (industryItem) {
    return {
      title: industryItem.metaTitle || `${industryItem.h1} – Support Help`,
      description:
        industryItem.metaDescription ||
        `Professional ${industryItem.h1} services by certified accountants. Serving USA, Australia, and worldwide clients.`,
    };
  }

  const { name } = getIndustryInfo(cleanSlug);
  return {
    title: `${name} Accounting & Bookkeeping Services – Support Help`,
    description: `Specialized bookkeeping, tax planning, and accounting services for ${name} businesses. Certified experts in USA and Australia.`,
  };
}

export default async function IndustryDetailPage({ params }) {
  const { slug } = await params;
  const cleanSlug = (slug || "").replace(/^\/+/, "").toLowerCase();
  const industry = getIndustryInfo(cleanSlug);
  const data = await getIndustryData(cleanSlug);

  if (!data) {
    notFound();
  }

  const allIndustries = await getAllIndustriesList();

  return (
    <div className="w-full pb-16 bg-[#fafbfc]">
      {/* 1. Page Hero Banner */}
      <PageHeroBanner
        title={data.h1 || `${industry.name.toUpperCase()} ACCOUNTING`}
        subtitle={
          data.intro?.[0]
            ? data.intro[0].slice(0, 160) + "..."
            : `Industry-focused bookkeeping and accounting services tailored for ${industry.name}.`
        }
        category="Industries"
        categoryHref="/industry/construction-real-estate-accounting"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-10 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12">
          {/* Main Content Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-12 sm:space-y-16">
            {/* 2. Intro Section with Modern Card Design */}
            {data.intro && data.intro.length > 0 && (
              <div className="relative bg-white p-7 sm:p-10 rounded-3xl border border-gray-200/90 shadow-xs hover:shadow-[0_14px_35px_-8px_rgba(54,139,130,0.15)] transition-shadow duration-300 space-y-5 overflow-hidden">
                {/* Top Subtle Brand Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#368b82] via-[#203f99] to-[#368b82]" />

                <div className="space-y-2">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider">
                    Specialized Industry Practice
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-poppins">
                    {industry.name} Accounting &amp; Bookkeeping Experts
                  </h2>
                  <div className="w-16 h-1 bg-[#368b82] rounded-full" />
                </div>

                <div className="space-y-4 text-base leading-relaxed text-gray-600 font-poppins">
                  {data.intro.map((p, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Core Services / Benefits Grid with Live Hover Elevation */}
            {(data.leftItems?.length > 0 || data.rightItems?.length > 0) && (
              <div className="space-y-8 pt-2">
                <div className="space-y-2">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
                    Comprehensive Deliverables
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-poppins tracking-tight">
                    {data.servicesHeading || `Bookkeeping and Accounting Services for ${industry.name}`}
                  </h2>
                  <div className="w-14 h-1 bg-[#368b82] rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column Items */}
                  <div className="space-y-5">
                    {data.leftItems?.map((item, idx) => (
                      <div
                        key={idx}
                        className="group relative bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs hover:shadow-[0_18px_36px_-8px_rgba(54,139,130,0.2)] hover:border-[#368b82] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                      >
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#368b82]/5 rounded-full blur-xl group-hover:bg-[#368b82]/20 transition-all duration-300 pointer-events-none" />

                        <div>
                          <div className="flex items-center gap-3.5 mb-3">
                            <div className="w-9 h-9 rounded-xl bg-[#edf7f6] group-hover:bg-[#368b82] text-[#368b82] group-hover:text-white flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-2 transition-all duration-300 shadow-2xs">
                              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#368b82] font-poppins transition-colors leading-snug">
                              {item.title}
                            </h3>
                          </div>
                          {item.description && (
                            <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-poppins pl-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column Items */}
                  <div className="space-y-5">
                    {data.rightItems?.map((item, idx) => (
                      <div
                        key={idx}
                        className="group relative bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs hover:shadow-[0_18px_36px_-8px_rgba(54,139,130,0.2)] hover:border-[#368b82] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                      >
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#368b82]/5 rounded-full blur-xl group-hover:bg-[#368b82]/20 transition-all duration-300 pointer-events-none" />

                        <div>
                          <div className="flex items-center gap-3.5 mb-3">
                            <div className="w-9 h-9 rounded-xl bg-[#edf7f6] group-hover:bg-[#368b82] text-[#368b82] group-hover:text-white flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-2 transition-all duration-300 shadow-2xs">
                              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#368b82] font-poppins transition-colors leading-snug">
                              {item.title}
                            </h3>
                          </div>
                          {item.description && (
                            <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-poppins pl-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. Section 1 (Feature Showcase 1) */}
            {data.section1 && data.section1.title && (
              <div className="relative bg-gradient-to-br from-white via-[#fcfdfe] to-[#edf7f6]/50 border border-gray-200/90 rounded-3xl p-7 sm:p-10 shadow-xs hover:shadow-xl hover:border-[#368b82]/40 transition-all duration-300 overflow-hidden space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  {data.section1.image && (
                    <div className="md:col-span-5">
                      <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200/80 bg-white group">
                        <Image
                          src={data.section1.image}
                          alt={data.section1.title}
                          width={547}
                          height={436}
                          className="w-full h-auto object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                        />
                      </div>
                    </div>
                  )}

                  <div className={data.section1.image ? "md:col-span-7 space-y-4" : "md:col-span-12 space-y-4"}>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider">
                      Strategic Focus
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-poppins text-gray-900 tracking-tight leading-snug">
                      {data.section1.title}
                    </h2>
                    <div className="w-12 h-1 bg-[#368b82] rounded-full" />
                    {data.section1.paragraphs?.map((p, idx) => (
                      <p key={idx} className="text-sm sm:text-base text-gray-600 leading-relaxed font-poppins">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. Section 2 (Feature Showcase 2) */}
            {data.section2 && data.section2.title && (
              <div className="relative bg-gradient-to-bl from-[#edf7f6]/40 via-white to-gray-50/80 border border-gray-200/90 rounded-3xl p-7 sm:p-10 shadow-xs hover:shadow-xl hover:border-[#368b82]/40 transition-all duration-300 overflow-hidden space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className={data.section2.image ? "md:col-span-7 space-y-4 order-2 md:order-1" : "md:col-span-12 space-y-4"}>
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
                      Tailored Compliance
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-poppins text-gray-900 tracking-tight leading-snug">
                      {data.section2.title}
                    </h2>
                    <div className="w-12 h-1 bg-[#368b82] rounded-full" />
                    {data.section2.paragraphs?.map((p, idx) => (
                      <p key={idx} className="text-sm sm:text-base text-gray-600 leading-relaxed font-poppins">
                        {p}
                      </p>
                    ))}
                  </div>

                  {data.section2.image && (
                    <div className="md:col-span-5 order-1 md:order-2">
                      <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200/80 bg-white group">
                        <Image
                          src={data.section2.image}
                          alt={data.section2.title}
                          width={547}
                          height={436}
                          className="w-full h-auto object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar Area (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-gray-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-5 sticky top-24">
              <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                <h3 className="text-lg font-bold font-poppins text-gray-900">
                  Industries We Serve
                </h3>
                <span className="text-[11px] font-bold text-[#368b82] bg-[#edf7f6] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {allIndustries.length} Sectors
                </span>
              </div>

              {/* Enhanced Scrollable List */}
              <div className="max-h-[580px] overflow-y-auto pr-1 space-y-1 scrollbar-thin">
                {allIndustries.map((item, idx) => {
                  const isActive = item.href.endsWith(`/${cleanSlug}`);
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
                    Need Custom {industry.name} Accounting?
                  </h4>
                  <p className="text-xs text-gray-200 leading-relaxed font-poppins">
                    Schedule a 30-minute free financial check with our senior certified accountants.
                  </p>
                  <Link
                    href="/free-consultation"
                    className="block bg-[#368b82] hover:bg-[#286b64] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-xl font-poppins hover:-translate-y-0.5"
                  >
                    Get Free Consultation
                  </Link>
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

      {/* Coffee Section & Interactive Form */}
      <IndustryCoffeeSection industryName={industry.name} />
    </div>
  );
}
