import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-indigo-600 text-white hover:bg-indigo-700",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

/* ==========================================================================
   BRANDED BUTTON COMPONENT
   A polished, interactive pill-shaped button with a "fine thread" animation.
   The inner glint moves from top to bottom on hover using inset box-shadow.
   ========================================================================== */

const brandedButtonVariants = cva(
  "relative inline-flex items-center justify-center rounded-full font-bold overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed active:translate-y-[2px] transition-transform duration-150",
  {
    variants: {
      variant: {
        default: "text-white border border-black/10",
        outline: "text-brand-600 border-2 border-brand-600",
      },
      size: {
        default: "h-11 py-2.5 px-8 text-sm",
        sm: "h-9 py-2 px-5 text-xs",
        lg: "h-14 py-3.5 px-10 text-base",
        xl: "h-16 py-4 px-12 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BrandedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof brandedButtonVariants> {}

const BrandedButton = React.forwardRef<HTMLButtonElement, BrandedButtonProps>(
  ({ className, variant, size, children, style, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const isOutline = variant === "outline";

    return (
      <button
        className={cn(brandedButtonVariants({ variant, size }), className)}
        style={{
          background: isOutline ? "#ffffff" : "oklch(56.35% 0.241 260.82)",
          boxShadow: isOutline
            ? "rgba(0, 0, 0, 0.08) 0 2px 8px -3px"
            : "oklch(39.11% 0.161 260.13) 0 4px 10px -5px",
          textShadow: isOutline ? "none" : "rgba(0, 0, 0, 0.4) 0 1px 1px",
          ...style,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={ref}
        {...props}
      >
        {/* Animated inset highlight - moves from top to bottom */}
        <span
          className="absolute inset-0 rounded-full pointer-events-none transition-all duration-[1200ms] ease-in-out"
          style={{
            boxShadow: isHovered
              ? `inset ${isOutline ? "oklch(56.35% 0.241 260.82)" : "oklch(71.49% 0.149 258.39)"} 0px 6px 0px -3px`
              : `inset ${isOutline ? "oklch(56.35% 0.241 260.82)" : "oklch(71.49% 0.149 258.39)"} 0px -6px 0px -3px`,
          }}
          aria-hidden="true"
        />

        {/* Button text */}
        <span className="relative z-10">{children}</span>
      </button>
    );
  },
);
BrandedButton.displayName = "BrandedButton";

export { Button, buttonVariants, BrandedButton, brandedButtonVariants };
