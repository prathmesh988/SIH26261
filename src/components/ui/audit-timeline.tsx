"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Cpu, UserCheck, Search, AlertTriangle, Key } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: "System (Rules Engine)" | "AI Vision / OCR" | "Scrutiny Officer" | "Senior Officer" | "External API (Simulated)";
  action: string;
  details: string;
  ruleId?: string;
  hashSnippet?: string;
}

interface AuditTimelineProps {
  logs: AuditLogEntry[];
}

export function AuditTimeline({ logs }: AuditTimelineProps) {
  const getIcon = (role: AuditLogEntry["role"]) => {
    switch (role) {
      case "System (Rules Engine)":
        return <Cpu className="h-3.5 w-3.5 text-blue-400" />;
      case "AI Vision / OCR":
        return <Search className="h-3.5 w-3.5 text-cyan-400" />;
      case "Scrutiny Officer":
        return <UserCheck className="h-3.5 w-3.5 text-emerald-400" />;
      case "Senior Officer":
        return <ShieldCheck className="h-3.5 w-3.5 text-purple-400" />;
      case "External API (Simulated)":
        return <Key className="h-3.5 w-3.5 text-amber-400" />;
      default:
        return <Cpu className="h-3.5 w-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="relative border-l border-slate-800 ml-3 pl-5 space-y-5 my-2">
      {logs.map((log, idx) => (
        <div key={log.id || idx} className="relative group">
          {/* Timeline node */}
          <div className="absolute -left-[27px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-slate-700 bg-slate-900 shadow-sm transition-all group-hover:scale-110 group-hover:border-blue-500">
            {getIcon(log.role)}
          </div>

          <div className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-3 backdrop-blur-sm space-y-1.5 transition-all group-hover:border-slate-700">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white">
                  {log.actor}
                </span>
                <Badge variant="secondary" size="sm" className="font-mono text-[10px]">
                  {log.role}
                </Badge>
                {log.ruleId && (
                  <Badge variant="outline" size="sm" className="font-mono text-[10px] text-blue-400 border-blue-500/30">
                    {log.ruleId}
                  </Badge>
                )}
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                {log.timestamp}
              </span>
            </div>

            <p className="text-xs font-medium text-slate-200">
              {log.action}
            </p>

            <p className="text-xs text-slate-400">
              {log.details}
            </p>

            {log.hashSnippet && (
              <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800/50">
                <span>Cryptographic Block: {log.hashSnippet}</span>
                <span className="text-emerald-400/80">✔ Append-Only Verified</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
