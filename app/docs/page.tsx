export const metadata = {
  title: "VOIP Next UI Documentation",
  description: "Component documentation for VOIP Next UI components",
}

export default function DocsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">VOIP Next UI Documentation</h1>
        <p className="text-muted-foreground text-lg mt-2">
          Comprehensive guide to using VOIP Next UI components
        </p>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Introduction</h2>
        <p>
          VOIP Next UI is a collection of reusable UI components built with Tailwind CSS and Radix UI. 
          These components are designed to help you build beautiful and accessible user interfaces.
        </p>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Getting Started</h2>
        <p>
          All components in this library are pre-installed in your VOIP Next project.
          Simply import them from their respective modules and use them in your pages or components.
        </p>
        
        <div className="bg-muted p-4 rounded-md">
          <pre className="text-sm">
            <code>
              {`// Example import
import { Button } from '@/components/ui/button';

// Using the component
<Button>Click me</Button>`}
            </code>
          </pre>
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Component Structure</h2>
        <p>
          Each component documentation page includes:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Component overview and description</li>
          <li>Usage examples with code snippets</li>
          <li>Props and configuration options</li>
          <li>Variants and sizes (where applicable)</li>
          <li>Accessibility considerations</li>
        </ul>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Featured Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a href="/docs/components/button" className="block group">
            <div className="rounded-lg border p-4 hover:border-primary">
              <h3 className="text-lg font-medium group-hover:underline">Button</h3>
              <p className="text-sm text-muted-foreground">
                Interactive button with multiple variants and sizes
              </p>
            </div>
          </a>
          <a href="/docs/components/card" className="block group">
            <div className="rounded-lg border p-4 hover:border-primary">
              <h3 className="text-lg font-medium group-hover:underline">Card</h3>
              <p className="text-sm text-muted-foreground">
                Container for grouping related content and actions
              </p>
            </div>
          </a>
          <a href="/docs/components/form" className="block group">
            <div className="rounded-lg border p-4 hover:border-primary">
              <h3 className="text-lg font-medium group-hover:underline">Form</h3>
              <p className="text-sm text-muted-foreground">
                Form components with validation integration
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
} 