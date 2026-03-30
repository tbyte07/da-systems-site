import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,255,255,0.12)]",
        accent:
          "bg-[#8a95ff] text-black hover:opacity-85 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(138,149,255,0.32)]",
        ghost:
          "border border-white/20 text-white bg-transparent hover:bg-white/6 hover:border-white/40",
        nav: "bg-[#8a95ff] text-black hover:opacity-85 hover:scale-[1.02]",
      },
      size: {
        default: "px-8 py-3.5 text-[15px]",
        sm: "px-5 py-2.5 text-[13px]",
        lg: "px-10 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
