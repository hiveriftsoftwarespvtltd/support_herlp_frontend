"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import {
  Search,
  Filter,
  Plus,
  ExternalLink,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Sparkles,
  BookOpen,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  RotateCcw,
  CheckSquare,
  Square,
  X,
  Eye,
} from "lucide-react";

export function BlogManagementTab({
  blogs = [],
  isLoading = false,
  onOpenCreateModal,
  onOpenEditModal,
  onDeleteBlog,
}) {
  // 1. Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [onlyFeatured, setOnlyFeatured] = useState(false);

  // 2. Sorting States
  // sortField: 'title' | 'category' | 'author' | 'date' | 'views'
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc"); // 'asc' | 'desc'

  // 3. Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 4. Selection States (Bulk Actions)
  const [selectedBlogIds, setSelectedBlogIds] = useState(new Set());

  // Category List
  const categoriesList = useMemo(() => {
    return ["All", ...new Set(blogs.map((b) => b.category).filter(Boolean))];
  }, [blogs]);

  // Helper functions
  const getAuthorName = (blog) => {
    if (typeof blog.author === "string") return blog.author;
    return blog.author?.name || "Support Help";
  };

  const getAuthorRole = (blog) => {
    if (typeof blog.authorRole === "string" && blog.authorRole) return blog.authorRole;
    if (typeof blog.author === "object" && blog.author?.role) return blog.author.role;
    return "Advisor";
  };

  const getRawDateTimestamp = (blog) => {
    const raw = blog.publishedAt || blog.createdAt || blog.date;
    if (!raw) return 0;
    const time = new Date(raw).getTime();
    return isNaN(time) ? 0 : time;
  };

  const formatDate = (blog) => {
    if (blog.date) return blog.date;
    const rawDate = blog.publishedAt || blog.createdAt;
    if (!rawDate) return "Recently";
    try {
      return new Date(rawDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Recently";
    }
  };

  const getImageSrc = (blog) => {
    return blog.coverImage || blog.image || "/blog/zoho-books-used-for.png";
  };

  // 5. Filtering Logic
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const author = getAuthorName(b);
      const query = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !query ||
        b.title?.toLowerCase().includes(query) ||
        b.excerpt?.toLowerCase().includes(query) ||
        b.slug?.toLowerCase().includes(query) ||
        b.category?.toLowerCase().includes(query) ||
        author.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "All" || b.category === selectedCategory;

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "published" && (b.status === "published" || !b.status)) ||
        (statusFilter === "draft" && b.status === "draft");

      const matchesFeatured = !onlyFeatured || !!b.featured;

      return matchesSearch && matchesCategory && matchesStatus && matchesFeatured;
    });
  }, [blogs, searchTerm, selectedCategory, statusFilter, onlyFeatured]);

  // 6. Sorting Logic
  const sortedBlogs = useMemo(() => {
    const list = [...filteredBlogs];
    list.sort((a, b) => {
      let valA, valB;

      switch (sortField) {
        case "title":
          valA = (a.title || "").toLowerCase();
          valB = (b.title || "").toLowerCase();
          return sortDirection === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);

        case "category":
          valA = (a.category || "").toLowerCase();
          valB = (b.category || "").toLowerCase();
          return sortDirection === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);

        case "author":
          valA = getAuthorName(a).toLowerCase();
          valB = getAuthorName(b).toLowerCase();
          return sortDirection === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);

        case "views":
          valA = Number(a.viewsCount || 0);
          valB = Number(b.viewsCount || 0);
          return sortDirection === "asc" ? valA - valB : valB - valA;

        case "date":
        default:
          valA = getRawDateTimestamp(a);
          valB = getRawDateTimestamp(b);
          return sortDirection === "asc" ? valA - valB : valB - valA;
      }
    });
    return list;
  }, [filteredBlogs, sortField, sortDirection]);

  // 7. Pagination Logic
  const totalEntries = sortedBlogs.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedBlogs = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize;
    return sortedBlogs.slice(startIndex, startIndex + pageSize);
  }, [sortedBlogs, safeCurrentPage, pageSize]);

  // Handle Sort Toggle
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  // Selection Logic
  const isAllCurrentPageSelected =
    paginatedBlogs.length > 0 &&
    paginatedBlogs.every((b) => selectedBlogIds.has(b._id || b.slug));

  const handleToggleSelectAll = () => {
    const newSelected = new Set(selectedBlogIds);
    if (isAllCurrentPageSelected) {
      paginatedBlogs.forEach((b) => newSelected.delete(b._id || b.slug));
    } else {
      paginatedBlogs.forEach((b) => newSelected.add(b._id || b.slug));
    }
    setSelectedBlogIds(newSelected);
  };

  const handleToggleSelectRow = (id) => {
    const newSelected = new Set(selectedBlogIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedBlogIds(newSelected);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setStatusFilter("All");
    setOnlyFeatured(false);
    setSortField("date");
    setSortDirection("desc");
    setCurrentPage(1);
  };

  // Delete Single Blog
  const handleDeleteClick = (blog) => {
    Swal.fire({
      title: "Delete Article?",
      text: `Are you sure you want to remove "${blog.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await onDeleteBlog(blog);
          selectedBlogIds.delete(blog._id || blog.slug);
          setSelectedBlogIds(new Set(selectedBlogIds));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Article permanently deleted from database.",
            timer: 1400,
            showConfirmButton: false,
            iconColor: "#ef4444",
          });
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Failed to delete",
            text: err.message || "An error occurred while deleting.",
            confirmButtonColor: "#368b82",
          });
        }
      }
    });
  };

  // Bulk Delete Selected
  const handleBulkDelete = () => {
    if (selectedBlogIds.size === 0) return;

    Swal.fire({
      title: `Delete ${selectedBlogIds.size} Articles?`,
      text: "Are you sure you want to delete all selected articles? This action cannot be reversed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: `Yes, Delete ${selectedBlogIds.size} Articles`,
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const toDelete = blogs.filter((b) =>
            selectedBlogIds.has(b._id || b.slug)
          );
          for (const blog of toDelete) {
            await onDeleteBlog(blog);
          }
          setSelectedBlogIds(new Set());
          Swal.fire({
            icon: "success",
            title: "Bulk Delete Complete",
            text: `Successfully deleted ${toDelete.length} articles.`,
            timer: 1500,
            showConfirmButton: false,
            iconColor: "#ef4444",
          });
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Bulk Delete Error",
            text: err.message || "Error deleting selected articles.",
            confirmButtonColor: "#368b82",
          });
        }
      }
    });
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (sortedBlogs.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No Data",
        text: "There are no articles available to export.",
        confirmButtonColor: "#368b82",
      });
      return;
    }

    const headers = [
      "Title",
      "Slug",
      "Category",
      "Author",
      "Read Time",
      "Status",
      "Featured",
      "Views",
      "Published Date",
    ];

    const rows = sortedBlogs.map((b) => [
      `"${(b.title || "").replace(/"/g, '""')}"`,
      `"${b.slug || ""}"`,
      `"${b.category || ""}"`,
      `"${getAuthorName(b).replace(/"/g, '""')}"`,
      `"${b.readTime || ""}"`,
      `"${b.status || "published"}"`,
      b.featured ? "Yes" : "No",
      b.viewsCount || 0,
      `"${formatDate(b)}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `support-help-blogs-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Sort Header Icon Component
  const renderSortIcon = (field) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="w-3.5 h-3.5 text-[#368b82]" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-[#368b82]" />
    );
  };

  return (
    <div className="w-full p-6 sm:p-8 lg:p-10 space-y-6 font-poppins">
      {/* 1. DataTable Toolbar & Filter Controls Card */}
      <div className="w-full bg-white p-5 rounded-2xl border border-gray-200/90 shadow-xs space-y-4">
        {/* Top Action Row: Search, Category, Status, & Add Article */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Global Search Bar with Clear Button */}
          <div className="flex-1 min-w-[280px] max-w-xl relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by title, excerpt, slug, author, or tag..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-9 py-2.5 bg-gray-50/80 hover:bg-white border border-gray-200 focus:border-[#368b82] focus:ring-2 focus:ring-[#368b82]/15 rounded-xl text-xs sm:text-sm font-poppins outline-none transition-all placeholder:text-gray-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Actions Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Export CSV Button */}
            <button
              onClick={handleExportCSV}
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200/90 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-2xs cursor-pointer active:scale-98"
              title="Export Current Table View to CSV"
            >
              <Download className="w-4 h-4 text-gray-500" />
              <span>Export CSV</span>
            </button>

            {/* Add New Article Button */}
            <button
              onClick={onOpenCreateModal}
              className="bg-[#368b82] hover:bg-[#286b64] active:scale-[0.99] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-poppins flex items-center gap-2 shadow-sm shadow-[#368b82]/25 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Article</span>
            </button>
          </div>
        </div>

        {/* Secondary Filter & Entry Selector Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100 text-xs">
          {/* Left: Filters Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Category Dropdown */}
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
              <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent text-gray-700 font-medium outline-none cursor-pointer pr-1"
              >
                {categoriesList.map((c, idx) => (
                  <option key={idx} value={c}>
                    {c === "All" ? "All Categories" : c}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Dropdown */}
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
              <span className="text-gray-400 font-medium">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent text-gray-700 font-medium outline-none cursor-pointer pr-1"
              >
                <option value="All">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
              </select>
            </div>

            {/* Featured Only Toggle Button */}
            <button
              onClick={() => {
                setOnlyFeatured(!onlyFeatured);
                setCurrentPage(1);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-medium ${onlyFeatured
                  ? "bg-amber-50 text-amber-900 border-amber-300 font-bold"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${onlyFeatured ? "text-amber-600" : "text-gray-400"}`} />
              <span>Featured Only</span>
            </button>

            {/* Reset Filter Button (Active when filters applied) */}
            {(searchTerm || selectedCategory !== "All" || statusFilter !== "All" || onlyFeatured) && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-gray-500 hover:text-red-600 px-2 py-1.5 transition-colors cursor-pointer text-xs font-semibold"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Right: Entries Per Page Selector */}
          <div className="flex items-center gap-2 text-gray-500 font-medium">
            <span>Show</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-gray-700 font-bold outline-none cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries per page</span>
          </div>
        </div>
      </div>

      {/* 2. Bulk Selection Floating Notification Bar */}
      {selectedBlogIds.size > 0 && (
        <div className="w-full bg-[#1b305b] text-white px-5 py-3 rounded-2xl flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-200 shadow-md">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
            <CheckSquare className="w-4 h-4 text-[#7ee3d7]" />
            <span>
              <strong>{selectedBlogIds.size}</strong> article{selectedBlogIds.size > 1 ? "s" : ""} selected
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedBlogIds(new Set())}
              className="text-xs text-gray-300 hover:text-white underline cursor-pointer"
            >
              Clear Selection
            </button>
            <button
              onClick={handleBulkDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Selected</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Main DataTable Table Card */}
      <div className="w-full bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left font-poppins border-collapse">
            <thead className="bg-[#f8fafc] border-b border-gray-200 text-gray-500 uppercase tracking-wider text-[11px] font-bold select-none">
              <tr>
                {/* Select All Checkbox Column */}
                <th className="px-5 py-4 w-12 text-center">
                  <button
                    onClick={handleToggleSelectAll}
                    className="p-1 rounded-md hover:bg-gray-200/60 text-gray-500 transition-colors cursor-pointer flex items-center justify-center mx-auto"
                    title={isAllCurrentPageSelected ? "Deselect Page" : "Select Entire Page"}
                  >
                    {isAllCurrentPageSelected ? (
                      <CheckSquare className="w-4 h-4 text-[#368b82]" />
                    ) : (
                      <Square className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </th>

                {/* Article Column (Sortable) */}
                <th
                  onClick={() => handleSort("title")}
                  className="px-5 py-4 min-w-[340px] cursor-pointer hover:bg-gray-100/70 transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Article Details</span>
                    {renderSortIcon("title")}
                  </div>
                </th>

                {/* Category Column (Sortable) */}
                <th
                  onClick={() => handleSort("category")}
                  className="px-5 py-4 whitespace-nowrap cursor-pointer hover:bg-gray-100/70 transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Category</span>
                    {renderSortIcon("category")}
                  </div>
                </th>

                {/* Author Column (Sortable) */}
                <th
                  onClick={() => handleSort("author")}
                  className="px-5 py-4 whitespace-nowrap cursor-pointer hover:bg-gray-100/70 transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Author</span>
                    {renderSortIcon("author")}
                  </div>
                </th>

                {/* Published Date Column (Sortable) */}
                <th
                  onClick={() => handleSort("date")}
                  className="px-5 py-4 whitespace-nowrap cursor-pointer hover:bg-gray-100/70 transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Published Date</span>
                    {renderSortIcon("date")}
                  </div>
                </th>

                {/* Views Column (Sortable) */}
                <th
                  onClick={() => handleSort("views")}
                  className="px-5 py-4 whitespace-nowrap cursor-pointer hover:bg-gray-100/70 transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Views</span>
                    {renderSortIcon("views")}
                  </div>
                </th>

                {/* Status Column */}
                <th className="px-5 py-4 whitespace-nowrap">Status</th>

                {/* Actions Column */}
                <th className="px-5 py-4 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-gray-700">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-20 text-center text-gray-400">
                    <div className="w-8 h-8 border-3 border-[#368b82] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="font-semibold text-sm">Loading articles from database...</p>
                  </td>
                </tr>
              ) : paginatedBlogs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-20 text-center text-gray-400">
                    <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-2 stroke-[1.5]" />
                    <p className="font-bold text-base text-gray-700">No blog articles found</p>
                    <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                      No results matched your search or filters. Try adjusting your query or click reset.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Clear All Filters
                    </button>
                  </td>
                </tr>
              ) : (
                paginatedBlogs.map((blog, idx) => {
                  const blogId = blog._id || blog.slug || idx;
                  const isSelected = selectedBlogIds.has(blogId);
                  const imgSrc = getImageSrc(blog);
                  const authorName = getAuthorName(blog);
                  const authorRole = getAuthorRole(blog);
                  const publishedDate = formatDate(blog);
                  const views = blog.viewsCount || 0;

                  return (
                    <tr
                      key={blogId}
                      className={`transition-colors group ${isSelected
                          ? "bg-[#edf7f6]/60 hover:bg-[#edf7f6]/90"
                          : "hover:bg-[#fbfcfd]"
                        }`}
                    >
                      {/* Row Checkbox */}
                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={() => handleToggleSelectRow(blogId)}
                          className="p-1 rounded-md text-gray-400 hover:text-gray-600 cursor-pointer flex items-center justify-center mx-auto"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#368b82]" />
                          ) : (
                            <Square className="w-4 h-4 text-gray-300 group-hover:text-gray-400" />
                          )}
                        </button>
                      </td>

                      {/* Thumbnail + Article Title & Excerpt */}
                      <td className="px-5 py-4">
                        <div className="flex items-start gap-3.5 max-w-xl">
                          {/* Image Thumbnail with WebP indicator */}
                          <div className="w-16 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200/90 relative mt-0.5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={imgSrc}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.target.src = "/blog/zoho-books-used-for.png";
                              }}
                            />
                          </div>

                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2">
                              {blog.featured && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200/80">
                                  <Sparkles className="w-3 h-3 text-amber-600" />
                                  <span>Featured</span>
                                </span>
                              )}
                              <span className="text-[11px] text-gray-400 font-medium truncate">
                                /{blog.slug}
                              </span>
                            </div>
                            <h4 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-[#368b82] transition-colors line-clamp-1">
                              {blog.title}
                            </h4>
                            <p className="text-xs text-gray-500 line-clamp-1 leading-relaxed">
                              {blog.excerpt}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category Pill */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#edf7f6] text-[#368b82] border border-[#368b82]/20">
                          {blog.category}
                        </span>
                      </td>

                      {/* Author Info */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs uppercase border border-slate-200">
                            {authorName.slice(0, 2) || "SH"}
                          </div>
                          <div>
                            <span className="font-bold text-gray-900 text-xs sm:text-sm block">
                              {authorName}
                            </span>
                            <span className="text-[11px] text-gray-400 block font-medium">
                              {authorRole}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Published Date */}
                      <td className="px-5 py-4 whitespace-nowrap text-xs text-gray-500">
                        <div className="flex items-center gap-1.5 font-medium text-gray-700">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>{publishedDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{blog.readTime || "5 min read"}</span>
                        </div>
                      </td>

                      {/* Views Count */}
                      <td className="px-5 py-4 whitespace-nowrap text-xs">
                        <div className="flex items-center gap-1.5 text-gray-700 font-bold">
                          <Eye className="w-3.5 h-3.5 text-gray-400" />
                          <span>{views.toLocaleString()}</span>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/90">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Published</span>
                        </span>
                      </td>

                      {/* Actions Buttons */}
                      <td className="px-5 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            className="p-2 rounded-xl text-gray-400 hover:text-[#368b82] hover:bg-[#edf7f6] transition-colors"
                            title="Preview Live Article"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => onOpenEditModal(blog)}
                            className="p-2 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                            title="Edit Article"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(blog)}
                            className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete Article"
                          >
                            <Trash2 className="w-4 h-4" />
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

        {/* 4. DataTable Pagination & Information Strip */}
        <div className="px-6 py-4 bg-[#f8fafc] border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-gray-600">
          {/* Showing X to Y of Z entries */}
          <div>
            Showing{" "}
            <strong>
              {totalEntries === 0
                ? 0
                : (safeCurrentPage - 1) * pageSize + 1}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(safeCurrentPage * pageSize, totalEntries)}
            </strong>{" "}
            of <strong>{totalEntries}</strong> entries
            {filteredBlogs.length !== blogs.length && (
              <span className="text-gray-400 ml-1.5">
                (filtered from {blogs.length} total)
              </span>
            )}
          </div>

          {/* Pagination Navigation Buttons */}
          <div className="flex items-center gap-1.5">
            {/* First Page */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={safeCurrentPage === 1}
              className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-white text-gray-600 transition-colors cursor-pointer disabled:cursor-not-allowed"
              title="First Page"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>

            {/* Previous Page */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage === 1}
              className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-white text-gray-600 transition-colors cursor-pointer disabled:cursor-not-allowed"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Number Pills */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => {
                  // Show current page, first, last, and immediate siblings
                  return (
                    p === 1 ||
                    p === totalPages ||
                    Math.abs(p - safeCurrentPage) <= 1
                  );
                })
                .map((p, idx, arr) => {
                  const prev = arr[idx - 1];
                  const showEllipsis = prev && p - prev > 1;

                  return (
                    <React.Fragment key={p}>
                      {showEllipsis && (
                        <span className="px-2 text-gray-400 font-bold select-none">
                          ...
                        </span>
                      )}
                      <button
                        onClick={() => setCurrentPage(p)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${safeCurrentPage === p
                            ? "bg-[#368b82] text-white shadow-xs"
                            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                          }`}
                      >
                        {p}
                      </button>
                    </React.Fragment>
                  );
                })}
            </div>

            {/* Next Page */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage === totalPages || totalEntries === 0}
              className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-white text-gray-600 transition-colors cursor-pointer disabled:cursor-not-allowed"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Last Page */}
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={safeCurrentPage === totalPages || totalEntries === 0}
              className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-white text-gray-600 transition-colors cursor-pointer disabled:cursor-not-allowed"
              title="Last Page"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
