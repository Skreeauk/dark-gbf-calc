"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavBar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold text-foreground transition-colors hover:text-primary"
        >
          GBF Calc
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              isActive("/")
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Calculator
          </Link>
          <Link
            href="/grid"
            className={`text-sm font-medium transition-colors ${
              isActive("/grid")
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Grid Builder
          </Link>
        </div>
      </div>
    </nav>
  )
}
