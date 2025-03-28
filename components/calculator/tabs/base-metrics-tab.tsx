import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils"
import type { CalculatorResults } from "@/lib/calculator/types"

interface BaseMetricsTabProps {
  results: CalculatorResults
}

export default function BaseMetricsTab({ results }: BaseMetricsTabProps) {
  const { baseMetrics, benchmarks } = results

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="border-none shadow-sm bg-white dark:bg-brand-black/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-brand-black dark:text-white">Current Retention Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-brand-black/70 dark:text-white/70">Monthly Retention Rate</span>
              <span className="font-medium text-brand-black dark:text-white">
                {formatPercent(baseMetrics.retentionRate)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-black/70 dark:text-white/70">Monthly Churn Rate</span>
              <span className="font-medium text-red-500">{formatPercent(baseMetrics.churnRate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-black/70 dark:text-white/70">Monthly Churned Users</span>
              <span className="font-medium text-brand-black dark:text-white">
                {formatNumber(baseMetrics.monthlyChurnedUsers)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-black/70 dark:text-white/70">Monthly Retained Users</span>
              <span className="font-medium text-brand-black dark:text-white">
                {formatNumber(baseMetrics.monthlyRetainedUsers)}
              </span>
            </div>
          </div>

          <Separator className="bg-brand-grey dark:bg-brand-black/40" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-brand-black/70 dark:text-white/70">Monthly Gross Revenue</span>
              <span className="font-medium text-brand-black dark:text-white">
                {formatCurrency(baseMetrics.monthlyGrossRevenue)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-black/70 dark:text-white/70">Monthly Lost Revenue (Churn)</span>
              <span className="font-medium text-red-500">{formatCurrency(baseMetrics.monthlyLostRevenue)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm bg-white dark:bg-brand-black/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-brand-black dark:text-white">Customer Lifetime Value</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-brand-black/70 dark:text-white/70">Customer Lifetime Value (LTV)</span>
              <span className="font-medium text-brand-black dark:text-white">{formatCurrency(baseMetrics.ltv)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-black/70 dark:text-white/70">Customer Acquisition Cost (CAC)</span>
              <span className="font-medium text-brand-black dark:text-white">{formatCurrency(baseMetrics.cac)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-black/70 dark:text-white/70">LTV:CAC Ratio</span>
              <span
                className={`font-medium ${baseMetrics.ltvCacRatio >= 3 ? "text-green-500" : baseMetrics.ltvCacRatio >= 1 ? "text-amber-500" : "text-red-500"}`}
              >
                {baseMetrics.ltvCacRatio.toFixed(1)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-black/70 dark:text-white/70">CAC Payback Period</span>
              <span className="font-medium text-brand-black dark:text-white">
                {baseMetrics.cacPaybackPeriod.toFixed(1)} months
              </span>
            </div>
          </div>

          <Separator className="bg-brand-grey dark:bg-brand-black/40" />

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-brand-black/70 dark:text-white/70">Retention Status</span>
                <span
                  className={`text-sm font-medium ${
                    benchmarks.retentionStatus.status === "excellent"
                      ? "text-green-500"
                      : benchmarks.retentionStatus.status === "good"
                        ? "text-emerald-500"
                        : benchmarks.retentionStatus.status === "average"
                          ? "text-amber-500"
                          : benchmarks.retentionStatus.status === "below-average"
                            ? "text-orange-500"
                            : "text-red-500"
                  }`}
                >
                  {benchmarks.retentionStatus.status.replace("-", " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                </span>
              </div>
              <p className="text-sm text-brand-black/70 dark:text-white/70 mb-2">
                {benchmarks.retentionStatus.message}
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-brand-black/70 dark:text-white/70">LTV:CAC Status</span>
                <span
                  className={`text-sm font-medium ${
                    benchmarks.ltvCacStatus.status === "excellent"
                      ? "text-green-500"
                      : benchmarks.ltvCacStatus.status === "good"
                        ? "text-emerald-500"
                        : benchmarks.ltvCacStatus.status === "average"
                          ? "text-amber-500"
                          : benchmarks.ltvCacStatus.status === "below-average"
                            ? "text-orange-500"
                            : "text-red-500"
                  }`}
                >
                  {benchmarks.ltvCacStatus.status.replace("-", " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                </span>
              </div>
              <p className="text-sm text-brand-black/70 dark:text-white/70">{benchmarks.ltvCacStatus.message}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

