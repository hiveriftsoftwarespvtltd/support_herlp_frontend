"use client";

import React, { useState, useEffect, useCallback } from "react";
import { blogPosts as fallbackBlogData } from "@/data/blogData";
import { softwareData as fallbackSoftwareData } from "@/data/navigationData";
import { blogApi, softwareApi, serviceApi, inquiryApi, consultationApi } from "@/api";
import { socialLinkApi } from "@/api/socialLinkApi";
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
  ServiceManagementTab,
  ServiceModal,
  ConsultationsTab,
  InquiriesTab,
  SocialLinksTab,
  SettingsTab,
} from "@/components/Admin";

const VALID_TABS = [
  "overview",
  "blog",
  "software",
  "services",
  "inquiries",
  "consultations",
  "social-links",
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

  // Services Management State
  const [services, setServices] = useState([]);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  // Inquiries, Consultations & Social Links State
  const [inquiriesCount, setInquiriesCount] = useState(0);
  const [consultationsCount, setConsultationsCount] = useState(0);
  const [socialLinksCount, setSocialLinksCount] = useState(0);

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

  // Fetch services from live MongoDB Backend API
  const fetchServices = useCallback(async () => {
    try {
      setIsLoadingServices(true);
      const response = await serviceApi.getServices();
      if (response?.data) {
        setServices(response.data);
      }
    } catch (err) {
      console.warn("Could not fetch services from API:", err.message);
    } finally {
      setIsLoadingServices(false);
    }
  }, []);

  // Fetch inquiries, consultations & social links count from live MongoDB Backend API
  const fetchCounts = useCallback(async () => {
    try {
      const [inqRes, consRes, socRes] = await Promise.allSettled([
        inquiryApi.getInquiryStats(),
        consultationApi.getConsultationStats(),
        socialLinkApi.getSocialLinks(),
      ]);

      if (inqRes.status === "fulfilled" && inqRes.value?.data?.total !== undefined) {
        setInquiriesCount(inqRes.value.data.total);
      }
      if (consRes.status === "fulfilled" && consRes.value?.data?.total !== undefined) {
        setConsultationsCount(consRes.value.data.total);
      }
      if (socRes.status === "fulfilled" && socRes.value?.data) {
        setSocialLinksCount(socRes.value.data.length);
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
    fetchServices();
    fetchCounts();

    return () => window.removeEventListener("popstate", handlePopState);
  }, [fetchBlogs, fetchSoftwares, fetchServices, fetchCounts]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    fetchBlogs();
    fetchSoftwares();
    fetchServices();
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
      if (formData.subtitle) data.append("subtitle", formData.subtitle);
      if (formData.slug) data.append("slug", formData.slug);
      data.append("category", formData.category);
      data.append("excerpt", formData.excerpt);
      data.append("readTime", formData.readTime || "5 min read");
      data.append("authorName", formData.author || "Support Help");
      data.append("authorRole", formData.authorRole || "Certified Cloud Accounting Specialist");
      if (formData.authorBio) data.append("authorBio", formData.authorBio);
      if (formData.publishedAt) data.append("publishedAt", formData.publishedAt);
      data.append("featured", formData.featured ? "true" : "false");
      data.append("status", formData.status || "published");

      // Media & Alt Text
      if (formData.coverImageUrl) data.append("coverImage", formData.coverImageUrl);
      if (formData.imageAltText) data.append("imageAltText", formData.imageAltText);

      // SEO & Meta
      if (formData.metaTitle) data.append("metaTitle", formData.metaTitle);
      if (formData.metaDescription) data.append("metaDescription", formData.metaDescription);
      if (formData.canonicalUrl) data.append("canonicalUrl", formData.canonicalUrl);
      data.append("isRobotsIndex", formData.isRobotsIndex ? "true" : "false");
      data.append("isRobotsFollow", formData.isRobotsFollow ? "true" : "false");

      // Social Share
      if (formData.ogTitle) data.append("ogTitle", formData.ogTitle);
      if (formData.ogDescription) data.append("ogDescription", formData.ogDescription);
      if (formData.ogImage) data.append("ogImage", formData.ogImage);
      if (formData.twitterCard) data.append("twitterCard", formData.twitterCard);

      // TOC & Links
      if (formData.tableOfContents) {
        data.append("tableOfContents", JSON.stringify(formData.tableOfContents));
      }
      if (formData.internalLinks) {
        data.append("internalLinks", JSON.stringify(formData.internalLinks));
      }
      if (formData.externalLinks) {
        data.append("externalLinks", JSON.stringify(formData.externalLinks));
      }

      // Schema & XML Sitemap
      if (formData.schemaMarkup) data.append("schemaMarkup", formData.schemaMarkup);
      data.append("includeInSitemap", formData.includeInSitemap ? "true" : "false");
      if (formData.sitemapPriority !== undefined) {
        data.append("sitemapPriority", String(formData.sitemapPriority));
      }
      if (formData.sitemapChangeFreq) {
        data.append("sitemapChangeFreq", formData.sitemapChangeFreq);
      }

      if (formData.tags) {
        data.append("tags", formData.tags);
      }

      if (formData.content && Array.isArray(formData.content) && formData.content.length > 0) {
        data.append("content", JSON.stringify(formData.content));
      } else if (formData.contentParagraph) {
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

  // --- SERVICE ACTIONS ---
  const handleOpenCreateServiceModal = () => {
    setEditingService(null);
    setIsServiceModalOpen(true);
  };

  const handleOpenEditServiceModal = (service) => {
    setEditingService(service);
    setIsServiceModalOpen(true);
  };

  const handleSaveService = async (
    payload,
    currentEditingService,
    showcase1ImageFile,
    showcase2ImageFile
  ) => {
    try {
      const data = new FormData();
      data.append("title", payload.title);
      if (payload.slug) data.append("slug", payload.slug);
      data.append("heroTitle", payload.heroTitle || payload.title.toUpperCase());
      if (payload.heroSubtitle !== undefined) data.append("heroSubtitle", payload.heroSubtitle);
      if (payload.category) data.append("category", payload.category);
      if (payload.shortDescription) data.append("shortDescription", payload.shortDescription);
      data.append("displayOrder", String(payload.displayOrder || 1));
      data.append("isPublished", payload.isPublished ? "true" : "false");
      data.append("status", payload.status || "published");

      // Intro Section
      if (payload.introBadge) data.append("introBadge", payload.introBadge);
      if (payload.introHeading) data.append("introHeading", payload.introHeading);
      data.append("introParagraphs", JSON.stringify(payload.introParagraphs || []));

      // Solutions Section
      if (payload.solutionsBadge) data.append("solutionsBadge", payload.solutionsBadge);
      if (payload.solutionsTitle) data.append("solutionsTitle", payload.solutionsTitle);
      data.append("leftCol", JSON.stringify(payload.leftCol || []));
      data.append("rightCol", JSON.stringify(payload.rightCol || []));

      // Showcase 1
      if (payload.showcase1Badge) data.append("showcase1Badge", payload.showcase1Badge);
      if (payload.showcase1Title) data.append("showcase1Title", payload.showcase1Title);
      if (payload.showcase1Description) data.append("showcase1Description", payload.showcase1Description);
      data.append("showcase1Checklist", JSON.stringify(payload.showcase1Checklist || []));
      if (payload.showcase1ImageUrl) data.append("showcase1Image", payload.showcase1ImageUrl);
      if (showcase1ImageFile) data.append("showcase1Image", showcase1ImageFile);

      // Showcase 2
      if (payload.showcase2Badge) data.append("showcase2Badge", payload.showcase2Badge);
      if (payload.showcase2Title) data.append("showcase2Title", payload.showcase2Title);
      data.append("showcase2Paragraphs", JSON.stringify(payload.showcase2Paragraphs || []));
      if (payload.showcase2ImageUrl) data.append("showcase2Image", payload.showcase2ImageUrl);
      if (showcase2ImageFile) data.append("showcase2Image", showcase2ImageFile);

      // Why & SEO
      if (payload.whyTitle) data.append("whyTitle", payload.whyTitle);
      data.append("whyReasons", JSON.stringify(payload.whyReasons || []));
      if (payload.whyClosingNote) data.append("whyClosingNote", payload.whyClosingNote);
      if (payload.metaTitle) data.append("metaTitle", payload.metaTitle);
      if (payload.metaDescription) data.append("metaDescription", payload.metaDescription);
      if (payload.canonicalUrl) data.append("canonicalUrl", payload.canonicalUrl);

      const targetId = currentEditingService?._id || currentEditingService?.slug;
      if (targetId) {
        await serviceApi.updateService(targetId, data);
        Swal.fire({
          icon: "success",
          title: "Service Updated!",
          text: `"${payload.title}" updated successfully in database, header menu, and public page.`,
          timer: 1600,
          showConfirmButton: false,
          iconColor: "#368b82",
        });
      } else {
        await serviceApi.createService(data);
        Swal.fire({
          icon: "success",
          title: "Service Created!",
          text: `"${payload.title}" added to database and Header Services dropdown!`,
          timer: 1600,
          showConfirmButton: false,
          iconColor: "#368b82",
        });
      }

      setIsServiceModalOpen(false);
      await fetchServices();
    } catch (err) {
      console.error("Save service error:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to Save Service",
        text: err.message || "An error occurred while saving the service.",
        confirmButtonColor: "#368b82",
      });
      throw err;
    }
  };

  const handleDeleteService = async (service) => {
    try {
      const targetId = service?._id || service?.slug;
      if (targetId) {
        await serviceApi.deleteService(targetId);
      } else {
        setServices((prev) => prev.filter((s) => s.slug !== service.slug));
      }
      await fetchServices();
    } catch (err) {
      console.error("Delete service error:", err);
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
        servicesCount={services.length}
        inquiriesCount={inquiriesCount}
        consultationsCount={consultationsCount}
        socialLinksCount={socialLinksCount}
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
            activeTab === "services"
              ? handleOpenCreateServiceModal
              : activeTab === "software"
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

        {activeTab === "services" && (
          <ServiceManagementTab
            services={services}
            isLoading={isLoadingServices}
            onOpenCreateModal={handleOpenCreateServiceModal}
            onOpenEditModal={handleOpenEditServiceModal}
            onDeleteService={handleDeleteService}
          />
        )}

        {activeTab === "inquiries" && <InquiriesTab />}

        {activeTab === "consultations" && <ConsultationsTab />}

        {activeTab === "social-links" && (
          <SocialLinksTab onStatsUpdate={(cnt) => setSocialLinksCount(cnt)} />
        )}

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

      {/* 5. Service Create/Edit Modal */}
      <ServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        editingService={editingService}
        onSaveService={handleSaveService}
      />
    </div>
  );
}
