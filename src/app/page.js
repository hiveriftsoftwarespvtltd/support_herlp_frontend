import React from "react";
import {
  HomeHeroBanner,
  HomeStatsBar,
  HomeAboutSection,
  HomeServicesSection,
  HomeSoftwareSection,
  HomeClientsSection,
  HomeContactSection,
  HomeBlogSection,
} from "@/components/Home";

export const metadata = {
  title: "Accounting Firm by Certified Bookkeepers and Accountants – Support Help",
  description:
    "Support Help is a leading accounting firm run by certified bookkeeper and accountant. We offer payroll, taxation, accounts receivable and payable services in USA, Australia, and India.",
};

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Banner */}
      <HomeHeroBanner />

      {/* 2. AURNEX Notice & 3 Feature Cards */}
      <HomeStatsBar />

      {/* 3. Best Accounting Firm / About Us & Leadership */}
      <HomeAboutSection />

      {/* 4. Our Services Grid (8 Services + Check Out More) */}
      <HomeServicesSection />

      {/* 5. Software We Work With + Badges & Image */}
      <HomeSoftwareSection />

      {/* 6. Valued Clients Logo Grid */}
      <HomeClientsSection />

      {/* 7. Let's Talk Contact Form & We Are Certified Badges */}
      <HomeContactSection />

      {/* 8. From Our Blog (3 Articles) */}
      <HomeBlogSection />
    </div>
  );
}
