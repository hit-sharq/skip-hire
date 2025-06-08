"use client"

import { CheckCircle, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Skip } from "@/types/skip"
import { calculateTotal } from "@/lib/utils"
import { EnhancedCard, CardHeader, CardContent, CardTitle } from "../ui-elements/card"

interface SkipSelectionProps {
  skips: Skip[]
  selectedSkip: Skip | null
  onSelectSkip: (skip: Skip) => void
}

export function SkipSelection({ skips, selectedSkip, onSelectSkip }: SkipSelectionProps) {
  const getSkipDescription = (size: number) => {
    if (size <= 6) return "Perfect for small home projects, garden clearance"
    if (size <= 10) return "Ideal for medium renovations, kitchen/bathroom refits"
    if (size <= 16) return "Great for large home projects, construction waste"
    return "Commercial projects, large construction sites"
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="section-title">Choose Your Skip Size</h2>
        <p className="section-description">
          Select the perfect skip size for your project. All prices include delivery, collection, and disposal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skips.map((skip) => (
          <EnhancedCard key={skip.id} selected={selectedSkip?.id === skip.id} onClick={() => onSelectSkip(skip)}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-emerald-600">{skip.size} Yard Skip</CardTitle>
                {selectedSkip?.id === skip.id && <CheckCircle className="w-6 h-6 text-emerald-500" />}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {skip.allowed_on_road && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Road Placement OK
                  </Badge>
                )}
                {skip.allows_heavy_waste && (
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    Heavy Waste OK
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">{getSkipDescription(skip.size)}</p>

                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  {skip.hire_period_days} day hire period
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Price (excl. VAT)</span>
                    <span>£{skip.price_before_vat.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>VAT ({skip.vat}%)</span>
                    <span>£{((skip.price_before_vat * skip.vat) / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>£{calculateTotal(skip).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </EnhancedCard>
        ))}
      </div>
    </div>
  )
}
