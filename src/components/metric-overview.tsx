"use client";

import React from "react";
import { BentoCard } from "@/components/ui/bento-card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, CheckCircle2, FileSearch, ShieldCheck, Database, Info } from "lucide-react";

interface MetricOverviewProps {
  stats: {
    totalApplications: number;
    highPriority: number;
    mediumPriority: number;
    lowPriority: number;
    flaggedDiscrepancies: number;
    verifiedSourcesRate: number;
  };
  onFilterPriority?: (priority: string | null) => void;
  activePriorityFilter?: string | null;
}

export function MetricOverview({
  stats,
  onFilterPriority,
  activePriorityFilter,
}: MetricOverviewProps) {
  return (
    <div className="space-y-4">
      {/* Safeguard & Decision-Support Notice (Required by SIH Brief) */}
      <div className="rounded-xl border border-blue-500/30 bg-blue-950/20 px-4 py-3 text-xs text-blue-200 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md shadow-lg shadow-blue-950/40">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 shrink-0">
            <Info className="h-3.5 w-3.5" />
          </div>
          <div>
            <span className="font-semibold text-white">First-Pass Screening Protocol: </span>
            <span>
              AI flags are preliminary indicators with evidence links. The system never approves or rejects any application.
              Statutory scrutiny and final regulatory decisions remain with AICTE officials.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-blue-300 bg-blue-900/40 px-2.5 py-1 rounded-md border border-blue-400/20">
          <span>Rules Engine: APH-2026-v2.1</span>
        </div>
      </div>

      {/* Bento Grid Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Queue */}
        <BentoCard
          title="Applications in Queue"
          value={stats.totalApplications}
          description="Across EoA, New Inst, & Intake Expansion"
          glowColor="indigo"
          icon={<FileSearch className="h-5 w-5" />}
          badge={
            <Badge variant="secondary" size="sm">
              Current Session
            </Badge>
          }
          onClick={() => onFilterPriority && onFilterPriority(null)}
          className={!activePriorityFilter ? "ring-2 ring-blue-500/40 bg-slate-900/90" : ""}
        />

        {/* High Review Priority */}
        <BentoCard
          title="High Review Priority"
          value={stats.highPriority}
          description="Expired NOCs & intake discrepancies"
          glowColor="rose"
          icon={<AlertTriangle className="h-5 w-5" />}
          trend={{ value: "Urgent Scrutiny", isPositive: false }}
          badge={
            <Badge variant="destructive" size="sm" dot pulse>
              Action Required
            </Badge>
          }
          onClick={() => onFilterPriority && onFilterPriority("HIGH")}
          className={activePriorityFilter === "HIGH" ? "ring-2 ring-rose-500/60 bg-rose-950/20" : ""}
        />

        {/* Medium Review Priority */}
        <BentoCard
          title="Medium Review Priority"
          value={stats.mediumPriority}
          description="Contradicting trust / entity details"
          glowColor="amber"
          icon={<Clock className="h-5 w-5" />}
          badge={
            <Badge variant="warning" size="sm" dot>
              Clarification Needed
            </Badge>
          }
          onClick={() => onFilterPriority && onFilterPriority("MEDIUM")}
          className={activePriorityFilter === "MEDIUM" ? "ring-2 ring-amber-500/60 bg-amber-950/20" : ""}
        />

        {/* Low / Routine */}
        <BentoCard
          title="Low Review Priority"
          value={stats.lowPriority}
          description="Routine checks & valid filings"
          glowColor="emerald"
          icon={<ShieldCheck className="h-5 w-5" />}
          trend={{ value: "Clean Pass", isPositive: true }}
          badge={
            <Badge variant="success" size="sm">
              Standard Queue
            </Badge>
          }
          onClick={() => onFilterPriority && onFilterPriority("LOW")}
          className={activePriorityFilter === "LOW" ? "ring-2 ring-emerald-500/60 bg-emerald-950/20" : ""}
        />
      </div>
    </div>
  );
}
