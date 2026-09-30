import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import servicesData from "@/data/allServicesData.json";
import { servicesData as fallbackNavServices, contactInfo } from "@/data/navigationData";
import { API_BASE_URL, getImageUrl } from "@/config";
import { PageHeroBanner } from "@/components/Common/PageHeroBanner";
import { IndustryCoffeeSection } from "@/components/Common/IndustryCoffeeSection";
import { Check, CheckCircle2, ArrowRight, Phone, Calendar } from "lucide-react";

/**
 * Fetch service data from live MongoDB backend with fallback to static JSON
 */
async function getServiceData(slug) {
  const cleanSlug = (slug || "").replace(/^\/+/, "").toLowerCase();

  try {
    const res = await fetch(`${API_BASE_URL}/services/${cleanSlug}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.data) {
        return json.data;
      }
    }
  } catch (err) {
    // API offline or fetch error, proceed to fallback
  }

  // Fallback to allServicesData.json
  if (servicesData?.services && servicesData.services[cleanSlug]) {
    return servicesData.services[cleanSlug];
  }

  return null;
}

/**
 * Fetch all services for the sidebar directory
 */
async function getAllServicesList() {
  try {
    const res = await fetch(`${API_BASE_URL}/services?isPublished=true`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.data && json.data.length > 0) {
        const coreAndSpec = json.data.filter(
          (item) => item.category === "Core Services" || item.category === "Specialized Services"
        );
        const list = coreAndSpec.length > 0 ? coreAndSpec : json.data;
        return list.map((item) => ({
          name: item.title,
          slug: item.slug,
          href: `/services/${item.slug}`,
        }));
      }
    }
  } catch (err) {}

  return fallbackNavServices.flatMap((col) => col.items);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getServiceData(slug);

  if (!service) {
    return {
      title: "Services – Support Help",
      description: "Professional accounting and bookkeeping services.",
    };
  }

  const title = service.metaTitle || `${service.heroTitle || service.title} – Support Help`;
  const desc =
    service.metaDescription ||
    (Array.isArray(service.introParagraphs) ? service.introParagraphs[0] : service.introParagraphs) ||
    `Outsource ${service.title} to certified accounting experts.`;

  return {
    title,
    description: desc,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const cleanSlug = (slug || "").replace(/^\/+/, "").toLowerCase();
  const service = await getServiceData(cleanSlug);

  if (!service) {
    notFound();
  }

  const allServices = await getAllServicesList();

  // Normalize Intro Data
  const introParagraphs = Array.isArray(service.introParagraphs)
    ? service.introParagraphs
    : typeof service.introParagraphs === "string"
    ? [service.introParagraphs]
    : [];

  // Normalize Solutions / Deliverables Grid Data
  const leftCol = Array.isArray(service.leftCol)
    ? service.leftCol
    : service.solutionsSection?.leftCol || [];
  const rightCol = Array.isArray(service.rightCol)
    ? service.rightCol
    : service.solutionsSection?.rightCol || [];
  const hasSolutions = leftCol.length > 0 || rightCol.length > 0;
  const solutionsTitle =
    service.solutionsTitle ||
    service.solutionsSection?.title ||
    `Accounting and Bookkeeping Services for ${service.title}`;
  const solutionsBadge = service.solutionsBadge || "Comprehensive Deliverables";

  // Normalize Showcase 1
  const sc1Title =
    service.showcase1Title ||
    service.showcase1?.title ||
    "Strategic Focus & Modern Accounting Infrastructure";
  const sc1Badge =
    service.showcase1Badge ||
    service.showcase1?.badge ||
    "Strategic Focus";
  const sc1Desc =
    service.showcase1Description ||
    service.showcase1?.description ||
    "We provide specialized financial oversight, robust process governance, and tailored industry strategies to empower your business operations.";
  const rawSc1Image =
    service.showcase1Image ||
    service.showcase1?.image ||
    "/services/bookkeeping_img_1.jpg";
  const sc1Image = getImageUrl(rawSc1Image, "/services/bookkeeping_img_1.jpg");
  const sc1Checklist =
    Array.isArray(service.showcase1Checklist) && service.showcase1Checklist.length > 0
      ? service.showcase1Checklist
      : Array.isArray(service.showcase1?.checklist) && service.showcase1.checklist.length > 0
      ? service.showcase1.checklist
      : ["QuickBooks Online", "Zoho Books", "Xero", "Sage Intacct", "NetSuite", "MYOB"];

  // Normalize Showcase 2
  const sc2Title =
    service.showcase2Title ||
    service.showcase2?.title ||
    `Operational Advantages & Tailored Compliance`;
  const sc2Badge =
    service.showcase2Badge ||
    service.showcase2?.badge ||
    "Tailored Compliance";
  const sc2ParagraphsRaw =
    Array.isArray(service.showcase2Paragraphs)
      ? service.showcase2Paragraphs
      : Array.isArray(service.showcase2?.paragraphs)
      ? service.showcase2.paragraphs
      : typeof service.showcase2Paragraphs === "string"
      ? [service.showcase2Paragraphs]
      : [];
  const sc2Paragraphs =
    sc2ParagraphsRaw.filter((p) => p && typeof p === "string" && p.trim().length > 0).length > 0
      ? sc2ParagraphsRaw.filter((p) => p && typeof p === "string" && p.trim().length > 0)
      : [
          "Our specialized approach ensures rigorous compliance with regional tax and reporting frameworks while streamlining day-to-day transaction records.",
          "By deploying industry-leading workflows and continuous validation, we eliminate discrepancies and provide actionable financial intelligence.",
        ];
  const rawSc2Image =
    service.showcase2Image ||
    service.showcase2?.image ||
    "/services/bookkeeping_img_2.jpg";
  const sc2Image = getImageUrl(rawSc2Image, "/services/bookkeeping_img_2.jpg");

  // Normalize Why Section
  const whyTitle = service.whyTitle || service.whySection?.title;
  const whyReasons = Array.isArray(service.whyReasons)
    ? service.whyReasons
    : service.whySection?.reasons || [];
  const whyClosing = service.whyClosingNote || service.whySection?.closingNote;

  const displayHeroTitle = service.heroTitle || service.title?.toUpperCase();
  const displaySubtitle =
    service.heroSubtitle ||
    (introParagraphs[0] ? introParagraphs[0].slice(0, 160) + "..." : `Certified and professional ${service.title} services by Support Help.`);

  return (
    <main className="w-full bg-[#fafbfc] font-poppins text-[#333333]">
      {/* 1. Page Hero Banner with Breadcrumbs & Brand Accent */}
      <PageHeroBanner
        title={displayHeroTitle}
        subtitle={displaySubtitle}
        category="Services"
        categoryHref="/services"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-10 sm:pt-14">
        {/* 2-Column Responsive Layout matching User Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12">
          {/* Main Content Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-12 sm:space-y-16">
            {/* 2. Intro Card with Top Brand Gradient Line */}
            {introParagraphs.length > 0 && (
              <div className="relative bg-white p-7 sm:p-10 rounded-3xl border border-gray-200/90 shadow-xs hover:shadow-[0_14px_35px_-8px_rgba(54,139,130,0.15)] transition-shadow duration-300 space-y-4 overflow-hidden">
                {/* Top Brand Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#368b82] via-[#203f99] to-[#368b82]" />

                <div className="space-y-2">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider">
                    {service.introBadge || "Specialized Practice"}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-poppins">
                    {service.introHeading || `${service.title} Experts`}
                  </h2>
                  <div className="w-16 h-1 bg-[#368b82] rounded-full" />
                </div>

                <div className="space-y-4 text-sm sm:text-base leading-relaxed text-gray-600 font-poppins">
                  {introParagraphs.map((p, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Solutions / Deliverables Section with 3D Hover Elevation Cards */}
            {hasSolutions && (
              <section className="space-y-8 pt-2">
                <div className="space-y-2">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
                    {solutionsBadge}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-poppins">
                    {solutionsTitle}
                  </h2>
                  <div className="w-16 h-1 bg-[#368b82] rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column Items */}
                  <div className="space-y-5">
                    {leftCol.map((item, idx) => (
                      <div
                        key={idx}
                        className="group relative bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs hover:shadow-[0_18px_36px_-8px_rgba(54,139,130,0.2)] hover:border-[#368b82] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                      >
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
                            {item.desc || item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column Items */}
                  <div className="space-y-5">
                    {rightCol.map((item, idx) => (
                      <div
                        key={idx}
                        className="group relative bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs hover:shadow-[0_18px_36px_-8px_rgba(54,139,130,0.2)] hover:border-[#368b82] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                      >
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
                            {item.desc || item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 4. Showcase 1: Image on Left, Text & Description on Right (as in screenshot) */}
            {Boolean(sc1Title || sc1Desc || sc1Image) && (
              <section className="relative bg-white border border-gray-200/90 rounded-3xl p-7 sm:p-10 shadow-xs hover:shadow-xl hover:border-[#368b82]/40 transition-all duration-300 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">
                  {/* Photo on Left */}
                  <div className="md:col-span-5">
                    <div className="relative w-full h-[260px] sm:h-[330px] rounded-2xl overflow-hidden shadow-md border border-gray-200/80 bg-gray-50 group">
                      <Image
                        src={sc1Image}
                        alt={sc1Title}
                        fill
                        unoptimized
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>
                  </div>

                  {/* Text on Right */}
                  <div className="md:col-span-7 space-y-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider">
                      {sc1Badge}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-poppins leading-snug break-words">
                      {sc1Title}
                    </h2>
                    <div className="w-12 h-1 bg-[#368b82] rounded-full" />
                    {sc1Desc && (
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-poppins break-words">
                        {sc1Desc}
                      </p>
                    )}

                    {sc1Checklist && sc1Checklist.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-2">
                        {sc1Checklist.map((cItem, cIdx) => (
                          <div
                            key={cIdx}
                            className="flex items-center space-x-2.5 p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-5 h-5 rounded-md bg-[#368b82] text-white flex items-center justify-center shrink-0 shadow-2xs">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-gray-800 font-poppins break-words">
                              {cItem}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* 5. Showcase 2: Text on Left, Photo on Right (as in screenshot) */}
            {Boolean(sc2Title || sc2Image || sc2Paragraphs.length > 0) && (
              <section className="relative bg-white border border-gray-200/90 rounded-3xl p-7 sm:p-10 shadow-xs hover:shadow-xl hover:border-[#368b82]/40 transition-all duration-300 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">
                  {/* Text on Left */}
                  <div className="md:col-span-7 space-y-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
                      {sc2Badge}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-poppins leading-snug break-words">
                      {sc2Title}
                    </h2>
                    <div className="w-12 h-1 bg-[#368b82] rounded-full" />
                    {sc2Paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-gray-600 text-sm sm:text-base leading-relaxed font-poppins break-words">
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Photo on Right */}
                  <div className="md:col-span-5">
                    <div className="relative w-full h-[260px] sm:h-[330px] rounded-2xl overflow-hidden shadow-md border border-gray-200/80 bg-gray-50 group">
                      <Image
                        src={sc2Image}
                        alt={sc2Title}
                        fill
                        unoptimized
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 6. Why Opt For Section with Elevated Checklist */}
            {whyTitle && whyReasons.length > 0 && (
              <section className="relative bg-white border border-gray-200/90 rounded-3xl p-7 sm:p-10 shadow-xs hover:shadow-md transition-shadow space-y-6">
                <div className="space-y-2">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider">
                    {service.whyBadge || "Value Driven Assurance"}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-poppins">
                    {whyTitle}
                  </h2>
                  <div className="w-16 h-1 bg-[#368b82] rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {whyReasons.map((reason, rIdx) => (
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

                {whyClosing && (
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed pt-2 font-poppins border-t border-gray-100">
                    {whyClosing}
                  </p>
                )}
              </section>
            )}
          </div>

          {/* Right Sidebar Area (4 Cols) matching Screenshot */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-gray-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-5 sticky top-24">
              <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                <h3 className="text-lg font-bold font-poppins text-gray-900">
                  Services We Offer
                </h3>
                <span className="text-[11px] font-bold text-[#368b82] bg-[#edf7f6] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {allServices.length} Practices
                </span>
              </div>

              {/* Scrollable Services Directory List */}
              <div className="max-h-[580px] overflow-y-auto pr-1 space-y-1 scrollbar-thin">
                {allServices.map((item, idx) => {
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
                    Need Custom {service.title} Accounting?
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

      {/* 7. Full-width Coffee Consultation Section */}
      <div className="pt-8">
        <IndustryCoffeeSection industryName={service.title || displayHeroTitle} />
      </div>
    </main>
  );
}
