"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Mail, Lock, Shield, Sparkles, CheckCircle2 } from "lucide-react";
import { authApi } from "@/api";

export function AdminLogin({ onLoginSuccess }) {
  const router = useRouter();
  // State initialized with valid admin credentials from .env
  const [loginEmail, setLoginEmail] = useState("supporthelp@gmail.com");
  const [loginPassword, setLoginPassword] = useState("123456");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Auto Fill Button Handler
  const handleAutoFill = (selectedEmail = "supporthelp@gmail.com") => {
    setLoginEmail(selectedEmail);
    setLoginPassword("123456");

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Credentials Autofilled!",
      text: `${selectedEmail} • 123456`,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      background: "#ffffff",
      iconColor: "#368b82",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      Swal.fire({
        icon: "warning",
        title: "Required Fields",
        text: "Please enter your email and password.",
        confirmButtonColor: "#368b82",
      });
      return;
    }

    try {
      setIsLoading(true);
      const result = await authApi.login({
        email: loginEmail,
        password: loginPassword,
      });

      if (!result.success) {
        throw new Error(result.message || "Invalid email or password");
      }

      // Save persistent session (won't expire without logout)
      localStorage.setItem("support_help_admin_session", "true");
      if (result.data?.token) {
        localStorage.setItem("support_help_admin_token", result.data.token);
      }
      if (result.data?.user) {
        localStorage.setItem(
          "support_help_admin_user",
          JSON.stringify(result.data.user)
        );
      }

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: result.message || "Welcome back to Support Help Admin Dashboard.",
        timer: 1600,
        showConfirmButton: false,
        timerProgressBar: true,
        background: "#ffffff",
        iconColor: "#368b82",
      }).then(() => {
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          router.push("/admin");
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Authentication Failed",
        text: err.message || "Invalid credentials. Please check your email and password.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-[#102725] to-slate-900 flex items-center justify-center p-4 sm:p-6 font-poppins">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#368b82]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#203f99]/15 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 space-y-6 text-gray-800">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#368b82] to-[#203f99] text-white shadow-lg shadow-[#368b82]/30 mb-2">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Support Help
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#368b82] font-bold">
            Admin Portal
          </p>
          <p className="text-xs text-gray-500 pt-0.5">
            Sign in to manage blog articles, inquiries, and settings
          </p>
        </div>

        {/* Dedicated Auto Fill Action Box */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#edf7f6] via-white to-[#edf7f6] border border-[#368b82]/30 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#368b82] animate-ping" />
              <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                Quick Auto-Fill
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleAutoFill("supporthelp@gmail.com")}
              className="px-3.5 py-1.5 rounded-xl bg-[#368b82] hover:bg-[#286b64] active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto Fill</span>
            </button>
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium pt-1 border-t border-[#368b82]/15">
            <span>Email: <strong className="text-gray-800">supporthelp@gmail.com</strong></span>
            <span>Pass: <strong className="text-gray-800">123456</strong></span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4.5">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="supporthelp@gmail.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#368b82] focus:ring-2 focus:ring-[#368b82]/20 text-sm outline-none transition-all bg-white font-poppins"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Password
              </label>
              <span className="text-[11px] text-[#368b82] font-semibold">
                Default: 123456
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#368b82] focus:ring-2 focus:ring-[#368b82]/20 text-sm outline-none transition-all bg-white font-poppins"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-600">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#368b82] focus:ring-[#368b82]"
              />
              <span>Remember me (Persistent Session)</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#368b82] hover:bg-[#286b64] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-md shadow-[#368b82]/30 transition-all flex items-center justify-center gap-2 cursor-pointer font-poppins"
          >
            <Lock className="w-4 h-4" />
            <span>
              {isLoading ? "Authenticating..." : "Sign In to Dashboard"}
            </span>
          </button>
        </form>

        {/* Footer Back to Site */}
        <div className="pt-2 text-center border-t border-gray-100">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#368b82] font-semibold transition-colors"
          >
            <span>← Back to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
