"use client"

import type React from "react"

import { Calendar, Truck, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { BookingData } from "@/types/skip"

interface SchedulingStepProps {
  booking: BookingData
  updateBooking: (updates: Partial<BookingData>) => void
}

export function SchedulingStep({ booking, updateBooking }: SchedulingStepProps) {
  const handleDeliveryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value)
    updateBooking({ deliveryDate: date })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Schedule Your Delivery</h2>
        <p className="text-gray-600">Choose your preferred delivery and collection dates.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="w-5 h-5 mr-2 text-emerald-600" />
              Delivery Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="date"
              className="w-full"
              min={new Date().toISOString().split("T")[0]}
              value={booking.deliveryDate?.toISOString().split("T")[0] || ""}
              onChange={handleDeliveryDateChange}
            />
            <p className="text-sm text-gray-500 mt-2">We deliver between 7AM - 6PM on your chosen date</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Collection Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="date"
              className="w-full"
              value={booking.collectionDate?.toISOString().split("T")[0] || ""}
              readOnly
            />
            <p className="text-sm text-gray-500 mt-2">
              Automatic collection after {booking.selectedSkip?.hire_period_days} days
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Important Delivery Information</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>Ensure clear access for our delivery vehicle</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>Someone should be available during delivery window</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>Check for overhead cables and low bridges</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>We'll call 30 minutes before arrival</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
