import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency, formatNumber } from "@/lib/utils"
import type { CalculatorResults } from "@/lib/calculator/types"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface ImprovementTabProps {
  results: CalculatorResults
}

export default function ImprovementTab({ results }: ImprovementTabProps) {
  const { comparison } = results

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="border-none shadow-sm bg-white dark:bg-brand-black/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-brand-black dark:text-white">Retention Improvement Scenario</CardTitle>
          <CardDescription className="text-brand-black/70 dark:text-white/70">
            Comparing current retention vs. improved retention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={comparison.monthlyComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis tickFormatter={(value) => `$${value / 1000}k`} stroke="#666" />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="current"
                  name="Current Revenue"
                  stroke="#222223"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#222223" }}
                />
                <Line
                  type="monotone"
                  dataKey="improved"
                  name="Improved Revenue"
                  stroke="#EEC682"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#EEC682" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm bg-white dark:bg-brand-black/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-brand-black dark:text-white">User Retention Comparison</CardTitle>
          <CardDescription className="text-brand-black/70 dark:text-white/70">
            Impact of improved retention on user numbers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={comparison.userComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis tickFormatter={(value) => `${value / 1000}k`} stroke="#666" />
                <Tooltip formatter={(value) => formatNumber(value as number)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="current"
                  name="Current Users"
                  stroke="#222223"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#222223" }}
                />
                <Line
                  type="monotone"
                  dataKey="improved"
                  name="Improved Users"
                  stroke="#EEC682"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#EEC682" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-brand-accent/10 dark:bg-brand-accent/20 border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-brand-black dark:text-white">Additional 12-Month Revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(comparison.revenueDelta)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-brand-accent/10 dark:bg-brand-accent/20 border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-brand-black dark:text-white">Additional Retained Users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatNumber(comparison.retainedUsersDelta)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-brand-accent/10 dark:bg-brand-accent/20 border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-brand-black dark:text-white">Additional Customer LTV</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(comparison.additionalLtv)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

