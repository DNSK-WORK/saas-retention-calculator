"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Users, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { SimpleTooltip } from "@/components/ui/simple-tooltip"
import { calculatorSchema, type CalculatorInputs } from "@/lib/calculator/types"

interface CalculatorFormProps {
  onSubmit: (data: CalculatorInputs) => void
}

export default function CalculatorForm({ onSubmit }: CalculatorFormProps) {
  const form = useForm<CalculatorInputs>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      mau: 5000,
      newSignups: 1000,
      retentionRate: 80,
      arpu: 50,
      cac: 120,
      uxInvestment: 10000,
      retentionImprovement: 5,
      implementationTime: 1,
      includeUxInvestment: false,
    },
  })

  const includeUxInvestment = form.watch("includeUxInvestment")

  return (
    <Card className="border-brand-grey shadow-lg">
      <CardHeader className="bg-brand-grey/30">
        <CardTitle className="text-brand-black dark:text-white">SaaS Retention & UX ROI Calculator</CardTitle>
        <CardDescription className="text-brand-black/70 dark:text-white/70">
          Enter your metrics to see how retention impacts your revenue and how UX improvements can help
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="mau"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-brand-black dark:text-white">
                      Monthly Active Users (MAU)
                      <SimpleTooltip text="How many people are using your product each month. Just the ones actually doing stuff — not just signed up." />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute left-3 top-2.5 flex items-center justify-center h-5 w-5 text-brand-black/70 dark:text-white/70">
                          <Users className="h-5 w-5" />
                        </div>
                        <Input
                          type="number"
                          className="pl-9 rounded-btn border-brand-grey bg-white dark:bg-brand-black/20 text-brand-black dark:text-white"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newSignups"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-brand-black dark:text-white">
                      New Monthly Signups
                      <SimpleTooltip text="How many new people join or sign up for your product every month." />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute left-3 top-2.5 flex items-center justify-center h-5 w-5 text-brand-black/70 dark:text-white/70">
                          <Users className="h-5 w-5" />
                        </div>
                        <Input
                          type="number"
                          className="pl-9 rounded-btn border-brand-grey bg-white dark:bg-brand-black/20 text-brand-black dark:text-white"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="retentionRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-brand-black dark:text-white">
                      Monthly Retention Rate
                      <SimpleTooltip text="What percent of people stick around each month. If it's 80%, that means 20% leave." />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute left-3 top-2.5 flex items-center justify-center h-5 w-5 text-brand-black/70 dark:text-white/70">
                          <span className="text-lg font-medium">%</span>
                        </div>
                        <Input
                          type="number"
                          className="pl-9 rounded-btn border-brand-grey bg-white dark:bg-brand-black/20 text-brand-black dark:text-white"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-brand-black/60 dark:text-white/60">
                      Churn Rate: <span className="text-red-500">{(100 - (field.value || 0)).toFixed(1)}%</span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="arpu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-brand-black dark:text-white">
                      Average Revenue Per User
                      <SimpleTooltip text="On average, how much money you make from one user each month." />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute left-3 top-2.5 flex items-center justify-center h-5 w-5 text-brand-black/70 dark:text-white/70">
                          <span className="text-lg font-medium">$</span>
                        </div>
                        <Input
                          type="number"
                          className="pl-9 rounded-btn border-brand-grey bg-white dark:bg-brand-black/20 text-brand-black dark:text-white"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cac"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-brand-black dark:text-white">
                      Customer Acquisition Cost
                      <SimpleTooltip text="How much it costs to get one person to become a paying customer — ads, sales, etc." />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute left-3 top-2.5 flex items-center justify-center h-5 w-5 text-brand-black/70 dark:text-white/70">
                          <span className="text-lg font-medium">$</span>
                        </div>
                        <Input
                          type="number"
                          className="pl-9 rounded-btn border-brand-grey bg-white dark:bg-brand-black/20 text-brand-black dark:text-white"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="includeUxInvestment"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-brand-accent data-[state=checked]:border-brand-accent"
                      />
                    </FormControl>
                    <div className="flex items-center">
                      <FormLabel className="font-medium text-brand-black dark:text-white">
                        Include UX Investment Analysis
                      </FormLabel>
                      <SimpleTooltip text="Want to see if better design or onboarding could make you more money? Turn this on." />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {includeUxInvestment && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-brand-grey/30 dark:bg-brand-black/20 rounded-md">
                <FormField
                  control={form.control}
                  name="uxInvestment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-brand-black dark:text-white">
                        Planned UX Investment
                        <SimpleTooltip text="The amount you plan to invest in UX improvements" />
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-2.5 flex items-center justify-center h-5 w-5 text-brand-black/70 dark:text-white/70">
                            <span className="text-lg font-medium">$</span>
                          </div>
                          <Input
                            type="number"
                            className="pl-9 rounded-btn border-brand-grey bg-white dark:bg-brand-black/20 text-brand-black dark:text-white"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="retentionImprovement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-brand-black dark:text-white">
                        Est. Retention Improvement
                        <SimpleTooltip text="The estimated percentage points improvement in retention from UX investment" />
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-2.5 flex items-center justify-center h-5 w-5 text-brand-black/70 dark:text-white/70">
                            <span className="text-lg font-medium">%</span>
                          </div>
                          <Input
                            type="number"
                            className="pl-9 rounded-btn border-brand-grey bg-white dark:bg-brand-black/20 text-brand-black dark:text-white"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="implementationTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-brand-black dark:text-white">
                        Implementation Time
                        <SimpleTooltip text="The estimated time to implement UX improvements (in months)" />
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-2.5 flex items-center justify-center h-5 w-5 text-brand-black/70 dark:text-white/70">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <Input
                            type="number"
                            className="pl-9 rounded-btn border-brand-grey bg-white dark:bg-brand-black/20 text-brand-black dark:text-white"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                          />
                          <div className="absolute inset-y-0 right-3 flex items-center">
                            <span className="text-brand-black/60 dark:text-white/60">months</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full rounded-btn bg-brand-accent hover:bg-brand-accent/90 text-brand-black h-[61px] text-lg"
            >
              Calculate Retention Impact <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

