import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export type AppButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: "primary" | "outline" | "soft";
  size?: "sm" | "md" | "lg";
};

export default function AppButton({
  children,
  href,
  className,
  variant = "primary",
  size = "md",
  ...props
}: AppButtonProps) {
  const variants = {
    primary: "bg-yellow-400 text-black hover:bg-yellow-500 shadow-sm",
    outline: "border border-yellow-400 text-yellow-700 hover:bg-yellow-50",
    soft: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
  };

  const sizes = {
    sm: "h-8 px-4 text-sm",
    md: "h-10 px-6 text-sm",
    lg: "h-12 px-8 text-base",
  };

  if (href) {
    return (
      <Button asChild className={cn(variants[variant], sizes[size], className)}>
        <Link href={href}>{children}</Link>
      </Button>
    );
  }

  return (
    <Button
      {...props}
      className={cn(variants[variant], sizes[size], className)}
    >
      {children}
    </Button>
  );
}
