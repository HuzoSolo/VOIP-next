export const metadata = {
  title: "Components - VOIP Next UI Documentation",
  description: "All available UI components in the VOIP Next library",
}

export default function ComponentsPage() {
  const components = [
    {
      name: "Accordion",
      description: "A vertically stacked set of interactive headings that each reveal a section of content.",
      href: "/docs/components/accordion",
    },
    {
      name: "Alert",
      description: "Displays a callout for user attention.",
      href: "/docs/components/alert",
    },
    {
      name: "Alert Dialog",
      description: "A modal dialog that interrupts the user with important content and expects a response.",
      href: "/docs/components/alert-dialog",
    },
    {
      name: "Avatar",
      description: "An image element with a fallback for representing the user.",
      href: "/docs/components/avatar",
    },
    {
      name: "Badge",
      description: "Displays a small count or status indicator that appears alongside text.",
      href: "/docs/components/badge",
    },
    {
      name: "Button",
      description: "Allows users to take actions with a single click or tap.",
      href: "/docs/components/button",
    },
    {
      name: "Card",
      description: "Containers for displaying content and actions about a single subject.",
      href: "/docs/components/card",
    },
    {
      name: "Input",
      description: "Captures user input in a form field.",
      href: "/docs/components/input",
    },
    {
      name: "Form",
      description: "A set of components for building forms with validation.",
      href: "/docs/components/form",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Components</h1>
        <p className="text-muted-foreground text-lg mt-2">
          All available components in the VOIP Next UI library
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map((component) => (
          <a 
            key={component.name} 
            href={component.href} 
            className="block group"
          >
            <div className="rounded-lg border p-6 h-full hover:border-primary">
              <h3 className="text-xl font-medium group-hover:underline mb-2">
                {component.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {component.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
} 