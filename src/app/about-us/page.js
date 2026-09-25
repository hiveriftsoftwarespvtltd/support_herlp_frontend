import React from "react";
import Link from "next/link";
import { PageHeroBanner } from "@/components/Common/PageHeroBanner";
import { ConsultationCTA } from "@/components/Common/ConsultationCTA";
import { Award, Users, Globe2, ShieldCheck, CheckCircle } from "lucide-react";

export const metadata = {
  title: "About Us – Support Help",
  description: "Learn more about Support Help, a leading firm of certified bookkeepers and accountants serving businesses across the USA, Australia, and worldwide.",
};

export default function AboutUsPage() {
  return (
    <div className="w-full pb-16">
      <PageHeroBanner
        title="About Support Help"
        subtitle="Your Trusted Global Partner for Outsourced Accounting, Bookkeeping & Advisory Services."
        category="Company"
        categoryHref="/about-us"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-12 space-y-12">
        {/* Intro Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-3xl font-bold font-poppins text-gray-900">
              Accounting Simplified for Growing Businesses
            </h2>
            <p className="text-gray-600 leading-relaxed font-poppins">
              Support Help was established to solve a critical bottleneck for growing businesses and CPA firms: accessing dependable, highly qualified accounting talent without the staggering expense and management overhead of in-house teams.
            </p>
            <p className="text-gray-600 leading-relaxed font-poppins">
              Our multidisciplinary team comprises certified accountants, bookkeepers, and tax specialists with deep operational expertise in USA GAAP, Australian Taxation, and international accounting standards.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#edf7f6] border border-[#368b82]/30/80 rounded-2xl p-8 space-y-6">
            <h3 className="font-bold text-xl text-gray-900 border-b border-[#368b82]/30 pb-3">
              Key Metrics at a Glance
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-black text-[#368b82]">15+</div>
                <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mt-1">
                  Years of Experience
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#368b82]">500+</div>
                <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mt-1">
                  Global Clients
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#368b82]">98%</div>
                <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mt-1">
                  Retention Rate
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#368b82]">50%</div>
                <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mt-1">
                  Average Cost Savings
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-xs">
            <Award className="w-8 h-8 text-[#368b82] mb-3" />
            <h4 className="font-bold text-gray-900 text-lg mb-2">Certified Excellence</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Credentialed by CPA Australia, QuickBooks ProAdvisor, Xero, Sage, and Zoho.
            </p>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-xs">
            <ShieldCheck className="w-8 h-8 text-[#203f99] mb-3" />
            <h4 className="font-bold text-gray-900 text-lg mb-2">Ironclad Confidentiality</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Enterprise-grade security, NDAs, and encrypted cloud workspaces for complete safety.
            </p>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-xs">
            <Globe2 className="w-8 h-8 text-green-600 mb-3" />
            <h4 className="font-bold text-gray-900 text-lg mb-2">Global Reach</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Serving active clients in the United States, Australia, United Kingdom, Canada, and India.
            </p>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-xs">
            <Users className="w-8 h-8 text-amber-500 mb-3" />
            <h4 className="font-bold text-gray-900 text-lg mb-2">Dedicated Teams</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Direct access to dedicated account managers and bookkeepers committed to your business.
            </p>
          </div>
        </div>

        <ConsultationCTA currentTopic="Accounting Partnership" />
      </div>
    </div>
  );
}
