"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  glowColor?: "blue" | "emerald" | "amber" | "rose" | "indigo";
  className?: string;
  onClick?: () => void;
}

export function BentoCard({
  title,
  value,
  description,
  icon,
  badge,
  trend,
  glowColor = "blue",
  className,
  onClick,
}: BentoCardProps) {
  const glowClasses = {
    blue: "hover:border-blue-500/40 hover:shadow-blue-500/10",
    emerald: "hover:border-emerald-500/40 hover:shadow-emerald-500/10",
    amber: "hover:border-amber-500/40 hover:shadow-amber-500/10",
    rose: "hover:border-rose-500/40 hover:shadow-rose-500/10",
    indigo: "hover:border-indigo-500/40 hover:shadow-indigo-500/10",
  };

  const iconBgClasses = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md transition-all duration-300 hover:shadow-xl cursor-default",
        onClick && "cursor-pointer active:scale-[0.99]",
        glowClasses[glowColor],
        className
      )}
    >
      {/* Ambient gradient layer */}
      <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-transparent" />

      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium tracking-wide uppercase text-slate-400">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h4 className="text-2xl font-bold tracking-tight text-white font-mono">
              {value}
            </h4>
            {trend && (
              <span
                className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-emerald-400" : "text-rose-400"
                )}
              >
                {trend.value}
              </span>
            )}
          </div>
        </div>

        {icon && (
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg border",
              iconBgClasses[glowColor]
            )}
          >
            {icon}
          </div>
        )}
      </div>

      {(description || badge) && (
        <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-800/50">
          {description && (
            <p className="text-xs text-slate-400 line-clamp-1">{description}</p>
          )}
          {badge && <div>{badge}</div>}
        </div>
      )}
    </div>
  );
}
