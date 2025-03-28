import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/utils"
import type { CalculatorResults } from "@/lib/calculator/types"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface RoiTabProps {
  results: CalculatorResults
}

export default function RoiTab({ results }: RoiTabProps) {
  const { roi } = results

  if (!roi) return null

  const timelineData = [
    { month: "Investment", value: -roi.uxCost },
    ...Array.from({ length: 12 }, (_, i) => ({
      month: `Month ${i + 1}`,
      value: roi.monthlyRevenueUplift * (i + 1) - roi.uxCost,
    })),
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="border-none shadow-sm bg-white dark:bg-brand-black/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-brand-black dark:text-white">UX Investment ROI</CardTitle>
          <CardDescription className="text-brand-black/70 dark:text-white/70">
            Return on investment for your UX improvements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-brand-black/70 dark:text-white/70">UX Investment Cost</span>
              <span className="font-medium text-brand-black dark:text-white">{formatCurrency(roi.uxCost)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-black/70 dark:text-white/70">Implementation Time</span>
              <span className="font-medium text-brand-black dark:text-white">
                {roi.implementationTime} month{roi.implementationTime > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-black/70 dark:text-white/70">Estimated Retention Gain</span>
              <span className="font-medium text-green-600 dark:text-green-400">+{roi.estimatedRetentionGain}%</span>
            </div>
          </div>

          <Separator className="bg-brand-grey dark:bg-brand-black/40" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-brand-black/70 dark:text-white/70">Monthly Revenue Uplift</span>
              <span className="font-medium text-green-600 dark:text-green-400">
                {formatCurrency(roi.monthlyRevenueUplift)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-black/70 dark:text-white/70">Break-Even Point</span>
              <span className="font-medium text-brand-black dark:text-white">
                {roi.breakEvenPoint.toFixed(1)} months
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-black/70 dark:text-white/70">ROI Multiplier (12 months)</span>
              <span className="font-medium text-green-600 dark:text-green-400">{roi.roiMultiplier.toFixed(1)}x</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-black/70 dark:text-white/70">Revenue Per $1 Spent</span>
              <span className="font-medium text-green-600 dark:text-green-400">${roi.revenuePerDollar.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm bg-white dark:bg-brand-black/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-brand-black dark:text-white">Investment Timeline</CardTitle>
          <CardDescription className="text-brand-black/70 dark:text-white/70">
            Projected return on your UX investment over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} stroke="#666" />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Bar dataKey="value">
                  {timelineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.value < 0 ? "#ef4444" : "#EEC682"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

