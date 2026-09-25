import React from "react";
import { PageHeroBanner } from "@/components/Common/PageHeroBanner";
import { contactInfo } from "@/data/navigationData";
import { Phone, Mail, MapPin, Clock, Send, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Contact Us – Support Help",
  description: "Get in touch with Support Help for immediate accounting, payroll, and bookkeeping consultations in USA, Australia, and worldwide.",
};

export default function ContactUsPage() {
  return (
    <div className="w-full pb-16">
      <PageHeroBanner
        title="Contact Support Help"
        subtitle="We are here to answer your questions and help you build a streamlined accounting workflow."
        category="Support"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[#368b82] font-bold text-xs uppercase tracking-widest font-poppins">
                Direct Communication
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-gray-900 mt-1">
                Let&apos;s Discuss Your Bookkeeping
              </h2>
              <p className="text-sm text-gray-600 font-poppins mt-2 leading-relaxed">
                Connect with our certified professionals today. We typically respond within 2 to 4 business hours.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-10 h-10 rounded-full bg-[#dbefe9] text-[#368b82] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 font-poppins">Telephone</h4>
                  <a
                    href={`tel:${contactInfo.phoneTel}`}
                    className="text-sm text-[#368b82] font-semibold hover:underline block"
                  >
                    {contactInfo.phoneDisplay}
                  </a>
                  <span className="text-xs text-gray-400">Available Mon - Fri, 9am - 6pm EST</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-[#203f99] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 font-poppins">Email Inquiries</h4>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm text-gray-700 font-medium hover:text-[#368b82] hover:underline block"
                  >
                    {contactInfo.email}
                  </a>
                  <span className="text-xs text-gray-400">Guaranteed response within 4 hours</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 font-poppins">Head Office (USA)</h4>
                  <p className="text-sm text-gray-700 font-medium leading-relaxed font-poppins">
                    {contactInfo.address?.full || "34175 Oakdale St., Livonia, Michigan 48154"}
                  </p>
                  <span className="text-xs text-gray-400">United States Corporate Headquarters</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 font-poppins">Global Response Time</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Our team provides 24/5 coverage across USA, Australia, and European time zones.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-4 bg-[#edf7f6]/60 border border-[#368b82]/30/70 rounded-xl text-xs text-gray-700">
              <ShieldCheck className="w-5 h-5 text-[#368b82] shrink-0" />
              <span>All communications and shared documents are strictly protected under non-disclosure agreements (NDA).</span>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold font-poppins text-gray-900 border-b border-gray-100 pb-3">
              Send Us a Message
            </h3>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 font-poppins uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
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
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:border-[#368b82] focus:ring-1 focus:ring-[#368b82] outline-hidden text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 font-poppins uppercase tracking-wider mb-1.5">
                    Software Preference
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded focus:border-[#368b82] focus:ring-1 focus:ring-[#368b82] outline-hidden text-sm bg-white">
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
                  placeholder="Describe your current bookkeeping challenges, catchup requirements, or questions..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded focus:border-[#368b82] focus:ring-1 focus:ring-[#368b82] outline-hidden text-sm"
                />
              </div>

              <button
                type="button"
                className="w-full bg-[#368b82] hover:bg-[#286b64] text-white py-3 rounded font-bold font-poppins uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
