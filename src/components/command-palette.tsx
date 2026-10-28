"use client";

import React, { useState, useEffect } from "react";
import { ApplicationRecord } from "@/data/mock-data";
import { Badge } from "@/components/ui/badge";
import { Search, Building, AlertTriangle, ArrowRight, X } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  applications: ApplicationRecord[];
  onSelectApplication: (app: ApplicationRecord) => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  applications,
  onSelectApplication,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // open triggered from parent
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = applications.filter((app) =>
    app.name.toLowerCase().includes(query.toLowerCase()) ||
    app.id.toLowerCase().includes(query.toLowerCase()) ||
    app.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-2xl space-y-3">
        {/* Input Bar */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type an institute name, application ID, or category..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto space-y-1.5 pr-1">
          {filtered.length > 0 ? (
            filtered.map((app) => (
              <div
                key={app.id}
                onClick={() => {
                  onSelectApplication(app);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all cursor-pointer group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-white group-hover:text-blue-400 transition-colors">
                      {app.name}
                    </span>
                    <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                      {app.id}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {app.priorityReason}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      app.reviewPriority === "HIGH"
                        ? "destructive"
                        : app.reviewPriority === "MEDIUM"
                        ? "warning"
                        : "success"
                    }
                    size="sm"
                  >
                    {app.reviewPriority}
                  </Badge>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-xs text-slate-500">
              No matching applications found.
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
          <span>AICTE PS 26261 Decision Support Index</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
}
