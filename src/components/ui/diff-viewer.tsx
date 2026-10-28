"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, FileText, ArrowRight, ShieldAlert, Database } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EvidenceItem {
  id: string;
  field: string;
  category: "INTAKE_MISMATCH" | "EXPIRED_DOCUMENT" | "METADATA_TAMPERING" | "NAME_MISMATCH" | "CHECKLIST_MISSING";
  severity: "high" | "medium" | "low";
  foundValue: string;
  expectedValue: string;
  sourceDoc: string;
  baselineSource: string;
  ocrConfidence: number;
  reason: string;
  quotedTextSnippet?: string;
  pageNumber?: number;
  isPreliminary: boolean;
  status: "unresolved" | "resolved" | "dismissed" | "clarification_requested";
}

interface DiffViewerProps {
  evidence: EvidenceItem;
  onAction?: (action: "resolve" | "dismiss" | "clarify") => void;
}

export function DiffViewer({ evidence, onAction }: DiffViewerProps) {
  const severityColors = {
    high: "border-rose-500/40 bg-rose-500/5 text-rose-300",
    medium: "border-amber-500/40 bg-amber-500/5 text-amber-300",
    low: "border-blue-500/40 bg-blue-500/5 text-blue-300",
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-4 backdrop-blur-md">
      {/* Flag Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className={cn(
            "h-4 w-4",
            evidence.severity === "high" && "text-rose-400",
            evidence.severity === "medium" && "text-amber-400",
            evidence.severity === "low" && "text-blue-400"
          )} />
          <span className="font-semibold text-sm text-white tracking-wide">
            {evidence.field}
          </span>
          <Badge
            variant={
              evidence.severity === "high"
                ? "destructive"
                : evidence.severity === "medium"
                ? "warning"
                : "default"
            }
            dot
            pulse={evidence.severity === "high"}
          >
            {evidence.severity.toUpperCase()} PRIORITY
          </Badge>
          {evidence.isPreliminary && (
            <Badge variant="outline" className="text-[10px] bg-slate-900 border-slate-700">
              Preliminary Indicator
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span>OCR Confidence:</span>
          <span className={cn(
            "font-semibold",
            evidence.ocrConfidence > 90 ? "text-emerald-400" : "text-amber-400"
          )}>
            {evidence.ocrConfidence}%
          </span>
        </div>
      </div>

      {/* Side-by-side found vs expected comparison - Kibo UI Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Extracted Found Value */}
        <div className="rounded-lg border border-rose-500/30 bg-rose-950/20 p-3 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-rose-300 font-medium">
            <span className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              Found in Upload ({evidence.sourceDoc})
            </span>
            {evidence.pageNumber && (
              <span className="text-[10px] bg-rose-900/50 px-1.5 py-0.5 rounded text-rose-200">
                Page {evidence.pageNumber}
              </span>
            )}
          </div>
          <div className="font-mono text-sm font-semibold text-white bg-slate-900/90 border border-rose-500/20 p-2.5 rounded">
            {evidence.foundValue}
          </div>
          {evidence.quotedTextSnippet && (
            <p className="text-[11px] text-slate-400 italic font-mono bg-black/40 p-1.5 rounded">
              &quot;{evidence.quotedTextSnippet}&quot;
            </p>
          )}
        </div>

        {/* Expected Institutional Baseline */}
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-3 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-emerald-300 font-medium">
            <span className="flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5" />
              Expected Baseline ({evidence.baselineSource})
            </span>
            <span className="text-[10px] bg-emerald-900/50 px-1.5 py-0.5 rounded text-emerald-200">
              AICTE DB
            </span>
          </div>
          <div className="font-mono text-sm font-semibold text-white bg-slate-900/90 border border-emerald-500/20 p-2.5 rounded">
            {evidence.expectedValue}
          </div>
          <p className="text-[11px] text-slate-400">
            Validated against historical Extension of Approval records & regulatory checklist.
          </p>
        </div>
      </div>

      {/* Reason / Explanation from Rules Engine */}
      <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-3 text-xs text-slate-300 flex items-start gap-2">
        <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-white">Scrutiny Rationale: </span>
          {evidence.reason}
        </div>
      </div>
    </div>
  );
}
