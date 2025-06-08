"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Calendar,
  MapPin,
  Camera,
  CreditCard,
  Truck,
  Home,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ProgressStepper } from "./components/progress-stepper"
import { LoadingSpinner } from "./components/loading-spinner"
import { useFormValidation } from "./hooks/useFormValidation"
import type { Skip, BookingData } from "./types/skip"

const skipData: Skip[] = [
  {
    id: 17933,
    size: 4,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 278,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:52.813",
    allowed_on_road: true,
    allows_heavy_waste: true,
  },
  {
    id: 17934,
    size: 6,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 305,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:52.992",
    allowed_on_road: true,
    allows_heavy_waste: true,
  },
  {
    id: 17935,
    size: 8,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 375,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.171",
    allowed_on_road: true,
    allows_heavy_waste: true,
  },
  {
    id: 17936,
    size: 10,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 400,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.339",
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
  {
    id: 17937,
    size: 12,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 439,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.516",
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
  {
    id: 17938,
    size: 14,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 470,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.69",
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
  {
    id: 17939,
    size: 16,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 496,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.876",
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
  {
    id: 15124,
    size: 20,
    hire_period_days: 14,
    transport_cost: 248,
    per_tonne_cost: 248,
    price_before_vat: 992,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:40.344435",
    updated_at: "2025-04-07T13:16:52.434",
    allowed_on_road: false,
    allows_heavy_waste: true,
  },
  {
    id: 15125,
    size: 40,
    hire_period_days: 14,
    transport_cost: 248,
    per_tonne_cost: 248,
    price_before_vat: 992,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:40.344435",
    updated_at: "2025-04-07T13:16:52.603",
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
]

export default function ModernSkipBooking() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [booking, setBooking] = useState<BookingData>({
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
  })

  const { errors, validateRequired, validateEmailField, clearErrors } = useFormValidation()
  const steps = ["Choose Skip", "Placement", "Schedule", "Payment"]

  // Auto-calculate collection date when delivery date changes
  useEffect(() => {
    if (booking.deliveryDate && booking.selectedSkip) {
      const collectionDate = new Date(booking.deliveryDate)
      collectionDate.setDate(collectionDate.getDate() + booking.selectedSkip.hire_period_days)
      setBooking((prev) => ({ ...prev, collectionDate }))
    }
  }, [booking.deliveryDate, booking.selectedSkip])

  const calculateTotal = (skip: Skip) => {
    const vatAmount = (skip.price_before_vat * skip.vat) / 100
    return skip.price_before_vat + vatAmount
  }

  const getSkipDescription = (size: number) => {
    if (size <= 6) return "Perfect for small home projects, garden clearance"
    if (size <= 10) return "Ideal for medium renovations, kitchen/bathroom refits"
    if (size <= 16) return "Great for large home projects, construction waste"
    return "Commercial projects, large construction sites"
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, you'd upload to a server here
      setBooking((prev) => ({ ...prev, photoUploaded: true }))
    }
  }

  const renderSkipSelection = () => (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Skip Size</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the perfect skip size for your project. All prices include delivery, collection, and disposal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skipData.map((skip) => (
          <Card
            key={skip.id}
            className={`cursor-pointer transition-all hover:shadow-lg border-2 ${
              booking.selectedSkip?.id === skip.id
                ? "border-emerald-500 shadow-lg"
                : "border-gray-200 hover:border-emerald-300"
            }`}
            onClick={() => setBooking({ ...booking, selectedSkip: skip })}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-emerald-600">{skip.size} Yard Skip</CardTitle>
                {booking.selectedSkip?.id === skip.id && <CheckCircle className="w-6 h-6 text-emerald-500" />}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {skip.allowed_on_road && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Road Placement OK
                  </Badge>
                )}
                {skip.allows_heavy_waste && (
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    Heavy Waste OK
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600 text-sm">{getSkipDescription(skip.size)}</p>

                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  {skip.hire_period_days} day hire period
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Price (excl. VAT)</span>
                    <span>£{skip.price_before_vat}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>VAT ({skip.vat}%)</span>
                    <span>£{((skip.price_before_vat * skip.vat) / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>£{calculateTotal(skip).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderPlacementSelection = () => {
    const availablePlacements = booking.selectedSkip?.allowed_on_road ? ["private", "public"] : ["private"]

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
            onClick={() => setBooking({ ...booking, placementType: "private" })}
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
              onClick={() => setBooking({ ...booking, placementType: "public" })}
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
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="photo-upload"
                  />
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
              onChange={(e) => setBooking({ ...booking, deliveryAddress: e.target.value })}
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
              onChange={(e) => setBooking({ ...booking, specialInstructions: e.target.value })}
              className="mt-2"
              rows={3}
            />
          </div>
        </div>
      </div>
    )
  }

  const renderScheduling = () => (
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
              onChange={(e) => setBooking({ ...booking, deliveryDate: new Date(e.target.value) })}
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

  const renderPayment = () => (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Your Booking</h2>
        <p className="text-gray-600">Review your order and complete payment to confirm your skip hire.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">Full Name *</Label>
                  <Input
                    id="customerName"
                    placeholder="John Smith"
                    value={booking.customerDetails.name}
                    onChange={(e) =>
                      setBooking({
                        ...booking,
                        customerDetails: { ...booking.customerDetails, name: e.target.value },
                      })
                    }
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="customerEmail">Email Address *</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    placeholder="john@example.com"
                    value={booking.customerDetails.email}
                    onChange={(e) =>
                      setBooking({
                        ...booking,
                        customerDetails: { ...booking.customerDetails, email: e.target.value },
                      })
                    }
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="customerPhone">Phone Number *</Label>
                <Input
                  id="customerPhone"
                  placeholder="+44 7123 456789"
                  value={booking.customerDetails.phone}
                  onChange={(e) =>
                    setBooking({
                      ...booking,
                      customerDetails: { ...booking.customerDetails, phone: e.target.value },
                    })
                  }
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" placeholder="MM/YY" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input id="cardName" placeholder="John Smith" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Billing Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Address Line 1" />
              <Input placeholder="Address Line 2 (Optional)" />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="City" />
                <Input placeholder="Postcode" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {booking.selectedSkip && (
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{booking.selectedSkip.size} Yard Skip</p>
                      <p className="text-sm text-gray-500">{booking.selectedSkip.hire_period_days} day hire</p>
                    </div>
                    <p className="font-medium">£{booking.selectedSkip.price_before_vat}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>£{booking.selectedSkip.price_before_vat}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">VAT ({booking.selectedSkip.vat}%)</span>
                      <span>
                        £{((booking.selectedSkip.price_before_vat * booking.selectedSkip.vat) / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>£{calculateTotal(booking.selectedSkip).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{booking.deliveryAddress || "Address to be confirmed"}</span>
                    </div>
                    <div className="flex items-center">
                      <Home className="w-4 h-4 mr-2" />
                      <span className="capitalize">{booking.placementType} property</span>
                    </div>
                    {booking.deliveryDate && (
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Delivery: {booking.deliveryDate.toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    disabled={isLoading}
                    onClick={async () => {
                      setIsLoading(true)
                      // Simulate payment processing
                      await new Promise((resolve) => setTimeout(resolve, 2000))
                      setIsLoading(false)
                      alert("Booking confirmed! You will receive a confirmation email shortly.")
                    }}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      `Complete Booking - £${calculateTotal(booking.selectedSkip).toFixed(2)}`
                    )}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const canProceed = () => {
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
    // Validate current step before proceeding
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

    if (isValid && canProceed() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      clearErrors()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      clearErrors()
    }
  }

  const renderCurrentStep = () => {
    if (isLoading && currentStep === 0) {
      return <LoadingSpinner />
    }

    switch (currentStep) {
      case 0:
        return renderSkipSelection()
      case 1:
        return renderPlacementSelection()
      case 2:
        return renderScheduling()
      case 3:
        return renderPayment()
      default:
        return renderSkipSelection()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Skip Hire Booking</h1>
          <ProgressStepper currentStep={currentStep} steps={steps} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {renderCurrentStep()}

        <div className="flex justify-between items-center mt-12 max-w-4xl mx-auto">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 0} className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {currentStep < steps.length - 1 && (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
