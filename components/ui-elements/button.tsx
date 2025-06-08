"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "outline" | "ghost" | "link"
  size?: "sm" | "md" | "lg"
  icon?: ReactNode
  iconPosition?: "left" | "right"
}

export function EnhancedButton({
  children,
  className,
  onClick,
  disabled = false,
  type = "button",
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors"

  const variantStyles = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white",
    outline: "border border-gray-300 hover:bg-gray-100 text-gray-700",
    ghost: "hover:bg-gray-100 text-gray-700",
    link: "text-emerald-600 hover:text-emerald-700 underline",
  }

  const sizeStyles = {
    sm: "text-sm px-3 py-1.5",
    md: "px-4 py-2.5",
    lg: "text-lg px-5 py-3",
  }

  const disabledStyles = "opacity-50 cursor-not-allowed pointer-events-none"

  return (
    <button
      type={type}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], disabled && disabledStyles, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  )
}
