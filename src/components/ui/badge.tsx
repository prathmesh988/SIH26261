import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors border",
  {
    variants: {
      variant: {
        default:
          "border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20",
        secondary:
          "border-slate-700/60 bg-slate-800/60 text-slate-300 hover:bg-slate-800",
        destructive:
          "border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20",
        warning:
          "border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20",
        success:
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20",
        purple:
          "border-purple-500/30 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20",
        cyan:
          "border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20",
        outline:
          "border-slate-700 text-slate-300",
      },
      size: {
        default: "text-xs px-2.5 py-0.5",
        sm: "text-[10px] px-2 py-0.2",
        lg: "text-sm px-3.5 py-1",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  pulse?: boolean;
}

function Badge({ className, variant, size, dot, pulse, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span className="relative flex h-2 w-2">
          {pulse && (
            <span className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              variant === "destructive" && "bg-rose-400",
              variant === "warning" && "bg-amber-400",
              variant === "success" && "bg-emerald-400",
              variant === "purple" && "bg-purple-400",
              (!variant || variant === "default") && "bg-blue-400"
            )} />
          )}
          <span className={cn(
            "relative inline-flex rounded-full h-2 w-2",
            variant === "destructive" && "bg-rose-500",
            variant === "warning" && "bg-amber-500",
            variant === "success" && "bg-emerald-500",
            variant === "purple" && "bg-purple-500",
            (!variant || variant === "default") && "bg-blue-500"
          )} />
        </span>
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
