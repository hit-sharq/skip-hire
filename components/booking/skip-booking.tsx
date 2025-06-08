"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { ProgressStepper } from "../progress-stepper"
import { LoadingSpinner } from "../loading-spinner"
import { useFormValidation } from "@/hooks/useFormValidation"
import { skipData } from "@/data/skips"
import type { BookingData, Skip } from "@/types/skip"
import { SkipSelection } from "./skip-selection"
import { PlacementSelection } from "./placement-selection"
import { SchedulingStep } from "./scheduling-step"
import { PaymentStep } from "./payment-step"
import { EnhancedButton } from "../ui-elements/button"

const steps = ["Choose Skip", "Placement", "Schedule", "Payment"]

const initialBookingState: BookingData = {
  selectedSkip: null,
  placementType: null,
  deliveryDate: null,
  collectionDate: null,
  deliveryAddress: "",
  photoUploaded: false,
  specialInstructions: "",
  customerDetails: {
    name: "",
    email: "",
    phone: "",
  },
}

export function SkipBooking() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [booking, setBooking] = useState<BookingData>(initialBookingState)

  const { errors, validateRequired, validateEmailField, clearErrors } = useFormValidation()

  // Auto-calculate collection date when delivery date changes
  useEffect(() => {
    if (booking.deliveryDate && booking.selectedSkip) {
      const collectionDate = new Date(booking.deliveryDate)
      collectionDate.setDate(collectionDate.getDate() + booking.selectedSkip.hire_period_days)
      setBooking((prev) => ({ ...prev, collectionDate }))
    }
  }, [booking.deliveryDate, booking.selectedSkip])

  // Update booking state
  const updateBooking = (updates: Partial<BookingData>) => {
    setBooking((prev) => ({ ...prev, ...updates }))
  }

  // Update customer details
  const updateCustomerDetails = (updates: Partial<BookingData["customerDetails"]>) => {
    setBooking((prev) => ({
      ...prev,
      customerDetails: { ...prev.customerDetails, ...updates },
    }))
  }

  // Select skip
  const selectSkip = (skip: Skip) => {
    setBooking((prev) => ({ ...prev, selectedSkip: skip }))
  }

  // Check if can proceed to next step
  const canProceedToNextStep = (): boolean => {
    switch (currentStep) {
      case 0:
        return booking.selectedSkip !== null
      case 1:
        return booking.placementType !== null && booking.deliveryAddress.trim() !== ""
      case 2:
        return booking.deliveryDate !== null
      case 3:
        return (
          booking.customerDetails.name.trim() !== "" &&
          booking.customerDetails.email.trim() !== "" &&
          booking.customerDetails.phone.trim() !== ""
        )
      default:
        return false
    }
  }

  const handleNext = () => {
    let isValid = true

    if (currentStep === 1) {
      if (!validateRequired(booking.deliveryAddress, "address")) {
        isValid = false
      }
    } else if (currentStep === 3) {
      if (!validateRequired(booking.customerDetails.name, "name")) isValid = false
      if (!validateEmailField(booking.customerDetails.email)) isValid = false
      if (!validateRequired(booking.customerDetails.phone, "phone")) isValid = false
    }

    if (isValid && canProceedToNextStep() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      clearErrors()
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      clearErrors()
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const renderCurrentStep = () => {
    if (isLoading && currentStep === 0) {
      return <LoadingSpinner />
    }

    switch (currentStep) {
      case 0:
        return <SkipSelection skips={skipData} selectedSkip={booking.selectedSkip} onSelectSkip={selectSkip} />
      case 1:
        return <PlacementSelection booking={booking} updateBooking={updateBooking} errors={errors} />
      case 2:
        return <SchedulingStep booking={booking} updateBooking={updateBooking} />
      case 3:
        return (
          <PaymentStep
            booking={booking}
            updateBooking={updateBooking}
            updateCustomerDetails={updateCustomerDetails}
            errors={errors}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Skip Hire Booking</h1>
          <ProgressStepper currentStep={currentStep} steps={steps} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">{renderCurrentStep()}</div>

        <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
          <EnhancedButton
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
          >
            Back
          </EnhancedButton>

          {currentStep < steps.length - 1 && (
            <EnhancedButton
              variant="primary"
              onClick={handleNext}
              disabled={!canProceedToNextStep()}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Continue
            </EnhancedButton>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Skip Hire Services</h3>
              <ul className="space-y-2">
                <li>Residential Skip Hire</li>
                <li>Commercial Skip Hire</li>
                <li>Same Day Delivery</li>
                <li>Waste Management</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Customer Support</h3>
              <ul className="space-y-2">
                <li>Contact Us</li>
                <li>FAQs</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Information</h3>
              <address className="not-italic">
                <p>123 Skip Lane</p>
                <p>Wasteford, WS1 2AB</p>
                <p className="mt-2">Phone: 01234 567890</p>
                <p>Email: info@skiphire.com</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Skip Hire Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
