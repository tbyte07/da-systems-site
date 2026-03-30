import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-[rgba(138,149,255,0.3)] bg-[rgba(138,149,255,0.08)] text-white/60",
        success:
          "border-[rgba(138,149,255,0.3)] bg-[rgba(138,149,255,0.06)] text-white/60",
        outline:
          "border-white/10 bg-transparent text-white/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Badge = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
));
Badge.displayName = "Badge";

export { Badge, badgeVariants };
