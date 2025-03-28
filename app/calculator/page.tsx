import RetentionCalculator from "@/components/calculator/retention-calculator"

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-brand-grey dark:bg-brand-black">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-brand-black dark:text-white">
              DNSK Work - Custom SaaS Retention Calculator
            </h1>
            <p className="text-xl text-brand-black/80 dark:text-white/80">
              Discover how much revenue you're losing to poor UX and retention
            </p>
          </div>

          <RetentionCalculator />

          <div className="mt-16 text-center text-sm text-brand-black/70 dark:text-white/70">
            <p>
              This calculator provides estimates based on industry averages and your inputs. Actual results may vary
              based on your specific business context.
            </p>
            <div className="mt-4">
              ©{" "}
              <a href="https://dnsk.work/" target="_blank" className="text-blue-600 hover:underline" rel="noreferrer">
                DNSK WORK
              </a>
              , London, 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

