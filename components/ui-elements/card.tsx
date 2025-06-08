"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  selected?: boolean
}

export function EnhancedCard({ children, className, onClick, selected }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-sm border transition-all duration-200",
        selected ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-gray-100 hover:shadow-md",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn("p-5 border-b border-gray-100", className)}>{children}</div>
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn("p-5", className)}>{children}</div>
}

interface CardTitleProps {
  children: ReactNode
  className?: string
}

export function CardTitle({ children, className }: CardTitleProps) {
  return <h3 className={cn("text-xl font-semibold text-gray-900", className)}>{children}</h3>
}

interface CardFooterProps {
  children: ReactNode
  className?: string
}

export function CardFooter({ children, className }: CardFooterProps) {
  return <div className={cn("p-5 border-t border-gray-100", className)}>{children}</div>
}
