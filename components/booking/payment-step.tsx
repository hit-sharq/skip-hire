"use client"

import { MapPin, CreditCard, Calendar, Home } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { BookingData, ValidationErrors } from "@/types/skip"
import { calculateTotal, formatCurrency } from "@/lib/utils"

interface PaymentStepProps {
  booking: BookingData
  updateBooking: (updates: Partial<BookingData>) => void
  updateCustomerDetails: (updates: Partial<BookingData["customerDetails"]>) => void
  errors: ValidationErrors
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export function PaymentStep({
  booking,
  updateBooking,
  updateCustomerDetails,
  errors,
  isLoading,
  setIsLoading,
}: PaymentStepProps) {
  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    alert("Booking confirmed! You will receive a confirmation email shortly.")
  }

  return (
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
                    onChange={(e) => updateCustomerDetails({ name: e.target.value })}
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
                    onChange={(e) => updateCustomerDetails({ email: e.target.value })}
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
                  onChange={(e) => updateCustomerDetails({ phone: e.target.value })}
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
                    <p className="font-medium">{formatCurrency(booking.selectedSkip.price_before_vat)}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{formatCurrency(booking.selectedSkip.price_before_vat)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">VAT ({booking.selectedSkip.vat}%)</span>
                      <span>
                        {formatCurrency((booking.selectedSkip.price_before_vat * booking.selectedSkip.vat) / 100)}
                      </span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{formatCurrency(calculateTotal(booking.selectedSkip))}</span>
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
                    onClick={handleSubmit}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      `Complete Booking - ${formatCurrency(calculateTotal(booking.selectedSkip))}`
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
}
