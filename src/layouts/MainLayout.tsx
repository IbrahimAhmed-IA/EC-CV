import { Toaster } from "@/components/ui/toaster";
import type React from "react";
import type { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight">EC CV</h1>
            <span className="rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground">
              Builder
            </span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              <li>
                <a
                  href="/templates"
                  className="text-sm font-medium hover:text-primary"
                >
                  Templates
                </a>
              </li>
              <li>
                <a
                  href="/examples"
                  className="text-sm font-medium hover:text-primary"
                >
                  Examples
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-sm font-medium hover:text-primary"
                >
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container py-6">{children}</main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} EC CV Builder. All rights
            reserved.
          </p>
          <nav>
            <ul className="flex items-center gap-4">
              <li>
                <a
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default MainLayout;
