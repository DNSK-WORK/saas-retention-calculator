"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3 } from "lucide-react"

import CalculatorForm from "./calculator-form"
import BaseMetricsTab from "./tabs/base-metrics-tab"
import ForecastTab from "./tabs/forecast-tab"
import ImprovementTab from "./tabs/improvement-tab"
import RoiTab from "./tabs/roi-tab"
import { calculateResults } from "@/lib/calculator/calculations"
import type { CalculatorInputs, CalculatorResults } from "@/lib/calculator/types"

export default function RetentionCalculator() {
  const [results, setResults] = useState<CalculatorResults | null>(null)
  const [activeTab, setActiveTab] = useState("metrics")

  function onSubmit(data: CalculatorInputs) {
    const calculatedResults = calculateResults(data)
    setResults(calculatedResults)
    setActiveTab("metrics")
  }

  return (
    <div className="space-y-8">
      <CalculatorForm onSubmit={onSubmit} />

      {results && (
        <Card className="border-t-4 border-t-brand-accent shadow-lg">
          <CardHeader className="bg-brand-grey/30">
            <CardTitle className="flex items-center text-brand-black dark:text-white">
              <BarChart3 className="h-6 w-6 mr-2 text-brand-accent" />
              Retention Analysis Results
            </CardTitle>
            <CardDescription className="text-brand-black/70 dark:text-white/70">
              See how retention impacts your revenue and growth over time
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 bg-brand-grey/30 dark:bg-brand-black/20">
                <TabsTrigger
                  value="metrics"
                  className="data-[state=active]:bg-brand-accent data-[state=active]:text-brand-black"
                >
                  Base Metrics
                </TabsTrigger>
                <TabsTrigger
                  value="forecast"
                  className="data-[state=active]:bg-brand-accent data-[state=active]:text-brand-black"
                >
                  12-Month Forecast
                </TabsTrigger>
                <TabsTrigger
                  value="improvement"
                  className="data-[state=active]:bg-brand-accent data-[state=active]:text-brand-black"
                >
                  Improvement Scenario
                </TabsTrigger>
                {results.roi && (
                  <TabsTrigger
                    value="roi"
                    className="data-[state=active]:bg-brand-accent data-[state=active]:text-brand-black"
                  >
                    UX ROI
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="metrics" className="space-y-6 pt-4">
                <BaseMetricsTab results={results} />
              </TabsContent>

              <TabsContent value="forecast" className="space-y-6 pt-4">
                <ForecastTab results={results} />
              </TabsContent>

              <TabsContent value="improvement" className="space-y-6 pt-4">
                <ImprovementTab results={results} />
              </TabsContent>

              {results.roi && (
                <TabsContent value="roi" className="space-y-6 pt-4">
                  <RoiTab results={results} />
                </TabsContent>
              )}
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col bg-brand-grey/30 dark:bg-brand-black/20 py-6">
            <a
              href="https://calendly.com/tanyadonska/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-black rounded-btn h-[61px] text-lg">
                Book a Free UX Strategy Session
              </Button>
            </a>
            <p className="text-sm text-brand-black/70 dark:text-white/70 mt-4 text-center">
              Let our UX experts help you identify and fix the friction points costing you revenue
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

