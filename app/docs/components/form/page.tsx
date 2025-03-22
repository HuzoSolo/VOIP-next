"use client";

import { ComponentHeader } from "@/app/docs/components/component-header";
import { ExampleShowcase } from "@/app/docs/components/example-showcase";
import { PropsTable, type PropDefinition } from "@/app/docs/components/props-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { CodeBlock } from "../code-block";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function FormPage() {
  // Form component props
  const formComponentProps: PropDefinition[] = [
    {
      name: "children",
      type: "React.ReactNode",
      description: "The form content, typically a form element with form fields.",
      required: true,
    },
    {
      name: "...formProviderProps",
      type: "FormProviderProps",
      description: "Props for the underlying react-hook-form FormProvider.",
    },
  ];

  const formFieldProps: PropDefinition[] = [
    {
      name: "name",
      type: "string",
      description: "Field name to register with react-hook-form.",
      required: true,
    },
    {
      name: "control",
      type: "Control",
      description: "Control from useForm.",
      required: true,
    },
    {
      name: "render",
      type: "({ field, fieldState, formState }) => React.ReactElement",
      description: "Function that renders the field component.",
      required: true,
    },
  ];

  const formItemProps: PropDefinition[] = [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to add to the form item.",
    },
  ];

  const formLabelProps: PropDefinition[] = [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to add to the form label.",
    },
  ];

  const formControlProps: PropDefinition[] = [
    {
      name: "children",
      type: "React.ReactNode",
      description: "The form control component (e.g., Input, Select, etc.).",
      required: true,
    },
  ];

  const formDescriptionProps: PropDefinition[] = [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to add to the form description.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "The description text.",
      required: true,
    },
  ];

  const formMessageProps: PropDefinition[] = [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to add to the form message.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "The error message text. If not provided, the error from the form state will be used.",
    },
  ];

  const importCode = `import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

// Don't forget to install these dependencies
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"`;

  const basicFormCode = `// Define your form schema
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

// Create your form component
function ProfileForm() {
  // 1. Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  // 2. Define a submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values
    console.log(values)
  }

  // 3. Render the form
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormDescription>
                We'll never share your email with anyone else.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}`;

  // Schema for the form example
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
  });

  // Form example component
  function ProfileFormExample() {
    // 1. Define your form
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        email: "",
      },
    });

    // 2. Define a submit handler
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Just for demo
      console.log(values);
    }

    // 3. Render the form
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  We'll never share your email with anyone else.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  }

  // Schema for the checkbox form example
  const checkboxFormSchema = z.object({
    items: z.array(z.string()).nonempty({
      message: "You have to select at least one item.",
    }),
  });

  // Checkbox items
  const items = [
    {
      id: "recents",
      label: "Recent items",
    },
    {
      id: "home",
      label: "Home screen",
    },
    {
      id: "applications",
      label: "Applications",
    },
  ] as const;

  // Checkbox form example component
  function CheckboxFormExample() {
    const form = useForm<z.infer<typeof checkboxFormSchema>>({
      resolver: zodResolver(checkboxFormSchema),
      defaultValues: {
        items: [],
      },
    });

    function onSubmit(data: z.infer<typeof checkboxFormSchema>) {
      console.log(data);
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="items"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Sidebar items</FormLabel>
                  <FormDescription>
                    Select the items to display in the sidebar.
                  </FormDescription>
                </div>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  }

  const checkboxFormCode = `import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"

// Schema for the checkbox form
const FormSchema = z.object({
  items: z.array(z.string()).nonempty({
    message: "You have to select at least one item.",
  }),
})

// Checkbox items
const items = [
  {
    id: "recents",
    label: "Recent items",
  },
  {
    id: "home",
    label: "Home screen",
  },
  {
    id: "applications",
    label: "Applications",
  },
] as const

function CheckboxForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Sidebar items</FormLabel>
                <FormDescription>
                  Select the items to display in the sidebar.
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}`;

  return (
    <div>
      <ComponentHeader
        title="Form"
        description="A collection of components for building forms with React Hook Form and Zod validation."
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <p>The Form components are pre-installed in your project, but they require some additional dependencies.</p>
        <CodeBlock code={importCode} />
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p>
          The Form components are built on top of <a href="https://react-hook-form.com/" className="text-primary underline" target="_blank" rel="noopener noreferrer">React Hook Form</a> and integrate with <a href="https://zod.dev/" className="text-primary underline" target="_blank" rel="noopener noreferrer">Zod</a> for form validation. This combination provides a powerful and type-safe way to build forms in React.
        </p>
        <p>
          The form components include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><code>Form</code>: Wraps the form and provides the React Hook Form context</li>
          <li><code>FormField</code>: Connects a form field to React Hook Form</li>
          <li><code>FormItem</code>: Container for form elements</li>
          <li><code>FormLabel</code>: Label for form fields</li>
          <li><code>FormControl</code>: Adds proper attributes to form controls</li>
          <li><code>FormDescription</code>: Help text for form fields</li>
          <li><code>FormMessage</code>: Displays validation errors</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Usage Examples</h2>

        <ExampleShowcase
          title="Basic Form"
          description="A basic form with validation."
          preview={<ProfileFormExample />}
          code={basicFormCode}
        />

        <ExampleShowcase
          title="Checkbox Group Form"
          description="A form with a group of checkboxes."
          preview={<CheckboxFormExample />}
          code={checkboxFormCode}
        />
      </section>

      <section className="mt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Form Components</h2>
        
        <div>
          <h3 className="text-xl font-medium mb-4">Form</h3>
          <p className="mb-4">Wraps the form and provides the React Hook Form context.</p>
          <PropsTable props={formComponentProps} />
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-4">FormField</h3>
          <p className="mb-4">Connects a form field to React Hook Form.</p>
          <PropsTable props={formFieldProps} />
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-4">FormItem</h3>
          <p className="mb-4">Container for form elements.</p>
          <PropsTable props={formItemProps} />
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-4">FormLabel</h3>
          <p className="mb-4">Label for form fields.</p>
          <PropsTable props={formLabelProps} />
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-4">FormControl</h3>
          <p className="mb-4">Adds proper attributes to form controls.</p>
          <PropsTable props={formControlProps} />
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-4">FormDescription</h3>
          <p className="mb-4">Help text for form fields.</p>
          <PropsTable props={formDescriptionProps} />
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-4">FormMessage</h3>
          <p className="mb-4">Displays validation errors.</p>
          <PropsTable props={formMessageProps} />
        </div>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Best Practices</h2>
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Form Structure</h3>
          <p>
            For a consistent form structure, follow this pattern:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li>Define a schema for your form using Zod</li>
            <li>Use <code>useForm</code> with <code>zodResolver</code> to create your form</li>
            <li>Define a submit handler function</li>
            <li>Wrap your form with the <code>Form</code> component</li>
            <li>Use <code>FormField</code> for each field in your form</li>
            <li>Within each <code>FormField</code>, use <code>FormItem</code>, <code>FormLabel</code>, <code>FormControl</code>, <code>FormDescription</code>, and <code>FormMessage</code> as needed</li>
          </ol>
        </div>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Accessibility</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Form controls are properly associated with their labels using the <code>htmlFor</code> attribute</li>
          <li>Error messages are linked to form controls using <code>aria-describedby</code></li>
          <li>Invalid form controls are marked with <code>aria-invalid</code></li>
          <li>Form validation errors are displayed with appropriate colors and focus management</li>
        </ul>
      </section>
    </div>
  );
} 