/**
 * Resource entity - represents a resource/product in inventory
 */
export interface Resource {
  id: string
  name: string
  unit: string
  priceCLP: number
  stock: number
  desc?: string
  createdAt?: string
  updatedAt?: string
}

/**
 * Usage log - tracks resource consumption
 */
export interface UsageLog {
  id: string
  resourceId: string
  amount: number
  ts: string // ISO timestamp
  notes?: string
}

/**
 * Recipe ingredient
 */
export interface RecipeIngredient {
  id: string
  resourceId: string
  qty: number
}

/**
 * Recipe entity - contains multiple ingredients
 */
export interface Recipe {
  id: string
  name: string
  ingredients: RecipeIngredient[]
  costCLP: number
  created: string
}

/**
 * KPI metrics for dashboard
 */
export interface KPIMetrics {
  totalResources: number
  totalLogs: number
  totalInventoryValue: number
  monthlyProjection: number
}

/**
 * Chart data structure
 */
export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
  }[]
}

/**
 * Date range filter
 */
export interface DateRange {
  from: string | null
  to: string | null
}

/**
 * Form validation error
 */
export interface ValidationError {
  field: string
  message: string
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
