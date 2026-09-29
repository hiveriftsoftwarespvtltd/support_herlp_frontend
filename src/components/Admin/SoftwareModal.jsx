"use client";

import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import {
  X,
  Upload,
  Sparkles,
  Plus,
  Trash2,
  Cpu,
  Image as ImageIcon,
  CheckCircle2,
  ListChecks,
  FileText,
  LayoutGrid,
  Check,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const STEPS = [
  {
    stepNum: 1,
    title: "1. Basic & Header",
    shortTitle: "Basic Info",
    desc: "Platform & Header Menu",
    icon: LayoutGrid,
  },
  {
    stepNum: 2,
    title: "2. Hero & Intro Card",
    shortTitle: "Hero & Badge",
    desc: "Banner, Badge & Highlights",
    icon: FileText,
  },
  {
    stepNum: 3,
    title: "3. Features Grid",
    shortTitle: "Features Grid",
    desc: "Capabilities & Modules",
    icon: ListChecks,
  },
  {
    stepNum: 4,
    title: "4. Showcase & Photo",
    shortTitle: "Showcase & Photo",
    desc: "Value Bullets & Photo",
    icon: ImageIcon,
  },
];

export function SoftwareModal({
  isOpen,
  onClose,
  editingSoftware,
  onSaveSoftware,
}) {
  // Current Active Step (1, 2, 3, or 4)
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [desc, setDesc] = useState("");
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isPublished, setIsPublished] = useState(true);

  // Step 2: Hero & Intro Card State
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [badgeTag, setBadgeTag] = useState("Platform Proficiency & Advisory");
  const [introHeading, setIntroHeading] = useState("");
  const [introParagraphs, setIntroParagraphs] = useState([""]);
  const [highlights, setHighlights] = useState([
    "Automated Daily Feeds",
    "Multi-Currency Ledgers",
    "Real-Time MIS Reports",
  ]);

  // Step 3: Features Section State
  const [featuresTitle, setFeaturesTitle] = useState("");
  const [featuresTag, setFeaturesTag] = useState("Comprehensive Modules");
  const [featuresList, setFeaturesList] = useState([]);

  // Step 4: Showcase Section State
  const [showcaseTitle, setShowcaseTitle] = useState("");
  const [showcaseTag, setShowcaseTag] = useState("Strategic Capability");
  const [showcaseBullets, setShowcaseBullets] = useState([]);
  const [showcasePosition, setShowcasePosition] = useState("right");

  // File Upload States
  const [badgeFile, setBadgeFile] = useState(null);
  const [badgePreview, setBadgePreview] = useState("");
  const badgeInputRef = useRef(null);

  const [showcaseFile, setShowcaseFile] = useState(null);
  const [showcasePreview, setShowcasePreview] = useState("");
  const showcaseInputRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize data when modal opens or editing changes
  useEffect(() => {
    if (editingSoftware) {
      setName(editingSoftware.name || "");
      setSlug(editingSoftware.slug || "");
      setDesc(editingSoftware.desc || "");
      setDisplayOrder(editingSoftware.displayOrder || 1);
      setIsPublished(
        editingSoftware.isPublished !== undefined
          ? editingSoftware.isPublished
          : true
      );

      // Hero & Intro
      setHeroTitle(editingSoftware.heroTitle || editingSoftware.name || "");
      setHeroSubtitle(editingSoftware.heroSubtitle || "");
      setBadgeTag(
        editingSoftware.badgeTag || "Platform Proficiency & Advisory"
      );
      setIntroHeading(
        editingSoftware.introHeading ||
          `Tailored ${(editingSoftware.heroTitle || editingSoftware.name || "").toUpperCase()} Accounting & Advisory`
      );
      setIntroParagraphs(
        editingSoftware.introParagraphs &&
          editingSoftware.introParagraphs.length > 0
          ? editingSoftware.introParagraphs
          : [editingSoftware.desc || ""]
      );
      setHighlights(
        editingSoftware.highlights && editingSoftware.highlights.length > 0
          ? editingSoftware.highlights
          : [
              "Automated Daily Feeds",
              "Multi-Currency Ledgers",
              "Real-Time MIS Reports",
            ]
      );

      // Features
      const featSection = editingSoftware.featuresSection || {};
      setFeaturesTitle(
        featSection.title || `Important Features Offered by ${editingSoftware.name}`
      );
      setFeaturesTag(featSection.tag || "Comprehensive Modules");

      let existingItems = [];
      if (Array.isArray(featSection.items) && featSection.items.length > 0) {
        existingItems = featSection.items;
      } else {
        const left = featSection.leftCol || [];
        const right = featSection.rightCol || [];
        existingItems = [...left, ...right];
      }
      setFeaturesList(
        existingItems.length > 0
          ? existingItems
          : [
              {
                title: "Receivables",
                desc: "Send estimates, convert to invoices, and collect payments online effortlessly.",
              },
              {
                title: "Payables",
                desc: "Manage vendor bills, expenses, and automated purchase approval workflows.",
              },
            ]
      );

      // Showcase
      const firstShowcase = editingSoftware.showcases?.[0] || {};
      setShowcaseTitle(
        firstShowcase.title ||
          `Benefits of Outsourcing ${editingSoftware.name} Bookkeeping to Us`
      );
      setShowcaseTag(firstShowcase.tag || "Strategic Capability");
      setShowcaseBullets(
        firstShowcase.bullets && firstShowcase.bullets.length > 0
          ? firstShowcase.bullets
          : [
              "We share MIS reports for time management with the help of indicators and financial statements.",
              "We provide you with a strategic growth plan in terms of sales, cash flow, and improved financials.",
              "Choosing us eliminates mundane accounting tasks so you can focus on core business operations.",
            ]
      );
      setShowcasePosition(firstShowcase.imagePosition || "right");
      setShowcasePreview(firstShowcase.image || "");
      setShowcaseFile(null);

      // Badge preview
      setBadgePreview(editingSoftware.badge || "");
      setBadgeFile(null);
    } else {
      // New Software Defaults
      setName("");
      setSlug("");
      setDesc("");
      setDisplayOrder(1);
      setIsPublished(true);

      setHeroTitle("");
      setHeroSubtitle("");
      setBadgeTag("Platform Proficiency & Advisory");
      setIntroHeading("");
      setIntroParagraphs([
        "Zoho Books is considered to be an online cloud accounting software. Due to its reasonable pricing positioning, this particular software meets resources, payroll, and bookkeeping demands.",
      ]);
      setHighlights([
        "100% Audit-Ready Books",
        "Multi-Currency Ledgers",
        "Real-Time MIS Reports",
      ]);

      setFeaturesTitle("Important Features Offered by Platform");
      setFeaturesTag("Comprehensive Modules");
      setFeaturesList([
        {
          title: "Bank Feeds",
          desc: "Effortless transaction imports with smart auto-categorization and live reconciliations.",
        },
        {
          title: "Invoicing & Billing",
          desc: "Create professional recurring invoices, accept cards/ACH, and automate payment reminders.",
        },
        {
          title: "Expense Management",
          desc: "Capture receipts and track landed costs with multi-currency ledgers.",
        },
        {
          title: "Financial Reporting",
          desc: "Executive P&L statements, Balance Sheets, and Cash Flow analytics on demand.",
        },
      ]);

      setShowcaseTitle("Benefits of Outsourcing Bookkeeping to Us");
      setShowcaseTag("Strategic Capability");
      setShowcaseBullets([
        "We share MIS reports for time management with the help of indicators and financial statements.",
        "We provide you with a growth plan in terms of sales, cash flow, and improved financials.",
        "Eliminate any need for you to look after mundane accounting tasks.",
      ]);
      setShowcasePosition("right");
      setShowcasePreview("/software/zohobooks_showcase_1.jpg");
      setShowcaseFile(null);

      setBadgePreview("/software/zohobooks_badge.png");
      setBadgeFile(null);
    }

    // Always reset to Step 1 on open
    setCurrentStep(1);
  }, [editingSoftware, isOpen]);

  if (!isOpen) return null;

  // File Handlers
  const handleBadgeChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        Swal.fire({
          icon: "error",
          title: "Invalid File",
          text: "Please select an image file (PNG, JPG, WEBP)",
          confirmButtonColor: "#368b82",
        });
        return;
      }
      setBadgeFile(file);
      setBadgePreview(URL.createObjectURL(file));
    }
  };

  const handleShowcaseImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        Swal.fire({
          icon: "error",
          title: "Invalid File",
          text: "Please select an image file (PNG, JPG, WEBP)",
          confirmButtonColor: "#368b82",
        });
        return;
      }
      setShowcaseFile(file);
      setShowcasePreview(URL.createObjectURL(file));
    }
  };

  // Repeater Helpers
  const handleAddParagraph = () => {
    setIntroParagraphs([...introParagraphs, ""]);
  };

  const handleParagraphChange = (index, value) => {
    const updated = [...introParagraphs];
    updated[index] = value;
    setIntroParagraphs(updated);
  };

  const handleRemoveParagraph = (index) => {
    if (introParagraphs.length === 1) return;
    setIntroParagraphs(introParagraphs.filter((_, i) => i !== index));
  };

  const handleAddHighlight = () => {
    setHighlights([...highlights, ""]);
  };

  const handleHighlightChange = (index, value) => {
    const updated = [...highlights];
    updated[index] = value;
    setHighlights(updated);
  };

  const handleRemoveHighlight = (index) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const handleAddFeature = () => {
    setFeaturesList([...featuresList, { title: "", desc: "" }]);
  };

  const handleFeatureChange = (index, field, value) => {
    const updated = [...featuresList];
    updated[index] = { ...updated[index], [field]: value };
    setFeaturesList(updated);
  };

  const handleRemoveFeature = (index) => {
    setFeaturesList(featuresList.filter((_, i) => i !== index));
  };

  const handleAddBullet = () => {
    setShowcaseBullets([...showcaseBullets, ""]);
  };

  const handleBulletChange = (index, value) => {
    const updated = [...showcaseBullets];
    updated[index] = value;
    setShowcaseBullets(updated);
  };

  const handleRemoveBullet = (index) => {
    setShowcaseBullets(showcaseBullets.filter((_, i) => i !== index));
  };

  // Validation Helpers
  const validateStep1 = () => {
    if (!name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Software Name Required",
        text: "Please enter the software platform name to proceed (Step 1).",
        confirmButtonColor: "#368b82",
      });
      return false;
    }
    if (!desc.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Header Subtitle Required",
        text: "Please enter a 1-line subtitle for the header dropdown (Step 1).",
        confirmButtonColor: "#368b82",
      });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const hasValidParagraph = introParagraphs.some((p) => p && p.trim().length > 0);
    if (!hasValidParagraph) {
      Swal.fire({
        icon: "warning",
        title: "Intro Paragraph Required",
        text: "Please provide at least one overview paragraph for the executive card (Step 2).",
        confirmButtonColor: "#368b82",
      });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    const validFeatures = featuresList.filter((f) => f.title && f.title.trim().length > 0);
    if (validFeatures.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Feature Cards Required",
        text: "Please add at least one feature card with a title to proceed (Step 3).",
        confirmButtonColor: "#368b82",
      });
      return false;
    }
    return true;
  };

  const validateStep4 = () => {
    if (!showcaseTitle.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Showcase Title Required",
        text: "Please enter a title for the showcase section (Step 4).",
        confirmButtonColor: "#368b82",
      });
      return false;
    }
    return true;
  };

  // Step Step Forward Handlers
  const handleGoToStep2 = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleGoToStep3 = () => {
    if (validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleGoToStep4 = () => {
    if (validateStep3()) {
      setCurrentStep(4);
    }
  };

  // Tab Header Click Handler
  const handleHeaderTabClick = (targetStepNum) => {
    if (targetStepNum === 1) {
      setCurrentStep(1);
    } else if (targetStepNum === 2) {
      if (validateStep1()) setCurrentStep(2);
    } else if (targetStepNum === 3) {
      if (validateStep1() && validateStep2()) setCurrentStep(3);
    } else if (targetStepNum === 4) {
      if (validateStep1() && validateStep2() && validateStep3()) setCurrentStep(4);
    }
  };

  // Final Submit Handler (Only executed on Step 4!)
  const handleFinalSave = async () => {
    // Validate all 4 steps
    if (!validateStep1()) {
      setCurrentStep(1);
      return;
    }
    if (!validateStep2()) {
      setCurrentStep(2);
      return;
    }
    if (!validateStep3()) {
      setCurrentStep(3);
      return;
    }
    if (!validateStep4()) {
      setCurrentStep(4);
      return;
    }

    try {
      setIsSubmitting(true);

      // Split features into leftCol and rightCol for two-column rendering
      const validFeatures = featuresList.filter((f) => f.title?.trim());
      const mid = Math.ceil(validFeatures.length / 2);
      const leftCol = validFeatures.slice(0, mid);
      const rightCol = validFeatures.slice(mid);

      const featuresSection = {
        title: featuresTitle.trim() || `Important Features Offered by ${name}`,
        tag: featuresTag.trim() || "Comprehensive Modules",
        items: validFeatures,
        leftCol,
        rightCol,
      };

      const validBullets = showcaseBullets.filter((b) => b.trim());
      const showcases = [
        {
          title:
            showcaseTitle.trim() ||
            `Benefits of Outsourcing ${name} Bookkeeping to Us`,
          tag: showcaseTag.trim() || "Strategic Capability",
          bullets: validBullets,
          paragraphs: [],
          image: showcasePreview || "/software/zohobooks_showcase_1.jpg",
          imagePosition: showcasePosition || "right",
        },
      ];

      const cleanedParagraphs = introParagraphs.filter((p) => p.trim());
      const cleanedHighlights = highlights.filter((h) => h.trim());

      const cleanedSlug = (slug.trim() || name.trim())
        .toLowerCase()
        .replace(/^\/+|\/+$/g, "")
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const payload = {
        name: name.trim(),
        slug: cleanedSlug || undefined,
        heroTitle: (heroTitle || name).toUpperCase().trim(),
        heroSubtitle: heroSubtitle.trim(),
        desc: desc.trim() || `Certified ${name} partner & bookkeeping services`,
        badgeTag: badgeTag.trim() || "Platform Proficiency & Advisory",
        introHeading:
          introHeading.trim() ||
          `Tailored ${(heroTitle || name).toUpperCase()} Accounting & Advisory`,
        introParagraphs:
          cleanedParagraphs.length > 0
            ? cleanedParagraphs
            : [`Certified ${name} accounting solutions provided by Support Help.`],
        highlights:
          cleanedHighlights.length > 0
            ? cleanedHighlights
            : [
                "100% Audit-Ready Books",
                "Multi-Currency Ledgers",
                "Real-Time MIS Reports",
              ],
        featuresSection,
        showcases,
        displayOrder: Number(displayOrder) || 1,
        isPublished,
      };

      await onSaveSoftware(payload, editingSoftware, badgeFile, showcaseFile);
    } catch (err) {
      console.error("Save software error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs font-poppins">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#edf7f6] text-[#368b82] flex items-center justify-center font-bold shadow-xs">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-gray-900 leading-snug">
                {editingSoftware
                  ? `Edit Software: ${editingSoftware.name}`
                  : "Add New Software Platform"}
              </h3>
              <p className="text-[11px] text-gray-500 font-medium">
                Step-by-step setup • All 4 steps must be completed before final save
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Stepper Header */}
        <div className="px-6 py-3 bg-gray-50/80 border-b border-gray-200/80 select-none">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {STEPS.map((step) => {
              const isCurrent = currentStep === step.stepNum;
              const isPassed = currentStep > step.stepNum;
              const StepIcon = step.icon;

              return (
                <button
                  key={step.stepNum}
                  type="button"
                  onClick={() => handleHeaderTabClick(step.stepNum)}
                  className={`flex items-center gap-2.5 p-2 rounded-xl text-left transition-all cursor-pointer ${
                    isCurrent
                      ? "bg-white text-[#368b82] shadow-xs border border-[#368b82]/30 ring-2 ring-[#368b82]/10"
                      : isPassed
                      ? "bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100/60 border border-emerald-200"
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-100/80 border border-transparent"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      isCurrent
                        ? "bg-[#368b82] text-white"
                        : isPassed
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : step.stepNum}
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-bold truncate leading-tight">
                      {step.title}
                    </span>
                    <span className="block text-[9.5px] opacity-70 truncate font-medium">
                      {step.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Stepper Progress Bar */}
          <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div
              className="bg-[#368b82] h-full transition-all duration-300"
              style={{
                width: `${(currentStep / 4) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Modal Body Container (Using standard div so no form can trigger premature submit) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* ================= STEP 1: BASIC & HEADER ================= */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-100 flex items-center justify-between text-blue-900">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-xs">
                    Step 1 of 4: Platform Name &amp; Navigation Dropdown
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-blue-700 bg-white px-2.5 py-0.5 rounded-full border border-blue-200 shadow-2xs">
                  Required Fields
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Software Platform Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Zoho Books"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (!heroTitle) setHeroTitle(e.target.value.toUpperCase());
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    URL Slug
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 font-mono text-[11px] pointer-events-none">
                      /software-expertise/
                    </span>
                    <input
                      type="text"
                      placeholder="zohobooks"
                      value={slug}
                      onChange={(e) => {
                        const clean = e.target.value
                          .replace(/^\/+/, "")
                          .replace(/[^a-zA-Z0-9-_]/g, "");
                        setSlug(clean);
                      }}
                      className="w-full pl-38 pr-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs sm:text-sm font-medium font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Header Dropdown Subtitle (1 Line Description) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Certified Zoho Finance Partner & Migration Specialist"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs sm:text-sm font-medium"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Appears directly under the software name when users open the &quot;Software&quot; menu in the top navigation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                  <label className="block font-bold text-gray-700 uppercase tracking-wider text-[11px]">
                    Menu Display Order
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={displayOrder}
                      onChange={(e) => setDisplayOrder(e.target.value)}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-xl text-center font-bold text-sm bg-white"
                    />
                    <span className="text-[11px] text-gray-500">
                      Determines the position in header and sidebar listings (1 = first)
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between">
                  <div>
                    <label className="font-bold text-gray-800 block text-xs">
                      Publish to Header &amp; Live Site
                    </label>
                    <span className="text-[11px] text-gray-500">
                      When checked, the software is live in navigation and accessible.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    id="isPublishedCheck"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-5 h-5 rounded text-[#368b82] focus:ring-[#368b82] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 2: HERO & INTRO CARD ================= */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex items-center justify-between text-emerald-950">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <span className="font-bold text-xs">
                    Step 2 of 4: Top Hero Banner, Partner Badge &amp; Executive Intro Card
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-800 bg-white px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
                  Landing Page Hero
                </span>
              </div>

              {/* Hero Banner Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Hero Title (Appears as &quot;[TITLE] EXPERTISE&quot;)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ZOHOBOOKS"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs sm:text-sm font-medium uppercase"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Executive Card Badge Pill Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Platform Proficiency & Advisory"
                    value={badgeTag}
                    onChange={(e) => setBadgeTag(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>

              {/* Hero Banner Subtitle */}
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Hero Banner Subtitle (Overview under top banner)
                </label>
                <textarea
                  rows={2}
                  placeholder="Zoho Books is considered to be an online cloud accounting software..."
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs sm:text-sm font-medium"
                />
              </div>

              {/* Partner Badge Image Upload */}
              <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-bold text-gray-800 text-xs uppercase tracking-wider block">
                      Certified Partner Badge / Logo Image
                    </label>
                    <span className="text-[11px] text-gray-500">
                      Displayed inside the executive card at the top of the page
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <Sparkles className="w-3 h-3" /> Auto-Compressed WebP
                  </span>
                </div>

                {badgePreview ? (
                  <div className="bg-white rounded-xl border border-gray-200 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center p-1 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={badgePreview}
                          alt="Badge Preview"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-800 block">
                          Badge Logo Selected
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {badgeFile ? badgeFile.name : "Current Badge"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => badgeInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-xl bg-gray-100 text-gray-700 font-bold text-xs hover:bg-gray-200 cursor-pointer"
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setBadgeFile(null);
                          setBadgePreview("");
                        }}
                        className="px-3 py-1.5 rounded-xl bg-red-50 text-red-600 font-bold text-xs hover:bg-red-100 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => badgeInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 hover:border-[#368b82] hover:bg-[#edf7f6]/40 rounded-xl p-4 text-center cursor-pointer transition-all"
                  >
                    <Upload className="w-5 h-5 mx-auto text-gray-400 mb-1" />
                    <p className="font-bold text-gray-700 text-xs">
                      Click to upload partner badge logo
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      Recommended: PNG with transparent background
                    </p>
                  </div>
                )}

                <input
                  ref={badgeInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleBadgeChange}
                  className="hidden"
                />
              </div>

              {/* Executive Intro Heading */}
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Executive Card Heading
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tailored ZOHOBOOKS Accounting & Advisory"
                  value={introHeading}
                  onChange={(e) => setIntroHeading(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs sm:text-sm font-medium"
                />
              </div>

              {/* Intro Paragraphs Repeater */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-gray-700 uppercase tracking-wider">
                    Executive Intro Paragraphs ({introParagraphs.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddParagraph}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#edf7f6] text-[#368b82] font-bold text-xs hover:bg-[#368b82] hover:text-white transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Paragraph</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {introParagraphs.map((para, idx) => (
                    <div key={idx} className="flex gap-2 items-start">
                      <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-2">
                        {idx + 1}
                      </div>
                      <textarea
                        rows={2}
                        value={para}
                        onChange={(e) => handleParagraphChange(idx, e.target.value)}
                        placeholder={`Paragraph ${idx + 1}...`}
                        className="flex-1 px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs font-medium"
                      />
                      {introParagraphs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveParagraph(idx)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer shrink-0 mt-1"
                          title="Remove paragraph"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights Strip Repeater */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-bold text-gray-700 uppercase tracking-wider block">
                      Quick Highlights Pills ({highlights.length})
                    </label>
                    <span className="text-[11px] text-gray-500">
                      Rendered with checkmark icons at the bottom of the executive card
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#edf7f6] text-[#368b82] font-bold text-xs hover:bg-[#368b82] hover:text-white transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Pill</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {highlights.map((hItem, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 p-1.5 bg-gray-50 border border-gray-200 rounded-xl"
                    >
                      <Check className="w-3.5 h-3.5 text-[#368b82] shrink-0 ml-1" />
                      <input
                        type="text"
                        value={hItem}
                        onChange={(e) => handleHighlightChange(idx, e.target.value)}
                        placeholder="e.g. 100% Audit-Ready Books"
                        className="flex-1 bg-transparent border-none outline-none text-xs font-semibold text-gray-800"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(idx)}
                        className="p-1 text-gray-400 hover:text-red-600 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 3: FEATURES GRID ================= */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex items-center justify-between text-purple-950">
                <div className="flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-purple-700" />
                  <span className="font-bold text-xs">
                    Step 3 of 4: Features Grid (2-Column Cards)
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-purple-800 bg-white px-2.5 py-0.5 rounded-full border border-purple-200 shadow-2xs">
                  {featuresList.length} Cards Configured
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Features Section Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Important Features Offered by Zoho Books"
                    value={featuresTitle}
                    onChange={(e) => setFeaturesTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Category Tag / Pill
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Comprehensive Modules"
                    value={featuresTag}
                    onChange={(e) => setFeaturesTag(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>

              {/* Dynamic Features List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-bold text-gray-700 uppercase tracking-wider block">
                      Feature Cards ({featuresList.length})
                    </label>
                    <span className="text-[11px] text-gray-500">
                      Renders in modern 2-column cards with checkmark accents and 3D hover elevation
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#368b82] text-white font-bold text-xs hover:bg-[#286b64] transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Feature Card</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {featuresList.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-gray-50/80 rounded-2xl border border-gray-200 hover:border-[#368b82]/40 transition-colors space-y-2 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#368b82] text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Feature #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(idx)}
                          className="p-1 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                          title="Remove feature"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="Feature Title (e.g. Receivables)"
                          value={feat.title}
                          onChange={(e) =>
                            handleFeatureChange(idx, "title", e.target.value)
                          }
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white font-bold text-xs outline-none focus:border-[#368b82]"
                        />
                      </div>

                      <div>
                        <textarea
                          rows={2}
                          placeholder="Short description of this feature..."
                          value={feat.desc}
                          onChange={(e) =>
                            handleFeatureChange(idx, "desc", e.target.value)
                          }
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-xs outline-none focus:border-[#368b82]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 4: SHOWCASE & PHOTO ================= */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200 flex items-center justify-between text-amber-950">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-amber-700" />
                  <span className="font-bold text-xs">
                    Step 4 of 4 (Final Step): Strategic Showcase &amp; Bullets
                  </span>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  Ready to Complete &amp; Save
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Showcase Section Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Benefits of Outsourcing Zoho Bookkeeping to Us"
                    value={showcaseTitle}
                    onChange={(e) => setShowcaseTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Section Tag / Pill
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Strategic Capability"
                    value={showcaseTag}
                    onChange={(e) => setShowcaseTag(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>

              {/* Showcase Image Upload */}
              <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-bold text-gray-800 text-xs uppercase tracking-wider block">
                      Showcase Right Photo
                    </label>
                    <span className="text-[11px] text-gray-500">
                      High-resolution photo displayed beside the bullet points
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold">
                      <span>Position:</span>
                      <select
                        value={showcasePosition}
                        onChange={(e) => setShowcasePosition(e.target.value)}
                        className="px-2 py-1 rounded-lg border border-gray-300 bg-white text-xs outline-none"
                      >
                        <option value="right">Right</option>
                        <option value="left">Left</option>
                      </select>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <Sparkles className="w-3 h-3" /> Auto-Compressed WebP
                    </span>
                  </div>
                </div>

                {showcasePreview ? (
                  <div className="bg-white rounded-xl border border-gray-200 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-16 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={showcasePreview}
                          alt="Showcase preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-800 block">
                          Showcase Photo Selected
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {showcaseFile ? showcaseFile.name : "Current Photo"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => showcaseInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-xl bg-gray-100 text-gray-700 font-bold text-xs hover:bg-gray-200 cursor-pointer"
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowcaseFile(null);
                          setShowcasePreview("");
                        }}
                        className="px-3 py-1.5 rounded-xl bg-red-50 text-red-600 font-bold text-xs hover:bg-red-100 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => showcaseInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 hover:border-[#368b82] hover:bg-[#edf7f6]/40 rounded-xl p-4 text-center cursor-pointer transition-all"
                  >
                    <Upload className="w-5 h-5 mx-auto text-gray-400 mb-1" />
                    <p className="font-bold text-gray-700 text-xs">
                      Click to upload showcase photo (office, financial reports, etc.)
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      JPG or PNG auto-converted to lightweight WebP
                    </p>
                  </div>
                )}

                <input
                  ref={showcaseInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleShowcaseImageChange}
                  className="hidden"
                />
              </div>

              {/* Dynamic Bullets Repeater */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-bold text-gray-700 uppercase tracking-wider block">
                      Value Proposition Bullets ({showcaseBullets.length})
                    </label>
                    <span className="text-[11px] text-gray-500">
                      Key benefits with green checkmark bullet icons
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddBullet}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#edf7f6] text-[#368b82] font-bold text-xs hover:bg-[#368b82] hover:text-white transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Bullet</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {showcaseBullets.map((bullet, idx) => (
                    <div key={idx} className="flex gap-2 items-start">
                      <div className="w-5 h-5 rounded-md bg-[#368b82] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-2">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <textarea
                        rows={2}
                        value={bullet}
                        onChange={(e) => handleBulletChange(idx, e.target.value)}
                        placeholder={`Bullet point ${idx + 1}...`}
                        className="flex-1 px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#368b82] outline-none text-xs font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveBullet(idx)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer shrink-0 mt-1"
                        title="Remove bullet"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls (Step Navigation & Final Submit) */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
          {/* Left: Previous Button or Cancel */}
          <div>
            {currentStep === 1 ? (
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 font-semibold text-xs cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
            ) : currentStep === 2 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                disabled={isSubmitting}
                className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-bold text-xs cursor-pointer flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back: Basic Info</span>
              </button>
            ) : currentStep === 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                disabled={isSubmitting}
                className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-bold text-xs cursor-pointer flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back: Hero &amp; Intro</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                disabled={isSubmitting}
                className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-bold text-xs cursor-pointer flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back: Features Grid</span>
              </button>
            )}
          </div>

          {/* Middle: Step Progress Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 font-medium">
            <span>Step {currentStep} of 4:</span>
            <strong className="text-gray-900 font-bold">
              {STEPS[currentStep - 1].title}
            </strong>
          </div>

          {/* Right: Step Next OR Final Save on Step 4 */}
          <div className="flex items-center gap-3">
            {currentStep === 1 && (
              <button
                type="button"
                onClick={handleGoToStep2}
                className="px-5 py-2.5 rounded-xl bg-[#368b82] hover:bg-[#286b64] text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Next: Hero &amp; Intro Card</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            )}

            {currentStep === 2 && (
              <button
                type="button"
                onClick={handleGoToStep3}
                className="px-5 py-2.5 rounded-xl bg-[#368b82] hover:bg-[#286b64] text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Next: Features Grid</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            )}

            {currentStep === 3 && (
              <button
                type="button"
                onClick={handleGoToStep4}
                className="px-5 py-2.5 rounded-xl bg-[#368b82] hover:bg-[#286b64] text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Next: Showcase &amp; Photo</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            )}

            {currentStep === 4 && (
              <button
                type="button"
                onClick={handleFinalSave}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50 hover:-translate-y-0.5 active:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving All Sections...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {editingSoftware
                        ? "Complete & Save All Sections"
                        : "Save & Publish to Header"}
                    </span>
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

export default SoftwareModal;
