import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  shortcut?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, shortcut, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-3 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-lg border border-slate-700/70 bg-slate-900/80 px-3 py-1 text-sm text-slate-100 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pl-9",
            shortcut && "pr-12",
            className
          )}
          ref={ref}
          {...props}
        />
        {shortcut && (
          <div className="absolute right-2.5 flex items-center pointer-events-none">
            <kbd className="rounded border border-slate-700 bg-slate-800/80 px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400">
              {shortcut}
            </kbd>
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
