export interface Skip {
  id: number
  size: number
  hire_period_days: number
  transport_cost: number | null
  per_tonne_cost: number | null
  price_before_vat: number
  vat: number
  postcode: string
  area: string
  forbidden: boolean
  created_at: string
  updated_at: string
  allowed_on_road: boolean
  allows_heavy_waste: boolean
}

export interface BookingData {
  selectedSkip: Skip | null
  placementType: "private" | "public" | null
  deliveryDate: Date | null
  collectionDate: Date | null
  deliveryAddress: string
  photoUploaded: boolean
  specialInstructions: string
  customerDetails: {
    name: string
    email: string
    phone: string
  }
}

export interface ValidationErrors {
  [key: string]: string
}
