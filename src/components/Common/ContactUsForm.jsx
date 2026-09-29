"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { inquiryApi } from "@/api";

export function ContactUsForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    softwarePreference: "quickbooks",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await inquiryApi.submitInquiry({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        softwarePreference: formData.softwarePreference,
        message: formData.message.trim(),
        sourcePage: "/contact-us",
      });

      setIsSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        softwarePreference: "quickbooks",
        message: "",
      });

      setTimeout(() => {
        setIsSuccess(false);
      }, 7000);
    } catch (err) {
      console.error("Contact inquiry submission failed:", err);
      setErrorMessage(err.message || "Failed to send inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-sm space-y-6">
      <h3 className="text-xl font-bold font-poppins text-gray-900 border-b border-gray-100 pb-3">
        Send Us a Message
      </h3>

      {isSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Thank you! Your inquiry has been submitted and sent to our team. We will reply within 4 hours.</span>
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
              Your Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. John Doe"
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:border-[#368b82] focus:ring-1 focus:ring-[#368b82] outline-hidden text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 font-poppins uppercase tracking-wider mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. john@yourcompany.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:border-[#368b82] focus:ring-1 focus:ring-[#368b82] outline-hidden text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 font-poppins uppercase tracking-wider mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:border-[#368b82] focus:ring-1 focus:ring-[#368b82] outline-hidden text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 font-poppins uppercase tracking-wider mb-1.5">
              Software Preference
            </label>
            <select
              value={formData.softwarePreference}
              onChange={(e) => setFormData({ ...formData, softwarePreference: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:border-[#368b82] focus:ring-1 focus:ring-[#368b82] outline-hidden text-sm bg-white"
            >
              <option value="quickbooks">QuickBooks (Online / Desktop)</option>
              <option value="xero">Xero</option>
              <option value="zoho">Zoho Books</option>
              <option value="sage">Sage</option>
              <option value="myob">MYOB</option>
              <option value="epicor">Epicor</option>
              <option value="other">Other / Not Sure</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 font-poppins uppercase tracking-wider mb-1.5">
            How Can We Help You? *
          </label>
          <textarea
            rows={4}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Describe your current bookkeeping challenges, catchup requirements, or questions..."
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
              <span>Sending Inquiry...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Inquiry</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default ContactUsForm;
