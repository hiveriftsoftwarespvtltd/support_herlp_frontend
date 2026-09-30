"use client";

import React, { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import {
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Globe,
  Share2,
  CheckCircle,
  XCircle,
  X,
  Loader2,
  Check,
} from "lucide-react";
import { socialLinkApi } from "@/api/socialLinkApi";
import { SocialIcon } from "@/components/Common/SocialIcon";

const PLATFORMS = [
  { id: "facebook", name: "Facebook", color: "bg-blue-600", text: "text-blue-600" },
  { id: "twitter", name: "X / Twitter", color: "bg-black", text: "text-black" },
  { id: "linkedin", name: "LinkedIn", color: "bg-sky-700", text: "text-sky-700" },
  { id: "instagram", name: "Instagram", color: "bg-pink-600", text: "text-pink-600" },
  { id: "youtube", name: "YouTube", color: "bg-red-600", text: "text-red-600" },
  { id: "whatsapp", name: "WhatsApp", color: "bg-emerald-600", text: "text-emerald-600" },
  { id: "pinterest", name: "Pinterest", color: "bg-rose-600", text: "text-rose-600" },
  { id: "github", name: "GitHub", color: "bg-gray-800", text: "text-gray-800" },
  { id: "other", name: "Custom Website", color: "bg-teal-600", text: "text-teal-600" },
];

export function SocialLinksTab({ onStatsUpdate }) {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [platform, setPlatform] = useState("facebook");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isActive, setIsActive] = useState(true);

  // Load social links from Backend
  const loadLinks = async () => {
    try {
      setIsLoading(true);
      const res = await socialLinkApi.getSocialLinks();
      if (res?.data) {
        setLinks(res.data);
        if (onStatsUpdate) {
          onStatsUpdate(res.data.length);
        }
      }
    } catch (err) {
      console.error("Failed to load social links:", err);
      Swal.fire({
        icon: "error",
        title: "Load Error",
        text: "Could not fetch social media links from server.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  // Filtered links
  const filteredLinks = useMemo(() => {
    return links.filter((item) => {
      const matchSearch =
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.platform?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.url?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchPlatform =
        platformFilter === "all" || item.platform === platformFilter;

      return matchSearch && matchPlatform;
    });
  }, [links, searchTerm, platformFilter]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingItem(null);
    setPlatform("facebook");
    setTitle("Facebook");
    setUrl("");
    setDisplayOrder(links.length + 1);
    setIsActive(true);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setPlatform(item.platform || "other");
    setTitle(item.title || "");
    setUrl(item.url || "");
    setDisplayOrder(item.displayOrder || 1);
    setIsActive(item.isActive !== false);
    setIsModalOpen(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  // Auto-fill title when platform changes (if title matches previous platform default)
  const handlePlatformChange = (newPlatform) => {
    setPlatform(newPlatform);
    const platObj = PLATFORMS.find((p) => p.id === newPlatform);
    if (!editingItem || !title || PLATFORMS.some((p) => p.name === title)) {
      setTitle(platObj?.name || "Social Channel");
    }
  };

  // Save (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      Swal.fire({
        icon: "warning",
        title: "URL Required",
        text: "Please provide a valid target URL for this social media channel.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        platform,
        title: title.trim() || PLATFORMS.find((p) => p.id === platform)?.name || "Social Channel",
        url: url.trim(),
        icon: platform,
        displayOrder: Number(displayOrder) || 1,
        isActive,
      };

      if (editingItem) {
        await socialLinkApi.updateSocialLink(editingItem._id, payload);
        Swal.fire({
          icon: "success",
          title: "Updated",
          text: "Social link updated successfully!",
          timer: 1400,
          showConfirmButton: false,
        });
      } else {
        await socialLinkApi.createSocialLink(payload);
        Swal.fire({
          icon: "success",
          title: "Created",
          text: "New social link added successfully!",
          timer: 1400,
          showConfirmButton: false,
        });
      }

      handleCloseModal();
      await loadLinks();
    } catch (err) {
      console.error("Save social link error:", err);
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: err.message || "Could not save social link.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle active status
  const handleToggleActive = async (item) => {
    try {
      const updatedStatus = !item.isActive;
      // Optimistic update
      setLinks((prev) =>
        prev.map((l) => (l._id === item._id ? { ...l, isActive: updatedStatus } : l))
      );

      await socialLinkApi.updateSocialLink(item._id, { isActive: updatedStatus });
    } catch (err) {
      console.error("Toggle status error:", err);
      loadLinks();
    }
  };

  // Delete social link
  const handleDelete = (item) => {
    Swal.fire({
      title: "Delete Social Link?",
      text: `Are you sure you want to remove "${item.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await socialLinkApi.deleteSocialLink(item._id);
          Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "Social link has been removed.",
            timer: 1200,
            showConfirmButton: false,
          });
          await loadLinks();
        } catch (err) {
          console.error("Delete social link error:", err);
          Swal.fire({
            icon: "error",
            title: "Delete Failed",
            text: err.message || "Could not delete social link.",
          });
        }
      }
    });
  };

  const activeCount = links.filter((l) => l.isActive).length;
  const inactiveCount = links.length - activeCount;

  return (
    <div className="p-4 sm:p-8 space-y-8 font-poppins max-w-7xl mx-auto">
      {/* 1. Header Banner & Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/90 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#edf7f6] text-[#368b82] flex items-center justify-center font-bold">
              <Share2 className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Social Media Links
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500">
            Configure social channels displayed in the header and footer. Deactivated or empty links are hidden automatically.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-2.5 bg-[#368b82] hover:bg-[#286b64] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 shadow-xs hover:shadow-md transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Social Link</span>
        </button>
      </div>

      {/* 2. Quick Stats Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total Channels
            </span>
            <div className="text-2xl font-black text-gray-900 mt-1">{links.length}</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
            <Globe className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Active / Visible
            </span>
            <div className="text-2xl font-black text-emerald-600 mt-1">{activeCount}</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Inactive / Hidden
            </span>
            <div className="text-2xl font-black text-amber-600 mt-1">{inactiveCount}</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <XCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Search and Platform Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, platform or URL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm outline-none focus:bg-white focus:border-[#368b82] transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setPlatformFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 cursor-pointer ${
                platformFilter === "all"
                  ? "bg-[#368b82] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All ({links.length})
            </button>
            {PLATFORMS.slice(0, 6).map((p) => {
              const count = links.filter((l) => l.platform === p.id).length;
              if (count === 0 && platformFilter !== p.id) return null;
              return (
                <button
                  key={p.id}
                  onClick={() => setPlatformFilter(p.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 cursor-pointer ${
                    platformFilter === p.id
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {p.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Social Links List / Table */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-400 space-y-2">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#368b82]" />
            <p className="text-xs">Loading social links...</p>
          </div>
        ) : filteredLinks.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
              <Share2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 text-base">No Social Links Found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                {searchTerm || platformFilter !== "all"
                  ? "No links matched your current filters. Try resetting search."
                  : "No social media links have been added yet. Add your channels to display them in the website header and footer."}
              </p>
            </div>
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 bg-[#368b82] text-white rounded-xl text-xs font-bold hover:bg-[#286b64] inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add First Channel</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Platform</th>
                  <th className="py-3.5 px-4">Title</th>
                  <th className="py-3.5 px-4">URL</th>
                  <th className="py-3.5 px-4 text-center">Order</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs font-poppins">
                {filteredLinks.map((item) => {
                  const platMeta = PLATFORMS.find((p) => p.id === item.platform) || {
                    name: item.platform,
                    color: "bg-gray-700",
                    text: "text-gray-700",
                  };

                  return (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50/80 transition-colors group"
                    >
                      {/* Platform Icon & Badge */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl ${platMeta.color} text-white flex items-center justify-center shrink-0 shadow-2xs`}
                          >
                            <SocialIcon platform={item.platform} className="w-4 h-4 fill-current" />
                          </div>
                          <div>
                            <span className="font-extrabold text-gray-900 block capitalize">
                              {platMeta.name}
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono">
                              {item.platform}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Title */}
                      <td className="py-4 px-4">
                        <span className="font-bold text-gray-800">{item.title}</span>
                      </td>

                      {/* URL Link */}
                      <td className="py-4 px-4 max-w-xs sm:max-w-md">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#368b82] hover:underline flex items-center gap-1.5 truncate text-xs"
                        >
                          <span className="truncate">{item.url}</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100" />
                        </a>
                      </td>

                      {/* Display Order */}
                      <td className="py-4 px-4 text-center">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 font-bold text-xs">
                          #{item.displayOrder || 1}
                        </span>
                      </td>

                      {/* Active Status Toggle */}
                      <td className="py-4 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(item)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                            item.isActive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                              : "bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              item.isActive ? "bg-emerald-500" : "bg-gray-400"
                            }`}
                          />
                          <span>{item.isActive ? "Active" : "Hidden"}</span>
                        </button>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(item)}
                            className="p-2 text-gray-500 hover:text-[#368b82] hover:bg-[#edf7f6] rounded-lg transition-colors cursor-pointer"
                            title="Edit Link"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Link"
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

      {/* 5. Create / Edit Social Link Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn font-poppins">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-[#edf7f6] via-white to-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#368b82] text-white flex items-center justify-center shadow-md">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-gray-900">
                    {editingItem ? "Edit Social Link" : "Add New Social Link"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Set up URL, platform and display settings
                  </p>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Platform Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Select Platform
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {PLATFORMS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handlePlatformChange(p.id)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        platform === p.id
                          ? "border-[#368b82] bg-[#edf7f6] ring-2 ring-[#368b82]/30"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg ${p.color} text-white flex items-center justify-center shrink-0`}
                      >
                        <SocialIcon platform={p.id} className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span className="text-[11px] font-bold text-gray-800 text-center leading-tight">
                        {p.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Display Order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Link Title / Label
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Official Facebook Page"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold outline-none focus:bg-white focus:border-[#368b82]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-bold outline-none focus:bg-white focus:border-[#368b82]"
                  />
                </div>
              </div>

              {/* Target URL */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Target Profile / Page URL
                </label>
                <div className="relative">
                  <input
                    type="url"
                    required
                    placeholder={`https://${platform}.com/yourpage`}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm outline-none focus:bg-white focus:border-[#368b82]"
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Must be a full valid link starting with https://
                </p>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center justify-between p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                <div>
                  <span className="text-xs font-bold text-gray-900 block">
                    Display Channel on Website
                  </span>
                  <span className="text-[11px] text-gray-500">
                    When active, link appears in top header & footer
                  </span>
                </div>
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-5 h-5 accent-[#368b82] cursor-pointer"
                />
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#368b82] hover:bg-[#286b64] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{editingItem ? "Update Link" : "Save Link"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SocialLinksTab;
