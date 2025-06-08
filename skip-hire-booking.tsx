"use client"

import { useState } from "react"
import { Calendar, Home, Truck, Upload, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

type Step = "placement" | "photo" | "delivery" | "payment"

export default function SkipHireBooking() {
  const [currentStep, setCurrentStep] = useState<Step>("placement")
  const [placementType, setPlacementType] = useState<"private" | "public">("private")
  const [showPhotoModal, setShowPhotoModal] = useState(false)
  const [skipPhoto, setSkipPhoto] = useState(false)
  const [selectedDate, setSelectedDate] = useState(20)
  const [currentMonth, setCurrentMonth] = useState(5) // June (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025)
  const [saveCard, setSaveCard] = useState(true)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(day)}
          className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
            selectedDate === day ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          {day}
        </button>,
      )
    }

    return days
  }

  const handleContinue = () => {
    if (currentStep === "placement") {
      setShowPhotoModal(true)
    } else if (currentStep === "photo") {
      setCurrentStep("delivery")
    } else if (currentStep === "delivery") {
      setCurrentStep("payment")
    }
  }

  const handlePhotoModalContinue = () => {
    setShowPhotoModal(false)
    setCurrentStep("photo")
  }

  const renderPlacementStep = () => (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Where will the skip be placed?</h1>
          <p className="text-gray-400">This helps us determine if you need a permit for your skip</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card
            className={`cursor-pointer transition-all ${
              placementType === "private"
                ? "border-blue-500 border-2 bg-gray-800"
                : "border-gray-700 bg-gray-800 hover:border-gray-600"
            }`}
            onClick={() => setPlacementType("private")}
          >
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Home className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <h3 className="text-xl font-semibold">Private Property</h3>
                  <p className="text-gray-400">Driveway or private land</p>
                </div>
              </div>
              <p className="text-gray-300">No permit required when placed on your private property</p>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer transition-all ${
              placementType === "public"
                ? "border-blue-500 border-2 bg-gray-800"
                : "border-gray-700 bg-gray-800 hover:border-gray-600"
            }`}
            onClick={() => setPlacementType("public")}
          >
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Truck className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <h3 className="text-xl font-semibold">Public Road</h3>
                  <p className="text-gray-400">Council or public property</p>
                </div>
              </div>
              <p className="text-gray-300">Permit required for placement on public roads</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center gap-4">
          <Button variant="outline" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
            Back
          </Button>
          <Button onClick={handleContinue} className="bg-blue-600 hover:bg-blue-700">
            Continue
          </Button>
        </div>
      </div>

      <Dialog open={showPhotoModal} onOpenChange={setShowPhotoModal}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Skip Placement Photo
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPhotoModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-300">
              Please provide a photo of where you plan to place the skip. This helps us ensure proper placement and
              identify any potential access issues.
            </p>

            <div className="border-2 border-dashed border-blue-500 rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-blue-400">Upload Photo</p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="skip-photo"
                checked={skipPhoto}
                onCheckedChange={(checked) => setSkipPhoto(checked as boolean)}
                className="border-gray-600"
              />
              <Label htmlFor="skip-photo" className="text-gray-300">
                Skip this step to upload a photo
              </Label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowPhotoModal(false)}
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              >
                Cancel
              </Button>
              <Button onClick={handlePhotoModalContinue} className="bg-blue-600 hover:bg-blue-700">
                Continue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )

  const renderDeliveryStep = () => (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Choose Your Delivery Date</h1>
          <p className="text-gray-400">
            Select your preferred skip delivery date. We'll aim to deliver between 7am and 6pm on your chosen day.
          </p>
        </div>

        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="p-6">
            <div className="mb-4">
              <Label className="text-white font-medium">Delivery Date</Label>
            </div>

            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (currentMonth === 0) {
                    setCurrentMonth(11)
                    setCurrentYear(currentYear - 1)
                  } else {
                    setCurrentMonth(currentMonth - 1)
                  }
                }}
                className="text-gray-400 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h3 className="text-lg font-semibold">
                {monthNames[currentMonth]} {currentYear}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (currentMonth === 11) {
                    setCurrentMonth(0)
                    setCurrentYear(currentYear + 1)
                  } else {
                    setCurrentMonth(currentMonth + 1)
                  }
                }}
                className="text-gray-400 hover:text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-gray-400 text-sm font-medium p-2">
                  {day}
                </div>
              ))}
              {renderCalendar()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white font-medium">Collection Date</Label>
                <p className="text-blue-400 cursor-pointer text-sm">Change</p>
              </div>
            </div>
            <div className="mt-2 p-3 bg-gray-700 rounded">
              <p className="text-white font-medium">Friday 27 June 2025</p>
              <p className="text-gray-400 text-sm">
                We'll collect your skip on this date. Please ensure it's accessible.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => setCurrentStep("placement")}
            className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          >
            Back
          </Button>
          <Button onClick={handleContinue} className="bg-blue-600 hover:bg-blue-700">
            Continue to Payment
          </Button>
        </div>
      </div>
    </div>
  )

  const renderPaymentStep = () => (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Home className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <p className="font-medium">Delivery Address</p>
                    <p className="text-gray-400 text-sm">121 Ashby Road, Hinckley</p>
                    <p className="text-gray-400 text-sm">LE10 1SH</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <p className="font-medium">Delivery & Collection</p>
                    <p className="text-gray-400 text-sm">Delivery: Friday 20 June 2025</p>
                    <p className="text-gray-400 text-sm">Collection: Friday 27 June 2025</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4 space-y-3">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">6 Yard Skip</p>
                    <p className="text-gray-400 text-sm">14 day hire period</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">£264.00</p>
                    <p className="text-gray-400 text-sm">+ VAT £52.80</p>
                  </div>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>Subtotal (excl. VAT)</span>
                  <span>£264.00</span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>VAT (20%)</span>
                  <span>£52.80</span>
                </div>

                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>£316.80</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">Payment Details</h2>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">Card Number</Label>
                    <Input className="bg-gray-700 border-gray-600 text-white mt-1" />
                  </div>
                  <div>
                    <Label className="text-white">Expiry Date</Label>
                    <Input className="bg-gray-700 border-gray-600 text-white mt-1" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">CVV</Label>
                    <Input className="bg-gray-700 border-gray-600 text-white mt-1" />
                  </div>
                  <div>
                    <Label className="text-white">Cardholder Name</Label>
                    <Input className="bg-gray-700 border-gray-600 text-white mt-1" />
                  </div>
                </div>

                <div>
                  <Label className="text-white">Billing Address</Label>
                  <Input className="bg-gray-700 border-gray-600 text-white mt-1" />
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <Checkbox
                  id="save-card"
                  checked={saveCard}
                  onCheckedChange={(checked) => setSaveCard(checked as boolean)}
                  className="border-gray-600"
                />
                <Label htmlFor="save-card" className="text-gray-300">
                  Save this card as default payment method
                </Label>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3">
                  Complete Payment
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep("delivery")}
                  className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                >
                  Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  // Skip selection card (shown initially)
  if (currentStep === "placement" && !showPhotoModal) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <Card className="bg-gray-800 border-blue-500 border-2 max-w-sm">
          <CardContent className="p-0">
            <div className="relative">
              <Image
                src="/skip-image.png"
                alt="6 Yard Skip"
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                6 Yards
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">6 Yard Skip</h3>
              <p className="text-gray-400 mb-4">14 day hire period</p>
              <p className="text-3xl font-bold text-blue-400 mb-4">£264</p>
              <Button onClick={() => setCurrentStep("placement")} className="w-full bg-blue-600 hover:bg-blue-700">
                Selected
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  switch (currentStep) {
    case "placement":
      return renderPlacementStep()
    case "delivery":
      return renderDeliveryStep()
    case "payment":
      return renderPaymentStep()
    default:
      return renderPlacementStep()
  }
}
