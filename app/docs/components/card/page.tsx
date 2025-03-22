"use client";

import { ComponentHeader } from "@/app/docs/components/component-header";
import { ExampleShowcase } from "@/app/docs/components/example-showcase";
import { PropsTable, type PropDefinition } from "@/app/docs/components/props-table";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { CodeBlock } from "../code-block";

export default function CardPage() {
  // Card props
  const cardProps: PropDefinition[] = [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to add to the card.",
    },
  ];

  // Common props for all card sub-components
  const commonSubComponentProps: PropDefinition[] = [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to add to the component.",
    },
  ];

  const importCode = `import { 
  Card,
  CardHeader,
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card"`;

  return (
    <div>
      <ComponentHeader
        title="Card"
        description="A container component that displays content and actions about a single subject."
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <p>The Card component and its sub-components are pre-installed in your project.</p>
        <CodeBlock code={importCode} />
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Usage Examples</h2>

        <ExampleShowcase
          title="Basic Card"
          description="A simple card with basic content."
          preview={
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          }
          code={`<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>`}
        />

        <ExampleShowcase
          title="Profile Card"
          description="A card displaying user profile information."
          preview={
            <Card className="w-[350px]">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2 h-12 w-12 flex items-center justify-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div>
                    <CardTitle>John Doe</CardTitle>
                    <CardDescription>Software Developer</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Email:</span> john.doe@example.com
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Location:</span> San Francisco, CA
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Joined:</span> January 2023
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">View Profile</Button>
                <Button size="sm">Contact</Button>
              </CardFooter>
            </Card>
          }
          code={`<Card className="w-[350px]">
  <CardHeader>
    <div className="flex items-center gap-4">
      <div className="rounded-full bg-primary/10 p-2 h-12 w-12 flex items-center justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
      <div>
        <CardTitle>John Doe</CardTitle>
        <CardDescription>Software Developer</CardDescription>
      </div>
    </div>
  </CardHeader>
  <CardContent>
    <div className="space-y-2">
      <div className="text-sm">
        <span className="font-medium">Email:</span> john.doe@example.com
      </div>
      <div className="text-sm">
        <span className="font-medium">Location:</span> San Francisco, CA
      </div>
      <div className="text-sm">
        <span className="font-medium">Joined:</span> January 2023
      </div>
    </div>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline" size="sm">View Profile</Button>
    <Button size="sm">Contact</Button>
  </CardFooter>
</Card>`}
        />

        <ExampleShowcase
          title="Notification Card"
          description="A card displaying a notification with action buttons."
          preview={
            <Card className="w-[350px]">
              <CardHeader className="pb-2">
                <CardTitle>New Message</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">You have a new message from <span className="font-medium">Alice Johnson</span>.</p>
                <p className="text-muted-foreground text-sm mt-1">2 minutes ago</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="ghost" size="sm">Dismiss</Button>
                <Button size="sm">View</Button>
              </CardFooter>
            </Card>
          }
          code={`<Card className="w-[350px]">
  <CardHeader className="pb-2">
    <CardTitle>New Message</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-sm">You have a new message from <span className="font-medium">Alice Johnson</span>.</p>
    <p className="text-muted-foreground text-sm mt-1">2 minutes ago</p>
  </CardContent>
  <CardFooter className="flex justify-end gap-2">
    <Button variant="ghost" size="sm">Dismiss</Button>
    <Button size="sm">View</Button>
  </CardFooter>
</Card>`}
        />
      </section>

      <section className="mt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Card Components</h2>
        
        <div>
          <h3 className="text-xl font-medium mb-4">Card</h3>
          <p className="mb-4">The main container component.</p>
          <PropsTable props={cardProps} />
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-4">CardHeader</h3>
          <p className="mb-4">Container for the card title and description. Typically placed at the top of the card.</p>
          <PropsTable props={commonSubComponentProps} />
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-4">CardTitle</h3>
          <p className="mb-4">The title of the card. Typically placed inside a CardHeader.</p>
          <PropsTable props={commonSubComponentProps} />
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-4">CardDescription</h3>
          <p className="mb-4">A description providing additional information. Typically placed inside a CardHeader after the CardTitle.</p>
          <PropsTable props={commonSubComponentProps} />
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-4">CardContent</h3>
          <p className="mb-4">The main content area of the card.</p>
          <PropsTable props={commonSubComponentProps} />
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-4">CardFooter</h3>
          <p className="mb-4">Container for actions related to the card. Typically placed at the bottom of the card.</p>
          <PropsTable props={commonSubComponentProps} />
        </div>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Design Patterns</h2>
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Component Composition</h3>
          <p>
            The Card component is designed to be composed with its related components to create a consistent structure:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><code>Card</code>: The main container</li>
            <li><code>CardHeader</code>: Contains the title and description</li>
            <li><code>CardTitle</code>: The title of the card</li>
            <li><code>CardDescription</code>: Additional information about the card</li>
            <li><code>CardContent</code>: The main content area</li>
            <li><code>CardFooter</code>: Contains actions related to the card</li>
          </ul>
        </div>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Accessibility</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Cards are semantic containers that group related content.</li>
          <li>Use semantic heading elements within <code>CardTitle</code> for proper document structure.</li>
          <li>Ensure sufficient color contrast between the card background and its content.</li>
        </ul>
      </section>
    </div>
  );
} 