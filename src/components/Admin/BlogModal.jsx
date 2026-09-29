"use client";

import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { X, Upload, Image as ImageIcon, Sparkles, CheckCircle2 } from "lucide-react";

export function BlogModal({ isOpen, onClose, editingBlog, onSaveBlog }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "Cloud Accounting",
    author: "Support Help",
    authorRole: "Certified Cloud Accounting Specialist",
    readTime: "5 min read",
    excerpt: "",
    tags: "Bookkeeping, Cloud Accounting",
    featured: false,
    contentParagraph: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title || "",
        category: editingBlog.category || "Cloud Accounting",
        author:
          typeof editingBlog.author === "string"
            ? editingBlog.author
            : editingBlog.author?.name || "Support Help",
        authorRole:
          editingBlog.authorRole ||
          editingBlog.author?.role ||
          "Senior Advisor",
        readTime: editingBlog.readTime || "5 min read",
        excerpt: editingBlog.excerpt || "",
        tags: Array.isArray(editingBlog.tags)
          ? editingBlog.tags.join(", ")
          : typeof editingBlog.tags === "string"
          ? editingBlog.tags
          : "",
        featured: !!editingBlog.featured,
        contentParagraph: Array.isArray(editingBlog.content)
          ? editingBlog.content.find((c) => c.type === "paragraph")?.text || ""
          : typeof editingBlog.content === "string"
          ? editingBlog.content
          : "",
      });
      setImagePreview(editingBlog.coverImage || editingBlog.image || "");
      setImageFile(null);
    } else {
      setFormData({
        title: "",
        category: "Cloud Accounting",
        author: "Support Help",
        authorRole: "Certified Cloud Accounting Specialist",
        readTime: "5 min read",
        excerpt: "",
        tags: "Bookkeeping, Cloud Accounting",
        featured: false,
        contentParagraph: "",
      });
      setImagePreview("");
      setImageFile(null);
    }
  }, [editingBlog, isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size and type
      if (!file.type.startsWith("image/")) {
        Swal.fire({
          icon: "error",
          title: "Invalid File",
          text: "Please select an image file (PNG, JPG, WEBP, etc.)",
          confirmButtonColor: "#368b82",
        });
        return;
      }
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Title Required",
        text: "Please provide a title for the blog article.",
        confirmButtonColor: "#368b82",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await onSaveBlog(formData, editingBlog, imageFile);
    } catch (err) {
      console.error("Save blog error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs font-poppins">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4.5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50/90 to-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#edf7f6] text-[#368b82] flex items-center justify-center font-bold">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900 leading-snug">
                {editingBlog ? "Edit Blog Article" : "Create New Blog Article"}
              </h3>
              <p className="text-[11px] text-gray-500 font-medium">
                Articles sync automatically with MongoDB and optimize cover media
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4.5 overflow-y-auto text-xs"
        >
          {/* 1. Article Title */}
          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Article Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 5 Cloud Bookkeeping Essentials for Growing Businesses"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] focus:ring-2 focus:ring-[#368b82]/15 outline-none text-xs sm:text-sm font-medium transition-all"
            />
          </div>

          {/* 2. Cover Image Upload with Auto Compression info */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold text-gray-700 uppercase tracking-wider">
                Cover Image
              </label>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                Auto-Compressed (WebP)
              </span>
            </div>

            {imagePreview ? (
              <div className="relative rounded-2xl border border-gray-200 overflow-hidden bg-gray-50 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Blog preview"
                  className="w-full h-44 object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-1.5 rounded-xl bg-white/95 hover:bg-white text-gray-800 font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Change Image
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
                {imageFile && (
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/70 backdrop-blur-xs text-white rounded-lg text-[10px] font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Selected: {imageFile.name} ({(imageFile.size / 1024).toFixed(0)} KB)</span>
                  </div>
                )}
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 hover:border-[#368b82] hover:bg-[#edf7f6]/40 rounded-2xl p-6 text-center cursor-pointer transition-all group"
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-gray-100 group-hover:bg-[#edf7f6] text-gray-400 group-hover:text-[#368b82] flex items-center justify-center transition-colors mb-2">
                  <Upload className="w-6 h-6 stroke-[2]" />
                </div>
                <p className="font-bold text-gray-700 text-xs sm:text-sm">
                  Click to upload cover photo
                </p>
                <p className="text-[11px] text-gray-400 mt-1">
                  Supports PNG, JPG, WEBP. Large images are automatically resized & compressed.
                </p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* 3. Category & Read Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none bg-white text-xs sm:text-sm font-medium"
              >
                <option value="Cloud Accounting">Cloud Accounting</option>
                <option value="Zoho Books">Zoho Books</option>
                <option value="Accounting">Accounting</option>
                <option value="Bookkeeping">Bookkeeping</option>
                <option value="Tax & Audit">Tax & Audit</option>
                <option value="Data Migration">Data Migration</option>
                <option value="Cash Flow">Cash Flow</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Read Time
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) =>
                  setFormData({ ...formData, readTime: e.target.value })
                }
                placeholder="e.g. 5 min read"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs sm:text-sm font-medium"
              />
            </div>
          </div>

          {/* 4. Author Name & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Author Name
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs sm:text-sm font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Author Role / Designation
              </label>
              <input
                type="text"
                value={formData.authorRole}
                onChange={(e) =>
                  setFormData({ ...formData, authorRole: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs sm:text-sm font-medium"
              />
            </div>
          </div>

          {/* 5. Excerpt */}
          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Excerpt Summary *
            </label>
            <textarea
              rows={2}
              required
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              placeholder="Short introductory summary for card previews..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs sm:text-sm font-medium resize-none"
            />
          </div>

          {/* 6. Body Paragraph */}
          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Article Body Content
            </label>
            <textarea
              rows={4}
              value={formData.contentParagraph}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contentParagraph: e.target.value,
                })
              }
              placeholder="Detailed content for this article..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs sm:text-sm font-medium"
            />
          </div>

          {/* 7. Tags */}
          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              placeholder="Cloud Accounting, QuickBooks, Tax"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs sm:text-sm font-medium"
            />
          </div>

          {/* 8. Featured Checkbox */}
          <div className="flex items-center gap-2.5 pt-1">
            <input
              type="checkbox"
              id="featuredCheck"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
              className="w-4 h-4 rounded text-[#368b82] focus:ring-[#368b82] cursor-pointer"
            />
            <label
              htmlFor="featuredCheck"
              className="font-semibold text-gray-700 select-none cursor-pointer"
            >
              Feature this article on Blog Hub Hero Banner
            </label>
          </div>

          {/* Modal Buttons */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 font-semibold cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-[#368b82] hover:bg-[#286b64] text-white font-bold shadow-sm transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving & Compressing...</span>
                </>
              ) : (
                <span>{editingBlog ? "Update Article" : "Publish Article"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
