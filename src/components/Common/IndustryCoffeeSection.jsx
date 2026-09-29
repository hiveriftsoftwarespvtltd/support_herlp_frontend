"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { inquiryApi } from "@/api";

export function IndustryCoffeeSection({ industryName = "" }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    service: "Select services",
    software: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const sourcePath = typeof window !== "undefined" ? window.location.pathname : "";
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const serviceVal = formData.service !== "Select services" && formData.service ? formData.service : "Industry Consultation";

      await inquiryApi.submitInquiry({
        fullName,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        service: serviceVal,
        softwarePreference: formData.software.trim(),
        message: formData.description.trim() || `Inquiry submitted for ${industryName || "accounting services"}`,
        sourcePage: sourcePath || `/industry/${industryName || "consultation"}`,
      });

      setSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        service: "Select services",
        software: "",
        description: "",
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 7000);
    } catch (err) {
      console.error("Inquiry submission error:", err);
      setErrorMessage(err.message || "Failed to submit inquiry. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-white text-[#222222] py-14 sm:py-20 font-poppins border-t border-gray-200 relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#368b82]/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Title, Fix Meeting Badge & Coffee Cup */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider">
              Let&apos;s Connect
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black uppercase tracking-tight text-[#111111] leading-tight">
              LET&apos;S HAVE A CUP <br />
              OF <span className="text-[#368b82]">COFFEE!</span>
            </h2>
            <p className="text-sm text-gray-500 max-w-md font-poppins leading-relaxed">
              Book a casual discovery conversation with our senior accounting directors to discuss tailored financial solutions for your business.
            </p>

            {/* Fix meeting badge */}
            <div className="w-[220px] sm:w-[260px] pt-1 hover:scale-105 transition-transform duration-300">
              <Image
                src="/industry/fix_meeting.png"
                alt="Fix Meeting Now!"
                width={347}
                height={83}
                className="w-full h-auto object-contain filter drop-shadow-xs"
                priority
              />
            </div>

            {/* Coffee cup illustration */}
            <div className="w-[240px] sm:w-[280px] pt-2 hover:scale-105 transition-transform duration-500">
              <Image
                src="/industry/cofee_cup.png"
                alt="Cup of Coffee"
                width={484}
                height={392}
                className="w-full h-auto object-contain mx-auto lg:mx-0 drop-shadow-md"
                priority
              />
            </div>
          </div>

          {/* Right Column: High-End LET'S TALK Form */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#368b82] to-[#286b64] rounded-3xl p-7 sm:p-10 shadow-2xl text-white relative overflow-hidden border border-white/20">
            {/* Ambient Radial Highlight inside card */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-2 mb-6">
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-white font-poppins">
                LET&apos;S TALK
              </h3>
              <p className="text-xs sm:text-sm text-white/85 font-poppins">
                Fill out the quick form below and our certified {industryName || "industry"} specialist will connect with you within 4 hours.
              </p>
            </div>

            {submitted ? (
              <div className="bg-white/20 backdrop-blur-md border border-white/40 text-white p-8 rounded-2xl text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-white mx-auto stroke-[2.5]" />
                <h4 className="font-extrabold text-xl font-poppins">Thank You!</h4>
                <p className="text-sm text-white/95 font-poppins max-w-md mx-auto">
                  Your message has been dispatched successfully. A senior accounting advisor will follow up with you promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
                {/* Row 1: First Name | Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="First Name *"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 bg-white/15 hover:bg-white/20 border border-white/30 rounded-xl text-sm text-white placeholder-white/75 focus:outline-hidden focus:border-white focus:bg-white/25 focus:ring-2 focus:ring-white/30 transition-all font-poppins"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last Name *"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 bg-white/15 hover:bg-white/20 border border-white/30 rounded-xl text-sm text-white placeholder-white/75 focus:outline-hidden focus:border-white focus:bg-white/25 focus:ring-2 focus:ring-white/30 transition-all font-poppins"
                  />
                </div>

                {/* Row 2: Email | Contact No. */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    required
                    placeholder="Work Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/15 hover:bg-white/20 border border-white/30 rounded-xl text-sm text-white placeholder-white/75 focus:outline-hidden focus:border-white focus:bg-white/25 focus:ring-2 focus:ring-white/30 transition-all font-poppins"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Contact Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/15 hover:bg-white/20 border border-white/30 rounded-xl text-sm text-white placeholder-white/75 focus:outline-hidden focus:border-white focus:bg-white/25 focus:ring-2 focus:ring-white/30 transition-all font-poppins"
                  />
                </div>

                {/* Row 3: Company Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-white/15 hover:bg-white/20 border border-white/30 rounded-xl text-sm text-white placeholder-white/75 focus:outline-hidden focus:border-white focus:bg-white/25 focus:ring-2 focus:ring-white/30 transition-all font-poppins"
                  />
                </div>

                {/* Row 4: Select services */}
                <div>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 bg-white/15 hover:bg-white/20 border border-white/30 rounded-xl text-sm text-white focus:outline-hidden focus:border-white focus:bg-[#286b64] focus:ring-2 focus:ring-white/30 transition-all font-poppins cursor-pointer"
                  >
                    <option value="Select services" className="bg-[#286b64] text-white">Select service required</option>
                    <option value="Complete Bookkeeping" className="bg-[#286b64] text-white">Complete Bookkeeping</option>
                    <option value="Accounting Services" className="bg-[#286b64] text-white">Accounting Services</option>
                    <option value="Accounts Receivable" className="bg-[#286b64] text-white">Accounts Receivable</option>
                    <option value="Accounts Payable" className="bg-[#286b64] text-white">Accounts Payable</option>
                    <option value="Payroll Management" className="bg-[#286b64] text-white">Payroll Management</option>
                    <option value="Financial Reporting" className="bg-[#286b64] text-white">Financial Reporting</option>
                    <option value="Virtual Bookkeeping" className="bg-[#286b64] text-white">Virtual Bookkeeping</option>
                    <option value="Back Office Operations" className="bg-[#286b64] text-white">Back Office Operations</option>
                    <option value="Cleanup / Catch Up Work" className="bg-[#286b64] text-white">Cleanup / Catch Up Work</option>
                    <option value="Migration Services" className="bg-[#286b64] text-white">Migration Services</option>
                  </select>
                </div>

                {/* Row 5: Software */}
                <div>
                  <input
                    type="text"
                    placeholder="Current Accounting Software (e.g. QuickBooks, Xero)"
                    value={formData.software}
                    onChange={(e) => setFormData({ ...formData, software: e.target.value })}
                    className="w-full px-4 py-3 bg-white/15 hover:bg-white/20 border border-white/30 rounded-xl text-sm text-white placeholder-white/75 focus:outline-hidden focus:border-white focus:bg-white/25 focus:ring-2 focus:ring-white/30 transition-all font-poppins"
                  />
                </div>

                {/* Row 6: Description */}
                <div>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your requirements or challenges..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-white/15 hover:bg-white/20 border border-white/30 rounded-xl text-sm text-white placeholder-white/75 focus:outline-hidden focus:border-white focus:bg-white/25 focus:ring-2 focus:ring-white/30 transition-all font-poppins resize-none"
                  />
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="bg-red-500/20 border border-red-300 text-white p-3.5 rounded-xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-200 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-9 py-3.5 rounded-xl bg-white hover:bg-gray-100 disabled:opacity-75 disabled:cursor-not-allowed text-[#368b82] font-black text-sm uppercase tracking-wider font-poppins transition-all shadow-md hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#368b82]" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <span>Submit Request</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default IndustryCoffeeSection;
