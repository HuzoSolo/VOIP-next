"use client";

import { ComponentHeader } from "@/app/docs/components/component-header";
import { ExampleShowcase } from "@/app/docs/components/example-showcase";
import { PropsTable, type PropDefinition } from "@/app/docs/components/props-table";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "../code-block";

export default function ButtonPage() {
  // Button props
  const buttonProps: PropDefinition[] = [
    {
      name: "variant",
      type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
      defaultValue: "'default'",
      description: "The visual style of the button.",
    },
    {
      name: "size",
      type: "'default' | 'sm' | 'lg' | 'icon'",
      defaultValue: "'default'",
      description: "The size of the button.",
    },
    {
      name: "asChild",
      type: "boolean",
      defaultValue: "false",
      description: "Change the default rendered element for the one passed as a child, merging their props and behavior.",
    },
  ];

  const importCode = `import { Button } from "@/components/ui/button"`;

  return (
    <div>
      <ComponentHeader
        title="Button"
        description="An interactive element that enables users to trigger an action or event."
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <p>The Button component is pre-installed in your project.</p>
        <CodeBlock code={importCode} />
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Usage Examples</h2>

        <ExampleShowcase
          title="Basic Button"
          description="The default button style."
          preview={<Button>Button</Button>}
          code={`<Button>Button</Button>`}
        />

        <ExampleShowcase
          title="Button Variants"
          description="Different visual styles for the button."
          preview={
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          }
          code={`<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}
        />

        <ExampleShowcase
          title="Button Sizes"
          description="Different sizes for the button."
          preview={
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 12 7-7 7 7"></path>
                  <path d="M12 19V5"></path>
                </svg>
              </Button>
            </div>
          }
          code={`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="m5 12 7-7 7 7"></path>
    <path d="M12 19V5"></path>
  </svg>
</Button>`}
        />

        <ExampleShowcase
          title="Disabled Button"
          description="Button in a disabled state."
          preview={<Button disabled>Disabled</Button>}
          code={`<Button disabled>Disabled</Button>`}
        />

        <ExampleShowcase
          title="With Icon"
          description="Button with an icon and text."
          preview={
            <Button>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
              Continue
            </Button>
          }
          code={`<Button>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mr-2 h-4 w-4">
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
  Continue
</Button>`}
        />

        <ExampleShowcase
          title="Full Width"
          description="Button that takes the full width of its container."
          preview={<Button className="w-full">Full Width Button</Button>}
          code={`<Button className="w-full">Full Width Button</Button>`}
        />

        <ExampleShowcase
          title="As Link"
          description="Using the asChild prop to render the Button as a link."
          preview={
            <Button asChild>
              <a href="#" onClick={(e) => e.preventDefault()}>Link Button</a>
            </Button>
          }
          code={`<Button asChild>
  <a href="/dashboard">Link Button</a>
</Button>`}
        />
      </section>

      <PropsTable props={buttonProps} />

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Accessibility</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Buttons use a native <code>&lt;button&gt;</code> element by default for proper accessibility.</li>
          <li>When using the <code>asChild</code> prop with a link, make sure it has an appropriate <code>href</code> attribute.</li>
          <li>For icon-only buttons, consider adding an <code>aria-label</code> attribute to provide context to screen readers.</li>
        </ul>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Implementation Details</h2>
        <p>
          The Button component is built using <a href="https://cva.style/docs" className="text-primary underline" target="_blank" rel="noopener noreferrer">class-variance-authority</a> for managing variants and <a href="https://www.radix-ui.com/primitives/docs/utilities/slot" className="text-primary underline" target="_blank" rel="noopener noreferrer">Radix UI Slot</a> for composition.
        </p>
        <p>
          It supports all standard button attributes such as <code>type</code>, <code>disabled</code>, <code>onClick</code>, etc., and can be styled further with Tailwind CSS classes.
        </p>
      </section>
    </div>
  );
} 