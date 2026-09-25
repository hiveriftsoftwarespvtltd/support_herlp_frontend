"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import { contactInfo } from "@/data/navigationData";

export function ConsultationCTA({ currentTopic = "Accounting & Bookkeeping" }) {
  return (
    <section className="bg-gradient-to-r from-[#edf7f6] to-amber-50 border border-[#368b82]/30/60 rounded-xl p-8 sm:p-10 my-12 text-center max-w-4xl mx-auto shadow-sm">
      <h3 className="text-2xl sm:text-3xl font-bold font-poppins text-gray-900 mb-3">
        Ready to Optimize Your <span className="text-[#368b82]">{currentTopic}</span>?
      </h3>
      <p className="text-gray-600 font-poppins max-w-2xl mx-auto mb-6 text-sm sm:text-base">
        Schedule a confidential, obligation-free consultation with our certified bookkeepers and accountants today.
      </p>

      <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm font-medium text-gray-700">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#368b82]" />
          <span>Certified ProAdvisors</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#368b82]" />
          <span>Accurate Financial Reports</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#368b82]" />
          <span>Save up to 50% on Operations</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href={contactInfo.consultationUrl}
          className="inline-flex items-center gap-2 bg-[#368b82] hover:bg-[#286b64] text-white px-6 py-3 rounded font-semibold font-poppins text-sm uppercase tracking-wider shadow-sm transition-all"
        >
          <Send className="w-4 h-4" />
          <span>Book Free Consultation</span>
        </Link>

        <a
          href={`tel:${contactInfo.phoneTel}`}
          className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-800 px-6 py-3 rounded font-semibold font-poppins text-sm hover:bg-gray-50 transition-all shadow-xs"
        >
          <Phone className="w-4 h-4 text-[#368b82]" />
          <span>{contactInfo.phoneDisplay}</span>
        </a>
      </div>
    </section>
  );
}

export default ConsultationCTA;
