import { create } from 'zustand'
import { Resource } from '@/types'
import { load, save, LS_RES } from '@/utils/helpers'

interface ResourceState {
  resources: Resource[]
  loading: boolean
  error: string | null
  
  // Actions
  addResource: (resource: Resource) => void
  updateResource: (id: string, updates: Partial<Resource>) => void
  deleteResource: (id: string) => void
  getTotalInventoryValue: () => number
  loadResources: () => void
  setError: (error: string | null) => void
}

const useResourceStore = create<ResourceState>((set, get) => ({
  resources: load<Resource>(LS_RES),
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
