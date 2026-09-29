"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Mail,
  ChevronRight,
  Eye,
  Edit,
  Sparkles,
  ExternalLink,
  ArrowUpRight,
  Cpu,
} from "lucide-react";

export function OverviewTab({
  blogs = [],
  softwareCount = 0,
  inquiriesCount = 0,
  consultationsCount = 0,
  onNavigateToBlog,
  onNavigateToSoftware,
  onNavigateToConsultations,
  onNavigateToInquiries,
  onOpenCreateModal,
  onOpenEditModal,
}) {
  return (
    <div className="w-full p-6 sm:p-8 lg:p-10 space-y-8 font-poppins">
      {/* 1. KPI Metric Cards Row (Full Width Grid - All 100% Real Live MongoDB Data) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Blogs Card */}
        <div
          onClick={onNavigateToBlog}
          className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="space-y-1">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">
              Published Blogs
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900 group-hover:text-[#368b82] transition-colors">
                {blogs.length}
              </span>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <p className="text-[11px] text-gray-400">Live articles in knowledge hub</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#edf7f6] text-[#368b82] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <BookOpen className="w-7 h-7" />
          </div>
        </div>

        {/* Software Expertise Card */}
        <div
          onClick={onNavigateToSoftware}
          className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="space-y-1">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">
              Software Expertise
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900 group-hover:text-[#203f99] transition-colors">
                {softwareCount}
              </span>
              <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full">
                Platforms
              </span>
            </div>
            <p className="text-[11px] text-gray-400">Live certified software</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#203f99] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Cpu className="w-7 h-7" />
          </div>
        </div>

        {/* Consultations Card */}
        <div
          onClick={onNavigateToConsultations}
          className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="space-y-1">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">
              Consultations
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900 group-hover:text-emerald-600 transition-colors">
                {consultationsCount}
              </span>
              <span className="text-xs text-[#368b82] font-bold bg-[#edf7f6] px-2 py-0.5 rounded-full">
                {consultationsCount === 1 ? "1 Booking" : `${consultationsCount} Bookings`}
              </span>
            </div>
            <p className="text-[11px] text-gray-400">Live from /free-consultation</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Calendar className="w-7 h-7" />
          </div>
        </div>

        {/* Inquiries Card */}
        <div
          onClick={onNavigateToInquiries}
          className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="space-y-1">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">
              Contact Inquiries
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900 group-hover:text-purple-600 transition-colors">
                {inquiriesCount}
              </span>
              <span className="text-xs text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-full">
                {inquiriesCount === 1 ? "1 Lead" : `${inquiriesCount} Leads`}
              </span>
            </div>
            <p className="text-[11px] text-gray-400">Live inbound website inquiries</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Mail className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid (Full Width, Balanced Two-Column Split) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: Recent Blogs Table (8 Cols) */}
        <div className="xl:col-span-8 bg-white rounded-2xl border border-gray-200/90 shadow-xs p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h3 className="font-extrabold text-gray-900 text-lg tracking-tight">
                Recent Blog Articles
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Real-time content currently published on your knowledge hub
              </p>
            </div>
            <button
              onClick={onNavigateToBlog}
              className="text-xs text-[#368b82] font-bold hover:underline flex items-center gap-1 cursor-pointer bg-[#edf7f6] px-3 py-1.5 rounded-lg"
            >
              <span>View All Articles</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {blogs.slice(0, 5).map((post, idx) => (
              <div
                key={idx}
                className="py-4 flex flex-wrap items-center justify-between gap-4 hover:bg-[#fbfcfd] px-2 rounded-xl transition-colors group"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#edf7f6] text-[#368b82] border border-[#368b82]/20">
                      {post.category}
                    </span>
                    {post.featured && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        ⭐ Featured
                      </span>
                    )}
                    <span className="text-xs text-gray-400 font-medium">
                      {post.readTime}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-[#368b82] transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-500 truncate max-w-xl">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="p-2 rounded-lg text-gray-400 hover:text-[#368b82] hover:bg-[#edf7f6] transition-colors"
                    title="Preview Live"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => onOpenEditModal(post)}
                    className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                    title="Edit Post"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Portal Controls & Quick Shortcuts (4 Cols) */}
        <div className="xl:col-span-4 space-y-6">
          {/* Create CTA Hero Card */}
          <div className="bg-gradient-to-br from-[#368b82] via-[#2d776f] to-[#203f99] rounded-2xl p-6 sm:p-7 text-white space-y-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg tracking-tight">
                Publish New Blog Post
              </h3>
              <p className="text-xs text-white/85 mt-1 leading-relaxed">
                Add authoritative guides and SEO-optimized workflows to capture
                high-intent accounting clients.
              </p>
            </div>
            <button
              onClick={onOpenCreateModal}
              className="w-full bg-white text-[#368b82] hover:bg-gray-50 active:scale-[0.99] font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>+ Create Article Now</span>
            </button>
          </div>

          {/* Quick Shortcuts Card */}
          <div className="bg-white rounded-2xl border border-gray-200/90 p-6 space-y-4 shadow-xs">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
              Quick Shortcuts
            </h4>
            <div className="space-y-2 text-xs font-medium text-gray-700">
              <Link
                href="/blog"
                target="_blank"
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50/70 hover:bg-[#edf7f6] hover:text-[#368b82] transition-colors border border-gray-100"
              >
                <span>Live Blog Hub</span>
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/free-consultation"
                target="_blank"
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50/70 hover:bg-[#edf7f6] hover:text-[#368b82] transition-colors border border-gray-100"
              >
                <span>Consultation Booking Page</span>
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/contact-us"
                target="_blank"
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50/70 hover:bg-[#edf7f6] hover:text-[#368b82] transition-colors border border-gray-100"
              >
                <span>Contact Inquiries Page</span>
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
