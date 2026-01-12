import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "outline" | "soft";
  size?: "sm" | "md" | "lg";
};

export default function AppButton({
  children,
  href,
  className,
  variant = "primary",
  size = "md",
}: AppButtonProps) {
  const variants = {
    primary:
      "bg-yellow-400 text-white hover:bg-yellow-500 shadow-md hover:shadow-lg",
    outline:
      "bg-yellow-400 border-2 border-white text-white hover:bg-white hover:text-yellow-500",
    soft: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
  };

  const sizes = {
    sm: "h-8 px-4 text-sm",
    md: "h-10 px-6 text-base",
    lg: "h-12 px-8 text-lg",
  };

  if (href) {
    return (
      <Button asChild className={cn(variants[variant], sizes[size], className)}>
        <Link href={href}>{children}</Link>
      </Button>
    );
  }

  return (
    <Button className={cn(variants[variant], sizes[size], className)}>
      {children}
    </Button>
  );
}
