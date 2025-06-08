import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Skip } from "@/types/skip"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateTotal(skip: Skip): number {
  const vatAmount = (skip.price_before_vat * skip.vat) / 100
  return skip.price_before_vat + vatAmount
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}
