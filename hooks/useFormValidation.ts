"use client"

import { useState } from "react"
import type { ValidationErrors } from "@/types/skip"

export function useFormValidation() {
  const [errors, setErrors] = useState<ValidationErrors>({})

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  }

  const validateRequired = (value: string, fieldName: string): boolean => {
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, [fieldName]: `${fieldName} is required` }))
      return false
    }
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[fieldName]
      return newErrors
    })
    return true
  }

  const validateEmailField = (email: string): boolean => {
    if (!validateRequired(email, "email")) return false
    if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email address" }))
      return false
    }
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors.email
      return newErrors
    })
    return true
  }

  const validatePhoneField = (phone: string): boolean => {
    if (!validateRequired(phone, "phone")) return false
    if (!validatePhone(phone)) {
      setErrors((prev) => ({ ...prev, phone: "Please enter a valid phone number" }))
      return false
    }
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors.phone
      return newErrors
    })
    return true
  }

  const clearErrors = () => setErrors({})

  const clearError = (fieldName: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[fieldName]
      return newErrors
    })
  }

  return {
    errors,
    validateRequired,
    validateEmailField,
    validatePhoneField,
    clearErrors,
    clearError,
    setErrors,
  }
}
