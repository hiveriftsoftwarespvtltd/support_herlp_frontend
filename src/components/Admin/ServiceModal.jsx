"use client";

import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import {
  X,
  Upload,
  Plus,
  Trash2,
  Briefcase,
  Image as ImageIcon,
  CheckCircle2,
  FileText,
  LayoutGrid,
  Check,
  ArrowRight,
  ArrowLeft,
  Search,
  Sparkles,
  HelpCircle,
  Globe,
} from "lucide-react";
import { getImageUrl } from "@/config";

const STEPS = [
  {
    stepNum: 1,
    title: "1. Basic & Hero",
    shortTitle: "Hero & Basic",
    desc: "Title, Slug & Header",
    icon: LayoutGrid,
  },
  {
    stepNum: 2,
    title: "2. Intro Overview",
    shortTitle: "Intro Card",
    desc: "Badge, Heading & Body",
    icon: FileText,
  },
  {
    stepNum: 3,
    title: "3. Deliverables Grid",
    shortTitle: "Solutions Grid",
    desc: "2-Column Value Cards",
    icon: CheckCircle2,
  },
  {
    stepNum: 4,
    title: "4. Showcases & Photos",
    shortTitle: "Showcases",
    desc: "Feature Photos & Text",
    icon: ImageIcon,
  },
  {
    stepNum: 5,
    title: "5. Why Choose & SEO",
    shortTitle: "Why & SEO",
    desc: "Reasons, Meta & Links",
    icon: Globe,
  },
];

export function ServiceModal({
  isOpen,
  onClose,
  editingService,
  onSaveService,
}) {
  // Step navigation (1 - 5)
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Basic & Hero Banner
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Core Services");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isPublished, setIsPublished] = useState(true);
  const [status, setStatus] = useState("published");

  // Step 2: Intro Overview Card
  const [introBadge, setIntroBadge] = useState("Specialized Practice");
  const [introHeading, setIntroHeading] = useState("");
  const [introParagraphs, setIntroParagraphs] = useState([""]);

  // Step 3: Deliverables Grid
  const [solutionsBadge, setSolutionsBadge] = useState("Comprehensive Deliverables");
  const [solutionsTitle, setSolutionsTitle] = useState("");
  const [leftCol, setLeftCol] = useState([
    { title: "24/7 Access", desc: "Real-time portal visibility into books and financial transactions." },
    { title: "Experienced CPAs", desc: "Dedicated senior accountants and tax advisors." },
    { title: "Forecast & Budgeting", desc: "Predictive cash flow modeling and project variance analysis." },
  ]);
  const [rightCol, setRightCol] = useState([
    { title: "Operational Solutions", desc: "Automate manual journal entries and eliminate ledger bottlenecks." },
    { title: "Consulting Services", desc: "Strategic advice on restructuring, cost-cutting, and tax compliance." },
    { title: "Basic Financial Reports", desc: "Monthly P&L, balance sheets, and cash flow statements delivered on time." },
  ]);

  // Step 4: Showcases
  const [showcase1Badge, setShowcase1Badge] = useState("Strategic Focus");
  const [showcase1Title, setShowcase1Title] = useState("");
  const [showcase1Description, setShowcase1Description] = useState("");
  const [showcase1Checklist, setShowcase1Checklist] = useState([]);
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [showcase1Image, setShowcase1Image] = useState(null);
  const [showcase1Preview, setShowcase1Preview] = useState("");
  const showcase1InputRef = useRef(null);

  const [showcase2Badge, setShowcase2Badge] = useState("Tailored Compliance");
  const [showcase2Title, setShowcase2Title] = useState("");
  const [showcase2Paragraphs, setShowcase2Paragraphs] = useState([""]);
  const [showcase2Image, setShowcase2Image] = useState(null);
  const [showcase2Preview, setShowcase2Preview] = useState("");
  const showcase2InputRef = useRef(null);

  // Step 5: Why & SEO
  const [whyBadge, setWhyBadge] = useState("Value Driven Assurance");
  const [whyTitle, setWhyTitle] = useState("Why Opt for Our Services?");
  const [whyReasons, setWhyReasons] = useState([
    "Dedicated team of certified CPAs & bookkeeping specialists",
    "Up to 50% cost savings compared to hiring full-time in-house staff",
    "Bank-grade 256-bit SSL encrypted financial data transfer",
  ]);
  const [whyClosingNote, setWhyClosingNote] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");

  // Sync state when editing or opening modal
  useEffect(() => {
    if (editingService) {
      setTitle(editingService.title || "");
      setSlug(editingService.slug || "");
      setCategory(editingService.category || "Core Services");
      setHeroTitle(editingService.heroTitle || editingService.title || "");
      setHeroSubtitle(editingService.heroSubtitle || "");
      setShortDescription(editingService.shortDescription || "");
      setDisplayOrder(editingService.displayOrder || 1);
      setIsPublished(editingService.isPublished !== false);
      setStatus(editingService.status || "published");

      setIntroBadge(editingService.introBadge || "Specialized Practice");
      setIntroHeading(editingService.introHeading || "");
      setIntroParagraphs(
        Array.isArray(editingService.introParagraphs) && editingService.introParagraphs.length > 0
          ? editingService.introParagraphs
          : [""]
      );

      setSolutionsBadge(editingService.solutionsBadge || "Comprehensive Deliverables");
      setSolutionsTitle(editingService.solutionsTitle || "");
      setLeftCol(Array.isArray(editingService.leftCol) ? editingService.leftCol : []);
      setRightCol(Array.isArray(editingService.rightCol) ? editingService.rightCol : []);

      setShowcase1Badge(editingService.showcase1Badge || "Strategic Focus");
      setShowcase1Title(editingService.showcase1Title || "");
      setShowcase1Description(editingService.showcase1Description || "");
      setShowcase1Checklist(Array.isArray(editingService.showcase1Checklist) ? editingService.showcase1Checklist : []);
      setShowcase1Preview(editingService.showcase1Image || "");
      setShowcase1Image(null);

      setShowcase2Badge(editingService.showcase2Badge || "Tailored Compliance");
      setShowcase2Title(editingService.showcase2Title || "");
      setShowcase2Paragraphs(
        Array.isArray(editingService.showcase2Paragraphs) && editingService.showcase2Paragraphs.length > 0
          ? editingService.showcase2Paragraphs
          : [""]
      );
      setShowcase2Preview(editingService.showcase2Image || "");
      setShowcase2Image(null);

      setWhyBadge(editingService.whyBadge || "Value Driven Assurance");
      setWhyTitle(editingService.whyTitle || "Why Opt for Our Services?");
      setWhyReasons(Array.isArray(editingService.whyReasons) ? editingService.whyReasons : []);
      setWhyClosingNote(editingService.whyClosingNote || "");
      setMetaTitle(editingService.metaTitle || "");
      setMetaDescription(editingService.metaDescription || "");
      setCanonicalUrl(editingService.canonicalUrl || "");
    } else {
      // Reset for clean Add form
      setTitle("");
      setSlug("");
      setCategory("Core Services");
      setHeroTitle("");
      setHeroSubtitle("");
      setShortDescription("");
      setDisplayOrder(1);
      setIsPublished(true);
      setStatus("published");

      setIntroBadge("Specialized Practice");
      setIntroHeading("");
      setIntroParagraphs([""]);

      setSolutionsBadge("Comprehensive Deliverables");
      setSolutionsTitle("");
      setLeftCol([
        { title: "24/7 Access", desc: "Real-time portal visibility into books and financial transactions." },
        { title: "Experienced CPAs", desc: "Dedicated senior accountants and tax advisors." },
        { title: "Forecast & Budgeting", desc: "Predictive cash flow modeling and project variance analysis." },
      ]);
      setRightCol([
        { title: "Operational Solutions", desc: "Automate manual journal entries and eliminate ledger bottlenecks." },
        { title: "Consulting Services", desc: "Strategic advice on restructuring, cost-cutting, and tax compliance." },
        { title: "Basic Financial Reports", desc: "Monthly P&L, balance sheets, and cash flow statements delivered on time." },
      ]);

      setShowcase1Badge("Strategic Focus");
      setShowcase1Title("Strategic Focus & Modern Accounting Infrastructure");
      setShowcase1Description("We provide specialized financial oversight, robust process governance, and tailored industry strategies to empower your business operations.");
      setShowcase1Checklist(["QuickBooks Online", "Zoho Books", "Xero", "Sage Intacct", "NetSuite", "MYOB"]);
      setShowcase1Preview("");
      setShowcase1Image(null);

      setShowcase2Badge("Tailored Compliance");
      setShowcase2Title("Operational Advantages & Tailored Compliance");
      setShowcase2Paragraphs([
        "Our specialized approach ensures rigorous compliance with regional tax and reporting frameworks while streamlining day-to-day transaction records.",
        "By deploying industry-leading workflows and continuous validation, we eliminate discrepancies and provide actionable financial intelligence.",
      ]);
      setShowcase2Preview("");
      setShowcase2Image(null);

      setWhyBadge("Value Driven Assurance");
      setWhyTitle("Why Opt for Our Services?");
      setWhyReasons([
        "Dedicated team of certified CPAs & bookkeeping specialists",
        "Up to 50% cost savings compared to hiring full-time in-house staff",
        "Bank-grade 256-bit SSL encrypted financial data transfer",
      ]);
      setWhyClosingNote("");
      setMetaTitle("");
      setMetaDescription("");
      setCanonicalUrl("");
    }
    setCurrentStep(1);
  }, [editingService, isOpen]);

  // Auto slug generator from title
  const handleTitleChange = (val) => {
    setTitle(val);
    if (!editingService) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      setSlug(generatedSlug);
      if (!heroTitle) {
        setHeroTitle(val.toUpperCase());
      }
    }
  };

  // Image Upload Handlers
  const handleShowcase1File = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        Swal.fire({
          icon: "warning",
          title: "File Too Large",
          text: "Please select an image smaller than 10MB.",
        });
        return;
      }
      setShowcase1Image(file);
      setShowcase1Preview(URL.createObjectURL(file));
    }
  };

  const handleShowcase2File = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        Swal.fire({
          icon: "warning",
          title: "File Too Large",
          text: "Please select an image smaller than 10MB.",
        });
        return;
      }
      setShowcase2Image(file);
      setShowcase2Preview(URL.createObjectURL(file));
    }
  };

  // Helper for Intro Paragraphs
  const addIntroParagraph = () => {
    setIntroParagraphs([...introParagraphs, ""]);
  };
  const updateIntroParagraph = (idx, text) => {
    const updated = [...introParagraphs];
    updated[idx] = text;
    setIntroParagraphs(updated);
  };
  const removeIntroParagraph = (idx) => {
    if (introParagraphs.length === 1) return;
    setIntroParagraphs(introParagraphs.filter((_, i) => i !== idx));
  };

  // Helper for Showcase 2 Paragraphs
  const addShowcase2Paragraph = () => {
    setShowcase2Paragraphs([...showcase2Paragraphs, ""]);
  };
  const updateShowcase2Paragraph = (idx, text) => {
    const updated = [...showcase2Paragraphs];
    updated[idx] = text;
    setShowcase2Paragraphs(updated);
  };
  const removeShowcase2Paragraph = (idx) => {
    if (showcase2Paragraphs.length === 1) return;
    setShowcase2Paragraphs(showcase2Paragraphs.filter((_, i) => i !== idx));
  };

  // Helper for Deliverables Cards
  const addDeliverableCard = (col) => {
    if (col === "left") {
      setLeftCol([...leftCol, { title: "", desc: "" }]);
    } else {
      setRightCol([...rightCol, { title: "", desc: "" }]);
    }
  };
  const updateDeliverableCard = (col, idx, field, val) => {
    if (col === "left") {
      const updated = [...leftCol];
      updated[idx] = { ...updated[idx], [field]: val };
      setLeftCol(updated);
    } else {
      const updated = [...rightCol];
      updated[idx] = { ...updated[idx], [field]: val };
      setRightCol(updated);
    }
  };
  const removeDeliverableCard = (col, idx) => {
    if (col === "left") {
      setLeftCol(leftCol.filter((_, i) => i !== idx));
    } else {
      setRightCol(rightCol.filter((_, i) => i !== idx));
    }
  };

  // Helper for Why Reasons
  const addWhyReason = () => {
    setWhyReasons([...whyReasons, ""]);
  };
  const updateWhyReason = (idx, val) => {
    const updated = [...whyReasons];
    updated[idx] = val;
    setWhyReasons(updated);
  };
  const removeWhyReason = (idx) => {
    setWhyReasons(whyReasons.filter((_, i) => i !== idx));
  };

  // Final Submit
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!title.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Title Required",
        text: "Please provide a title for this service in Step 1.",
      });
      setCurrentStep(1);
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        title: title.trim(),
        slug: (slug || title.toLowerCase().replace(/[^a-z0-9]/g, "-")).trim(),
        heroTitle: (heroTitle || title).trim(),
        heroSubtitle: heroSubtitle.trim(),
        category,
        shortDescription: shortDescription.trim(),
        displayOrder: Number(displayOrder) || 1,
        isPublished,
        status,

        introBadge: introBadge.trim(),
        introHeading: (introHeading || `${title} Experts`).trim(),
        introParagraphs: introParagraphs.filter((p) => p.trim().length > 0),

        solutionsBadge: solutionsBadge.trim(),
        solutionsTitle: (solutionsTitle || `Accounting & Bookkeeping Services for ${title}`).trim(),
        leftCol: leftCol.filter((c) => c.title.trim().length > 0),
        rightCol: rightCol.filter((c) => c.title.trim().length > 0),

        showcase1Badge: showcase1Badge.trim(),
        showcase1Title: showcase1Title.trim(),
        showcase1Description: showcase1Description.trim(),
        showcase1Checklist: showcase1Checklist.filter(Boolean),
        showcase1ImageUrl: typeof showcase1Preview === "string" && !showcase1Image ? showcase1Preview : undefined,

        showcase2Badge: showcase2Badge.trim(),
        showcase2Title: showcase2Title.trim(),
        showcase2Paragraphs: showcase2Paragraphs.filter((p) => p.trim().length > 0),
        showcase2ImageUrl: typeof showcase2Preview === "string" && !showcase2Image ? showcase2Preview : undefined,

        whyBadge: whyBadge.trim() || "Value Driven Assurance",
        whyTitle: whyTitle.trim(),
        whyReasons: whyReasons.filter((r) => r.trim().length > 0),
        whyClosingNote: whyClosingNote.trim(),

        metaTitle: metaTitle.trim() || `${title} – Support Help`,
        metaDescription: metaDescription.trim() || heroSubtitle || `Professional ${title} services.`,
        canonicalUrl: canonicalUrl.trim(),
      };

      await onSaveService(payload, editingService, showcase1Image, showcase2Image);
    } catch (err) {
      console.error("Save service error in modal:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs animate-fadeIn font-poppins">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-200/90 flex flex-col max-h-[92vh] overflow-hidden">
        {/* 1. Modal Top Bar */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#368b82] text-white flex items-center justify-center shadow-md">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
                {editingService ? "Edit Service" : "Add New Service"}
              </h2>
              <p className="text-xs text-slate-300">
                Data saves to MongoDB database and reflects live in Header Menu & Dedicated Page
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Step Progress Indicator */}
        <div className="bg-slate-50 border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between overflow-x-auto gap-2 scrollbar-none shrink-0">
          {STEPS.map((s) => {
            const Icon = s.icon;
            const isActive = currentStep === s.stepNum;
            const isCompleted = currentStep > s.stepNum;
            return (
              <button
                key={s.stepNum}
                onClick={() => setCurrentStep(s.stepNum)}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#368b82] text-white shadow-xs font-bold"
                    : isCompleted
                    ? "bg-[#edf7f6] text-[#368b82] hover:bg-[#dbefe9]"
                    : "text-gray-500 hover:bg-gray-200/60"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                    isActive
                      ? "bg-white text-[#368b82] font-black"
                      : isCompleted
                      ? "bg-[#368b82] text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : s.stepNum}
                </div>
                <span>{s.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* 3. Step Body Contents (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-gray-800">
          {/* STEP 1: Basic & Hero Banner */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-gray-900">Step 1: Service Identity & Hero Banner</h3>
                <p className="text-xs text-gray-500">Configure public title, header navigation link, and top banner.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Service Name / Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Real Estate (Construction) Accounting"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#368b82] focus:bg-white rounded-xl text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center bg-gray-50 border border-gray-200 focus-within:border-[#368b82] rounded-xl px-3 py-2 text-sm text-gray-500">
                    <span className="text-xs text-gray-400 select-none">/services/</span>
                    <input
                      type="text"
                      required
                      placeholder="construction-real-estate-accounting"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                      className="w-full bg-transparent outline-none text-gray-800 font-medium pl-1 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Header Menu Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#368b82] focus:bg-white rounded-xl text-sm outline-none transition-all font-medium"
                  >
                    <option value="Core Services">Core Services</option>
                    <option value="Specialized Services">Specialized Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Publish Status & Visibility
                  </label>
                  <div className="flex items-center gap-4 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                      <input
                        type="checkbox"
                        checked={isPublished}
                        onChange={(e) => setIsPublished(e.target.checked)}
                        className="w-4 h-4 text-[#368b82] rounded accent-[#368b82]"
                      />
                      <span>Active in Header & Live Website</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Hero H1 Banner Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. REAL ESTATE (CONSTRUCTION) ACCOUNTING"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#368b82] focus:bg-white rounded-xl text-sm outline-none transition-all font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Hero Subtitle / Description
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. If you are into construction work and tired of monotone and comprehensive accounting and bookkeeping, here get comprehensive accounting and bookkeeping..."
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#368b82] focus:bg-white rounded-xl text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Short Description (For listings & meta tags)
                </label>
                <input
                  type="text"
                  placeholder="Brief 1-line summary of this service..."
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#368b82] focus:bg-white rounded-xl text-sm outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Intro Overview Card */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-gray-900">Step 2: Service Overview Card</h3>
                <p className="text-xs text-gray-500">
                  Renders the highlighted white card at the top with brand gradient accent.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Overview Badge Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. WHO WE ARE / WHAT WE DO or Specialized Practice"
                    value={introBadge}
                    onChange={(e) => setIntroBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#368b82] focus:bg-white rounded-xl text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Construction / Real Estate Accounting & Bookkeeping Experts"
                    value={introHeading}
                    onChange={(e) => setIntroHeading(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#368b82] focus:bg-white rounded-xl text-sm outline-none font-semibold"
                  />
                </div>
              </div>

              {/* Dynamic Paragraphs */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Overview Paragraphs
                  </label>
                  <button
                    type="button"
                    onClick={addIntroParagraph}
                    className="text-xs font-bold text-[#368b82] hover:text-[#286b64] flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Paragraph</span>
                  </button>
                </div>

                {introParagraphs.map((para, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2">
                    <span className="text-xs font-bold text-gray-400 mt-2 shrink-0 w-6">
                      P{pIdx + 1}:
                    </span>
                    <textarea
                      rows={3}
                      placeholder={`Enter overview paragraph ${pIdx + 1}...`}
                      value={para}
                      onChange={(e) => updateIntroParagraph(pIdx, e.target.value)}
                      className="flex-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#368b82] focus:bg-white rounded-xl text-sm outline-none transition-all leading-relaxed"
                    />
                    {introParagraphs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIntroParagraph(pIdx)}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors mt-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Deliverables Grid */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-gray-900">Step 3: Deliverables & Solutions Grid</h3>
                <p className="text-xs text-gray-500">
                  Renders the 2-column feature cards with teal icons shown in the screenshot.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Grid Badge Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tailored Deliverables or Comprehensive Services"
                    value={solutionsBadge}
                    onChange={(e) => setSolutionsBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#368b82] focus:bg-white rounded-xl text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Grid Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Accounting and Bookkeeping Services for Real Estate Industry"
                    value={solutionsTitle}
                    onChange={(e) => setSolutionsTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#368b82] focus:bg-white rounded-xl text-sm outline-none font-semibold"
                  />
                </div>
              </div>

              {/* 2 Columns: Left Column & Right Column */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                {/* Left Column Cards */}
                <div className="p-4 bg-gray-50/70 border border-gray-200 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
                    <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                      Left Column Cards ({leftCol.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => addDeliverableCard("left")}
                      className="text-xs font-bold text-[#368b82] hover:text-[#286b64] flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Card</span>
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                    {leftCol.map((card, cIdx) => (
                      <div key={cIdx} className="p-3 bg-white border border-gray-200 rounded-xl space-y-2 relative group shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#368b82] bg-[#edf7f6] px-2 py-0.5 rounded-md">
                            Card #{cIdx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeDeliverableCard("left", cIdx)}
                            className="text-gray-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Card Title (e.g. 24/7 Access)"
                          value={card.title}
                          onChange={(e) => updateDeliverableCard("left", cIdx, "title", e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold outline-none"
                        />
                        <textarea
                          rows={2}
                          placeholder="Card Description / Value summary..."
                          value={card.desc}
                          onChange={(e) => updateDeliverableCard("left", cIdx, "desc", e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none leading-relaxed"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column Cards */}
                <div className="p-4 bg-gray-50/70 border border-gray-200 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
                    <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                      Right Column Cards ({rightCol.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => addDeliverableCard("right")}
                      className="text-xs font-bold text-[#368b82] hover:text-[#286b64] flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Card</span>
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                    {rightCol.map((card, cIdx) => (
                      <div key={cIdx} className="p-3 bg-white border border-gray-200 rounded-xl space-y-2 relative group shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#368b82] bg-[#edf7f6] px-2 py-0.5 rounded-md">
                            Card #{cIdx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeDeliverableCard("right", cIdx)}
                            className="text-gray-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Card Title (e.g. Basic Financial Reports)"
                          value={card.title}
                          onChange={(e) => updateDeliverableCard("right", cIdx, "title", e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold outline-none"
                        />
                        <textarea
                          rows={2}
                          placeholder="Card Description / Value summary..."
                          value={card.desc}
                          onChange={(e) => updateDeliverableCard("right", cIdx, "desc", e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none leading-relaxed"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Showcases & Photos */}
          {currentStep === 4 && (
            <div className="space-y-7 animate-fadeIn">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-gray-900">Step 4: Visual Showcases</h3>
                <p className="text-xs text-gray-500">
                  Renders Showcase 1 (Strategic Focus) and Showcase 2 (Operational Advantages) with photo cards.
                </p>
              </div>

              {/* Showcase 1 Box */}
              <div className="p-5 border border-gray-200 rounded-2xl bg-gray-50/50 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <span className="text-xs font-extrabold text-[#368b82] uppercase tracking-wider">
                    Showcase 1 (Image on Left / Text on Right)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Showcase 1 Badge
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CONSTRUCTION FOCUS or Strategic Focus"
                      value={showcase1Badge}
                      onChange={(e) => setShowcase1Badge(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Showcase 1 Heading
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Why Do You Need an Experienced Construction Bookkeeper?"
                      value={showcase1Title}
                      onChange={(e) => setShowcase1Title(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Showcase 1 Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Detailed explanation paragraphs for showcase 1..."
                    value={showcase1Description}
                    onChange={(e) => setShowcase1Description(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs outline-none leading-relaxed"
                  />
                </div>

                {/* Showcase 1 Photo Upload */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Showcase 1 Image
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      ref={showcase1InputRef}
                      accept="image/*"
                      onChange={handleShowcase1File}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => showcase1InputRef.current?.click()}
                      className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#368b82]" />
                      <span>{showcase1Preview ? "Change Image" : "Upload Image"}</span>
                    </button>
                    {showcase1Preview && (
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-gray-300">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={getImageUrl(showcase1Preview)} alt="Showcase 1" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Showcase 2 Box */}
              <div className="p-5 border border-gray-200 rounded-2xl bg-gray-50/50 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <span className="text-xs font-extrabold text-[#368b82] uppercase tracking-wider">
                    Showcase 2 (Text on Left / Image on Right)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Showcase 2 Badge
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. WHAT WE CAN DO FOR YOU"
                      value={showcase2Badge}
                      onChange={(e) => setShowcase2Badge(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Showcase 2 Heading
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. How Your Business Will Be Benefitted from Our Unique Approach?"
                      value={showcase2Title}
                      onChange={(e) => setShowcase2Title(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold outline-none"
                    />
                  </div>
                </div>

                {/* Showcase 2 Paragraphs */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Showcase 2 Paragraphs
                    </label>
                    <button
                      type="button"
                      onClick={addShowcase2Paragraph}
                      className="text-xs font-bold text-[#368b82] hover:text-[#286b64] flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Paragraph</span>
                    </button>
                  </div>
                  {showcase2Paragraphs.map((para, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <textarea
                        rows={2}
                        placeholder={`Showcase paragraph ${idx + 1}...`}
                        value={para}
                        onChange={(e) => updateShowcase2Paragraph(idx, e.target.value)}
                        className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs outline-none leading-relaxed"
                      />
                      {showcase2Paragraphs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeShowcase2Paragraph(idx)}
                          className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 mt-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Showcase 2 Photo Upload */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Showcase 2 Image
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      ref={showcase2InputRef}
                      accept="image/*"
                      onChange={handleShowcase2File}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => showcase2InputRef.current?.click()}
                      className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#368b82]" />
                      <span>{showcase2Preview ? "Change Image" : "Upload Image"}</span>
                    </button>
                    {showcase2Preview && (
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-gray-300">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={getImageUrl(showcase2Preview)} alt="Showcase 2" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Why & SEO */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-gray-900">Step 5: Why Partner With Us & SEO</h3>
                <p className="text-xs text-gray-500">
                  Value proposition checklist and Google search engine optimization meta tags.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Why Section Badge
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Value Driven Assurance"
                    value={whyBadge}
                    onChange={(e) => setWhyBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Why Section Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Why Opt for Our Bookkeeping Assistant?"
                    value={whyTitle}
                    onChange={(e) => setWhyTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold outline-none"
                  />
                </div>
              </div>

              {/* Reasons list */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Checklist Reasons ({whyReasons.length})
                  </label>
                  <button
                    type="button"
                    onClick={addWhyReason}
                    className="text-xs font-bold text-[#368b82] hover:text-[#286b64] flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Reason</span>
                  </button>
                </div>
                {whyReasons.map((reason, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-[#368b82] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <input
                      type="text"
                      placeholder={`Key reason / differentiator #${rIdx + 1}`}
                      value={reason}
                      onChange={(e) => updateWhyReason(rIdx, e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeWhyReason(rIdx)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* SEO Tags */}
              <div className="pt-4 border-t border-gray-100 space-y-4">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                  Search Engine Optimization (SEO)
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Meta Title (Title Tag)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Real Estate Accounting Services – Support Help"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Canonical URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://supporthelp.online/services/..."
                      value={canonicalUrl}
                      onChange={(e) => setCanonicalUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Short 150-160 character description for Google search results..."
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. Modal Bottom Action Bar */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200/90 flex items-center justify-between gap-4 shrink-0">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-white flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Step</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-200/60 rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="px-5 py-2.5 bg-[#368b82] hover:bg-[#286b64] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-gradient-to-r from-[#368b82] to-[#203f99] hover:opacity-95 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving Service...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>{editingService ? "Update Service" : "Save & Publish Service"}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceModal;
