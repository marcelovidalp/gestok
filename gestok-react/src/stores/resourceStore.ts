import { create } from 'zustand'
import { Resource, ExchangeRate } from '@/types'
import { load, save, loadObj, LS_RES, LS_EXCHANGE, fetchExchangeRate } from '@/utils/helpers'

interface ResourceState {
  resources: Resource[]
  exchangeRate: ExchangeRate | null
  loading: boolean
  error: string | null
  
  // Actions
  addResource: (resource: Resource) => void
  updateResource: (id: string, updates: Partial<Resource>) => void
  deleteResource: (id: string) => void
  updateExchangeRate: () => Promise<void>
  recalculateUSDPrices: (rate: number) => void
  getTotalInventoryValue: () => number
  loadResources: () => void
  setError: (error: string | null) => void
}

const useResourceStore = create<ResourceState>((set, get) => ({
  resources: load<Resource>(LS_RES),
  exchangeRate: loadObj<ExchangeRate>(LS_EXCHANGE),
  loading: false,
  error: null,

  addResource: (resource: Resource) => {
    const resources = [...get().resources, resource]
    save(LS_RES, resources)
    set({ resources })
  },

  updateResource: (id: string, updates: Partial<Resource>) => {
    const resources = get().resources.map(r => 
      r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r
    )
    save(LS_RES, resources)
    set({ resources })
  },

  deleteResource: (id: string) => {
    const resources = get().resources.filter(r => r.id !== id)
    save(LS_RES, resources)
    set({ resources })
  },

  updateExchangeRate: async () => {
    set({ loading: true, error: null })
    try {
      const exchangeRate = await fetchExchangeRate()
      if (exchangeRate) {
        set({ exchangeRate })
        get().recalculateUSDPrices(exchangeRate.rate)
      } else {
        set({ error: 'No se pudo obtener el tipo de cambio' })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      set({ error: `Error al actualizar tipo de cambio: ${errorMessage}` })
      console.error('Error updating exchange rate:', error)
    } finally {
      set({ loading: false })
    }
  },

  recalculateUSDPrices: (rate: number) => {
    if (!rate) return
    
    const resources = get().resources.map(r => ({
      ...r,
      priceUSD: rate ? Number((Number(r.priceCLP || 0) / rate).toFixed(2)) : 0
    }))
    
    save(LS_RES, resources)
    set({ resources })
  },

  getTotalInventoryValue: () => {
    return get().resources.reduce((total, r) => 
      total + ((Number(r.priceCLP) || 0) * (Number(r.stock) || 0)), 0
    )
  },

  loadResources: () => {
    set({ resources: load<Resource>(LS_RES) })
  },

  setError: (error: string | null) => {
    set({ error })
  }
}))

export default useResourceStore
