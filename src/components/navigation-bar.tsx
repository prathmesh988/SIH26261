"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Sparkles, User, Bell, Search, CheckCircle2, ChevronDown, SlidersHorizontal } from "lucide-react";

interface NavigationBarProps {
  currentRole: string;
  onRoleChange: (role: string) => void;
  onSearchClick: () => void;
  activeTab: "queue" | "config" | "audit";
  onTabChange: (tab: "queue" | "config" | "audit") => void;
}

export function NavigationBar({
  currentRole,
  onRoleChange,
  onSearchClick,
  activeTab,
  onTabChange,
}: NavigationBarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Branding & Official Emblem */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 shadow-md shadow-blue-500/20 text-white font-bold text-lg border border-white/20">
            <Shield className="h-5 w-5" />
            <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base tracking-tight font-sans">
                AICTE Validation Engine
              </span>
              <Badge variant="default" size="sm" className="font-mono text-[10px] bg-blue-500/20 text-blue-300 border-blue-500/40">
                PS 26261
              </Badge>
              <Badge variant="outline" size="sm" className="hidden sm:inline-flex text-[10px] text-slate-400 border-slate-700">
                Ministry of Education
              </Badge>
            </div>
            <p className="text-[11px] text-slate-400 font-normal">
              AI Decision-Support Screening Layer • Scrutiny & Approval Workflow
            </p>
          </div>
        </div>

        {/* Center: Navigation Pills */}
        <div className="hidden md:flex items-center rounded-lg bg-slate-900/90 border border-slate-800 p-1 text-xs">
          <button
            onClick={() => onTabChange("queue")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === "queue"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Review-Priority Queue
          </button>
          <button
            onClick={() => onTabChange("config")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === "config"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Configurable Checklists
          </button>
          <button
            onClick={() => onTabChange("audit")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === "audit"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Append-Only Audit Trail
          </button>
        </div>

        {/* Right: Search, Role Switcher, Status */}
        <div className="flex items-center gap-3">
          {/* Quick Search Button */}
          <button
            onClick={onSearchClick}
            className="hidden sm:flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            <Search className="h-3.5 w-3.5 text-slate-500" />
            <span>Search applications...</span>
            <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Role Switcher Pill */}
          <div className="relative flex items-center">
            <select
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value)}
              className="appearance-none rounded-lg border border-slate-700/80 bg-slate-900/90 pl-8 pr-7 py-1.5 text-xs font-medium text-slate-200 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer shadow-sm"
            >
              <option value="Dr. R. Sharma (Scrutiny Officer)">Dr. R. Sharma (Scrutiny Officer)</option>
              <option value="Dr. A. Verma (Senior Scrutiny Officer)">Dr. A. Verma (Senior Scrutiny Officer)</option>
              <option value="System Admin (AICTE HQ)">System Admin (AICTE HQ)</option>
            </select>
            <User className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-blue-400" />
            <ChevronDown className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-slate-400" />
          </div>

          {/* Decision Support Safeguard Badge */}
          <div className="hidden lg:flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-md text-[11px] font-medium text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Human In The Loop</span>
          </div>
        </div>
      </div>
    </header>
  );
}
