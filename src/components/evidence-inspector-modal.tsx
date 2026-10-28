"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ApplicationRecord } from "@/data/mock-data";
import {
  ShieldAlert,
  FileText,
  Database,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  Send,
  Building,
  MapPin,
  ExternalLink,
  Search,
  Fingerprint,
  Info,
  ShieldCheck,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EvidenceInspectorModalProps {
  application: ApplicationRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateApplication: (updatedApp: ApplicationRecord) => void;
}

export function EvidenceInspectorModal({
  application,
  isOpen,
  onClose,
  onUpdateApplication,
}: EvidenceInspectorModalProps) {
  if (!application) return null;

  const [selectedFlagIndex, setSelectedFlagIndex] = useState(0);
  const [isVerifyingSource, setIsVerifyingSource] = useState(false);
  const [officerNote, setOfficerNote] = useState("");
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const currentFlag = application.flags[selectedFlagIndex] || application.flags[0];

  // Simulate issuing-authority verification check
  const handleSimulateVerification = () => {
    setIsVerifyingSource(true);
    setTimeout(() => {
      setIsVerifyingSource(false);
      setActionFeedback("Mock Issuing Authority verification complete. Seeded status refreshed with timestamp.");
      setTimeout(() => setActionFeedback(null), 4000);
    }, 1200);
  };

  // Officer action: Resolve or Dismiss
  const handleFlagAction = (action: "resolve" | "dismiss" | "clarify") => {
    if (!currentFlag) return;

    const newStatus =
      action === "resolve"
        ? "resolved"
        : action === "dismiss"
        ? "dismissed"
        : "clarification_requested";

    const updatedFlags = [...application.flags];
    updatedFlags[selectedFlagIndex] = {
      ...currentFlag,
      status: newStatus,
    };

    const actionText =
      action === "resolve"
        ? "Officer resolved flag"
        : action === "dismiss"
        ? "Officer dismissed flag as false positive"
        : "Officer dispatched institutional clarification notice";

    const newAuditEntry = {
      id: `AUD-OFFICER-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      actor: "Scrutiny Officer (Dr. R. Sharma)",
      role: "Scrutiny Officer" as const,
      action: `${actionText}: ${currentFlag.field}`,
      details: officerNote || "Scrutiny verified against regulatory handbook requirements.",
      hashSnippet: `0x${Math.random().toString(16).substring(2, 8)}...${Math.random().toString(16).substring(2, 6)}`,
    };

    const updatedApp: ApplicationRecord = {
      ...application,
      flags: updatedFlags,
      unresolvedFlags: updatedFlags.filter((f) => f.status === "unresolved").length,
      auditHistory: [newAuditEntry, ...application.auditHistory],
      scrutinyStatus:
        action === "clarify"
          ? "Clarification Requested"
          : updatedFlags.every((f) => f.status === "resolved")
          ? "Ready for Scrutiny Committee"
          : "In Review",
    };

    onUpdateApplication(updatedApp);
    setOfficerNote("");
    setActionFeedback(`Action recorded: ${actionText}`);
    setTimeout(() => setActionFeedback(null), 3500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl p-6 bg-slate-950/95 border-slate-800 text-slate-100 shadow-2xl">
        <DialogHeader className="border-b border-slate-800 pb-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-xs text-blue-400 border-blue-500/40">
                  {application.id}
                </Badge>
                <Badge
                  variant={
                    application.reviewPriority === "HIGH"
                      ? "destructive"
                      : application.reviewPriority === "MEDIUM"
                      ? "warning"
                      : "success"
                  }
                  dot
                  pulse={application.reviewPriority === "HIGH"}
                >
                  {application.reviewPriority} REVIEW PRIORITY
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {application.category}
                </Badge>
              </div>

              <DialogTitle className="text-xl font-bold text-white flex items-center gap-2 pt-1">
                {application.name}
              </DialogTitle>

              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Building className="h-3.5 w-3.5 text-slate-500" />
                  PID: {application.instituteId}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-500" />
                  {application.state} • {application.region}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-500" />
                  Submitted: {application.submittedDate}
                </span>
              </div>
            </div>

            {/* Simulated verification pill */}
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Source Verification:</span>
                <Badge
                  variant={
                    application.sourceVerificationStatus === "verified"
                      ? "success"
                      : application.sourceVerificationStatus === "mismatch"
                      ? "warning"
                      : application.sourceVerificationStatus === "expired"
                      ? "destructive"
                      : "secondary"
                  }
                  size="sm"
                >
                  {application.sourceVerificationStatus.toUpperCase()} (SIMULATED)
                </Badge>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleSimulateVerification}
                disabled={isVerifyingSource}
                className="h-7 text-xs gap-1.5 bg-slate-900 border-slate-700"
              >
                <RefreshCw className={cn("h-3 w-3", isVerifyingSource && "animate-spin text-blue-400")} />
                {isVerifyingSource ? "Pinging Authority API..." : "Simulate Source Verification"}
              </Button>
            </div>
          </div>

          {/* Review Priority Reason Chip */}
          <div className="mt-3 rounded-lg bg-rose-500/10 border border-rose-500/20 px-3.5 py-2 text-xs text-rose-300 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-rose-200">Rule-Based Priority Reason: </span>
              {application.priorityReason}
            </div>
          </div>
        </DialogHeader>

        {/* Action feedback alert */}
        {actionFeedback && (
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* Flag Selection Ribbon */}
        {application.flags.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Evidence-Linked Findings ({application.flags.length} Flagged)
              </span>
              <div className="flex items-center gap-1.5">
                {application.flags.map((flag, idx) => (
                  <button
                    key={flag.id}
                    onClick={() => setSelectedFlagIndex(idx)}
                    className={cn(
                      "px-3 py-1 text-xs rounded-md font-medium transition-all flex items-center gap-1.5",
                      selectedFlagIndex === idx
                        ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                        : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        flag.severity === "high" ? "bg-rose-400" : "bg-amber-400"
                      )}
                    />
                    Flag #{idx + 1}: {flag.category.replace("_", " ")}
                    {flag.status === "resolved" && (
                      <Check className="h-3 w-3 text-emerald-400 ml-1" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Side-by-side inspection layout: Centrepiece */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left Column: Smart Document OCR & Metadata */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-400" />
                    <span className="text-xs font-semibold text-white truncate max-w-[220px]">
                      {currentFlag.sourceDoc}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-[10px] bg-slate-950 font-mono text-emerald-400 border-emerald-500/30">
                    OCR Score: {currentFlag.ocrConfidence}%
                  </Badge>
                </div>

                {/* Simulated Document Preview Card with highlight box */}
                <div className="relative rounded-lg border border-slate-700/60 bg-slate-950/80 p-4 font-mono text-xs text-slate-300 space-y-2.5 overflow-hidden">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-widest pb-1 border-b border-slate-800">
                    <span>Document OCR Text Preview</span>
                    <span>Page {currentFlag.pageNumber || 1} of 8</span>
                  </div>

                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    ...Application Form For Extension of Approval (EoA) - Academic Year 2026-27.
                    All information furnished herein has been verified against institutional council records...
                  </p>

                  {/* Highlighted Bounding Box Citation */}
                  <div className="relative rounded border-2 border-rose-500/60 bg-rose-500/10 p-2.5 text-white">
                    <div className="absolute -top-2 right-2 bg-rose-600 px-1.5 py-0.2 rounded text-[9px] font-sans font-bold text-white uppercase tracking-wider">
                      Flagged Snippet
                    </div>
                    <p className="font-semibold text-rose-200">
                      &quot;{currentFlag.quotedTextSnippet || currentFlag.foundValue}&quot;
                    </p>
                  </div>

                  <p className="text-slate-500 text-[10px]">
                    Digital Stamp Ref: IND-MH-PN-2026-98104 | Attested by Member Authority
                  </p>
                </div>

                {/* Document Metadata Inspector (PDF Anomaly check) */}
                <div className="rounded-lg bg-slate-950/60 border border-slate-800 p-3 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 text-slate-300 font-semibold text-[11px]">
                    <Fingerprint className="h-3.5 w-3.5 text-indigo-400" />
                    <span>File Metadata & Tampering Inspector</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
                    <div>SHA-256: 0x9f8b...41a</div>
                    <div>File Size: 2.4 MB (PDF 1.7)</div>
                    <div className="col-span-2 text-rose-300 bg-rose-950/30 p-1.5 rounded border border-rose-500/20 text-[10px]">
                      Preliminary Indicator: Creation date (2026-04-10) post-dates signed attestation (2026-03-01).
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contradiction Detector & Scrutiny Action */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs font-semibold text-white">
                        AICTE Institutional Record Cross-Check
                      </span>
                    </div>
                    <Badge variant="outline" size="sm" className="text-[10px]">
                      Rule: {currentFlag.id}
                    </Badge>
                  </div>

                  {/* Found vs Expected side-by-side callout */}
                  <div className="space-y-2">
                    <div className="rounded-lg border border-rose-500/30 bg-rose-950/20 p-2.5">
                      <span className="text-[10px] font-semibold uppercase text-rose-400 tracking-wider">
                        Found in Upload
                      </span>
                      <p className="font-mono text-sm font-bold text-white mt-0.5">
                        {currentFlag.foundValue}
                      </p>
                    </div>

                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-2.5">
                      <span className="text-[10px] font-semibold uppercase text-emerald-400 tracking-wider">
                        Expected Institutional Baseline ({currentFlag.baselineSource})
                      </span>
                      <p className="font-mono text-sm font-bold text-white mt-0.5">
                        {currentFlag.expectedValue}
                      </p>
                    </div>
                  </div>

                  {/* Explainable Rationale */}
                  <div className="rounded-lg bg-slate-950/80 border border-slate-800 p-3 text-xs text-slate-300">
                    <span className="font-semibold text-amber-400">Scrutiny Reason: </span>
                    {currentFlag.reason}
                  </div>
                </div>

                {/* Scrutiny Officer Decision Form */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">
                      Officer Decision Support Note
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Status: <strong className="text-blue-400 uppercase">{currentFlag.status}</strong>
                    </span>
                  </div>

                  <input
                    type="text"
                    value={officerNote}
                    onChange={(e) => setOfficerNote(e.target.value)}
                    placeholder="Enter reason or scrutiny remarks (logged in append-only audit trail)..."
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />

                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleFlagAction("resolve")}
                      className="text-xs bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/40 text-white"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                      Resolve Flag
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleFlagAction("clarify")}
                      className="text-xs border-amber-500/40 text-amber-300 hover:bg-amber-500/10"
                    >
                      <Send className="h-3.5 w-3.5 mr-1" />
                      Clarify
                    </Button>

                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleFlagAction("dismiss")}
                      className="text-xs text-slate-300 hover:bg-slate-800"
                    >
                      <XCircle className="h-3.5 w-3.5 mr-1" />
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 space-y-2">
            <ShieldCheck className="h-10 w-10 text-emerald-400 mx-auto" />
            <p className="text-sm font-medium text-white">No active flags found</p>
            <p className="text-xs">All checklist and institutional cross-checks passed successfully.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
