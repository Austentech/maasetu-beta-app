import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * MaaSetu button system.
 *
 * All variants use pill geometry and meet WCAG AA contrast:
 * - primary   — interactive brand pink (#DC0E36) with white text (5.05:1)
 * - outline   — burgundy text on white with a soft brand border
 * - onDark    — white fill with burgundy text, for the deep burgundy band
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-xs hover:bg-brand-600 active:bg-brand-700",
        outline:
          "border border-brand-200 bg-card text-brand-700 shadow-xs hover:border-brand-300 hover:bg-brand-50",
        ghost: "text-foreground/80 hover:bg-accent hover:text-accent-foreground",
        onDark:
          "bg-white text-brand-700 shadow-xs hover:bg-peach-100 active:bg-peach-200",
        onDarkOutline:
          "border border-white/30 bg-transparent text-white hover:border-white/60 hover:bg-white/10",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 text-[15px]",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-7 text-base",
        icon: "size-11",
        iconSm: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
