import React from "react";
import { PageHeroBanner } from "@/components/Common/PageHeroBanner";
import { ConsultationCTA } from "@/components/Common/ConsultationCTA";
import { Globe2, MapPin, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Countries Where We Serve – Support Help",
  description: "Support Help serves business clients across the USA, Australia, United Kingdom, Canada, and worldwide with customized accounting solutions.",
};

export default function CountriesServedPage() {
  const countries = [
    {
      name: "United States (USA)",
      flag: "🇺🇸",
      specialization: "US GAAP, Federal Taxes, 1099 Filing, State Sales Tax, QuickBooks Online/Desktop",
      cities: "New York, California, Texas, Florida, Illinois, Delaware",
    },
    {
      name: "Australia",
      flag: "🇦🇺",
      specialization: "BAS / IAS Submissions, Single Touch Payroll (STP), GST Compliance, Xero & MYOB",
      cities: "Sydney, Melbourne, Brisbane, Perth, Adelaide",
    },
    {
      name: "United Kingdom (UK)",
      flag: "🇬🇧",
      specialization: "Making Tax Digital (MTD), VAT Returns, PAYE Payroll, Companies House Submissions",
      cities: "London, Manchester, Birmingham, Edinburgh",
    },
    {
      name: "Canada",
      flag: "🇨🇦",
      specialization: "GST / HST / PST Filing, T2 Corporation Tax Prep, Payroll & ROE, QBO Canada",
      cities: "Toronto, Vancouver, Montreal, Calgary",
    },
    {
      name: "India & South Asia",
      flag: "🇮🇳",
      specialization: "GST Reconciliation, TDS Filings, ROC Compliance, Zoho Books, Tally",
      cities: "Mumbai, Delhi NCR, Bengaluru, Hyderabad, Ahmedabad",
    },
    {
      name: "Global Offshore Teams",
      flag: "🌐",
      specialization: "Multi-currency back-office operations for global consulting agencies and CPA firms",
      cities: "Worldwide Coverage across all time zones",
    },
  ];

  return (
    <div className="w-full pb-16">
      <PageHeroBanner
        title="Countries Where We Serve"
        subtitle="Cross-border bookkeeping and tax expertise serving clients across 5 continents."
        category="About Us"
        categoryHref="/about-us"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold font-poppins text-gray-900">
            Localized Knowledge with Worldwide Scale
          </h2>
          <p className="text-gray-600 font-poppins">
            Accounting and taxation laws vary drastically between regions. Our localized accounting desks ensure 100% compliance with jurisdictional requirements in each country.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((c, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs hover:border-[#368b82] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{c.flag}</span>
                  <h3 className="text-lg font-bold text-gray-900 font-poppins">
                    {c.name}
                  </h3>
                </div>

                <div className="space-y-1.5 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#368b82]">
                    Core Competencies:
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-poppins">
                    {c.specialization}
                  </p>
                </div>

                <div className="space-y-1 pt-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Primary Hubs:
                  </h4>
                  <p className="text-xs text-gray-500 font-poppins">
                    {c.cities}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs text-green-700 font-semibold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Active Operating Desk</span>
              </div>
            </div>
          ))}
        </div>

        <ConsultationCTA currentTopic="International Bookkeeping" />
      </div>
    </div>
  );
}
