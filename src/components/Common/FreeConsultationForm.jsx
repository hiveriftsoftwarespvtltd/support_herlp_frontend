"use client";

import React, { useState } from "react";
import { Calendar, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { consultationApi } from "@/api";

export function FreeConsultationForm() {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    workEmail: "",
    phone: "",
    primaryService: "Bookkeeping & Month-End Close",
    preferredTimeSlot: "Morning (9:00 AM – 12:00 PM EST)",
    overview: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await consultationApi.bookConsultation({
        name: formData.name.trim(),
        companyName: formData.companyName.trim() || undefined,
        workEmail: formData.workEmail.trim(),
        phone: formData.phone.trim(),
        primaryService: formData.primaryService,
        preferredTimeSlot: formData.preferredTimeSlot,
        overview: formData.overview.trim() || undefined,
        sourcePage: "/free-consultation",
      });

      setIsSuccess(true);
      setFormData({
        name: "",
        companyName: "",
        workEmail: "",
        phone: "",
        primaryService: "Bookkeeping & Month-End Close",
        preferredTimeSlot: "Morning (9:00 AM – 12:00 PM EST)",
        overview: "",
      });

      // Scroll to form top smoothly
      window.scrollTo({ top: 350, behavior: "smooth" });
    } catch (err) {
      console.error("Consultation booking error:", err);
      setErrorMessage(
        err.message || "Failed to confirm consultation request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <div className="w-10 h-10 rounded-full bg-[#dbefe9] text-[#368b82] flex items-center justify-center shrink-0">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold font-poppins text-gray-900">
            Book Your Consultation Time
          </h3>
          <p className="text-xs text-gray-500">Pick a preferred day & provide brief context</p>
        </div>
      </div>

      {isSuccess && (
        <div className="p-5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl space-y-2 animate-fadeIn">
          <div className="flex items-center gap-2 font-bold text-base text-emerald-800">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <span>Consultation Request Confirmed!</span>
          </div>
          <p className="text-xs text-emerald-700 leading-relaxed">
            Thank you! Your request has been recorded. A senior accounting director will reach out to you via email/phone during your preferred time slot.
          </p>
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
          <div>
            <label className="block text-xs font-bold text-gray-700 font-poppins uppercase tracking-wider mb-1.5">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Full name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:border-[#368b82] focus:ring-1 focus:ring-[#368b82] outline-hidden text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 font-poppins uppercase tracking-wider mb-1.5">
              Company Name
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="Business / Firm name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:border-[#368b82] focus:ring-1 focus:ring-[#368b82] outline-hidden text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 font-poppins uppercase tracking-wider mb-1.5">
              Work Email *
            </label>
            <input
              type="email"
              required
              value={formData.workEmail}
              onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
              placeholder="name@company.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:border-[#368b82] focus:ring-1 focus:ring-[#368b82] outline-hidden text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 font-poppins uppercase tracking-wider mb-1.5">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:border-[#368b82] focus:ring-1 focus:ring-[#368b82] outline-hidden text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 font-poppins uppercase tracking-wider mb-1.5">
              Primary Service Needed
            </label>
            <select
              value={formData.primaryService}
              onChange={(e) => setFormData({ ...formData, primaryService: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:border-[#368b82] focus:ring-1 focus:ring-[#368b82] outline-hidden text-sm bg-white cursor-pointer"
            >
              <option value="Bookkeeping & Month-End Close">Bookkeeping & Month-End Close</option>
              <option value="Cleanup & Catch Up Work">Cleanup & Catch Up Work</option>
              <option value="Accounts Payable & Receivable">Accounts Payable & Receivable</option>
              <option value="Payroll Management">Payroll Management</option>
              <option value="Software Migration (QBO / Zoho / Xero)">Software Migration (QBO / Zoho / Xero)</option>
              <option value="CPA Firm Back-Office Support">CPA Firm Back-Office Support</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 font-poppins uppercase tracking-wider mb-1.5">
              Preferred Time Slot
            </label>
            <select
              value={formData.preferredTimeSlot}
              onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:border-[#368b82] focus:ring-1 focus:ring-[#368b82] outline-hidden text-sm bg-white cursor-pointer"
            >
              <option value="Morning (9:00 AM – 12:00 PM EST)">Morning (9:00 AM – 12:00 PM EST)</option>
              <option value="Afternoon (1:00 PM – 4:00 PM EST)">Afternoon (1:00 PM – 4:00 PM EST)</option>
              <option value="Evening (4:00 PM – 7:00 PM EST)">Evening (4:00 PM – 7:00 PM EST)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 font-poppins uppercase tracking-wider mb-1.5">
            Brief Overview of Your Accounting Needs
          </label>
          <textarea
            rows={3}
            value={formData.overview}
            onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
            placeholder="Monthly transaction volume, software currently used, or current pain points..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded focus:border-[#368b82] focus:ring-1 focus:ring-[#368b82] outline-hidden text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#368b82] hover:bg-[#286b64] disabled:opacity-75 disabled:cursor-not-allowed text-white py-3 rounded font-bold font-poppins uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Confirming Booking...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Confirm Consultation Request</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default FreeConsultationForm;
