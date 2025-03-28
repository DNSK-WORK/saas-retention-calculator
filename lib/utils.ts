import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en-US").format(Math.round(value))
}

export const formatPercent = (value: number) => {
  return `${value.toFixed(1)}%`
}

