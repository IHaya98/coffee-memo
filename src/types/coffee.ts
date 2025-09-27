export interface CoffeeRecord {
  id: number
  variety: string
  shop: string
  price?: number
  acidity?: number
  bitterness?: number
  sweetness?: number
  aroma?: number
  comment?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateCoffeeRecord {
  variety: string
  shop: string
  price?: number
  acidity?: number
  bitterness?: number
  sweetness?: number
  aroma?: number
  comment?: string
}

export interface CoffeeStats {
  totalRecords: number
  averagePrice: number
  favoriteShop: string
  averageAcidity: number
  averageBitterness: number
  averageSweetness: number
  averageAroma: number
}
