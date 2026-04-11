"use client"

import { useCalculatorStore } from "@/lib/store/calculator-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function FinalDamageOutput() {
  const outputs = useCalculatorStore((state) => state.outputs)

  const formatDamage = (value: number) => {
    const formatted = value.toFixed(2).replace(/\.00$/, "")
    return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Final Damage Output</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-sm font-medium">Normal (Standard Cap)</span>
          <span className="text-lg font-semibold tabular-nums">
            {formatDamage(outputs.finalDamage.normalStandard)}
          </span>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-sm font-medium">Normal (Assassin Cap)</span>
          <span className="text-lg font-semibold tabular-nums">
            {formatDamage(outputs.finalDamage.normalAssassin)}
          </span>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-sm font-medium">Critical (Standard Cap)</span>
          <span className="text-lg font-semibold tabular-nums">
            {formatDamage(outputs.finalDamage.criticalStandard)}
          </span>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-sm font-medium">Critical (Assassin Cap)</span>
          <span className="text-lg font-semibold tabular-nums">
            {formatDamage(outputs.finalDamage.criticalAssassin)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">CA Damage</span>
          <span className="text-lg font-semibold tabular-nums">
            {formatDamage(outputs.finalDamage.caDamage)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
