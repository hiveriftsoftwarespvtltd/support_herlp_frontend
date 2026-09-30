"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { servicesData as fallbackServicesData } from "@/data/navigationData";
import { serviceApi } from "@/api";

export function ServicesMegaMenu({ isOpen, onClose }) {
  const pathname = usePathname();
  const [columns, setColumns] = useState(fallbackServicesData);

  useEffect(() => {
    let isMounted = true;
    async function loadServices() {
      try {
        const res = await serviceApi.getServices({ isPublished: true });
        if (res?.data && res.data.length > 0 && isMounted) {
          const serviceOnly = res.data.filter(
            (item) => item.category === "Core Services" || item.category === "Specialized Services"
          );

          if (serviceOnly.length > 0) {
            const items = serviceOnly.map((item) => ({
              name: item.title,
              href: `/services/${(item.slug || "").replace(/^\/+/, "")}`,
              category: item.category || "Core Services",
            }));

            const core = items.filter((it) => it.category === "Core Services");
            const specialized = items.filter((it) => it.category === "Specialized Services");

            if (core.length > 0 && specialized.length > 0) {
              setColumns([
                { colTitle: "Core Services", items: core },
                { colTitle: "Specialized Services", items: specialized },
              ]);
            } else {
              const mid = Math.ceil(items.length / 2);
              setColumns([
                { colTitle: "Core Services", items: items.slice(0, mid) },
                { colTitle: "Specialized Services", items: items.slice(mid) },
              ]);
            }
          }
        }
      } catch (err) {
        // Keep fallback data if offline or error
      }
    }

    loadServices();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-[94vw] max-w-[690px] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.18)] border border-gray-200/90 rounded-b-md z-50 transition-all duration-200 animate-fadeIn"
    >
      <div className="p-6 md:p-7">
        {/* 2 Columns of Service Links with row dividers matching Screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-0">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col">
              {col.items.map((item, itemIdx) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={itemIdx}
                    href={item.href}
                    onClick={onClose}
                    className={`py-2.5 px-0.5 border-b border-[#f0f0f0] text-[13.5px] sm:text-[14px] font-poppins transition-colors block text-left ${
                      isActive
                        ? "text-[#368b82] font-semibold"
                        : "text-[#333333] hover:text-[#368b82] font-normal"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Certified Badges Bar matching Screenshot */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-[12px] font-bold text-[#111111] uppercase tracking-wide font-poppins mb-3.5">
            We Are Certified Accounting Firm:
          </p>
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <div className="relative h-8 w-28">
              <Image
                src="/software/zoho_inner.png"
                alt="Certified Zoho Advisor"
                fill
                className="object-contain object-left"
              />
            </div>
            <div className="relative h-8 w-32">
              <Image
                src="/software/sage_inner.png"
                alt="Certified Sage One Adviser"
                fill
                className="object-contain object-left"
              />
            </div>
            <div className="relative h-8 w-32">
              <Image
                src="/software/xero_inner.png"
                alt="Certified Xero Advisor"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesMegaMenu;
