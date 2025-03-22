"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "./code-block";

interface ExampleShowcaseProps {
  title: string;
  description?: string;
  preview: React.ReactNode;
  code: string;
  className?: string;
}

export function ExampleShowcase({
  title,
  description,
  preview,
  code,
  className,
}: ExampleShowcaseProps) {
  return (
    <div className={cn("my-6 space-y-4", className)}>
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      
      <Tabs defaultValue="preview" className="w-full">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="p-6 border rounded-md mt-2">
          <div className="flex items-center justify-center min-h-[100px]">
            {preview}
          </div>
        </TabsContent>
        <TabsContent value="code" className="mt-2">
          <CodeBlock code={code} />
        </TabsContent>
      </Tabs>
    </div>
  );
} 