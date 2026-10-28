"use client";

import React, { useState } from "react";
import { ApplicationRecord } from "@/data/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpDown,
  Building,
  MapPin,
  FileCheck,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewQueueTableProps {
  applications: ApplicationRecord[];
  onSelectApplication: (app: ApplicationRecord) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  priorityFilter: string | null;
  onClearPriorityFilter: () => void;
}

export function ReviewQueueTable({
  applications,
  onSelectApplication,
  selectedCategory,
  onSelectCategory,
  priorityFilter,
  onClearPriorityFilter,
}: ReviewQueueTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All Categories",
    "EoA Renewal",
    "New Technical Institute",
    "Increase in Intake",
    "NRI Quota",
  ];

  // Filtering
  const filteredApps = applications.filter((app) => {
    const matchesCategory =
      selectedCategory === "All Categories" || app.category === selectedCategory;
    const matchesPriority =
      !priorityFilter || app.reviewPriority === priorityFilter;
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.priorityReason.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPriority && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                  : "text-slate-400 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search and Active Filters */}
        <div className="flex items-center gap-2">
          {priorityFilter && (
            <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 px-2 py-1 rounded-lg text-xs text-slate-300">
              <span>Filter: <strong>{priorityFilter}</strong></span>
              <button
                onClick={onClearPriorityFilter}
                className="text-slate-400 hover:text-white ml-1 font-bold"
              >
                ×
              </button>
            </div>
          )}

          <div className="w-full md:w-72">
            <Input
              placeholder="Filter by institute, ID, or state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="h-4 w-4" />}
            />
          </div>
        </div>
      </div>

      {/* Origin UI Style High-Tech Scrutiny Queue Table */}
      <div className="rounded-xl border border-slate-800/90 bg-slate-950/70 backdrop-blur-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4">Application & Institution</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4 min-w-[280px]">Review Priority & Stated Reason</th>
                <th className="py-3.5 px-4">AI Flags</th>
                <th className="py-3.5 px-4">Issuing Source</th>
                <th className="py-3.5 px-4">Scrutiny Status</th>
                <th className="py-3.5 px-4 text-right">Evidence Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredApps.length > 0 ? (
                filteredApps.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-slate-900/40 transition-colors group cursor-pointer"
                    onClick={() => onSelectApplication(app)}
                  >
                    {/* Institution */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {app.name}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mt-0.5">
                        <span className="text-blue-400/90">{app.id}</span>
                        <span>•</span>
                        <span>{app.state}</span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-300">
                        {app.category}
                      </span>
                    </td>

                    {/* Review Priority & Reason */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Badge
                            variant={
                              app.reviewPriority === "HIGH"
                                ? "destructive"
                                : app.reviewPriority === "MEDIUM"
                                ? "warning"
                                : "success"
                            }
                            size="sm"
                            dot
                            pulse={app.reviewPriority === "HIGH"}
                          >
                            {app.reviewPriority} PRIORITY
                          </Badge>
                        </div>
                        <p className="text-[11px] text-slate-300 font-medium line-clamp-2">
                          {app.priorityReason}
                        </p>
                      </div>
                    </td>

                    {/* Flags */}
                    <td className="py-3.5 px-4">
                      {app.flagsCount > 0 ? (
                        <div className="flex items-center gap-1.5">
                          <span className={cn(
                            "flex h-6 px-2 items-center justify-center rounded text-xs font-mono font-bold",
                            app.reviewPriority === "HIGH" ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          )}>
                            {app.flagsCount} {app.flagsCount === 1 ? "flag" : "flags"}
                          </span>
                        </div>
                      ) : (
                        <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Clean
                        </span>
                      )}
                    </td>

                    {/* Issuing Authority Verification Status */}
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          app.sourceVerificationStatus === "verified"
                            ? "success"
                            : app.sourceVerificationStatus === "mismatch"
                            ? "warning"
                            : app.sourceVerificationStatus === "expired"
                            ? "destructive"
                            : app.sourceVerificationStatus === "manual_review"
                            ? "purple"
                            : "secondary"
                        }
                        size="sm"
                      >
                        {app.sourceVerificationStatus.replace("_", " ")}
                      </Badge>
                    </td>

                    {/* Scrutiny Status */}
                    <td className="py-3.5 px-4">
                      <span className="text-slate-300 text-[11px] font-medium">
                        {app.scrutinyStatus}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        size="sm"
                        variant={app.reviewPriority === "HIGH" ? "luxury" : "outline"}
                        className="text-xs gap-1.5 shadow-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectApplication(app);
                        }}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Inspect Evidence
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No applications match the current filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
