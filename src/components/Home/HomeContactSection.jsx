"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Send, CheckCircle2, ShieldCheck, Lock, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { inquiryApi } from "@/api";

export function HomeContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const firstName = formData.get("firstName")?.toString().trim() || "";
    const lastName = formData.get("lastName")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const phone = formData.get("phone")?.toString().trim() || "";
    const company = formData.get("company")?.toString().trim() || "";
    const service = formData.get("service")?.toString().trim() || "General Consultation";
    const softwarePreference = formData.get("software")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";

    try {
      await inquiryApi.submitInquiry({
        fullName: `${firstName} ${lastName}`.trim(),
        email,
        phone,
        company,
        service,
        softwarePreference,
        message,
        sourcePage: "/",
      });

      setIsSubmitted(true);
      form.reset();
      setTimeout(() => setIsSubmitted(false), 7000);
    } catch (err) {
      console.error("Home contact submit error:", err);
      setErrorMessage(err.message || "Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const certifications = [
    {
      title: "Certified MYOB Consultant",
      logo: "/software/myob.png",
      href: "/software-expertise/myob",
      status: "Certified Consultant",
    },
    {
      title: "Certified Epicor Partner",
      logo: "/software/epicor.png",
      href: "/software-expertise/epicor",
      status: "Authorized Partner",
    },
    {
      title: "Certified Zoho Advisor",
      logo: "/software/zoho.png",
      href: "/software-expertise/zohobooks",
      status: "Certified Advisor",
    },
    {
      title: "Certified Sage One Adviser",
      logo: "/software/sage.png",
      href: "/software-expertise/sage",
      status: "Authorized Adviser",
    },
    {
      title: "QuickBooks ProAdvisor",
      logo: "/software/quickbooks.png",
      href: "/software-expertise/quickbooks",
      status: "Certified ProAdvisor",
    },
    {
      title: "Certified Xero Advisor",
      logo: "/software/xero-badge.png",
      href: "/software-expertise/xero",
      status: "Official Partner",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-gray-200 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#368b82]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Form "LET'S TALK" */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-3xl border border-gray-200/90 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_-12px_rgba(54,139,130,0.12)] transition-shadow duration-300 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#368b82] via-[#203f99] to-[#368b82]" />

            <div className="space-y-2">
              <span className="inline-block px-3 py-0.5 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider">
                Start A Conversation
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-poppins text-gray-900 uppercase tracking-tight">
                LET’S TALK
              </h2>
              <div className="w-12 h-1 bg-[#368b82] rounded-full" />
              <p className="text-xs sm:text-sm text-gray-500 font-poppins pt-1 leading-relaxed">
                Reach out to schedule your free consultation with our senior certified accounting directors.
              </p>
            </div>

            {isSubmitted && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm flex items-center gap-2.5 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Thank you! Your inquiry has been dispatched. A senior advisor will follow up within 4 hours.</span>
              </div>
            )}

            {errorMessage && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <input
                    name="firstName"
                    type="text"
                    required
                    placeholder="First Name *"
                    className="w-full px-4 py-3 bg-gray-50/70 hover:bg-white border border-gray-200 focus:border-[#368b82] focus:ring-2 focus:ring-[#368b82]/20 rounded-xl outline-hidden text-sm font-poppins transition-all duration-200"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    name="lastName"
                    type="text"
                    required
                    placeholder="Last Name *"
                    className="w-full px-4 py-3 bg-gray-50/70 hover:bg-white border border-gray-200 focus:border-[#368b82] focus:ring-2 focus:ring-[#368b82]/20 rounded-xl outline-hidden text-sm font-poppins transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Work Email *"
                    className="w-full px-4 py-3 bg-gray-50/70 hover:bg-white border border-gray-200 focus:border-[#368b82] focus:ring-2 focus:ring-[#368b82]/20 rounded-xl outline-hidden text-sm font-poppins transition-all duration-200"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    className="w-full px-4 py-3 bg-gray-50/70 hover:bg-white border border-gray-200 focus:border-[#368b82] focus:ring-2 focus:ring-[#368b82]/20 rounded-xl outline-hidden text-sm font-poppins transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <input
                  name="company"
                  type="text"
                  required
                  placeholder="Company Name *"
                  className="w-full px-4 py-3 bg-gray-50/70 hover:bg-white border border-gray-200 focus:border-[#368b82] focus:ring-2 focus:ring-[#368b82]/20 rounded-xl outline-hidden text-sm font-poppins transition-all duration-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  name="service"
                  required
                  className="w-full px-4 py-3 bg-gray-50/70 hover:bg-white border border-gray-200 focus:border-[#368b82] focus:ring-2 focus:ring-[#368b82]/20 rounded-xl outline-hidden text-sm font-poppins text-gray-700 transition-all duration-200"
                >
                  <option value="">Select services *</option>
                  <option value="Catch up Services">Catch up Services</option>
                  <option value="Migration services">Migration services</option>
                  <option value="CFO Services">CFO Services</option>
                  <option value="Other Services">Other Services</option>
                  <option value="Full Time accounting services">Full Time accounting services</option>
                  <option value="Part time accounting services">Part time accounting services</option>
                  <option value="Ad hoc services">Ad hoc services</option>
                </select>

                <input
                  name="software"
                  type="text"
                  required
                  placeholder="Current Software (e.g. QuickBooks, Xero) *"
                  className="w-full px-4 py-3 bg-gray-50/70 hover:bg-white border border-gray-200 focus:border-[#368b82] focus:ring-2 focus:ring-[#368b82]/20 rounded-xl outline-hidden text-sm font-poppins transition-all duration-200"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Describe your requirements or specific challenge... *"
                  className="w-full px-4 py-3 bg-gray-50/70 hover:bg-white border border-gray-200 focus:border-[#368b82] focus:ring-2 focus:ring-[#368b82]/20 rounded-xl outline-hidden text-sm font-poppins transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full sm:w-auto bg-[#368b82] hover:bg-[#286b64] disabled:opacity-75 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-xl font-bold font-poppins uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Request Free Consultation</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: "WE ARE CERTIFIED" */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="inline-block px-3 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
                Industry Accreditations
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-poppins text-gray-900 uppercase tracking-tight">
                WE ARE CERTIFIED
              </h2>
              <div className="w-12 h-1 bg-[#368b82] rounded-full" />
              <p className="text-xs sm:text-sm text-gray-500 font-poppins pt-1 leading-relaxed">
                Our accountants maintain formal credentials across major enterprise, cloud accounting, and tax compliance ecosystems.
              </p>
            </div>

            {/* Badges Grid with Interactive Lift */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="group relative p-3 sm:p-4 rounded-2xl border border-gray-200/90 bg-white hover:border-[#368b82] flex flex-col items-center justify-center shadow-2xs hover:shadow-[0_14px_30px_-6px_rgba(54,139,130,0.18)] hover:-translate-y-1 transition-all duration-300 h-[88px] sm:h-[96px] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[#edf7f6]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative w-full h-[46px] sm:h-[50px] flex items-center justify-center z-10">
                    <Image
                      src={item.logo}
                      alt={item.title}
                      width={180}
                      height={60}
                      className="max-h-[44px] sm:max-h-[48px] w-auto max-w-[88%] object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <span className="text-[10px] font-semibold text-gray-400 group-hover:text-[#368b82] transition-colors mt-1 font-poppins flex items-center gap-1 z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {item.status}
                  </span>
                </Link>
              ))}
            </div>

            {/* Security Guarantee Card */}
            <div className="p-5 bg-gradient-to-br from-[#edf7f6] via-white to-blue-50/50 rounded-2xl border border-[#368b82]/25 flex items-start gap-4 text-xs text-gray-700 font-poppins shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#368b82] text-white flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-gray-900 text-sm">
                  Enterprise-Grade Security &amp; NDA Protected
                </h4>
                <p className="text-gray-500 leading-relaxed text-xs">
                  Full adherence to ISO 27001 data protection protocols, 256-bit SSL encryption, and strict non-disclosure compliance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeContactSection;

