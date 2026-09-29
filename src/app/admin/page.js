"use client";

import React, { useState, useEffect, useCallback } from "react";
import { blogPosts as fallbackBlogData } from "@/data/blogData";
import { softwareData as fallbackSoftwareData } from "@/data/navigationData";
import { blogApi, softwareApi, inquiryApi, consultationApi } from "@/api";
import Swal from "sweetalert2";
import {
  AdminLogin,
  AdminSidebar,
  AdminHeader,
  OverviewTab,
  BlogManagementTab,
  BlogModal,
  SoftwareManagementTab,
  SoftwareModal,
  ConsultationsTab,
  InquiriesTab,
  SettingsTab,
} from "@/components/Admin";

const VALID_TABS = [
  "overview",
  "blog",
  "software",
  "inquiries",
  "consultations",
  "settings",
];

const getInitialTab = () => {
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl && VALID_TABS.includes(tabFromUrl)) {
      return tabFromUrl;
    }
    const saved = localStorage.getItem("support_help_admin_active_tab");
    if (saved && VALID_TABS.includes(saved)) {
      return saved;
    }
  }
  return "overview";
};

export default function AdminPage() {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Active Tab persisted in localStorage & URL (?tab=...)
  const [activeTab, setActiveTabState] = useState(getInitialTab);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const setActiveTab = useCallback((tab) => {
    setActiveTabState(tab);
    if (typeof window !== "undefined") {
      localStorage.setItem("support_help_admin_active_tab", tab);
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tab);
      window.history.replaceState(null, "", url.toString());
    }
  }, []);

  // Blog Management State
  const [blogs, setBlogs] = useState(fallbackBlogData);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  // Software Expertise Management State
  const [softwares, setSoftwares] = useState(fallbackSoftwareData);
  const [isLoadingSoftwares, setIsLoadingSoftwares] = useState(false);
  const [isSoftwareModalOpen, setIsSoftwareModalOpen] = useState(false);
  const [editingSoftware, setEditingSoftware] = useState(null);

  // Inquiries & Consultations State
  const [inquiriesCount, setInquiriesCount] = useState(0);
  const [consultationsCount, setConsultationsCount] = useState(0);

  // Fetch blogs from live MongoDB Backend API
  const fetchBlogs = useCallback(async () => {
    try {
      setIsLoadingBlogs(true);
      const response = await blogApi.getBlogs({ limit: 100 });
      if (response?.data?.items && response.data.items.length > 0) {
        setBlogs(response.data.items);
      }
    } catch (err) {
      console.warn("Could not fetch blogs from API:", err.message);
    } finally {
      setIsLoadingBlogs(false);
    }
  }, []);

  // Fetch software platforms from live MongoDB Backend API
  const fetchSoftwares = useCallback(async () => {
    try {
      setIsLoadingSoftwares(true);
      const response = await softwareApi.getSoftwares();
      if (response?.data && response.data.length > 0) {
        setSoftwares(response.data);
      }
    } catch (err) {
      console.warn("Could not fetch softwares from API:", err.message);
    } finally {
      setIsLoadingSoftwares(false);
    }
  }, []);

  // Fetch inquiries & consultations count from live MongoDB Backend API
  const fetchCounts = useCallback(async () => {
    try {
      const [inqRes, consRes] = await Promise.allSettled([
        inquiryApi.getInquiryStats(),
        consultationApi.getConsultationStats(),
      ]);

      if (inqRes.status === "fulfilled" && inqRes.value?.data?.total !== undefined) {
        setInquiriesCount(inqRes.value.data.total);
      }
      if (consRes.status === "fulfilled" && consRes.value?.data?.total !== undefined) {
        setConsultationsCount(consRes.value.data.total);
      }
    } catch (err) {
      // Counts may be empty initially or token pending
    }
  }, []);

  // Check persisted session on mount & fetch live data
  useEffect(() => {
    const savedAuth = localStorage.getItem("support_help_admin_session");
    if (savedAuth === "true") {
      setIsLoggedIn(true);
    }

    // Sync active tab from URL or localStorage
    const currentTab = getInitialTab();
    setActiveTabState(currentTab);

    // Keep active tab in URL query
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (url.searchParams.get("tab") !== currentTab) {
        url.searchParams.set("tab", currentTab);
        window.history.replaceState(null, "", url.toString());
      }
    }

    // Listen to browser back/forward buttons
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const tabFromUrl = urlParams.get("tab");
      if (tabFromUrl && VALID_TABS.includes(tabFromUrl)) {
        setActiveTabState(tabFromUrl);
      }
    };
    window.addEventListener("popstate", handlePopState);

    fetchBlogs();
    fetchSoftwares();
    fetchCounts();

    return () => window.removeEventListener("popstate", handlePopState);
  }, [fetchBlogs, fetchSoftwares, fetchCounts]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    fetchBlogs();
    fetchSoftwares();
    fetchCounts();
  };

  const handleLogout = () => {
    localStorage.removeItem("support_help_admin_session");
    localStorage.removeItem("support_help_admin_token");
    localStorage.removeItem("support_help_admin_user");
    localStorage.removeItem("support_help_admin_active_tab");
    setActiveTabState("overview");
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("tab");
      window.history.replaceState(null, "", url.toString());
    }
    setIsLoggedIn(false);
  };

  // --- BLOG ACTIONS ---
  const handleOpenCreateModal = () => {
    setEditingBlog(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (blog) => {
    setEditingBlog(blog);
    setIsModalOpen(true);
  };

  const handleSaveBlog = async (formData, currentEditingBlog, imageFile) => {
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("excerpt", formData.excerpt);
      data.append("readTime", formData.readTime || "5 min read");
      data.append("authorName", formData.author || "Support Help");
      data.append("authorRole", formData.authorRole || "Certified Cloud Accounting Specialist");
      data.append("featured", formData.featured ? "true" : "false");

      if (formData.tags) {
        data.append("tags", formData.tags);
      }

      if (formData.contentParagraph) {
        data.append(
          "content",
          JSON.stringify([
            {
              type: "paragraph",
              text: formData.contentParagraph,
            },
          ])
        );
      }

      if (imageFile) {
        data.append("image", imageFile);
      }

      const targetId = currentEditingBlog?._id || currentEditingBlog?.slug;
      if (targetId) {
        await blogApi.updateBlog(targetId, data);
        Swal.fire({
          icon: "success",
          title: "Article Updated!",
          text: "The article and optimized image have been saved to MongoDB.",
          timer: 1500,
          showConfirmButton: false,
          iconColor: "#368b82",
        });
      } else {
        await blogApi.createBlog(data);
        Swal.fire({
          icon: "success",
          title: "Article Published!",
          text: "New article saved to database with auto-compressed WebP photo.",
          timer: 1600,
          showConfirmButton: false,
          iconColor: "#368b82",
        });
      }

      setIsModalOpen(false);
      await fetchBlogs();
    } catch (err) {
      console.error("Save blog error:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to Save",
        text: err.message || "An error occurred while saving the blog.",
        confirmButtonColor: "#368b82",
      });
      throw err;
    }
  };

  const handleDeleteBlog = async (blog) => {
    try {
      const targetId = blog?._id || blog?.slug;
      if (targetId) {
        await blogApi.deleteBlog(targetId);
      } else {
        setBlogs((prev) => prev.filter((b) => b.slug !== blog.slug));
      }
      await fetchBlogs();
    } catch (err) {
      console.error("Delete blog error:", err);
      throw err;
    }
  };

  // --- SOFTWARE EXPERTISE ACTIONS ---
  const handleOpenCreateSoftwareModal = () => {
    setEditingSoftware(null);
    setIsSoftwareModalOpen(true);
  };

  const handleOpenEditSoftwareModal = (software) => {
    setEditingSoftware(software);
    setIsSoftwareModalOpen(true);
  };

  const handleSaveSoftware = async (
    payload,
    currentEditingSoftware,
    badgeFile,
    showcaseImageFile,
  ) => {
    try {
      const data = new FormData();
      data.append("name", payload.name);
      if (payload.slug) data.append("slug", payload.slug);
      data.append("heroTitle", payload.heroTitle || payload.name.toUpperCase());
      if (payload.heroSubtitle !== undefined) {
        data.append("heroSubtitle", payload.heroSubtitle);
      }
      data.append("desc", payload.desc);
      if (payload.badgeTag) data.append("badgeTag", payload.badgeTag);
      if (payload.introHeading) data.append("introHeading", payload.introHeading);
      data.append("introParagraphs", JSON.stringify(payload.introParagraphs || []));
      data.append("highlights", JSON.stringify(payload.highlights || []));
      data.append("featuresSection", JSON.stringify(payload.featuresSection || {}));
      data.append("showcases", JSON.stringify(payload.showcases || []));
      data.append("displayOrder", String(payload.displayOrder || 1));
      data.append("isPublished", payload.isPublished ? "true" : "false");

      if (badgeFile) {
        data.append("badge", badgeFile);
      }
      if (showcaseImageFile) {
        data.append("showcaseImage", showcaseImageFile);
      }

      const targetId = currentEditingSoftware?._id || currentEditingSoftware?.slug;
      if (targetId) {
        await softwareApi.updateSoftware(targetId, data);
        Swal.fire({
          icon: "success",
          title: "Software Updated!",
          text: `"${payload.name}" updated successfully in database, header menu, and dedicated page.`,
          timer: 1600,
          showConfirmButton: false,
          iconColor: "#368b82",
        });
      } else {
        await softwareApi.createSoftware(data);
        Swal.fire({
          icon: "success",
          title: "Software Added!",
          text: `"${payload.name}" added to database and Header Software dropdown!`,
          timer: 1600,
          showConfirmButton: false,
          iconColor: "#368b82",
        });
      }

      setIsSoftwareModalOpen(false);
      await fetchSoftwares();
    } catch (err) {
      console.error("Save software error:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to Save",
        text: err.message || "An error occurred while saving the software.",
        confirmButtonColor: "#368b82",
      });
      throw err;
    }
  };

  const handleDeleteSoftware = async (software) => {
    try {
      const targetId = software?._id || software?.slug;
      if (targetId) {
        await softwareApi.deleteSoftware(targetId);
      } else {
        setSoftwares((prev) => prev.filter((s) => s.slug !== software.slug));
      }
      await fetchSoftwares();
    } catch (err) {
      console.error("Delete software error:", err);
      throw err;
    }
  };

  // If unauthenticated, show isolated AdminLogin component
  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  // If authenticated, show Modular Admin Dashboard Layout
  return (
    <div className="h-screen w-full bg-[#f8fafc] text-gray-800 font-poppins flex flex-col lg:flex-row overflow-hidden">
      {/* 1. Sidebar Navigation (Sticky) */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        blogsCount={blogs.length}
        softwareCount={softwares.length}
        inquiriesCount={inquiriesCount}
        consultationsCount={consultationsCount}
        onLogout={handleLogout}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* 2. Main Dashboard Content (Independent Scroll) */}
      <main className="flex-1 w-full min-w-0 h-full overflow-y-auto bg-[#f8fafc] flex flex-col">
        {/* Top Header */}
        <AdminHeader
          activeTab={activeTab}
          onOpenCreateModal={
            activeTab === "software"
              ? handleOpenCreateSoftwareModal
              : handleOpenCreateModal
          }
        />

        {/* Tab Views */}
        {activeTab === "overview" && (
          <OverviewTab
            blogs={blogs}
            softwareCount={softwares.length}
            inquiriesCount={inquiriesCount}
            consultationsCount={consultationsCount}
            onNavigateToBlog={() => setActiveTab("blog")}
            onNavigateToSoftware={() => setActiveTab("software")}
            onNavigateToConsultations={() => setActiveTab("consultations")}
            onNavigateToInquiries={() => setActiveTab("inquiries")}
            onOpenCreateModal={handleOpenCreateModal}
            onOpenEditModal={handleOpenEditModal}
          />
        )}

        {activeTab === "blog" && (
          <BlogManagementTab
            blogs={blogs}
            isLoading={isLoadingBlogs}
            onOpenCreateModal={handleOpenCreateModal}
            onOpenEditModal={handleOpenEditModal}
            onDeleteBlog={handleDeleteBlog}
          />
        )}

        {activeTab === "software" && (
          <SoftwareManagementTab
            softwares={softwares}
            isLoading={isLoadingSoftwares}
            onOpenCreateModal={handleOpenCreateSoftwareModal}
            onOpenEditModal={handleOpenEditSoftwareModal}
            onDeleteSoftware={handleDeleteSoftware}
          />
        )}

        {activeTab === "inquiries" && <InquiriesTab />}

        {activeTab === "consultations" && <ConsultationsTab />}

        {activeTab === "settings" && <SettingsTab />}
      </main>

      {/* 3. Blog Create/Edit Modal */}
      <BlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingBlog={editingBlog}
        onSaveBlog={handleSaveBlog}
      />

      {/* 4. Software Create/Edit Modal */}
      <SoftwareModal
        isOpen={isSoftwareModalOpen}
        onClose={() => setIsSoftwareModalOpen(false)}
        editingSoftware={editingSoftware}
        onSaveSoftware={handleSaveSoftware}
      />
    </div>
  );
}
