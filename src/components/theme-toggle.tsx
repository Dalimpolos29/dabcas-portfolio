"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Both icons are always rendered and CSS picks the visible one. That keeps the
  // server and client markup identical, so there's no hydration mismatch and no
  // need to track a "mounted" flag.
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle colour theme"
      className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
    >
      <Moon className="size-4 dark:hidden" />
      <Sun className="hidden size-4 dark:block" />
    </button>
  );
}
