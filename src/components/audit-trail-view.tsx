"use client";

import React, { useState } from "react";
import { AuditTimeline, AuditLogEntry } from "@/components/ui/audit-timeline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Search, Filter, Lock, Download, RefreshCw } from "lucide-react";
import { ApplicationRecord } from "@/data/mock-data";

interface AuditTrailViewProps {
  applications: ApplicationRecord[];
}

export function AuditTrailView({ applications }: AuditTrailViewProps) {
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [filterQuery, setFilterQuery] = useState("");

  // Aggregate all audit logs from applications
  const allLogs: AuditLogEntry[] = applications.flatMap((app) =>
    app.auditHistory.map((item) => ({
      ...item,
      details: `[${app.id} - ${app.name}] ${item.details}`,
    }))
  );

  // Filter logs
  const filteredLogs = allLogs.filter((log) => {
    const matchesRole = selectedRole === "All" || log.role === selectedRole;
    const matchesQuery =
      log.actor.toLowerCase().includes(filterQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(filterQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(filterQuery.toLowerCase());

    return matchesRole && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="h-5 w-5 text-emerald-400" />
              Append-Only Scrutiny Audit Trail
            </h2>
            <Badge variant="success" size="sm" className="font-mono text-[10px]">
              Tamper-Evident Ledger
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete, immutable chronological log of every rule execution, OCR extraction, simulated verification, and human officer decision.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="text-xs gap-1.5 bg-slate-900 border-slate-700"
            onClick={() => alert("Audit trail exported in cryptographically signed JSON-LD format.")}
          >
            <Download className="h-3.5 w-3.5 text-blue-400" />
            Export Compliance Report
          </Button>
        </div>
      </div>

      {/* Filter and stats row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800">
          {["All", "System (Rules Engine)", "AI Vision / OCR", "Scrutiny Officer", "External API (Simulated)"].map(
            (role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedRole === role
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {role}
              </button>
            )
          )}
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search audit trail..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Timeline output */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5 backdrop-blur-md">
        {filteredLogs.length > 0 ? (
          <AuditTimeline logs={filteredLogs} />
        ) : (
          <div className="p-8 text-center text-slate-400 text-xs">
            No audit logs match the current filters.
          </div>
        )}
      </div>
    </div>
  );
}
