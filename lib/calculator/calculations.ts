import type { CalculatorInputs, CalculatorResults, BenchmarkStatus, Forecast } from "./types"

// Helper function to calculate 12-month forecast
function calculateForecast(startingUsers: number, newSignups: number, retentionRate: number, arpu: number): Forecast {
  const monthlyData = []
  let totalRetainedUsers = 0
  let totalRevenue = 0
  let currentUsers = startingUsers

  for (let month = 1; month <= 12; month++) {
    const retainedUsers = currentUsers * retentionRate
    const revenue = retainedUsers * arpu

    monthlyData.push({
      month,
      startingUsers: currentUsers,
      retainedUsers,
      revenue,
    })

    totalRetainedUsers += retainedUsers
    totalRevenue += revenue

    // Update for next month
    currentUsers = retainedUsers + newSignups
  }

  return {
    monthlyData,
    totalRetainedUsers,
    totalRevenue,
  }
}

// Helper functions for benchmarking
function getBenchmarkStatus(retentionRate: number): BenchmarkStatus {
  if (retentionRate >= 95) return { status: "excellent", message: "You're in the top quartile for SaaS retention!" }
  if (retentionRate >= 90) return { status: "good", message: "You have good retention, above the B2B SaaS average." }
  if (retentionRate >= 80) return { status: "average", message: "Your retention is around the industry average." }
  if (retentionRate >= 70)
    return {
      status: "below-average",
      message: "Your retention is below average, presenting an opportunity for improvement.",
    }
  return {
    status: "at-risk",
    message: "Your retention is significantly below industry standards. Immediate action is recommended.",
  }
}

function getLtvCacStatus(ratio: number): BenchmarkStatus {
  if (ratio >= 5)
    return { status: "excellent", message: "Your LTV:CAC ratio is excellent, well above the 3:1 benchmark." }
  if (ratio >= 3) return { status: "good", message: "Your LTV:CAC ratio is healthy, meeting the 3:1 benchmark." }
  if (ratio >= 2) return { status: "average", message: "Your LTV:CAC ratio is acceptable but could be improved." }
  if (ratio >= 1)
    return {
      status: "below-average",
      message: "Your LTV:CAC ratio is concerning. You're barely breaking even on acquisition costs.",
    }
  return {
    status: "at-risk",
    message: "Your LTV:CAC ratio is unsustainable. You're losing money on customer acquisition.",
  }
}

export function calculateResults(data: CalculatorInputs): CalculatorResults {
  // STEP 2: BASE METRICS CALCULATION
  const churnRate = 100 - data.retentionRate
  const monthlyChurnedUsers = data.mau * (churnRate / 100)
  const monthlyRetainedUsers = data.mau - monthlyChurnedUsers
  const monthlyGrossRevenue = data.mau * data.arpu
  const monthlyLostRevenue = monthlyChurnedUsers * data.arpu
  const ltv = data.arpu / (churnRate / 100)
  const ltvCacRatio = ltv / data.cac
  const cacPaybackPeriod = data.cac / data.arpu

  // STEP 3: RETENTION FORECASTING OVER 12 MONTHS
  const currentForecast = calculateForecast(data.mau, data.newSignups, data.retentionRate / 100, data.arpu)

  // STEP 4: SCENARIO ANALYSIS – RETENTION IMPROVEMENT
  const improvedRetentionRate = Math.min(data.retentionRate + (data.retentionImprovement || 5), 100)
  const improvedForecast = calculateForecast(data.mau, data.newSignups, improvedRetentionRate / 100, data.arpu)

  const retainedUsersDelta = improvedForecast.totalRetainedUsers - currentForecast.totalRetainedUsers
  const revenueDelta = improvedForecast.totalRevenue - currentForecast.totalRevenue

  const improvedChurnRate = 100 - improvedRetentionRate
  const improvedLtv = data.arpu / (improvedChurnRate / 100)
  const additionalLtv = improvedLtv - ltv
  const additionalLifetimeRevenue = additionalLtv * (data.newSignups * 12)

  // Prepare chart data for comparison
  const monthlyComparisonData = currentForecast.monthlyData.map((current, index) => {
    return {
      month: `Month ${index + 1}`,
      current: current.revenue,
      improved: improvedForecast.monthlyData[index].revenue,
    }
  })

  const userComparisonData = currentForecast.monthlyData.map((current, index) => {
    return {
      month: `Month ${index + 1}`,
      current: current.retainedUsers,
      improved: improvedForecast.monthlyData[index].retainedUsers,
    }
  })

  // STEP 5: ROI ON UX INVESTMENT (OPTIONAL)
  let roiData = null
  if (data.includeUxInvestment && data.uxInvestment) {
    const monthlyRevenueUplift = revenueDelta / 12
    const breakEvenPoint = data.uxInvestment / monthlyRevenueUplift
    const roiMultiplier = (revenueDelta - data.uxInvestment) / data.uxInvestment
    const revenuePerDollar = revenueDelta / data.uxInvestment

    roiData = {
      uxCost: data.uxInvestment,
      estimatedRetentionGain: data.retentionImprovement || 5,
      improvedRevenue: improvedForecast.totalRevenue,
      monthlyRevenueUplift,
      breakEvenPoint,
      roiMultiplier,
      revenuePerDollar,
      implementationTime: data.implementationTime || 1,
    }
  }

  // STEP 6: BENCHMARKING INSIGHTS
  const benchmarkData = {
    retentionStatus: getBenchmarkStatus(data.retentionRate),
    ltvCacStatus: getLtvCacStatus(ltvCacRatio),
    topQuartileRetention: 95,
    retentionGapToTopQuartile: Math.max(95 - data.retentionRate, 0),
  }

  return {
    baseMetrics: {
      retentionRate: data.retentionRate,
      churnRate,
      monthlyChurnedUsers,
      monthlyRetainedUsers,
      monthlyGrossRevenue,
      monthlyLostRevenue,
      ltv,
      cac: data.cac,
      ltvCacRatio,
      cacPaybackPeriod,
    },
    currentForecast,
    improvedForecast,
    comparison: {
      retainedUsersDelta,
      revenueDelta,
      additionalLtv,
      additionalLifetimeRevenue,
      improvedRetentionRate,
      monthlyComparisonData,
      userComparisonData,
    },
    roi: roiData,
    benchmarks: benchmarkData,
  }
}

