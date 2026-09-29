"use client";

import React from "react";

export function SettingsTab() {
  return (
    <div className="w-full max-w-4xl p-6 sm:p-8 lg:p-10 space-y-6 font-poppins">
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-5">
        <h3 className="font-bold text-gray-900 text-base border-b border-gray-100 pb-3">
          Administrator Profile & System Credentials
        </h3>
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-600 mb-1">
              Primary Admin Email
            </label>
            <input
              type="text"
              disabled
              value="vineetvineet8006@gmail.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 outline-none"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-600 mb-1">
              Security Role
            </label>
            <input
              type="text"
              disabled
              value="Super Administrator (Full Access)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 outline-none"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-600 mb-1">
              Connected Database
            </label>
            <input
              type="text"
              disabled
              value="MongoDB Atlas (support_help)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
