"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import {
  Search,
  Plus,
  ExternalLink,
  Edit,
  Trash2,
  Cpu,
  CheckCircle2,
  Eye,
  EyeOff,
  Layers,
  Sparkles,
} from "lucide-react";

export function SoftwareManagementTab({
  softwares = [],
  isLoading = false,
  onOpenCreateModal,
  onOpenEditModal,
  onDeleteSoftware,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    return softwares.filter((s) => {
      const q = searchTerm.toLowerCase().trim();
      if (!q) return true;
      return (
        s.name?.toLowerCase().includes(q) ||
        s.slug?.toLowerCase().includes(q) ||
        s.desc?.toLowerCase().includes(q)
      );
    });
  }, [softwares, searchTerm]);

  const handleDelete = (software) => {
    Swal.fire({
      title: "Remove Software?",
      text: `Are you sure you want to remove "${software.name}"? It will also be removed from the Header Dropdown.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await onDeleteSoftware(software);
          Swal.fire({
            icon: "success",
            title: "Removed!",
            text: "Software platform removed from database and header menu.",
            timer: 1400,
            showConfirmButton: false,
            iconColor: "#ef4444",
          });
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Delete Error",
            text: err.message || "Failed to remove software.",
            confirmButtonColor: "#368b82",
          });
        }
      }
    });
  };

  return (
    <div className="w-full p-4 sm:p-6 lg:p-7 space-y-5 font-poppins">
      {/* 1. Header Toolbar */}
      <div className="w-full bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="flex-1 min-w-[260px] max-w-lg relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search software by name, slug, or subtitle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 hover:bg-white border border-gray-200 focus:border-[#368b82] focus:ring-2 focus:ring-[#368b82]/15 rounded-xl text-xs sm:text-sm font-poppins outline-none transition-all placeholder:text-gray-400"
          />
        </div>

        {/* Add Software Button */}
        <button
          onClick={onOpenCreateModal}
          className="bg-[#368b82] hover:bg-[#286b64] active:scale-[0.99] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-poppins flex items-center gap-2 shadow-sm shadow-[#368b82]/25 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Software</span>
        </button>
      </div>

      {/* 2. Software Table Card */}
      <div className="w-full bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden">
        <div className="w-full overflow-x-auto lg:overflow-x-visible">
          <table className="w-full text-left font-poppins border-collapse min-w-[650px] lg:min-w-0">
            <thead className="bg-[#f8fafc] border-b border-gray-200 text-gray-500 uppercase tracking-wider text-[11px] font-bold select-none">
              <tr>
                <th className="py-3.5 px-4 w-14 text-center">Badge</th>
                <th className="py-3.5 px-4">Software Name &amp; Slug</th>
                <th className="py-3.5 px-4">Header Dropdown Subtitle</th>
                <th className="py-3.5 px-4 w-24 text-center">Order</th>
                <th className="py-3.5 px-4 w-28 text-center">Header Status</th>
                <th className="py-3.5 px-4 w-28 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-gray-700 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-gray-400">
                    <div className="w-8 h-8 border-3 border-[#368b82] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p className="font-semibold text-xs">Loading software platforms...</p>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-gray-400">
                    <Cpu className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                    <p className="font-bold text-sm text-gray-700">No software platforms found</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Click &quot;+ Add Software&quot; to add a new platform to the website header.
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((item, idx) => {
                  const badgeSrc = item.badge || "/software/zohobooks_badge.png";

                  return (
                    <tr
                      key={item._id || item.slug || idx}
                      className="hover:bg-[#fbfcfd] transition-colors group"
                    >
                      {/* Badge / Logo */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="w-11 h-9 rounded-lg bg-gray-50 border border-gray-200 p-1 flex items-center justify-center mx-auto">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={badgeSrc}
                            alt={item.name}
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                              e.target.src = "/software/zohobooks_badge.png";
                            }}
                          />
                        </div>
                      </td>

                      {/* Name & Slug */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-gray-900 text-sm group-hover:text-[#368b82] transition-colors">
                            {item.name}
                          </h4>
                          <span className="text-[11px] text-gray-400 font-mono block">
                            /software-expertise/{(item.slug || "").replace(/^\/+/, "")}
                          </span>
                        </div>
                      </td>

                      {/* Header Subtitle */}
                      <td className="py-3.5 px-4">
                        <p className="text-xs text-gray-600 line-clamp-1 max-w-md">
                          {item.desc || "Certified partner & bookkeeping"}
                        </p>
                      </td>

                      {/* Display Order */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-700 font-bold text-xs">
                          #{item.displayOrder || idx + 1}
                        </span>
                      </td>

                      {/* Header Status */}
                      <td className="py-3.5 px-4 text-center">
                        {item.isPublished !== false ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>In Header</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-500">
                            <span>Hidden</span>
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/software-expertise/${(item.slug || "").replace(/^\/+/, "")}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-[#368b82] hover:bg-[#edf7f6] transition-colors"
                            title="Preview Live Software Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => onOpenEditModal(item)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                            title="Edit Software"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete Software"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-[#f8fafc] border-t border-gray-200/80 flex items-center justify-between text-xs text-gray-500 font-medium">
          <span>
            Total <strong>{softwares.length}</strong> software platforms integrated
          </span>
          <span className="text-[#368b82] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Live Sync with Header Dropdown
          </span>
        </div>
      </div>
    </div>
  );
}

export default SoftwareManagementTab;
