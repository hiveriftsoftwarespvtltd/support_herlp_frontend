import React from "react";
import { PageHeroBanner } from "@/components/Common/PageHeroBanner";
import { ConsultationCTA } from "@/components/Common/ConsultationCTA";
import { Star, Quote, Building2 } from "lucide-react";

export const metadata = {
  title: "Client Testimonials – Support Help",
  description: "Read reviews and testimonials from business owners, CFOs, and CPA partners who trust Support Help with their accounting operations.",
};

export default function ClientTestimonialsPage() {
  const testimonials = [
    {
      quote: "Support Help transformed our messy QuickBooks ledger within 3 weeks. Their communication is top-notch and our monthly reports are always delivered ahead of schedule.",
      author: "David Miller",
      role: "Managing Director, Apex Construction Group",
      location: "Dallas, Texas, USA",
      rating: 5,
    },
    {
      quote: "As a fast-growing tech startup, we needed payroll and multi-currency bookkeeping that could keep up. Their dedicated team integrated seamlessly into our Slack and Xero workflow.",
      author: "Sarah Jenkins",
      role: "Co-Founder & COO, CloudNest Solutions",
      location: "Sydney, Australia",
      rating: 5,
    },
    {
      quote: "Outsourcing our routine bookkeeping to Support Help allowed our CPA firm to scale by 40% during tax season without hiring expensive local temporary staff.",
      author: "Robert Chen, CPA",
      role: "Principal Partner, Chen & Associates CPA",
      location: "San Francisco, California, USA",
      rating: 5,
    },
    {
      quote: "The migration from QuickBooks Desktop to Zoho Books was flawless. Not a single historical record was lost and our team was fully trained within days.",
      author: "Marcus Vance",
      role: "Finance Director, Global Retail Partners",
      location: "Melbourne, Australia",
      rating: 5,
    },
    {
      quote: "Their attention to detail with accounts payable and vendor reconciliations has saved us thousands in duplicate invoices and penalties. Truly a 5-star partner.",
      author: "Elena Rostova",
      role: "Operations Head, BioPharma Logistics",
      location: "London, UK",
      rating: 5,
    },
    {
      quote: "Reliable, responsive, and extremely cost effective. Working with Support Help feels like having our own in-house accounting department at a fraction of the cost.",
      author: "Jason Taylor",
      role: "Founder, Horizon Renewable Energy",
      location: "Miami, Florida, USA",
      rating: 5,
    },
  ];

  return (
    <div className="w-full pb-16">
      <PageHeroBanner
        title="Client Testimonials & Reviews"
        subtitle="Discover why hundreds of enterprises and CPA firms trust us with their financial operations."
        category="Company"
        categoryHref="/about-us"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold font-poppins text-gray-900">
            Trusted by Leaders in Over 15 Industries
          </h2>
          <p className="text-gray-600 font-poppins">
            Hear first-hand from the founders, CFOs, and accountants who have accelerated their businesses with our assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs hover:border-[#368b82] hover:shadow-md transition-all flex flex-col justify-between relative"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-orange-200 mb-2" />

                <p className="text-sm text-gray-700 italic leading-relaxed font-poppins mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="font-bold text-gray-900 font-poppins text-sm">{t.author}</div>
                <div className="text-xs text-gray-500 font-poppins">{t.role}</div>
                <div className="text-[11px] text-[#368b82] font-semibold font-poppins mt-0.5">
                  {t.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        <ConsultationCTA currentTopic="Financial Peace of Mind" />
      </div>
    </div>
  );
}
