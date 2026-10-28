"use client";

import React, { useState } from "react";
import { CategoryChecklistRule, INITIAL_CHECKLIST_RULES } from "@/data/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Sliders,
  Plus,
  CheckCircle2,
  AlertCircle,
  FileCode,
  ShieldCheck,
  Save,
  Trash2,
} from "lucide-react";

export function ChecklistConfigurator() {
  const [rules, setRules] = useState<CategoryChecklistRule[]>(INITIAL_CHECKLIST_RULES);
  const [activeCategory, setActiveCategory] = useState("EoA Renewal");
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // New rule state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDocName, setNewDocName] = useState("");
  const [newValidityCheck, setNewValidityCheck] = useState("");
  const [newCrossCheck, setNewCrossCheck] = useState("");

  const filteredRules = rules.filter((r) => r.category === activeCategory);

  const handleToggleMandatory = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isMandatory: !r.isMandatory } : r))
    );
    showNotice("Mandatory flag updated for rule " + id);
  };

  const handleToggleActive = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r))
    );
    showNotice("Rule active status toggled for " + id);
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName) return;

    const newRule: CategoryChecklistRule = {
      id: `RULE-CUSTOM-${Date.now().toString().slice(-4)}`,
      category: activeCategory,
      documentName: newDocName,
      isMandatory: true,
      validityCheck: newValidityCheck || "Standard validity verification under APH regulations",
      crossCheckRule: newCrossCheck || "Cross-check against institutional master registry",
      lastUpdated: "Just now by AICTE Admin",
      isActive: true,
    };

    setRules([newRule, ...rules]);
    setNewDocName("");
    setNewValidityCheck("");
    setNewCrossCheck("");
    setShowAddForm(false);
    showNotice(`Added new regulatory rule for ${activeCategory}`);
  };

  const showNotice = (msg: string) => {
    setSavedNotice(msg);
    setTimeout(() => setSavedNotice(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="h-5 w-5 text-blue-400" />
              Configurable Regulatory Checklists & Rules Engine
            </h2>
            <Badge variant="default" size="sm" className="font-mono text-[10px]">
              Admin Control
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Map application categories to mandatory documents, validity spans, and cross-document validation algorithms.
          </p>
        </div>

        <Button
          size="sm"
          variant="luxury"
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-xs gap-1.5"
        >
          <Plus className="h-3.5 w-3.5" />
          {showAddForm ? "Cancel" : "Add Regulatory Rule"}
        </Button>
      </div>

      {savedNotice && (
        <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{savedNotice}</span>
        </div>
      )}

      {/* Category selector */}
      <div className="flex items-center gap-2">
        {["EoA Renewal", "New Technical Institute", "Increase in Intake"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeCategory === cat
                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Add New Rule Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddRule}
          className="rounded-xl border border-blue-500/40 bg-slate-900/90 p-5 space-y-3 backdrop-blur-md"
        >
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Define New Regulatory Rule for {activeCategory}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="text-slate-300 font-medium block mb-1">
                Document / Evidence Name
              </label>
              <input
                type="text"
                value={newDocName}
                onChange={(e) => setNewDocName(e.target.value)}
                placeholder="e.g. Society Land Registration Deed"
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-1.5 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="text-slate-300 font-medium block mb-1">
                Validity Condition
              </label>
              <input
                type="text"
                value={newValidityCheck}
                onChange={(e) => setNewValidityCheck(e.target.value)}
                placeholder="e.g. Must not expire prior to academic session"
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-1.5 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-slate-300 font-medium block mb-1">
                Cross-Check Algorithm
              </label>
              <input
                type="text"
                value={newCrossCheck}
                onChange={(e) => setNewCrossCheck(e.target.value)}
                placeholder="e.g. Verify trust registration name vs Form-A"
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-1.5 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="default" size="sm" className="bg-blue-600">
              Save & Activate Rule
            </Button>
          </div>
        </form>
      )}

      {/* Rules Table / Cards */}
      <div className="grid grid-cols-1 gap-3">
        {filteredRules.map((rule) => (
          <div
            key={rule.id}
            className={`rounded-xl border p-4 transition-all backdrop-blur-md ${
              rule.isActive
                ? "border-slate-800 bg-slate-900/60"
                : "border-slate-800/40 bg-slate-950/40 opacity-60"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/60 pb-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-[10px] text-blue-400 border-blue-500/30">
                  {rule.id}
                </Badge>
                <h4 className="font-semibold text-white text-sm">
                  {rule.documentName}
                </h4>
                {rule.isMandatory ? (
                  <Badge variant="destructive" size="sm">
                    Mandatory Checklist Item
                  </Badge>
                ) : (
                  <Badge variant="secondary" size="sm">
                    Optional / Conditional
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Mandatory:</span>
                  <Switch
                    checked={rule.isMandatory}
                    onCheckedChange={() => handleToggleMandatory(rule.id)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Active Rule:</span>
                  <Switch
                    checked={rule.isActive}
                    onCheckedChange={() => handleToggleActive(rule.id)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 text-xs">
              <div className="rounded-lg bg-slate-950/60 border border-slate-800/80 p-2.5 space-y-1">
                <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                  Validity & Expiry Rules
                </span>
                <p className="text-slate-300 font-mono text-[11px]">
                  {rule.validityCheck}
                </p>
              </div>

              <div className="rounded-lg bg-slate-950/60 border border-slate-800/80 p-2.5 space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  Cross-Document Matching Rule
                </span>
                <p className="text-slate-300 font-mono text-[11px]">
                  {rule.crossCheckRule}
                </p>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-slate-500 font-mono flex items-center justify-between">
              <span>{rule.lastUpdated}</span>
              <span className="text-slate-400">Enforced by AICTE Scrutiny Engine</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
