"use client"

import { useCalculatorStore } from "@/lib/store/calculator-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DamageOutput() {
  const outputs = useCalculatorStore((state) => state.outputs)

  const formatDamage = (value: number) => {
    const formatted = value.toFixed(2).replace(/\.00$/, "")
    return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Damage Output</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-sm font-medium">Base Damage</span>
          <span className="text-lg font-semibold tabular-nums">
            {formatDamage(outputs.baseDamage)}
          </span>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-sm font-medium">Normal Damage</span>
          <span className="text-lg font-semibold tabular-nums">
            {formatDamage(outputs.normalDamage)}
          </span>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-sm font-medium">Critical Damage</span>
          <span className="text-lg font-semibold tabular-nums">
            {formatDamage(outputs.criticalDamage)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">CA Damage</span>
          <span className="text-lg font-semibold tabular-nums">
            {formatDamage(outputs.caDamage)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
