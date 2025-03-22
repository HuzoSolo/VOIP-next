import { Inter } from 'next/font/google';
import Link from 'next/link';
import { cn } from '@/lib/utils';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const inter = Inter({ subsets: ['latin'] });

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">VOIP Next</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/docs"
                className="transition-colors hover:text-foreground/80"
              >
                Documentation
              </Link>
              <Link
                href="/docs/components"
                className="transition-colors hover:text-foreground/80"
              >
                Components
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-full py-6 pr-6 lg:py-8">
            <DocsSidebar />
          </ScrollArea>
        </aside>
        <main className="relative py-6 lg:gap-10 lg:py-8">
          <div className="mx-auto w-full min-w-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function DocsSidebar() {
  return (
    <div className="w-full">
      <div className="pb-4">
        <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
          Getting Started
        </h4>
        <div className="grid grid-flow-row auto-rows-max text-sm">
          <Link
            href="/docs"
            className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline"
          >
            Introduction
          </Link>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="pb-4">
        <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
          Components
        </h4>
        <div className="grid grid-flow-row auto-rows-max text-sm">
          <Link
            href="/docs/components/accordion"
            className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline"
          >
            Accordion
          </Link>
          <Link
            href="/docs/components/alert"
            className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline"
          >
            Alert
          </Link>
          <Link
            href="/docs/components/alert-dialog"
            className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline"
          >
            Alert Dialog
          </Link>
          <Link
            href="/docs/components/avatar"
            className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline"
          >
            Avatar
          </Link>
          <Link
            href="/docs/components/badge"
            className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline"
          >
            Badge
          </Link>
          <Link
            href="/docs/components/button"
            className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline"
          >
            Button
          </Link>
          <Link
            href="/docs/components/card"
            className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline"
          >
            Card
          </Link>
          <Link
            href="/docs/components/input"
            className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline"
          >
            Input
          </Link>
          <Link
            href="/docs/components/form"
            className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline"
          >
            Form
          </Link>
        </div>
      </div>
    </div>
  );
} 