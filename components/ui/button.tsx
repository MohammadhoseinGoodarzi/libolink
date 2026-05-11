import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[9.75px] text-[13px] font-medium leading-none pb-[2px] transition-colors duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-brand-primary/91 text-white hover:bg-brand-primary/80 focus-visible:ring-brand-primary/50 active:bg-brand-primary/70",
        outline:
          "bg-brand-surface text-brand-primary hover:bg-brand-surface-hover focus-visible:ring-brand-primary active:bg-brand-surface-active",
        ghost:
          "bg-transparent text-brand-primary hover:bg-brand-surface focus-visible:ring-brand-primary/50 active:bg-brand-surface-hover",
        destructive:
          "rounded-[12px] bg-brand-accent text-white text-[20px] font-bold pb-[4px] hover:bg-brand-accent/90 focus-visible:ring-brand-accent active:bg-brand-accent/80",
        post: "bg-brand-primary text-brand-soft font-semibold shadow-[0px_4px_6px_-1px_var(--color-brand-glow),0px_2px_4px_-2px_var(--color-brand-glow)] hover:opacity-90 focus-visible:ring-brand-glow active:opacity-75",
      },
      size: {
        default: "h-[42px] px-6",
        sm: "h-8 px-3 text-xs",
        lg: "h-[52px] px-8",
        icon: "h-9 w-9",
        post: "h-[19px] px-[10px] text-[11px]",
      },
    },
    compoundVariants: [
      { variant: "destructive", size: "default", class: "h-[52px]" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
