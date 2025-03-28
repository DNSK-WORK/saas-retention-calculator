import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency, formatNumber } from "@/lib/utils"
import type { CalculatorResults } from "@/lib/calculator/types"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ForecastTabProps {
  results: CalculatorResults
}

export default function ForecastTab({ results }: ForecastTabProps) {
  const { currentForecast } = results

  const revenueChartData = currentForecast.monthlyData.map((data) => ({
    month: `Month ${data.month}`,
    revenue: data.revenue,
  }))

  const userChartData = currentForecast.monthlyData.map((data) => ({
    month: `Month ${data.month}`,
    users: data.retainedUsers,
  }))

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="border-none shadow-sm bg-white dark:bg-brand-black/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-brand-black dark:text-white">12-Month Revenue Forecast</CardTitle>
          <CardDescription className="text-brand-black/70 dark:text-white/70">
            Projected revenue based on your current retention rate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueChartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis tickFormatter={(value) => `$${value / 1000}k`} stroke="#666" />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#EEC682"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#EEC682" }}
                  activeDot={{ r: 6, fill: "#EEC682" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm bg-white dark:bg-brand-black/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-brand-black dark:text-white">12-Month User Retention</CardTitle>
          <CardDescription className="text-brand-black/70 dark:text-white/70">
            Projected user retention based on your current retention rate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userChartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis tickFormatter={(value) => `${value / 1000}k`} stroke="#666" />
                <Tooltip formatter={(value) => formatNumber(value as number)} />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#222223"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#222223" }}
                  activeDot={{ r: 6, fill: "#222223" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-brand-grey/30 dark:bg-brand-black/40 border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-brand-black/70 dark:text-white/70">Total 12-Month Revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-black dark:text-white">
              {formatCurrency(currentForecast.totalRevenue)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-brand-grey/30 dark:bg-brand-black/40 border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-brand-black/70 dark:text-white/70">Total Retained Users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-black dark:text-white">
              {formatNumber(currentForecast.totalRetainedUsers)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-brand-grey/30 dark:bg-brand-black/40 border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-brand-black/70 dark:text-white/70">
              Average Monthly Revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-black dark:text-white">
              {formatCurrency(currentForecast.totalRevenue / 12)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

