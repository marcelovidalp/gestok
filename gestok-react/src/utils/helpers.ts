import { ExchangeRate, Resource, UsageLog } from '@/types'

// Storage keys
export const LS_RES = 'gestok_resources_v1'
export const LS_USAGE = 'gestok_usage_v1'
export const LS_RECIPES = 'gestok_recipes_v1'
export const LS_EXCHANGE = 'gestok_exchange_v1'
export const UPDATE_INTERVAL_MS = 30 * 60 * 1000 // 30 minutes

/**
 * Load array from localStorage
 */
export function load<T>(key: string): T[] {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  } catch (e) {
    console.error(`Error loading ${key}:`, e)
    return []
  }
}

/**
 * Save array to localStorage
 */
export function save<T>(key: string, value: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error(`Error saving ${key}:`, e)
  }
}

/**
 * Load object from localStorage
 */
export function loadObj<T>(key: string): T | null {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (e) {
    console.error(`Error loading object ${key}:`, e)
    return null
  }
}

/**
 * Save object to localStorage
 */
export function saveObj<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error(`Error saving object ${key}:`, e)
  }
}

/**
 * Generate unique ID
 */
export function genId(): string {
  return 'id_' + Math.random().toString(36).slice(2, 9)
}

/**
 * Format number as Chilean Pesos
 */
export function fmtCLP(n: number): string {
  return Number(n || 0).toLocaleString('es-CL')
}

/**
 * Get current date-time in ISO format for datetime-local input
 */
export function nowISOLocal(): string {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 16)
}

/**
 * Fetch exchange rate from API
 */
export async function fetchExchangeRate(): Promise<ExchangeRate | null> {
  try {
    const res = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=CLP')
    const j = await res.json()
    
    if (j && j.rates && j.rates.CLP) {
      const obj: ExchangeRate = { 
        rate: j.rates.CLP, 
        ts: new Date().toISOString() 
      }
      saveObj(LS_EXCHANGE, obj)
      return obj
    }
  } catch (e) {
    console.error('Exchange fetch error:', e)
  }
  
  return loadObj<ExchangeRate>(LS_EXCHANGE)
}

/**
 * Calculate monthly cost projection based on usage history
 */
export function calculateMonthlyProjection(
  logs: UsageLog[], 
  resources: Resource[]
): number {
  if (!logs || logs.length === 0) return 0
  
  const grouped: Record<string, number> = {}
  let minDateValue: number | null = null
  let maxDateValue: number | null = null
  
  logs.forEach(l => {
    const t = new Date(l.ts).getTime()
    if (minDateValue === null || t < minDateValue) minDateValue = t
    if (maxDateValue === null || t > maxDateValue) maxDateValue = t
    if (!grouped[l.resourceId]) grouped[l.resourceId] = 0
    grouped[l.resourceId] += Number(l.amount) || 0
  })
  
  if (minDateValue === null || maxDateValue === null) return 0
  
  const daysSpan = Math.max(1, Math.ceil((maxDateValue - minDateValue) / (1000 * 60 * 60 * 24)))
  let monthlyCost = 0
  
  resources.forEach(r => {
    const totalUsed = grouped[r.id] || 0
    const avgPerDay = totalUsed / daysSpan
    const projected30 = avgPerDay * 30
    monthlyCost += projected30 * (Number(r.priceCLP) || 0)
  })
  
  return Math.round(monthlyCost)
}

/**
 * Validate resource data
 */
export function validateResource(data: Partial<Resource>): string | null {
  if (!data.name?.trim()) return 'El nombre es requerido'
  if (!data.unit?.trim()) return 'La unidad es requerida'
  if (!data.priceCLP || data.priceCLP <= 0) return 'El precio debe ser mayor a 0'
  return null
}

/**
 * Validate usage log data
 */
export function validateUsage(data: Partial<UsageLog>): string | null {
  if (!data.resourceId) return 'Debe seleccionar un recurso'
  if (!data.amount || data.amount <= 0) return 'La cantidad debe ser mayor a 0'
  if (!data.ts) return 'La fecha es requerida'
  return null
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
