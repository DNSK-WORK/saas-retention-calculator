"use client"

import { useState } from "react"
import { HelpCircle } from "lucide-react"

interface SimpleTooltipProps {
  text: string
}

export function SimpleTooltip({ text }: SimpleTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="ml-2 focus:outline-none"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        aria-label="Help"
      >
        <HelpCircle className="h-4 w-4 text-gray-500" />
      </button>

      {isVisible && (
        <div
          className="absolute z-50 w-64 p-3 mt-2 -translate-x-1/2 left-1/2 bg-white border border-gray-200 rounded-md shadow-lg text-sm text-brand-black"
          style={{ top: "100%" }}
        >
          {text}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-t border-l border-gray-200"></div>
        </div>
      )}
    </div>
  )
}

