"use client"

import { GridLayout } from "@/components/grid/grid-layout"

export default function Page() {
  return (
    <div className="mx-auto min-h-screen max-w-7xl p-4 md:p-6 lg:p-8">
      <h1 className="mb-6 text-3xl font-bold">Grid Builder</h1>
      <GridLayout />
    </div>
  )
}
