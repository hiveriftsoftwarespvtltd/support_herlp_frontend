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
  Briefcase,
  CheckCircle2,
  Eye,
  EyeOff,
  Filter,
  Sparkles,
} from "lucide-react";

export function ServiceManagementTab({
  services = [],
  isLoading = false,
  onOpenCreateModal,
  onOpenEditModal,
  onDeleteService,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const coreCount = useMemo(
    () => services.filter((s) => s.category === "Core Services").length,
    [services]
  );

  const specializedCount = useMemo(
    () => services.filter((s) => s.category === "Specialized Services").length,
    [services]
  );

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        s.title?.toLowerCase().includes(q) ||
        s.slug?.toLowerCase().includes(q) ||
        s.heroTitle?.toLowerCase().includes(q) ||
        s.shortDescription?.toLowerCase().includes(q);

      const matchesCat =
        categoryFilter === "all" || s.category === categoryFilter;

      return matchesSearch && matchesCat;
    });
  }, [services, searchTerm, categoryFilter]);

  const categories = useMemo(() => {
    const set = new Set(["Core Services", "Specialized Services"]);
    services.forEach((s) => {
      if (s.category && !s.category.includes("Industry")) set.add(s.category);
    });
    return Array.from(set);
  }, [services]);

  const handleDelete = (service) => {
    Swal.fire({
      title: "Remove Service?",
      text: `Are you sure you want to delete "${service.title}"? It will be removed from MongoDB, the Header Dropdown, and its public page.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await onDeleteService(service);
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Service has been removed.",
            timer: 1400,
            showConfirmButton: false,
            iconColor: "#ef4444",
          });
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.message || "Failed to delete service.",
          });
        }
      }
    });
  };

  return (
    <div className="w-full p-4 sm:p-6 lg:p-7 space-y-5 font-poppins">
      {/* 1. Header Toolbar */}
      <div className="w-full bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search services by title, slug, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 hover:bg-white border border-gray-200 focus:border-[#368b82] focus:ring-2 focus:ring-[#368b82]/15 rounded-xl text-xs sm:text-sm font-poppins outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl text-xs">
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent outline-none text-gray-700 font-medium cursor-pointer"
            >
              <option value="all">All Services ({services.length})</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat} ({services.filter((s) => s.category === cat).length})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Service Button */}
        <button
          onClick={onOpenCreateModal}
          className="bg-[#368b82] hover:bg-[#286b64] active:scale-[0.99] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-poppins flex items-center gap-2 shadow-sm shadow-[#368b82]/25 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* 2. Services Data Table */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#edf7f6] text-[#368b82] flex items-center justify-center font-bold">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">
                Services Directory ({filteredServices.length})
              </h2>
              <p className="text-[11px] text-gray-500">
                All records stored dynamically in MongoDB Atlas database
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-gray-100/90 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setCategoryFilter("all")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                categoryFilter === "all"
                  ? "bg-[#368b82] text-white shadow-xs font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              All Services ({services.length})
            </button>
            <button
              onClick={() => setCategoryFilter("Core Services")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                categoryFilter === "Core Services"
                  ? "bg-[#368b82] text-white shadow-xs font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Core Services ({coreCount})
            </button>
            <button
              onClick={() => setCategoryFilter("Specialized Services")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                categoryFilter === "Specialized Services"
                  ? "bg-[#368b82] text-white shadow-xs font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Specialized Services ({specializedCount})
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-[#368b82] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-gray-500">Loading services from database...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">No Services Found</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                {searchTerm || categoryFilter !== "all"
                  ? "No services match your active search filters."
                  : "No services are present in the database yet. Click the button below to add your first service."}
              </p>
            </div>
            <button
              onClick={onOpenCreateModal}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#368b82] text-white rounded-xl text-xs font-bold hover:bg-[#286b64] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add First Service</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  <th className="py-3 px-4">Service Details</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Slug / Live Link</th>
                  <th className="py-3 px-4">Deliverables</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                {filteredServices.map((service, idx) => {
                  const slug = (service.slug || "").replace(/^\/+/, "");
                  const publicUrl = `/services/${slug}`;
                  const leftCount = Array.isArray(service.leftCol) ? service.leftCol.length : 0;
                  const rightCount = Array.isArray(service.rightCol) ? service.rightCol.length : 0;
                  const totalCards = leftCount + rightCount;

                  return (
                    <tr
                      key={service._id || service.slug || idx}
                      className="hover:bg-gray-50/60 transition-colors group"
                    >
                      {/* Title & Subtitle */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-gray-900 group-hover:text-[#368b82] transition-colors">
                          {service.title}
                        </div>
                        <div className="text-[11px] text-gray-500 truncate max-w-xs mt-0.5">
                          {service.heroSubtitle || service.shortDescription || "No description provided"}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#edf7f6] text-[#368b82] border border-[#368b82]/20">
                          {service.category || "Core Services"}
                        </span>
                      </td>

                      {/* Slug & Link */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <Link
                          href={publicUrl}
                          target="_blank"
                          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          <span>{publicUrl}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>

                      {/* Deliverables Count */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="text-gray-600 font-medium">
                          {totalCards} cards ({leftCount}L / {rightCount}R)
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {service.isPublished !== false ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Live in Header
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            Draft
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onOpenEditModal(service)}
                            title="Edit Service"
                            className="p-1.5 text-gray-500 hover:text-[#368b82] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <Link
                            href={publicUrl}
                            target="_blank"
                            title="View Public Page"
                            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => handleDelete(service)}
                            title="Delete Service"
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceManagementTab;
