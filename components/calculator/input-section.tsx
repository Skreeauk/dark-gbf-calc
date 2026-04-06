"use client"

import { ChevronDown } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface InputSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function InputSection({
  title,
  children,
  defaultOpen,
}: InputSectionProps) {
  return (
    <Collapsible defaultOpen={defaultOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
        <span>{title}</span>
        <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 rounded-lg border px-4 py-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}
