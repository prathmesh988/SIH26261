"use client";

import React, { useState, useEffect } from "react";
import { NavigationBar } from "@/components/navigation-bar";
import { MetricOverview } from "@/components/metric-overview";
import { ReviewQueueTable } from "@/components/review-queue-table";
import { EvidenceInspectorModal } from "@/components/evidence-inspector-modal";
import { ChecklistConfigurator } from "@/components/checklist-configurator";
import { AuditTrailView } from "@/components/audit-trail-view";
import { CommandPalette } from "@/components/command-palette";
import { Spotlight } from "@/components/ui/spotlight";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_APPLICATIONS, ApplicationRecord } from "@/data/mock-data";
import { ShieldCheck, Sparkles, AlertCircle, FileSearch, CheckCircle2, ArrowRight } from "lucide-react";

export default function Home() {
  const [applications, setApplications] = useState<ApplicationRecord[]>(MOCK_APPLICATIONS);
  const [selectedApp, setSelectedApp] = useState<ApplicationRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"queue" | "config" | "audit">("queue");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [currentRole, setCurrentRole] = useState("Dr. R. Sharma (Scrutiny Officer)");

  // Compute live stats
  const stats = {
    totalApplications: applications.length,
    highPriority: applications.filter((a) => a.reviewPriority === "HIGH").length,
    mediumPriority: applications.filter((a) => a.reviewPriority === "MEDIUM").length,
    lowPriority: applications.filter((a) => a.reviewPriority === "LOW").length,
    flaggedDiscrepancies: applications.reduce((acc, a) => acc + a.flagsCount, 0),
    verifiedSourcesRate: 94.2,
  };

  const handleSelectApplication = (app: ApplicationRecord) => {
    setSelectedApp(app);
    setIsModalOpen(true);
  };

  const handleUpdateApplication = (updatedApp: ApplicationRecord) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === updatedApp.id ? updatedApp : app))
    );
    setSelectedApp(updatedApp);
  };

  // Keyboard shortcut listener for Command Menu
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080b11] text-slate-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-white">
      {/* Eldora UI Ambient Glow Spotlight */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20 opacity-30" fill="#3b82f6" />

      {/* Top Navigation */}
      <NavigationBar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        onSearchClick={() => setIsCommandOpen(true)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
        {/* Hero Section & Pitch Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <Badge variant="default" size="sm" className="font-semibold text-[11px] bg-blue-600/20 text-blue-400 border-blue-500/30">
                AICTE PS 26261 Solution Prototype
              </Badge>
              <Badge variant="outline" size="sm" className="text-[11px] text-slate-400 border-slate-700">
                Smart India Hackathon 2026
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI-Assisted Application Validation & Compliance Screening
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              &quot;We turn hours of manual document scrutiny into a prioritized, evidence-backed review queue, so officials spend their time on the applications that actually have problems, with every flag explainable and every final decision still theirs.&quot;
            </p>
          </div>

          {/* Quick Demo Action Trigger for Worked Example */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <Button
              variant="luxury"
              size="default"
              onClick={() => {
                const apexApp = applications.find((a) => a.id === "AICTE-2026-EOA-98104");
                if (apexApp) handleSelectApplication(apexApp);
              }}
              className="gap-2 shadow-lg shadow-blue-500/25"
            >
              <Sparkles className="h-4 w-4" />
              <span>Launch Worked Demo Case</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
            <span className="text-[11px] font-mono text-slate-400">
              Opens Apex Inst (3 Critical Evidence Flags)
            </span>
          </div>
        </div>

        {/* Executive Metric Bento Grid Overview */}
        <MetricOverview
          stats={stats}
          onFilterPriority={(p) => setPriorityFilter(p)}
          activePriorityFilter={priorityFilter}
        />

        {/* Tabbed Content Areas */}
        {activeTab === "queue" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">
                  Review-Priority Queue
                </h3>
                <p className="text-xs text-slate-400">
                  Applications ordered strictly by rule-based severity and discrepancies detected.
                </p>
              </div>

              {priorityFilter && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setPriorityFilter(null)}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Clear Priority Filter ({priorityFilter})
                </Button>
              )}
            </div>

            <ReviewQueueTable
              applications={applications}
              onSelectApplication={handleSelectApplication}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              priorityFilter={priorityFilter}
              onClearPriorityFilter={() => setPriorityFilter(null)}
            />
          </div>
        )}

        {activeTab === "config" && <ChecklistConfigurator />}

        {activeTab === "audit" && <AuditTrailView applications={applications} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-6 mt-16 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <span className="font-semibold text-slate-200">
                AICTE Application Validation • Problem Statement PS 26261
              </span>
              <p className="text-[11px] text-slate-500">
                Team Conquerors • Ministry of Education • SIH 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
            <span>Decision Support Safeguards: Active</span>
            <span>•</span>
            <span>Zero Auto-Approve / Reject</span>
            <span>•</span>
            <span>Append-Only Audit</span>
          </div>
        </div>
      </footer>

      {/* Side-by-side Evidence Inspector Modal (Centrepiece) */}
      <EvidenceInspectorModal
        application={selectedApp}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdateApplication={handleUpdateApplication}
      />

      {/* Kibo UI / Origin UI Command Palette */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        applications={applications}
        onSelectApplication={handleSelectApplication}
      />
    </div>
  );
}
