import * as React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AppCardProps = {
  title?: string;
  description?: string;
  image?: string;
  badge?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  href?: string;
  className?: string;
};

export default function AppCard({
  title,
  description,
  image,
  badge,
  footer,
  children,
  href,
  className,
}: AppCardProps) {
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      href={href}
      className={cn(
        "block group h-full cursor-pointer",
        href && "hover:scale-[1.01] transition-transform"
      )}
    >
      <Card
        className={cn(
          "overflow-hidden rounded-xl border border-yellow-100 bg-white shadow-sm hover:shadow-md transition",
          className
        )}
      >
        {/* Image */}
        {image && (
          <div className="relative h-44 w-full overflow-hidden">
            <Image
              src={image}
              alt={title || "Kacchi Dine"}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />

            {badge && (
              <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow">
                {badge}
              </span>
            )}
          </div>
        )}

        {/* Header */}
        {(title || description) && (
          <CardHeader className="pb-2">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </CardHeader>
        )}

        {/* Content */}
        {children && <CardContent className="pt-2">{children}</CardContent>}

        {/* Footer */}
        {footer && (
          <CardFooter className="border-t border-yellow-100 pt-4">
            {footer}
          </CardFooter>
        )}
      </Card>
    </Wrapper>
  );
}
