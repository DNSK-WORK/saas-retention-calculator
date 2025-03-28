import { z } from "zod"

export const calculatorSchema = z.object({
  mau: z.coerce.number().min(1, "MAU must be at least 1").default(5000),
  newSignups: z.coerce.number().min(1, "New signups must be at least 1").default(1000),
  retentionRate: z.coerce
    .number()
    .min(1, "Retention rate must be at least 1%")
    .max(100, "Retention rate cannot exceed 100%")
    .default(80),
  arpu: z.coerce.number().min(1, "ARPU must be at least $1").default(50),
  cac: z.coerce.number().min(1, "CAC must be at least $1").default(120),
  uxInvestment: z.coerce.number().min(0, "Investment cannot be negative").optional(),
  retentionImprovement: z.coerce
    .number()
    .min(1, "Improvement must be at least 1%")
    .max(50, "Improvement cannot exceed 50%")
    .default(5)
    .optional(),
  implementationTime: z.coerce
    .number()
    .min(1, "Time must be at least 1 month")
    .max(12, "Time cannot exceed 12 months")
    .default(1)
    .optional(),
  includeUxInvestment: z.boolean().default(false),
})

export type CalculatorInputs = z.infer<typeof calculatorSchema>

export interface MonthlyData {
  month: number
  startingUsers: number
  retainedUsers: number
  revenue: number
}

export interface Forecast {
  monthlyData: MonthlyData[]
  totalRetainedUsers: number
  totalRevenue: number
}

export interface BenchmarkStatus {
  status: "excellent" | "good" | "average" | "below-average" | "at-risk"
  message: string
}

export interface Benchmarks {
  retentionStatus: BenchmarkStatus
  ltvCacStatus: BenchmarkStatus
  topQuartileRetention: number
  retentionGapToTopQuartile: number
}

export interface BaseMetrics {
  retentionRate: number
  churnRate: number
  monthlyChurnedUsers: number
  monthlyRetainedUsers: number
  monthlyGrossRevenue: number
  monthlyLostRevenue: number
  ltv: number
  cac: number
  ltvCacRatio: number
  cacPaybackPeriod: number
}

export interface Comparison {
  retainedUsersDelta: number
  revenueDelta: number
  additionalLtv: number
  additionalLifetimeRevenue: number
  improvedRetentionRate: number
  monthlyComparisonData: {
    month: string
    current: number
    improved: number
  }[]
  userComparisonData: {
    month: string
    current: number
    improved: number
  }[]
}

export interface RoiData {
  uxCost: number
  estimatedRetentionGain: number
  improvedRevenue: number
  monthlyRevenueUplift: number
  breakEvenPoint: number
  roiMultiplier: number
  revenuePerDollar: number
  implementationTime: number
}

export interface CalculatorResults {
  baseMetrics: BaseMetrics
  currentForecast: Forecast
  improvedForecast: Forecast
  comparison: Comparison
  roi: RoiData | null
  benchmarks: Benchmarks
}

