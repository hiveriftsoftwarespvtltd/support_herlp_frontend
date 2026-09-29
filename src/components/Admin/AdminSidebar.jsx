"use client";

import React from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Settings,
  ExternalLink,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Cpu,
  MessageSquare,
} from "lucide-react";

export function AdminSidebar({
  activeTab,
  setActiveTab,
  blogsCount,
  softwareCount = 0,
  inquiriesCount = 0,
  consultationsCount = 0,
  onLogout,
  isMobileOpen,
  setIsMobileOpen,
}) {
  const handleLogoutClick = () => {
    Swal.fire({
      title: "Sign Out?",
      text: "Are you sure you want to end your admin session?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#368b82",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Sign Out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout();
        Swal.fire({
          icon: "info",
          title: "Logged Out",
          text: "You have been signed out safely.",
          timer: 1400,
          showConfirmButton: false,
        });
      }
    });
  };

  const navItems = [
    { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
    {
      id: "blog",
      label: "Blog Articles",
      icon: BookOpen,
      badge: blogsCount,
    },
    {
      id: "software",
      label: "Software Expertise",
      icon: Cpu,
      badge: softwareCount,
    },
    {
      id: "inquiries",
      label: "Inquiries / Leads",
      icon: MessageSquare,
      badge: inquiriesCount,
    },
    {
      id: "consultations",
      label: "Consultations",
      icon: Calendar,
      badge: consultationsCount,
    },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* 1. DESKTOP SIDEBAR (Sticky & Independent) */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 bg-slate-900 text-white shrink-0 border-r border-slate-800 font-poppins h-screen sticky top-0 overflow-y-auto select-none">
        {/* Brand Logo & Name */}
        <div className="p-6 border-b border-slate-800/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#368b82] to-[#203f99] flex items-center justify-center font-black text-white shadow-md">
            SH
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-white leading-tight">
              Support Help
            </h2>
            <span className="text-[10px] text-[#368b82] font-bold uppercase tracking-wider block">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#368b82] text-white shadow-sm"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Public Link */}
        <div className="px-4 py-3 border-t border-slate-800/80">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-xs text-slate-400 hover:text-[#368b82] transition-colors p-2 rounded-lg hover:bg-slate-800/50"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </span>
            <ChevronRight className="w-3 h-3 text-slate-500" />
          </Link>
        </div>

        {/* Admin User Footer Profile & Sign Out */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#368b82]/30 border border-[#368b82]/40 text-[#368b82] flex items-center justify-center font-bold text-xs shrink-0">
              AD
            </div>
            <div className="truncate">
              <span className="block text-xs font-bold text-white truncate">
                Admin
              </span>
              <span className="block text-[10px] text-slate-400 truncate">
                vineetvineet8006@gmail.com
              </span>
            </div>
          </div>
          <button
            onClick={handleLogoutClick}
            title="Sign Out"
            className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* 2. MOBILE HEADER BAR */}
      <div className="lg:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#368b82] to-[#203f99] flex items-center justify-center font-bold text-xs">
            SH
          </div>
          <span className="text-sm font-bold text-white">Support Help Admin</span>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-200"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2 text-sm z-40">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg flex items-center justify-between ${
                  isActive ? "bg-[#368b82] text-white" : "text-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-full text-xs bg-white/20">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <button
            onClick={() => {
              setIsMobileOpen(false);
              handleLogoutClick();
            }}
            className="w-full text-left px-4 py-2.5 rounded-lg flex items-center gap-3 text-red-400 hover:bg-slate-800"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </>
  );
}
