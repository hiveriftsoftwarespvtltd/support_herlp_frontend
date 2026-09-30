"use client";

import React from "react";
import { Plus } from "lucide-react";

export function AdminHeader({ activeTab, onOpenCreateModal }) {
  const getTabTitle = () => {
    switch (activeTab) {
      case "overview":
        return "Dashboard Overview";
      case "blog":
        return "Blog Articles Management";
      case "software":
        return "Software Expertise Management";
      case "services":
        return "Services Management";
      case "inquiries":
        return "Client Inquiries & Contact Leads";
      case "consultations":
        return "Consultation Bookings";
      case "settings":
        return "Portal Settings";
      default:
        return "Admin Portal";
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200/90 px-6 sm:px-8 lg:px-10 py-4.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs font-poppins">
      <div>
        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
          <span>Admin</span>
          <span>/</span>
          <span className="text-[#368b82] font-semibold capitalize">
            {activeTab}
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-[26px] font-black text-gray-900 tracking-tight mt-0.5">
          {getTabTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {(activeTab === "blog" || activeTab === "software" || activeTab === "services") && (
          <button
            onClick={onOpenCreateModal}
            className="bg-[#368b82] hover:bg-[#286b64] active:scale-[0.99] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-poppins uppercase tracking-wider flex items-center gap-2 shadow-sm shadow-[#368b82]/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>
              {activeTab === "services"
                ? "New Service"
                : activeTab === "software"
                ? "New Software"
                : "New Article"}
            </span>
          </button>
        )}

        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-gray-600 font-semibold hidden sm:inline">
            Live Server
          </span>
        </div>
      </div>
    </header>
  );
}
