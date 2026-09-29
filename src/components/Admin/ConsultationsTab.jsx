"use client";

import React, { useState, useEffect, useCallback } from "react";
import { consultationApi } from "@/api";
import Swal from "sweetalert2";
import {
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  Search,
  Filter,
  RefreshCw,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export function ConsultationsTab() {
  const [consultations, setConsultations] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchConsultations = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await consultationApi.getConsultations({
        search: searchQuery || undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        limit: 100,
      });

      if (res?.data?.items) {
        setConsultations(res.data.items);
        setTotalCount(res.data.total || res.data.items.length);
      }
    } catch (err) {
      console.warn("Could not fetch consultations:", err.message);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, statusFilter]);

  useEffect(() => {
    fetchConsultations();
  }, [fetchConsultations]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await consultationApi.updateConsultationStatus(id, newStatus);
      setConsultations((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedBooking?._id === id) {
        setSelectedBooking((prev) => ({ ...prev, status: newStatus }));
      }
      Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: `Marked as ${newStatus}`,
        timer: 1200,
        showConfirmButton: false,
        iconColor: "#368b82",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.message,
      });
    }
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Delete Booking?",
      text: `Remove consultation booking for ${item.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await consultationApi.deleteConsultation(item._id);
          setConsultations((prev) => prev.filter((c) => c._id !== item._id));
          if (selectedBooking?._id === item._id) {
            setSelectedBooking(null);
          }
          Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "Booking record deleted.",
            timer: 1200,
            showConfirmButton: false,
          });
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Delete Failed",
            text: err.message,
          });
        }
      }
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="w-full p-6 sm:p-8 lg:p-10 space-y-6 font-poppins">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-gray-900 text-lg sm:text-xl">
              Free Consultation Bookings
            </h3>
            <span className="px-3 py-0.5 rounded-full bg-[#368b82]/10 text-[#368b82] text-xs font-bold border border-[#368b82]/20">
              Live MongoDB
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Bookings captured directly from your /free-consultation landing page form.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchConsultations}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <span className="px-3 py-1.5 rounded-xl bg-[#edf7f6] text-[#368b82] text-xs font-extrabold border border-[#368b82]/30">
            {totalCount} Total Bookings
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200/80">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client name, email, company, service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-xs font-poppins focus:border-[#368b82] focus:ring-1 focus:ring-[#368b82] outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          {["all", "pending", "scheduled", "completed", "cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider capitalize whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-[#368b82] text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-400 flex flex-col items-center gap-2">
            <RefreshCw className="w-6 h-6 animate-spin text-[#368b82]" />
            <span className="text-xs">Fetching consultation requests...</span>
          </div>
        ) : consultations.length === 0 ? (
          <div className="p-12 text-center text-gray-500 space-y-2">
            <Calendar className="w-10 h-10 text-gray-300 mx-auto" />
            <p className="font-bold text-sm text-gray-700">No Consultations Yet</p>
            <p className="text-xs text-gray-400">
              When a visitor books on /free-consultation, their request will appear here instantly.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-bold text-[11px] tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Client & Company</th>
                  <th className="px-5 py-3.5">Contact</th>
                  <th className="px-5 py-3.5">Service Requested</th>
                  <th className="px-5 py-3.5">Preferred Time Slot</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {consultations.map((row) => (
                  <tr key={row._id} className="hover:bg-gray-50/80 transition-colors">
                    {/* Name & Company */}
                    <td className="px-5 py-4">
                      <div className="font-bold text-gray-900 text-sm">{row.name}</div>
                      {row.companyName ? (
                        <div className="flex items-center gap-1.5 text-gray-500 text-[11px] mt-0.5">
                          <Building2 className="w-3 h-3 text-gray-400" />
                          <span>{row.companyName}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-[11px] italic">Not provided</span>
                      )}
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-4 space-y-1">
                      <a
                        href={`mailto:${row.workEmail}`}
                        className="flex items-center gap-1.5 text-[#368b82] font-semibold hover:underline"
                      >
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span>{row.workEmail}</span>
                      </a>
                      <a
                        href={`tel:${row.phone}`}
                        className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900"
                      >
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span>{row.phone}</span>
                      </a>
                    </td>

                    {/* Primary Service */}
                    <td className="px-5 py-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-semibold border border-slate-200">
                        {row.primaryService}
                      </span>
                    </td>

                    {/* Time Slot */}
                    <td className="px-5 py-4 text-gray-600">
                      <div className="flex items-center gap-1.5 font-medium text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-[#368b82]" />
                        <span>{row.preferredTimeSlot}</span>
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1">
                        Booked: {new Date(row.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="px-5 py-4">
                      <select
                        value={row.status || "pending"}
                        onChange={(e) => handleStatusChange(row._id, e.target.value)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-pointer outline-hidden uppercase tracking-wider ${getStatusBadge(
                          row.status
                        )}`}
                      >
                        <option value="pending">PENDING</option>
                        <option value="scheduled">SCHEDULED</option>
                        <option value="completed">COMPLETED</option>
                        <option value="cancelled">CANCELLED</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedBooking(row)}
                          title="View Consultation Details"
                          className="p-1.5 bg-gray-100 hover:bg-[#368b82] hover:text-white text-gray-600 rounded-lg transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(row)}
                          title="Delete Booking"
                          className="p-1.5 bg-gray-100 hover:bg-red-600 hover:text-white text-gray-600 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details View Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-gray-200 relative animate-scaleUp">
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#368b82] uppercase tracking-wider">
                  Consultation Request
                </span>
                <h3 className="text-xl font-bold text-gray-900 font-poppins">
                  {selectedBooking.name}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Booked on {new Date(selectedBooking.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-[#edf7f6] rounded-xl border border-[#368b82]/30 flex items-center gap-2 text-xs font-bold text-[#286b64]">
              <Clock className="w-4 h-4 text-[#368b82]" />
              <span>Requested Slot: {selectedBooking.preferredTimeSlot}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200/80">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Work Email</span>
                <a
                  href={`mailto:${selectedBooking.workEmail}`}
                  className="font-bold text-[#368b82] hover:underline"
                >
                  {selectedBooking.workEmail}
                </a>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200/80">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Phone Number</span>
                <a
                  href={`tel:${selectedBooking.phone}`}
                  className="font-bold text-gray-900 hover:underline"
                >
                  {selectedBooking.phone}
                </a>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200/80">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Company</span>
                <span className="font-bold text-gray-900">
                  {selectedBooking.companyName || "Not provided"}
                </span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200/80">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Primary Service</span>
                <span className="font-bold text-gray-900">
                  {selectedBooking.primaryService}
                </span>
              </div>
            </div>

            <div>
              <span className="text-gray-500 block text-xs font-bold uppercase tracking-wider mb-2">
                Overview of Accounting Needs:
              </span>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-800 leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap">
                {selectedBooking.overview || "No specific overview provided."}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-medium">Status:</span>
                <select
                  value={selectedBooking.status || "pending"}
                  onChange={(e) => handleStatusChange(selectedBooking._id, e.target.value)}
                  className={`text-xs font-bold px-3 py-1 rounded-full border cursor-pointer ${getStatusBadge(
                    selectedBooking.status
                  )}`}
                >
                  <option value="pending">PENDING</option>
                  <option value="scheduled">SCHEDULED</option>
                  <option value="completed">COMPLETED</option>
                  <option value="cancelled">CANCELLED</option>
                </select>
              </div>

              <a
                href={`mailto:${selectedBooking.workEmail}?subject=Support Help - Your Consultation on ${selectedBooking.primaryService}`}
                className="px-5 py-2 bg-[#368b82] hover:bg-[#286b64] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Client</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConsultationsTab;
