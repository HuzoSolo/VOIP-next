"use client";

import { cn } from "@/lib/utils";

interface ComponentHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export function ComponentHeader({
  title,
  description,
  className,
}: ComponentHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground text-lg">{description}</p>
      <hr className="my-4" />
    </div>
  );
} 