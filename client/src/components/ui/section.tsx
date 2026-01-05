import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Section({ container = true, className, children, ...props }: SectionProps) {
  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      {container ? (
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
