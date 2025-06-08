"use client"

import type React from "react"

import { Home, Truck, Camera, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { BookingData, ValidationErrors } from "@/types/skip"

interface PlacementSelectionProps {
  booking: BookingData
  updateBooking: (updates: Partial<BookingData>) => void
  errors: ValidationErrors
}

export function PlacementSelection({ booking, updateBooking, errors }: PlacementSelectionProps) {
  const availablePlacements = booking.selectedSkip?.allowed_on_road ? ["private", "public"] : ["private"]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, you'd upload to a server here
      updateBooking({ photoUploaded: true })
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Where will you place the skip?</h2>
        <p className="text-gray-600">This helps us determine permit requirements and delivery logistics.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card
          className={`cursor-pointer transition-all border-2 ${
            booking.placementType === "private"
              ? "border-emerald-500 bg-emerald-50"
              : "border-gray-200 hover:border-emerald-300"
          }`}
          onClick={() => updateBooking({ placementType: "private" })}
        >
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Home className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Private Property</h3>
                <p className="text-gray-600 mb-3">Driveway, garden, or private land</p>
                <div className="flex items-center text-sm text-emerald-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  No permit required
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {availablePlacements.includes("public") ? (
          <Card
            className={`cursor-pointer transition-all border-2 ${
              booking.placementType === "public"
                ? "border-emerald-500 bg-emerald-50"
                : "border-gray-200 hover:border-emerald-300"
            }`}
            onClick={() => updateBooking({ placementType: "public" })}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Public Road</h3>
                  <p className="text-gray-600 mb-3">Street, council property, or public land</p>
                  <div className="flex items-center text-sm text-orange-600">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Permit required (we'll handle this)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-2 border-gray-200 opacity-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Truck className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">Public Road</h3>
                  <p className="text-gray-400 mb-3">Not available for this skip size</p>
                  <div className="flex items-center text-sm text-red-500">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Size restriction applies
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Camera className="w-6 h-6 text-emerald-600 mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">Placement Photo (Optional)</h4>
              <p className="text-gray-600 mb-4">
                Help us prepare for delivery by sharing a photo of the placement area.
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer">
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" id="photo-upload" />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  {booking.photoUploaded ? (
                    <div className="text-emerald-600">
                      <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                      <p>Photo uploaded successfully</p>
                    </div>
                  ) : (
                    <>
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div>
          <Label htmlFor="address" className="text-base font-medium text-gray-900">
            Delivery Address *
          </Label>
          <Input
            id="address"
            placeholder="Enter your full delivery address"
            value={booking.deliveryAddress}
            onChange={(e) => updateBooking({ deliveryAddress: e.target.value })}
            className={`mt-2 ${errors.address ? "border-red-500" : ""}`}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>
        <div>
          <Label htmlFor="notes" className="text-base font-medium text-gray-900">
            Special Instructions (Optional)
          </Label>
          <Textarea
            id="notes"
            placeholder="Any special access requirements or delivery notes..."
            value={booking.specialInstructions}
            onChange={(e) => updateBooking({ specialInstructions: e.target.value })}
            className="mt-2"
            rows={3}
          />
        </div>
      </div>
    </div>
  )
}
