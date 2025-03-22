"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface PropDefinition {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  props: PropDefinition[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold mb-4">Props</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Default</TableHead>
            <TableHead className="w-[50%]">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((prop) => (
            <TableRow key={prop.name}>
              <TableCell className="font-medium">
                {prop.name}
                {prop.required && <span className="text-destructive ml-1">*</span>}
              </TableCell>
              <TableCell>
                <code className="text-sm bg-muted px-1 py-0.5 rounded">
                  {prop.type}
                </code>
              </TableCell>
              <TableCell>
                {prop.defaultValue ? (
                  <code className="text-sm bg-muted px-1 py-0.5 rounded">
                    {prop.defaultValue}
                  </code>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell>{prop.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 