"use client";

import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import {
  X,
  Upload,
  Image as ImageIcon,
  Sparkles,
  CheckCircle2,
  Globe,
  Link2,
  ExternalLink,
  ListOrdered,
  Code,
  Share2,
  Eye,
  RefreshCw,
  Plus,
  Trash2,
  Search,
  SlidersHorizontal,
  Check,
  FileText,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  Heading,
  Quote,
  List,
  Calendar,
  User,
  Clock,
} from "lucide-react";

const MODAL_TABS = [
  { id: "content", step: 1, label: "Content & H1", icon: FileText },
  { id: "media", step: 2, label: "Media & Alt", icon: ImageIcon },
  { id: "seo", step: 3, label: "SEO & Meta", icon: Search },
  { id: "social", step: 4, label: "Social (OG/X)", icon: Share2 },
  { id: "links", step: 5, label: "TOC & Links", icon: Link2 },
  { id: "schema", step: 6, label: "Schema & Submit", icon: Code },
];

export function BlogModal({ isOpen, onClose, editingBlog, onSaveBlog }) {
  const [activeTab, setActiveTab] = useState("content");

  // Form State
  const [formData, setFormData] = useState({
    // Core & Content
    title: "",
    subtitle: "",
    slug: "",
    category: "Accounting",
    author: "Support Help",
    authorRole: "Senior Financial Controller",
    authorBio:
      "Published by the certified bookkeeping and financial advisory team at Support Help. Empowering businesses globally with audit-ready financial statements and cloud accounting proficiency.",
    readTime: "6 min read",
    publishedAt: "",
    excerpt: "",
    tags: "Financial Reporting, GAAP, Balance Sheet, Cash Flow",
    featured: false,
    status: "published",
    contentBlocks: [],
    contentParagraph: "",
    contentEditorMode: "blocks",

    // Media & Alt
    coverImageUrl: "",
    imageAltText: "",

    // SEO & Meta
    metaTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    isRobotsIndex: true,
    isRobotsFollow: true,

    // Social (OG & Twitter)
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    twitterCard: "summary_large_image",

    // TOC & Links
    tableOfContentsEnabled: true,
    tableOfContentsItems: [],
    internalLinks: [],
    externalLinks: [],

    // Schema & Sitemap
    schemaMarkup: "",
    includeInSitemap: true,
    sitemapPriority: 0.8,
    sitemapChangeFreq: "weekly",
  });

  // Link inputs temporary states
  const [newInternalLink, setNewInternalLink] = useState({ text: "", url: "" });
  const [newExternalLink, setNewExternalLink] = useState({
    text: "",
    url: "",
    rel: "nofollow",
  });
  const [newTocItem, setNewTocItem] = useState({ title: "", id: "", level: 2 });

  // File Upload State
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Helper to generate slug from title
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  useEffect(() => {
    if (editingBlog) {
      const existingSlug = editingBlog.slug || generateSlug(editingBlog.title || "");
      const existingCover = editingBlog.coverImage || editingBlog.image || "";

      // Parse content blocks
      let initialBlocks = [];
      let contentText = "";
      if (Array.isArray(editingBlog.content) && editingBlog.content.length > 0) {
        initialBlocks = editingBlog.content.map((b) => {
          if (typeof b === "string") return { type: "paragraph", text: b };
          if (b.type === "list") {
            return {
              type: "list",
              items: Array.isArray(b.items)
                ? [...b.items]
                : [b.text || ""],
            };
          }
          return { type: b.type || "paragraph", text: b.text || "" };
        });
        contentText = editingBlog.content
          .map((c) =>
            c.type === "list" ? (c.items || []).join("\n") : c.text || ""
          )
          .join("\n\n");
      } else if (
        typeof editingBlog.content === "string" &&
        editingBlog.content.trim()
      ) {
        contentText = editingBlog.content;
        initialBlocks = [{ type: "paragraph", text: editingBlog.content }];
      } else {
        initialBlocks = [{ type: "paragraph", text: "" }];
      }

      // Format date for <input type="date">
      let initialDate = "";
      if (editingBlog.publishedAt) {
        try {
          initialDate = new Date(editingBlog.publishedAt).toISOString().split("T")[0];
        } catch {}
      }

      // Parse TOC
      const toc = editingBlog.tableOfContents || { enabled: true, items: [] };

      setFormData({
        title: editingBlog.title || "",
        subtitle: editingBlog.subtitle || "",
        slug: existingSlug,
        category: editingBlog.category || "Accounting",
        author:
          typeof editingBlog.author === "string"
            ? editingBlog.author
            : editingBlog.author?.name || "Support Help",
        authorRole:
          editingBlog.authorRole ||
          (typeof editingBlog.author === "object" ? editingBlog.author?.role : "") ||
          "Senior Financial Controller",
        authorBio:
          editingBlog.authorBio ||
          (typeof editingBlog.author === "object" ? editingBlog.author?.bio : "") ||
          "Published by the certified bookkeeping and financial advisory team at Support Help. Empowering businesses globally with audit-ready financial statements and cloud accounting proficiency.",
        readTime: editingBlog.readTime || "6 min read",
        publishedAt: initialDate,
        excerpt: editingBlog.excerpt || "",
        tags: Array.isArray(editingBlog.tags)
          ? editingBlog.tags.join(", ")
          : typeof editingBlog.tags === "string"
          ? editingBlog.tags
          : "",
        featured: !!editingBlog.featured,
        status: editingBlog.status || "published",
        contentBlocks: initialBlocks,
        contentParagraph: contentText,
        contentEditorMode: "blocks",

        coverImageUrl: existingCover,
        imageAltText: editingBlog.imageAltText || editingBlog.title || "",

        metaTitle: editingBlog.metaTitle || editingBlog.title || "",
        metaDescription: editingBlog.metaDescription || editingBlog.excerpt || "",
        canonicalUrl:
          editingBlog.canonicalUrl ||
          `https://supporthelp.online/blog/${existingSlug}`,
        isRobotsIndex:
          editingBlog.isRobotsIndex !== undefined ? !!editingBlog.isRobotsIndex : true,
        isRobotsFollow:
          editingBlog.isRobotsFollow !== undefined ? !!editingBlog.isRobotsFollow : true,

        ogTitle: editingBlog.ogTitle || editingBlog.metaTitle || editingBlog.title || "",
        ogDescription:
          editingBlog.ogDescription ||
          editingBlog.metaDescription ||
          editingBlog.excerpt ||
          "",
        ogImage: editingBlog.ogImage || existingCover,
        twitterCard: editingBlog.twitterCard || "summary_large_image",

        tableOfContentsEnabled: toc.enabled !== undefined ? !!toc.enabled : true,
        tableOfContentsItems: Array.isArray(toc.items) ? toc.items : [],
        internalLinks: Array.isArray(editingBlog.internalLinks)
          ? editingBlog.internalLinks
          : [],
        externalLinks: Array.isArray(editingBlog.externalLinks)
          ? editingBlog.externalLinks
          : [],

        schemaMarkup:
          typeof editingBlog.schemaMarkup === "string"
            ? editingBlog.schemaMarkup
            : editingBlog.schemaMarkup
            ? JSON.stringify(editingBlog.schemaMarkup, null, 2)
            : "",
        includeInSitemap:
          editingBlog.includeInSitemap !== undefined
            ? !!editingBlog.includeInSitemap
            : true,
        sitemapPriority: editingBlog.sitemapPriority || 0.8,
        sitemapChangeFreq: editingBlog.sitemapChangeFreq || "weekly",
      });

      setImagePreview(existingCover);
      setImageFile(null);
    } else {
      // New Article Defaults matching the static blog
      setFormData({
        title: "",
        subtitle: "",
        slug: "",
        category: "Accounting",
        author: "Support Help",
        authorRole: "Senior Financial Controller",
        authorBio:
          "Published by the certified bookkeeping and financial advisory team at Support Help. Empowering businesses globally with audit-ready financial statements and cloud accounting proficiency.",
        readTime: "6 min read",
        publishedAt: new Date().toISOString().split("T")[0],
        excerpt: "",
        tags: "Financial Reporting, GAAP, Balance Sheet, Cash Flow",
        featured: false,
        status: "published",
        contentBlocks: [
          {
            type: "paragraph",
            text: "",
          },
        ],
        contentParagraph: "",
        contentEditorMode: "blocks",

        coverImageUrl: "",
        imageAltText: "",

        metaTitle: "",
        metaDescription: "",
        canonicalUrl: "",
        isRobotsIndex: true,
        isRobotsFollow: true,

        ogTitle: "",
        ogDescription: "",
        ogImage: "",
        twitterCard: "summary_large_image",

        tableOfContentsEnabled: true,
        tableOfContentsItems: [],
        internalLinks: [],
        externalLinks: [],

        schemaMarkup: "",
        includeInSitemap: true,
        sitemapPriority: 0.8,
        sitemapChangeFreq: "weekly",
      });
      setImagePreview("");
      setImageFile(null);
    }
    setActiveTab("content");
  }, [editingBlog, isOpen]);

  // Handle image picker
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
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
      if (!formData.imageAltText && formData.title) {
        setFormData((prev) => ({ ...prev, imageAltText: prev.title }));
      }
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setFormData((prev) => ({ ...prev, coverImageUrl: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Sync title changes with slug if slug was empty or matched previous title
  const handleTitleChange = (val) => {
    const prevSlug = generateSlug(formData.title);
    const newSlug = generateSlug(val);
    setFormData((prev) => {
      const shouldUpdateSlug = !prev.slug || prev.slug === prevSlug;
      const shouldUpdateMeta = !prev.metaTitle || prev.metaTitle === prev.title;
      const shouldUpdateAlt = !prev.imageAltText || prev.imageAltText === prev.title;
      return {
        ...prev,
        title: val,
        slug: shouldUpdateSlug ? newSlug : prev.slug,
        metaTitle: shouldUpdateMeta ? val : prev.metaTitle,
        imageAltText: shouldUpdateAlt ? val : prev.imageAltText,
      };
    });
  };

  // Auto-generate Schema.org JSON-LD
  const handleAutoGenerateSchema = () => {
    const currentSlug = formData.slug || generateSlug(formData.title || "article");
    const canonical =
      formData.canonicalUrl || `https://supporthelp.online/blog/${currentSlug}`;
    const cover = imagePreview || formData.coverImageUrl || "/blog/zoho-books-used-for.png";
    const fullImageUrl = cover.startsWith("http")
      ? cover
      : `https://supporthelp.online${cover.startsWith("/") ? "" : "/"}${cover}`;

    const schemaObj = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonical,
      },
      headline: formData.metaTitle || formData.title || "Support Help Accounting Article",
      description: formData.metaDescription || formData.excerpt || "",
      image: [fullImageUrl],
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      author: {
        "@type": "Person",
        name: formData.author || "Support Help",
        jobTitle: formData.authorRole || "Certified Cloud Accounting Specialist",
      },
      publisher: {
        "@type": "Organization",
        name: "Support Help",
        logo: {
          "@type": "ImageObject",
          url: "https://supporthelp.online/logo11.png",
        },
      },
      keywords: formData.tags || "",
      articleSection: formData.category || "Cloud Accounting",
    };

    setFormData((prev) => ({
      ...prev,
      schemaMarkup: JSON.stringify(schemaObj, null, 2),
    }));

    Swal.fire({
      icon: "success",
      title: "Schema Generated!",
      text: "BlogPosting JSON-LD schema generated successfully based on article details.",
      timer: 1600,
      showConfirmButton: false,
      iconColor: "#368b82",
    });
  };

  // Add Internal Link
  const handleAddInternalLink = () => {
    if (!newInternalLink.text.trim() || !newInternalLink.url.trim()) return;
    setFormData((prev) => ({
      ...prev,
      internalLinks: [...prev.internalLinks, { ...newInternalLink }],
    }));
    setNewInternalLink({ text: "", url: "" });
  };

  const handleRemoveInternalLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      internalLinks: prev.internalLinks.filter((_, i) => i !== index),
    }));
  };

  // Add External Link
  const handleAddExternalLink = () => {
    if (!newExternalLink.text.trim() || !newExternalLink.url.trim()) return;
    setFormData((prev) => ({
      ...prev,
      externalLinks: [...prev.externalLinks, { ...newExternalLink }],
    }));
    setNewExternalLink({ text: "", url: "", rel: "nofollow" });
  };

  const handleRemoveExternalLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      externalLinks: prev.externalLinks.filter((_, i) => i !== index),
    }));
  };

  // Add TOC Item
  const handleAddTocItem = () => {
    if (!newTocItem.title.trim()) return;
    const anchorId =
      newTocItem.id.trim() || generateSlug(newTocItem.title.trim());
    setFormData((prev) => ({
      ...prev,
      tableOfContentsItems: [
        ...prev.tableOfContentsItems,
        { title: newTocItem.title.trim(), id: anchorId, level: Number(newTocItem.level) || 2 },
      ],
    }));
    setNewTocItem({ title: "", id: "", level: 2 });
  };

  const handleRemoveTocItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      tableOfContentsItems: prev.tableOfContentsItems.filter((_, i) => i !== index),
    }));
  };

  // --- CONTENT BLOCKS BUILDER ACTIONS ---
  const handleAddBlock = (type) => {
    setFormData((prev) => {
      const blocks = Array.isArray(prev.contentBlocks) ? [...prev.contentBlocks] : [];
      if (type === "paragraph") {
        blocks.push({ type: "paragraph", text: "" });
      } else if (type === "heading") {
        blocks.push({ type: "heading", text: "" });
      } else if (type === "list") {
        blocks.push({ type: "list", items: [""] });
      } else if (type === "quote") {
        blocks.push({ type: "quote", text: "" });
      }
      return { ...prev, contentBlocks: blocks };
    });
  };

  const handleUpdateBlockText = (index, text) => {
    setFormData((prev) => {
      const blocks = [...prev.contentBlocks];
      blocks[index] = { ...blocks[index], text };
      return { ...prev, contentBlocks: blocks };
    });
  };

  const handleUpdateListItem = (blockIndex, itemIndex, text) => {
    setFormData((prev) => {
      const blocks = [...prev.contentBlocks];
      const items = [...(blocks[blockIndex].items || [])];
      items[itemIndex] = text;
      blocks[blockIndex] = { ...blocks[blockIndex], items };
      return { ...prev, contentBlocks: blocks };
    });
  };

  const handleAddListItem = (blockIndex) => {
    setFormData((prev) => {
      const blocks = [...prev.contentBlocks];
      const items = [...(blocks[blockIndex].items || []), ""];
      blocks[blockIndex] = { ...blocks[blockIndex], items };
      return { ...prev, contentBlocks: blocks };
    });
  };

  const handleRemoveListItem = (blockIndex, itemIndex) => {
    setFormData((prev) => {
      const blocks = [...prev.contentBlocks];
      const items = (blocks[blockIndex].items || []).filter((_, i) => i !== itemIndex);
      blocks[blockIndex] = { ...blocks[blockIndex], items };
      return { ...prev, contentBlocks: blocks };
    });
  };

  const handleRemoveBlock = (index) => {
    setFormData((prev) => ({
      ...prev,
      contentBlocks: prev.contentBlocks.filter((_, i) => i !== index),
    }));
  };

  const handleMoveBlockUp = (index) => {
    if (index === 0) return;
    setFormData((prev) => {
      const blocks = [...prev.contentBlocks];
      const temp = blocks[index];
      blocks[index] = blocks[index - 1];
      blocks[index - 1] = temp;
      return { ...prev, contentBlocks: blocks };
    });
  };

  const handleMoveBlockDown = (index) => {
    setFormData((prev) => {
      if (index >= prev.contentBlocks.length - 1) return prev;
      const blocks = [...prev.contentBlocks];
      const temp = blocks[index];
      blocks[index] = blocks[index + 1];
      blocks[index + 1] = temp;
      return { ...prev, contentBlocks: blocks };
    });
  };

  const handleSyncHeadingsToToc = () => {
    const headings = (formData.contentBlocks || [])
      .filter((b) => b.type === "heading" && b.text?.trim())
      .map((b) => ({
        title: b.text.trim(),
        id: generateSlug(b.text.trim()),
        level: 2,
      }));

    if (headings.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No Headings Found",
        text: "Add at least one Heading (H2) block in your article content to auto-generate the Table of Contents.",
        confirmButtonColor: "#368b82",
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      tableOfContentsEnabled: true,
      tableOfContentsItems: headings,
    }));

    Swal.fire({
      icon: "success",
      title: "Table of Contents Synced!",
      text: `Imported ${headings.length} heading(s) directly into Table of Contents for Step 5.`,
      timer: 1600,
      showConfirmButton: false,
      iconColor: "#368b82",
    });
  };

  const handleLoadStaticBlogTemplate = () => {
    Swal.fire({
      title: "Load Static Blog Template?",
      text: "This will pre-fill the form fields and content blocks with the Financial Accounting static blog format shown on the website.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Load Template",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#368b82",
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData((prev) => ({
          ...prev,
          title: "What Is Financial Accounting? Meaning, Types, and Key Elements",
          subtitle:
            "A comprehensive guide breaking down accrual vs cash accounting, core balance sheet requirements, and statutory disclosures for growing companies.",
          slug: "what-is-financial-accounting",
          category: "Accounting",
          readTime: "8 min read",
          author: "Support Help",
          authorRole: "Senior Financial Controller",
          authorBio:
            "Published by the certified bookkeeping and financial advisory team at Support Help. Empowering businesses globally with audit-ready financial statements and cloud accounting proficiency.",
          excerpt:
            "A comprehensive guide breaking down accrual vs cash accounting, core balance sheet requirements, and statutory disclosures for growing companies.",
          tags: "Accrual Basis, Financial Reporting, GAAP, Balance Sheet, Accruals",
          coverImageUrl: "/blog/what-is-financial-accounting.png",
          imageAltText: "What Is Financial Accounting Meaning, Types, and Key Elements",
          contentBlocks: [
            {
              type: "paragraph",
              text: "Financial accounting is the structured discipline of recording, summarizing, and reporting the vast stream of transactions resulting from business operations over a specific period. Unlike managerial accounting which is meant solely for internal team budgeting, financial accounting generates formal statements designed for external stakeholders including investors, banks, audit authorities, and regulatory bodies.",
            },
            {
              type: "heading",
              text: "Cash Basis vs. Accrual Basis: Choosing the Right Standard",
            },
            {
              type: "list",
              items: [
                "Cash Basis Accounting: Transactions are recognized only when physical cash changes hands. While simple for micro-sole proprietorships, it fails to present true liabilities or future receivables accurately.",
                "Accrual Basis Accounting: Mandated under US GAAP and IFRS, accrual accounting recognizes revenues when earned (upon delivery of goods or services) and expenses when incurred, offering an authentic picture of corporate health.",
              ],
            },
            {
              type: "quote",
              text: "Consistent financial reporting is not just an administrative requirement; it is the cornerstone of investor trust and sustainable enterprise valuation.",
            },
          ],
          tableOfContentsEnabled: true,
          tableOfContentsItems: [
            {
              title: "Cash Basis vs. Accrual Basis: Choosing the Right Standard",
              id: "cash-basis-vs-accrual-basis-choosing-the-right-standard",
              level: 2,
            },
          ],
        }));
        setImagePreview("/blog/what-is-financial-accounting.png");
        Swal.fire({
          icon: "success",
          title: "Template Loaded!",
          text: "Static blog fields loaded successfully.",
          timer: 1500,
          showConfirmButton: false,
          iconColor: "#368b82",
        });
      }
    });
  };

  // Step Wizard State & Navigation
  const currentStepIndex = Math.max(
    0,
    MODAL_TABS.findIndex((t) => t.id === activeTab)
  );

  const handleNextStep = (e) => {
    if (e) e.preventDefault();

    // Step 1 Validation (Content & H1)
    if (activeTab === "content") {
      if (!formData.title.trim()) {
        Swal.fire({
          icon: "warning",
          title: "Step 1 Incomplete",
          text: "Article Title / H1 is required before proceeding to Step 2.",
          confirmButtonColor: "#368b82",
        });
        return;
      }
      if (!formData.excerpt.trim()) {
        Swal.fire({
          icon: "warning",
          title: "Step 1 Incomplete",
          text: "Excerpt summary is required before proceeding to Step 2.",
          confirmButtonColor: "#368b82",
        });
        return;
      }

      // Auto-fill downstream SEO defaults if currently empty
      setFormData((prev) => ({
        ...prev,
        slug: prev.slug || generateSlug(prev.title),
        metaTitle: prev.metaTitle || prev.title,
        metaDescription: prev.metaDescription || prev.subtitle || prev.excerpt,
        imageAltText: prev.imageAltText || prev.title,
        ogTitle: prev.ogTitle || prev.metaTitle || prev.title,
        ogDescription:
          prev.ogDescription || prev.metaDescription || prev.subtitle || prev.excerpt,
        canonicalUrl:
          prev.canonicalUrl ||
          `https://supporthelp.online/blog/${prev.slug || generateSlug(prev.title)}`,
      }));
    }

    // Step 2 Media validation / auto-fill
    if (activeTab === "media") {
      if (!formData.imageAltText.trim() && formData.title.trim()) {
        setFormData((prev) => ({
          ...prev,
          imageAltText: prev.title,
        }));
      }
    }

    // Step 5 -> Step 6: Auto-generate schema if empty
    if (activeTab === "links") {
      if (!formData.schemaMarkup.trim()) {
        const currentSlug =
          formData.slug || generateSlug(formData.title || "article");
        const canonical =
          formData.canonicalUrl || `https://supporthelp.online/blog/${currentSlug}`;
        const cover =
          imagePreview || formData.coverImageUrl || "/blog/zoho-books-used-for.png";
        const fullImageUrl = cover.startsWith("http")
          ? cover
          : `https://supporthelp.online${cover.startsWith("/") ? "" : "/"}${cover}`;

        const schemaObj = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": canonical,
          },
          headline: formData.metaTitle || formData.title,
          description: formData.metaDescription || formData.excerpt || "",
          image: [fullImageUrl],
          datePublished: new Date().toISOString(),
          dateModified: new Date().toISOString(),
          author: {
            "@type": "Person",
            name: formData.author || "Support Help",
            jobTitle: formData.authorRole || "Certified Cloud Accounting Specialist",
          },
          publisher: {
            "@type": "Organization",
            name: "Support Help",
            logo: {
              "@type": "ImageObject",
              url: "https://supporthelp.online/logo11.png",
            },
          },
          keywords: formData.tags || "",
          articleSection: formData.category || "Cloud Accounting",
        };
        setFormData((prev) => ({
          ...prev,
          schemaMarkup: JSON.stringify(schemaObj, null, 2),
        }));
      }
    }

    if (currentStepIndex < MODAL_TABS.length - 1) {
      setActiveTab(MODAL_TABS[currentStepIndex + 1].id);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setActiveTab(MODAL_TABS[currentStepIndex - 1].id);
    }
  };

  // Submit Handler (Only callable on Final Step)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If somehow triggered before final step, move to next step instead
    if (currentStepIndex < MODAL_TABS.length - 1) {
      handleNextStep();
      return;
    }

    if (!formData.title.trim()) {
      setActiveTab("content");
      Swal.fire({
        icon: "warning",
        title: "Title / H1 Required",
        text: "Please provide an article title before saving.",
        confirmButtonColor: "#368b82",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const finalSlug =
        formData.slug.trim() || generateSlug(formData.title.trim());
      const finalCanonical =
        formData.canonicalUrl.trim() || `https://supporthelp.online/blog/${finalSlug}`;

      // Prepare structured contentBlocks
      let finalContent = formData.contentBlocks;
      if (!Array.isArray(finalContent) || finalContent.length === 0) {
        if (formData.contentParagraph?.trim()) {
          finalContent = [{ type: "paragraph", text: formData.contentParagraph.trim() }];
        } else {
          finalContent = [];
        }
      }

      // Package payload
      const payload = {
        title: formData.title,
        subtitle: formData.subtitle,
        slug: finalSlug,
        category: formData.category,
        author: formData.author,
        authorRole: formData.authorRole,
        authorBio: formData.authorBio,
        publishedAt: formData.publishedAt,
        readTime: formData.readTime,
        excerpt: formData.excerpt,
        tags: formData.tags,
        featured: formData.featured,
        status: formData.status,
        content: finalContent,
        contentParagraph:
          formData.contentParagraph ||
          finalContent
            .map((b) =>
              b.type === "list"
                ? (b.items || []).join("\n")
                : b.text || ""
            )
            .join("\n\n"),

        coverImage: formData.coverImageUrl,
        imageAltText: formData.imageAltText || formData.title,

        metaTitle: formData.metaTitle || formData.title,
        metaDescription: formData.metaDescription || formData.excerpt,
        canonicalUrl: finalCanonical,
        isRobotsIndex: formData.isRobotsIndex,
        isRobotsFollow: formData.isRobotsFollow,

        ogTitle: formData.ogTitle || formData.metaTitle || formData.title,
        ogDescription:
          formData.ogDescription || formData.metaDescription || formData.excerpt,
        ogImage: formData.ogImage || formData.coverImageUrl || "",
        twitterCard: formData.twitterCard || "summary_large_image",

        tableOfContents: {
          enabled: formData.tableOfContentsEnabled,
          items: formData.tableOfContentsItems,
        },
        internalLinks: formData.internalLinks,
        externalLinks: formData.externalLinks,

        schemaMarkup: formData.schemaMarkup,
        includeInSitemap: formData.includeInSitemap,
        sitemapPriority: formData.sitemapPriority,
        sitemapChangeFreq: formData.sitemapChangeFreq,
      };

      await onSaveBlog(payload, editingBlog, imageFile);
    } catch (err) {
      console.error("Save blog error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs font-poppins">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden max-h-[94vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200/80 bg-gradient-to-r from-gray-50 via-white to-gray-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#edf7f6] text-[#368b82] flex items-center justify-center font-bold shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-gray-900 leading-tight">
                  {editingBlog ? "Edit Blog Article" : "Create New Blog Article"}
                </h3>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                    formData.status === "published"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {formData.status}
                </span>
                {formData.isRobotsIndex ? (
                  <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md hidden sm:inline-block">
                    Indexed
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md hidden sm:inline-block">
                    Noindex
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Complete Content &amp; SEO Suite • Meta, Social, Schema, TOC, Links &amp; Sitemap
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Step Progress Bar */}
        <div className="w-full bg-gray-100 h-1 relative overflow-hidden shrink-0">
          <div
            className="bg-[#368b82] h-full transition-all duration-300 ease-out"
            style={{
              width: `${((currentStepIndex + 1) / MODAL_TABS.length) * 100}%`,
            }}
          />
        </div>

        {/* Tab Navigation Ribbon (Step Wizard Tabs) */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 px-4 sm:px-6 py-2.5 border-b border-gray-200 bg-gray-50/75 shrink-0">
          {MODAL_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isCompleted = tab.step < currentStepIndex + 1;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  if (tab.step > 1 && !formData.title.trim()) {
                    Swal.fire({
                      icon: "warning",
                      title: "Step 1 Incomplete",
                      text: "Please enter Blog Title / H1 on Step 1 first.",
                      confirmButtonColor: "#368b82",
                    });
                    return;
                  }
                  setActiveTab(tab.id);
                }}
                className={`flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer text-center truncate ${
                  isActive
                    ? "bg-[#368b82] text-white shadow-sm shadow-[#368b82]/30"
                    : isCompleted
                    ? "bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-50"
                    : "text-gray-500 hover:text-gray-900 hover:bg-white border border-transparent"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
                ) : (
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-black/10 text-gray-700"
                    }`}
                  >
                    {tab.step}
                  </span>
                )}
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-6 text-xs sm:text-sm text-gray-800"
        >
          {/* ========================================================
              TAB 1: CONTENT & H1 (ALL STATIC BLOG FIELDS)
             ======================================================== */}
          {activeTab === "content" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Template Quick Loader Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#edf7f6] via-white to-[#edf7f6] border border-[#368b82]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                <div>
                  <h4 className="font-extrabold text-gray-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#368b82]" />
                    <span>Static Blog Format Alignment</span>
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Includes Hero Subtitle, Author Bio, Publish Date, and Structured Blocks (Paragraphs, H2 Headings, Bullet Lists, and Quotes).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLoadStaticBlogTemplate}
                  className="px-3.5 py-1.5 rounded-xl bg-[#368b82] hover:bg-[#286b64] text-white font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Load Sample Static Blog</span>
                </button>
              </div>

              {/* 1. Blog Title / H1 */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-gray-700 uppercase tracking-wider text-xs flex items-center gap-1.5">
                    <span>Blog Title / H1</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] text-gray-400 font-medium">
                    Main headline rendered as the single page &lt;h1&gt;
                  </span>
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. What Is Financial Accounting? Meaning, Types, and Key Elements"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] focus:ring-2 focus:ring-[#368b82]/15 outline-none font-bold text-sm sm:text-base text-gray-900 transition-all placeholder:text-gray-400"
                />
              </div>

              {/* 2. Hero Banner Subtitle */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-gray-700 uppercase tracking-wider text-xs flex items-center gap-1.5">
                    <span>Hero Banner Subtitle</span>
                  </label>
                  <span className="text-[11px] text-gray-400 font-medium">
                    Rendered directly below the title in the top blue hero banner
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="e.g. A comprehensive guide breaking down accrual vs cash accounting, core balance sheet requirements, and statutory disclosures for growing companies."
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] focus:ring-2 focus:ring-[#368b82]/15 outline-none font-medium text-xs sm:text-sm text-gray-900 transition-all placeholder:text-gray-400"
                />
              </div>

              {/* 3. URL / SEO Slug */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-gray-700 uppercase tracking-wider text-xs flex items-center gap-1.5">
                    <span>URL / SEO Slug</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({
                        ...p,
                        slug: generateSlug(p.title),
                        canonicalUrl: `https://supporthelp.online/blog/${generateSlug(
                          p.title
                        )}`,
                      }))
                    }
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#368b82] hover:text-[#286b64] cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Re-sync from Title</span>
                  </button>
                </div>
                <div className="flex items-center rounded-xl border border-gray-300 focus-within:border-[#368b82] focus-within:ring-2 focus-within:ring-[#368b82]/15 overflow-hidden transition-all bg-white">
                  <span className="bg-gray-100 text-gray-500 px-3.5 py-2.5 text-xs font-mono border-r border-gray-200 select-none hidden sm:inline-block">
                    https://supporthelp.online/blog/
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="what-is-financial-accounting"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        slug: e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]/g, "-"),
                      })
                    }
                    className="flex-1 px-3.5 py-2.5 outline-none text-xs sm:text-sm font-mono text-gray-900"
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  SEO Canonical:{" "}
                  <span className="font-mono text-[#368b82]">
                    https://supporthelp.online/blog/{formData.slug || "slug-preview"}
                  </span>
                </p>
              </div>

              {/* 4. Category, Status, Publish Date & Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider text-xs mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none bg-white font-medium"
                  >
                    <option value="Accounting">Accounting</option>
                    <option value="Zoho Books">Zoho Books</option>
                    <option value="Cloud Accounting">Cloud Accounting</option>
                    <option value="Bookkeeping">Bookkeeping</option>
                    <option value="Tax & Audit">Tax & Audit</option>
                    <option value="Data Migration">Data Migration</option>
                    <option value="Cash Flow">Cash Flow</option>
                    <option value="Payroll">Payroll</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider text-xs mb-1.5">
                    Publish Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none bg-white font-medium"
                  >
                    <option value="published">Published (Live Online)</option>
                    <option value="draft">Draft (Admin Only)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider text-xs mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#368b82]" />
                    <span>Publish Date</span>
                  </label>
                  <input
                    type="date"
                    value={formData.publishedAt}
                    onChange={(e) =>
                      setFormData({ ...formData, publishedAt: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none font-medium bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider text-xs mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>Read Time</span>
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) =>
                      setFormData({ ...formData, readTime: e.target.value })
                    }
                    placeholder="e.g. 8 min read"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none font-medium"
                  />
                </div>
              </div>

              {/* 5. Author Information Box (Header meta & Bottom Author Card) */}
              <div className="p-4.5 rounded-2xl bg-gray-50/90 border border-gray-200/90 space-y-3.5">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <span className="font-bold text-gray-800 uppercase tracking-wider text-xs flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#368b82]" />
                    <span>Author Profile &amp; Bio</span>
                  </span>
                  <span className="text-[11px] text-gray-400">
                    Matches the Author Box at the bottom of the article
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 text-xs mb-1">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                      placeholder="Support Help"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none bg-white font-medium text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 text-xs mb-1">
                      Author Role / Designation
                    </label>
                    <input
                      type="text"
                      value={formData.authorRole}
                      onChange={(e) =>
                        setFormData({ ...formData, authorRole: e.target.value })
                      }
                      placeholder="Senior Financial Controller"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none bg-white font-medium text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 text-xs mb-1">
                    Author Bio Description (Rendered in the author card at bottom of article)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.authorBio}
                    onChange={(e) =>
                      setFormData({ ...formData, authorBio: e.target.value })
                    }
                    placeholder="Published by the certified bookkeeping and financial advisory team at Support Help. Empowering businesses globally with audit-ready financial statements and cloud accounting proficiency."
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none bg-white font-medium text-xs leading-relaxed resize-none"
                  />
                </div>
              </div>

              {/* 6. Excerpt / Short Description */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-gray-700 uppercase tracking-wider text-xs">
                    Excerpt / Short Description *
                  </label>
                  <span
                    className={`text-[11px] font-mono ${
                      formData.excerpt.length > 200
                        ? "text-amber-600 font-bold"
                        : "text-gray-400"
                    }`}
                  >
                    {formData.excerpt.length} characters (120–180 recommended)
                  </span>
                </div>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  placeholder="Clear, compelling 2-sentence summary for previews, cards, and Google SERPs..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none font-medium resize-none"
                />
              </div>

              {/* 7. Tags */}
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider text-xs mb-1.5">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="Accrual Basis, Financial Reporting, GAAP, Balance Sheet, Accruals"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none font-medium"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formData.tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                    .map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#edf7f6] text-[#368b82] border border-[#368b82]/20 text-[11px] font-semibold"
                      >
                        #{tag}
                      </span>
                    ))}
                </div>
              </div>

              {/* 8. Featured Checkbox */}
              <div className="p-3.5 rounded-2xl bg-[#edf7f6]/60 border border-[#368b82]/20 flex items-center justify-between">
                <div>
                  <span className="block font-bold text-gray-900 text-xs sm:text-sm">
                    Featured Hero Article
                  </span>
                  <span className="text-gray-500 text-[11px]">
                    Display prominently as the large Hero spotlight banner on the Blog Knowledge Hub
                  </span>
                </div>
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="w-5 h-5 rounded text-[#368b82] focus:ring-[#368b82] cursor-pointer"
                />
              </div>

              {/* 9. STRUCTURED ARTICLE BODY BUILDER */}
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-3">
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base text-gray-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#368b82]" />
                      <span>Article Body Content (Structured Blocks)</span>
                    </h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Add Paragraphs, Section Headings (H2), Bullet Checklists, and Quote Callouts
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((p) => ({
                          ...p,
                          contentEditorMode:
                            p.contentEditorMode === "blocks" ? "raw" : "blocks",
                        }))
                      }
                      className="px-3 py-1.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      {formData.contentEditorMode === "blocks"
                        ? "Switch to Raw Text"
                        : "Switch to Blocks View"}
                    </button>
                  </div>
                </div>

                {formData.contentEditorMode === "blocks" ? (
                  <div className="space-y-4">
                    {/* Block Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-200">
                      <span className="text-xs font-bold text-gray-600 mr-1">
                        + Add Block:
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAddBlock("paragraph")}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        <span>Paragraph</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAddBlock("heading")}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
                      >
                        <Heading className="w-3.5 h-3.5 text-[#368b82]" />
                        <span>Section Heading (H2)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAddBlock("list")}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
                      >
                        <List className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Bullet Checklist</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAddBlock("quote")}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
                      >
                        <Quote className="w-3.5 h-3.5 text-amber-600" />
                        <span>Quote Callout</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSyncHeadingsToToc}
                        className="ml-auto px-3.5 py-1.5 rounded-xl bg-[#edf7f6] hover:bg-[#368b82] text-[#368b82] hover:text-white border border-[#368b82]/30 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ListOrdered className="w-3.5 h-3.5" />
                        <span>Sync Headings to TOC</span>
                      </button>
                    </div>

                    {/* Content Blocks List */}
                    {formData.contentBlocks && formData.contentBlocks.length > 0 ? (
                      <div className="space-y-3.5">
                        {formData.contentBlocks.map((block, idx) => (
                          <div
                            key={idx}
                            className={`p-4 rounded-2xl border transition-all ${
                              block.type === "heading"
                                ? "bg-[#edf7f6]/40 border-[#368b82]/30"
                                : block.type === "quote"
                                ? "bg-amber-50/40 border-amber-200"
                                : block.type === "list"
                                ? "bg-emerald-50/30 border-emerald-200"
                                : "bg-white border-gray-200 shadow-2xs"
                            }`}
                          >
                            {/* Block Header */}
                            <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200/70">
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-lg bg-gray-100 text-gray-700 font-bold text-xs flex items-center justify-center">
                                  {idx + 1}
                                </span>
                                <span
                                  className={`text-xs font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                                    block.type === "heading"
                                      ? "bg-[#368b82] text-white"
                                      : block.type === "quote"
                                      ? "bg-amber-600 text-white"
                                      : block.type === "list"
                                      ? "bg-emerald-600 text-white"
                                      : "bg-blue-600 text-white"
                                  }`}
                                >
                                  {block.type === "heading"
                                    ? "Heading (H2)"
                                    : block.type === "quote"
                                    ? "Quote Callout"
                                    : block.type === "list"
                                    ? "Bullet Checklist"
                                    : "Paragraph"}
                                </span>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={idx === 0}
                                  onClick={() => handleMoveBlockUp(idx)}
                                  className="p-1 rounded text-gray-400 hover:text-gray-700 disabled:opacity-30 cursor-pointer"
                                  title="Move Up"
                                >
                                  <ChevronUp className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  disabled={idx === formData.contentBlocks.length - 1}
                                  onClick={() => handleMoveBlockDown(idx)}
                                  className="p-1 rounded text-gray-400 hover:text-gray-700 disabled:opacity-30 cursor-pointer"
                                  title="Move Down"
                                >
                                  <ChevronDown className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveBlock(idx)}
                                  className="p-1 rounded text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer ml-1"
                                  title="Delete Block"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Block Body Inputs */}
                            {block.type === "paragraph" && (
                              <div>
                                <textarea
                                  rows={3}
                                  value={block.text || ""}
                                  onChange={(e) =>
                                    handleUpdateBlockText(idx, e.target.value)
                                  }
                                  placeholder="Write paragraph explanation here..."
                                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs sm:text-sm leading-relaxed bg-white"
                                />
                              </div>
                            )}

                            {block.type === "heading" && (
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  value={block.text || ""}
                                  onChange={(e) =>
                                    handleUpdateBlockText(idx, e.target.value)
                                  }
                                  placeholder="e.g. Cash Basis vs. Accrual Basis: Choosing the Right Standard"
                                  className="w-full px-3.5 py-2 rounded-xl border border-[#368b82]/40 focus:border-[#368b82] outline-none font-bold text-sm text-gray-900 bg-white"
                                />
                                <div className="p-2.5 bg-white rounded-xl border border-gray-200">
                                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                                    Live Preview:
                                  </span>
                                  <h3 className="font-bold text-sm text-gray-900">
                                    {block.text || "Heading Title"}
                                  </h3>
                                  <div className="w-10 h-1 bg-[#368b82] rounded-full mt-1" />
                                </div>
                              </div>
                            )}

                            {block.type === "list" && (
                              <div className="space-y-2.5">
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-bold text-gray-500">
                                    Checklist Items (Tip: use &quot;Title: description&quot; to auto-bold the title):
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleAddListItem(idx)}
                                    className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                    <span>Add Bullet Item</span>
                                  </button>
                                </div>

                                <div className="space-y-2">
                                  {(block.items || []).map((item, itemIdx) => (
                                    <div
                                      key={itemIdx}
                                      className="flex items-center gap-2"
                                    >
                                      <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                                      </div>
                                      <input
                                        type="text"
                                        value={item}
                                        onChange={(e) =>
                                          handleUpdateListItem(
                                            idx,
                                            itemIdx,
                                            e.target.value
                                          )
                                        }
                                        placeholder="e.g. Cash Basis Accounting: Transactions are recognized only when cash changes hands."
                                        className="flex-1 px-3 py-1.5 rounded-xl border border-gray-300 focus:border-emerald-600 outline-none text-xs bg-white"
                                      />
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleRemoveListItem(idx, itemIdx)
                                        }
                                        className="text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                                        title="Delete Item"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {block.type === "quote" && (
                              <div className="space-y-2">
                                <textarea
                                  rows={2}
                                  value={block.text || ""}
                                  onChange={(e) =>
                                    handleUpdateBlockText(idx, e.target.value)
                                  }
                                  placeholder="e.g. Consistent financial reporting is not just an administrative requirement; it is the cornerstone of investor trust..."
                                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300 focus:border-amber-600 outline-none text-xs sm:text-sm italic text-gray-800 bg-white"
                                />
                                <div className="p-3 rounded-xl bg-white border-l-4 border-[#368b82] text-xs italic text-gray-700">
                                  &ldquo;{block.text || "Quote text preview"}&rdquo;
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center rounded-2xl border-2 border-dashed border-gray-200 space-y-3">
                        <FileText className="w-8 h-8 text-gray-300 mx-auto" />
                        <p className="font-bold text-gray-700 text-xs sm:text-sm">
                          No Content Blocks Added Yet
                        </p>
                        <p className="text-[11px] text-gray-400">
                          Click &quot;Load Sample Static Blog&quot; or use the buttons above to add Paragraphs, Headings, Bullet Lists, and Quotes.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-bold text-gray-700 uppercase tracking-wider text-xs">
                        Raw Text / Markdown Content
                      </label>
                      <span className="text-[11px] text-gray-400">
                        Multiline paragraphs and markdown formatting supported
                      </span>
                    </div>
                    <textarea
                      rows={10}
                      value={formData.contentParagraph}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contentParagraph: e.target.value,
                        })
                      }
                      placeholder="Write or paste your full article markdown content here..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none font-medium text-xs sm:text-sm leading-relaxed"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: MEDIA & ALT TEXT
             ======================================================== */}
          {activeTab === "media" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Featured Image Upload */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-gray-700 uppercase tracking-wider text-xs">
                    Featured Image / Cover Banner
                  </label>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    WebP Auto-Compression Enabled
                  </span>
                </div>

                {imagePreview ? (
                  <div className="relative rounded-2xl border border-gray-200 overflow-hidden bg-gray-50 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt={formData.imageAltText || "Blog cover preview"}
                      className="w-full h-56 object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 rounded-xl bg-white text-gray-800 font-bold text-xs shadow-md hover:bg-gray-100 cursor-pointer"
                      >
                        Replace Image
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs shadow-md hover:bg-red-700 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                    {imageFile && (
                      <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/75 backdrop-blur-xs text-white rounded-lg text-xs font-semibold flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>
                          {imageFile.name} ({(imageFile.size / 1024).toFixed(0)} KB)
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 hover:border-[#368b82] hover:bg-[#edf7f6]/40 rounded-2xl p-8 text-center cursor-pointer transition-all group"
                  >
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-gray-100 group-hover:bg-[#edf7f6] text-gray-400 group-hover:text-[#368b82] flex items-center justify-center transition-colors mb-2.5">
                      <Upload className="w-6 h-6 stroke-[2]" />
                    </div>
                    <p className="font-bold text-gray-800 text-sm">
                      Upload Featured Image file
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      PNG, JPG, WEBP. Converted to high-performance WebP automatically.
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

              {/* Direct Image URL input option */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-gray-700 uppercase tracking-wider text-xs">
                    Or Direct Image URL / Path (Optional)
                  </label>
                  <span className="text-[11px] text-gray-400">
                    Leave blank if uploading a photo above
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="e.g. /blog/zoho-books-used-for.png or https://images.unsplash.com/..."
                  value={formData.coverImageUrl}
                  onChange={(e) => {
                    setFormData({ ...formData, coverImageUrl: e.target.value });
                    if (!imageFile) setImagePreview(e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none font-mono text-xs text-gray-900"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  💡 Agar aapne upar se image file upload kar di hai, to isse <strong>khali chhod dein</strong>. Ye sirf tab use hota hai jab aap bina file upload kiye kisi online link ya public folder ki photo lagana chahein.
                </p>
              </div>

              {/* Image Alt Text */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-gray-800 uppercase tracking-wider text-xs flex items-center gap-1.5">
                    <span>Image Alt Text (SEO &amp; Accessibility)</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({
                        ...p,
                        imageAltText: `${p.title} - Support Help Accounting`,
                      }))
                    }
                    className="text-[11px] text-[#368b82] font-bold hover:underline cursor-pointer"
                  >
                    Auto-Fill from Title
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. Certified accountant explaining Zoho Books cloud workflow on tablet"
                  value={formData.imageAltText}
                  onChange={(e) =>
                    setFormData({ ...formData, imageAltText: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none bg-white font-medium text-xs sm:text-sm"
                />
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Alt text is indexed by Google Images and read by screen-readers. Always describe the image accurately with target keywords.
                </p>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 3: SEO & META TAGS
             ======================================================== */}
          {activeTab === "seo" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Google SERP Preview Card */}
              <div className="bg-[#f8fafc] rounded-2xl p-5 border border-gray-200/90 shadow-2xs space-y-2">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#368b82]" />
                    Google Search Result (SERP) Live Preview
                  </span>
                  <span className="text-[11px] text-gray-400">Desktop / Mobile Snippet</span>
                </div>
                <div className="pt-1 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-4 h-4 rounded-full bg-[#368b82] flex items-center justify-center text-[10px] text-white font-bold">
                      S
                    </div>
                    <span className="text-[12px] text-gray-700">supporthelp.online</span>
                    <span className="text-gray-400">&gt;</span>
                    <span className="text-[12px] text-gray-500 font-mono">
                      blog &gt; {formData.slug || "sample-slug"}
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-tight truncate">
                    {formData.metaTitle || formData.title || "Support Help Article Title"}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#4d5156] leading-relaxed line-clamp-2">
                    {formData.metaDescription ||
                      formData.excerpt ||
                      "Provide a concise meta description to preview how your article will look in Google search rankings..."}
                  </p>
                </div>
              </div>

              {/* Meta Title */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-gray-700 uppercase tracking-wider text-xs">
                    Meta Title (Page &lt;title&gt;)
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((p) => ({ ...p, metaTitle: p.title }))
                      }
                      className="text-[11px] font-bold text-[#368b82] hover:underline cursor-pointer"
                    >
                      Copy from H1
                    </button>
                    <span
                      className={`text-[11px] font-mono ${
                        formData.metaTitle.length >= 50 &&
                        formData.metaTitle.length <= 60
                          ? "text-emerald-600 font-bold"
                          : formData.metaTitle.length > 60
                          ? "text-red-500 font-bold"
                          : "text-gray-400"
                      }`}
                    >
                      {formData.metaTitle.length}/60 chars (50–60 optimal)
                    </span>
                  </div>
                </div>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, metaTitle: e.target.value })
                  }
                  placeholder="e.g. Zoho Books Guide 2026: Features & Migration | Support Help"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none font-medium"
                />
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-gray-700 uppercase tracking-wider text-xs">
                    Meta Description
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((p) => ({
                          ...p,
                          metaDescription: p.excerpt,
                        }))
                      }
                      className="text-[11px] font-bold text-[#368b82] hover:underline cursor-pointer"
                    >
                      Copy from Excerpt
                    </button>
                    <span
                      className={`text-[11px] font-mono ${
                        formData.metaDescription.length >= 140 &&
                        formData.metaDescription.length <= 160
                          ? "text-emerald-600 font-bold"
                          : formData.metaDescription.length > 160
                          ? "text-red-500 font-bold"
                          : "text-gray-400"
                      }`}
                    >
                      {formData.metaDescription.length}/160 chars (140–160 optimal)
                    </span>
                  </div>
                </div>
                <textarea
                  rows={3}
                  value={formData.metaDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, metaDescription: e.target.value })
                  }
                  placeholder="Informative and click-worthy summary designed to entice searchers on Google and Bing..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none font-medium resize-none"
                />
              </div>

              {/* Canonical URL */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-gray-700 uppercase tracking-wider text-xs">
                    Canonical URL (rel=&quot;canonical&quot;)
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({
                        ...p,
                        canonicalUrl: `https://supporthelp.online/blog/${
                          p.slug || generateSlug(p.title)
                        }`,
                      }))
                    }
                    className="text-[11px] font-bold text-[#368b82] hover:underline cursor-pointer"
                  >
                    Set Default Canonical
                  </button>
                </div>
                <input
                  type="text"
                  value={formData.canonicalUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, canonicalUrl: e.target.value })
                  }
                  placeholder="https://supporthelp.online/blog/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none font-mono text-xs"
                />
              </div>

              {/* Index / Noindex Control */}
              <div className="p-4.5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-gray-900 text-xs sm:text-sm">
                      Robots Indexing Directives
                    </h5>
                    <p className="text-[11px] text-gray-500">
                      Control crawler behavior via &lt;meta name=&quot;robots&quot;&gt;
                    </p>
                  </div>
                  <div className="font-mono text-xs font-bold text-[#368b82] bg-white px-2.5 py-1 rounded-lg border border-gray-200">
                    &lt;meta name=&quot;robots&quot; content=&quot;
                    {formData.isRobotsIndex ? "index" : "noindex"},{" "}
                    {formData.isRobotsFollow ? "follow" : "nofollow"}&quot; /&gt;
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 cursor-pointer hover:border-[#368b82] transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.isRobotsIndex}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isRobotsIndex: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-[#368b82] focus:ring-[#368b82]"
                    />
                    <div>
                      <span className="font-bold text-gray-800 text-xs block">
                        Allow Search Indexing (index)
                      </span>
                      <span className="text-[10px] text-gray-400 block">
                        Uncheck to apply &apos;noindex&apos;
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 cursor-pointer hover:border-[#368b82] transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.isRobotsFollow}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isRobotsFollow: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-[#368b82] focus:ring-[#368b82]"
                    />
                    <div>
                      <span className="font-bold text-gray-800 text-xs block">
                        Follow Inbound Links (follow)
                      </span>
                      <span className="text-[10px] text-gray-400 block">
                        Uncheck to apply &apos;nofollow&apos;
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 4: SOCIAL SHARE (OG & X)
             ======================================================== */}
          {activeTab === "social" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Social Card Preview */}
              <div className="bg-[#f8fafc] rounded-2xl p-5 border border-gray-200/90 shadow-2xs space-y-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block border-b border-gray-200 pb-2">
                  Social Sharing Preview (Facebook, LinkedIn, X / Twitter)
                </span>
                <div className="max-w-md mx-auto bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md">
                  <div className="relative h-44 bg-gray-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        formData.ogImage ||
                        imagePreview ||
                        formData.coverImageUrl ||
                        "/blog/zoho-books-used-for.png"
                      }
                      alt="OG Preview"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      supporthelp.online
                    </span>
                    <h5 className="font-bold text-sm text-gray-900 leading-snug truncate">
                      {formData.ogTitle ||
                        formData.metaTitle ||
                        formData.title ||
                        "Support Help Blog Post"}
                    </h5>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {formData.ogDescription ||
                        formData.metaDescription ||
                        formData.excerpt ||
                        "Explore authoritative cloud bookkeeping perspectives..."}
                    </p>
                  </div>
                </div>
              </div>

              {/* OG Title */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-gray-700 uppercase tracking-wider text-xs">
                    Open Graph Title (og:title)
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({
                        ...p,
                        ogTitle: p.metaTitle || p.title,
                      }))
                    }
                    className="text-[11px] font-bold text-[#368b82] hover:underline cursor-pointer"
                  >
                    Copy from Meta Title
                  </button>
                </div>
                <input
                  type="text"
                  value={formData.ogTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, ogTitle: e.target.value })
                  }
                  placeholder="Title for social media links..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none font-medium"
                />
              </div>

              {/* OG Description */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-gray-700 uppercase tracking-wider text-xs">
                    Open Graph Description (og:description)
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({
                        ...p,
                        ogDescription: p.metaDescription || p.excerpt,
                      }))
                    }
                    className="text-[11px] font-bold text-[#368b82] hover:underline cursor-pointer"
                  >
                    Copy from Meta Description
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={formData.ogDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, ogDescription: e.target.value })
                  }
                  placeholder="Summary displayed when shared on WhatsApp, LinkedIn, Facebook, Slack..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none font-medium resize-none"
                />
              </div>

              {/* OG Image & Twitter Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-bold text-gray-700 uppercase tracking-wider text-xs">
                      OG Image (og:image)
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((p) => ({
                          ...p,
                          ogImage: p.coverImageUrl || imagePreview || "",
                        }))
                      }
                      className="text-[11px] font-bold text-[#368b82] hover:underline cursor-pointer"
                    >
                      Use Featured Image
                    </button>
                  </div>
                  <input
                    type="text"
                    value={formData.ogImage}
                    onChange={(e) =>
                      setFormData({ ...formData, ogImage: e.target.value })
                    }
                    placeholder="/blog/zoho-books-used-for.png"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider text-xs mb-1.5">
                    Twitter / X Card Type
                  </label>
                  <select
                    value={formData.twitterCard}
                    onChange={(e) =>
                      setFormData({ ...formData, twitterCard: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none bg-white font-medium"
                  >
                    <option value="summary_large_image">
                      Large Image Banner (summary_large_image)
                    </option>
                    <option value="summary">Small Square Image (summary)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 5: TOC & LINKS
             ======================================================== */}
          {activeTab === "links" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* 1. Table of Contents */}
              <div className="p-4.5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ListOrdered className="w-5 h-5 text-[#368b82]" />
                    <div>
                      <h5 className="font-bold text-gray-900 text-xs sm:text-sm">
                        Table of Contents (TOC)
                      </h5>
                      <span className="text-[11px] text-gray-500">
                        Render interactive jumping table of contents on public article
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.tableOfContentsEnabled}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tableOfContentsEnabled: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded text-[#368b82] focus:ring-[#368b82] cursor-pointer"
                  />
                </div>

                {formData.tableOfContentsEnabled && (
                  <div className="space-y-3 pt-2 border-t border-gray-200">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
                      <span className="text-xs font-bold text-gray-700">
                        Add or Manage Anchor Links:
                      </span>
                      <button
                        type="button"
                        onClick={handleSyncHeadingsToToc}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#edf7f6] text-[#368b82] hover:bg-[#368b82] hover:text-white transition-colors text-xs font-bold cursor-pointer border border-[#368b82]/30 shadow-2xs"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Auto-Import from Article Headings</span>
                      </button>
                    </div>

                    {/* Add TOC item row */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                      <input
                        type="text"
                        placeholder="Section Heading Title (e.g. Core Features of Zoho Books)"
                        value={newTocItem.title}
                        onChange={(e) =>
                          setNewTocItem({ ...newTocItem, title: e.target.value })
                        }
                        className="flex-1 px-3 py-2 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Anchor ID (auto if blank)"
                        value={newTocItem.id}
                        onChange={(e) =>
                          setNewTocItem({ ...newTocItem, id: e.target.value })
                        }
                        className="w-36 px-3 py-2 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs font-mono bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddTocItem}
                        className="px-3.5 py-2 rounded-xl bg-[#368b82] hover:bg-[#286b64] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Section</span>
                      </button>
                    </div>

                    {/* Current TOC List */}
                    {formData.tableOfContentsItems.length > 0 ? (
                      <div className="space-y-1.5 pt-1">
                        {formData.tableOfContentsItems.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-gray-200 text-xs"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-md bg-[#edf7f6] text-[#368b82] font-bold flex items-center justify-center text-[10px]">
                                {idx + 1}
                              </span>
                              <span className="font-semibold text-gray-800">
                                {item.title}
                              </span>
                              <span className="font-mono text-[11px] text-gray-400">
                                #{item.id}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveTocItem(idx)}
                              className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-gray-400 italic">
                        No manual sections added yet. By default, major article headings are automatically detected.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* 2. Internal Links Manager */}
              <div className="p-4.5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3.5">
                <div className="flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-[#368b82]" />
                  <div>
                    <h5 className="font-bold text-gray-900 text-xs sm:text-sm">
                      Internal Links (SEO Cross-Linking)
                    </h5>
                    <span className="text-[11px] text-gray-500">
                      Link related service pages or migration guides to boost internal PageRank
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                  <input
                    type="text"
                    placeholder="Anchor Text (e.g. QuickBooks to Zoho Migration)"
                    value={newInternalLink.text}
                    onChange={(e) =>
                      setNewInternalLink({
                        ...newInternalLink,
                        text: e.target.value,
                      })
                    }
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Path (e.g. /services/bookkeeping)"
                    value={newInternalLink.url}
                    onChange={(e) =>
                      setNewInternalLink({
                        ...newInternalLink,
                        url: e.target.value,
                      })
                    }
                    className="w-56 px-3 py-2 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs font-mono bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddInternalLink}
                    className="px-3.5 py-2 rounded-xl bg-[#368b82] hover:bg-[#286b64] text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                {formData.internalLinks.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {formData.internalLinks.map((link, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-gray-200 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">
                            {link.text}
                          </span>
                          <span className="text-gray-400 font-mono text-[11px]">
                            → {link.url}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveInternalLink(idx)}
                          className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. External Links Manager */}
              <div className="p-4.5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3.5">
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-[#368b82]" />
                  <div>
                    <h5 className="font-bold text-gray-900 text-xs sm:text-sm">
                      External Citation Links
                    </h5>
                    <span className="text-[11px] text-gray-500">
                      Authoritative reference links with rel=&quot;nofollow&quot; option
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                  <input
                    type="text"
                    placeholder="Anchor Text (e.g. IRS Official Tax Guidelines)"
                    value={newExternalLink.text}
                    onChange={(e) =>
                      setNewExternalLink({
                        ...newExternalLink,
                        text: e.target.value,
                      })
                    }
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs bg-white"
                  />
                  <input
                    type="text"
                    placeholder="URL (https://...)"
                    value={newExternalLink.url}
                    onChange={(e) =>
                      setNewExternalLink({
                        ...newExternalLink,
                        url: e.target.value,
                      })
                    }
                    className="w-48 px-3 py-2 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs font-mono bg-white"
                  />
                  <select
                    value={newExternalLink.rel}
                    onChange={(e) =>
                      setNewExternalLink({
                        ...newExternalLink,
                        rel: e.target.value,
                      })
                    }
                    className="px-2.5 py-2 rounded-xl border border-gray-300 outline-none text-xs bg-white"
                  >
                    <option value="nofollow">nofollow</option>
                    <option value="dofollow">dofollow</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddExternalLink}
                    className="px-3.5 py-2 rounded-xl bg-[#368b82] hover:bg-[#286b64] text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                {formData.externalLinks.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {formData.externalLinks.map((link, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-gray-200 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">
                            {link.text}
                          </span>
                          <span className="text-gray-400 font-mono text-[11px] truncate max-w-xs">
                            → {link.url}
                          </span>
                          <span className="text-[10px] font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                            rel=&quot;{link.rel}&quot;
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveExternalLink(idx)}
                          className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 6: SCHEMA & ROBOTS / SITEMAP
             ======================================================== */}
          {activeTab === "schema" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* 1. Structured Data / Schema.org */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-bold text-gray-800 uppercase tracking-wider text-xs flex items-center gap-2">
                      <Code className="w-4 h-4 text-[#368b82]" />
                      <span>Schema.org (JSON-LD Structured Data)</span>
                    </label>
                    <span className="text-[11px] text-gray-500">
                      Injected as &lt;script type=&quot;application/ld+json&quot;&gt; for Google Rich Results
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAutoGenerateSchema}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#edf7f6] hover:bg-[#368b82] text-[#368b82] hover:text-white font-bold text-xs transition-colors cursor-pointer border border-[#368b82]/30"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Auto-Generate BlogPosting Schema</span>
                  </button>
                </div>
                <textarea
                  rows={8}
                  value={formData.schemaMarkup}
                  onChange={(e) =>
                    setFormData({ ...formData, schemaMarkup: e.target.value })
                  }
                  placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "BlogPosting",\n  "headline": "...",\n  "author": { "@type": "Person", "name": "Support Help" }\n}`}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none font-mono text-xs bg-gray-900 text-emerald-400 leading-relaxed"
                />
              </div>

              {/* 2. XML Sitemap Configuration */}
              <div className="p-4.5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-gray-900 text-xs sm:text-sm">
                      XML Sitemap Settings (/sitemap.xml)
                    </h5>
                    <p className="text-[11px] text-gray-500">
                      Direct the Next.js sitemap generator to index this article
                    </p>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.includeInSitemap}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          includeInSitemap: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded text-[#368b82] focus:ring-[#368b82]"
                    />
                    <span className="font-bold text-xs text-gray-800">
                      Include in Sitemap
                    </span>
                  </label>
                </div>

                {formData.includeInSitemap && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-200">
                    <div>
                      <label className="block font-bold text-gray-700 text-xs mb-1">
                        Sitemap Priority ({formData.sitemapPriority})
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max="1.0"
                        step="0.1"
                        value={formData.sitemapPriority}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            sitemapPriority: parseFloat(e.target.value),
                          })
                        }
                        className="w-full accent-[#368b82] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                        <span>0.1 (Low)</span>
                        <span>0.8 (Default)</span>
                        <span>1.0 (Critical)</span>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 text-xs mb-1">
                        Change Frequency
                      </label>
                      <select
                        value={formData.sitemapChangeFreq}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            sitemapChangeFreq: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none bg-white text-xs font-medium"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly (Standard)</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Robots.txt Live Status */}
              <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-2">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                  Robots.txt Directive Awareness
                </span>
                <div className="bg-gray-900 rounded-xl p-3 font-mono text-xs text-emerald-400 space-y-1">
                  <p className="text-gray-400"># Next.js /robots.txt configuration</p>
                  <p>User-agent: *</p>
                  <p>
                    {formData.isRobotsIndex
                      ? `Allow: /blog/${formData.slug || "[slug]"}`
                      : `Disallow: /blog/${formData.slug || "[slug]"}  # (noindex active)`}
                  </p>
                  <p>Disallow: /admin/</p>
                  <p className="text-gray-400">
                    Sitemap: https://supporthelp.online/sitemap.xml
                  </p>
                </div>
              </div>

              {/* 4. Pre-Publish Readiness Checklist (All 6 Steps) */}
              <div className="p-4.5 rounded-2xl bg-gradient-to-br from-[#edf7f6] to-white border border-[#368b82]/30 space-y-3">
                <div className="flex items-center justify-between border-b border-[#368b82]/20 pb-2">
                  <span className="font-extrabold text-xs uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#368b82]" />
                    <span>All 6 Steps Verified &amp; Ready for Submission</span>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Step 6 of 6 Complete
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
                    <span>Step 1: Title, Slug &amp; Excerpt ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
                    <span>Step 2: Featured Media &amp; Alt Text set</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
                    <span>Step 3: Meta Title, Description &amp; Robots ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
                    <span>Step 4: Social Share (OG &amp; X Cards) ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
                    <span>Step 5: Table of Contents &amp; Links verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
                    <span>Step 6: Schema.org JSON-LD &amp; XML Sitemap configured</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sticky Modal Action Footer (Step-by-Step Flow: Submit ONLY on Final Step) */}
          <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
            {/* Left: Previous Step or Cancel */}
            <div className="flex items-center gap-2">
              {currentStepIndex > 0 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous: {MODAL_TABS[currentStepIndex - 1].label}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 font-semibold text-xs sm:text-sm cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
              )}
              <span className="text-xs text-gray-400 font-medium hidden sm:inline-block ml-2">
                Step {currentStepIndex + 1} of {MODAL_TABS.length}
              </span>
            </div>

            {/* Right: Next Step OR Final Submit */}
            <div className="flex items-center gap-3">
              {currentStepIndex < MODAL_TABS.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl bg-[#368b82] hover:bg-[#286b64] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#368b82]/30 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Next Step: {MODAL_TABS[currentStepIndex + 1].label}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#368b82] to-[#20635c] hover:brightness-110 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-[#368b82]/40 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving &amp; Publishing...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>
                        {editingBlog ? "Save & Update Article" : "All Steps Done • Publish Article"}
                      </span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
