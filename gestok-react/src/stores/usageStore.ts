import { create } from 'zustand'
import { UsageLog } from '@/types'
import { load, save, LS_USAGE } from '@/utils/helpers'

interface UsageState {
  usageLogs: UsageLog[]
  
  // Actions
  addUsage: (usage: UsageLog) => void
  deleteUsage: (id: string) => void
  deleteUsageByResource: (resourceId: string) => void
  getUsageByDateRange: (from: string | null, to: string | null) => UsageLog[]
  getRecentLogs: (limit?: number) => UsageLog[]
  loadUsageLogs: () => void
}

const useUsageStore = create<UsageState>((set, get) => ({
  usageLogs: load<UsageLog>(LS_USAGE),

  addUsage: (usage: UsageLog) => {
    const usageLogs = [...get().usageLogs, usage]
    save(LS_USAGE, usageLogs)
    set({ usageLogs })
  },

  deleteUsage: (id: string) => {
    const usageLogs = get().usageLogs.filter((u: UsageLog) => u.id !== id)
    save(LS_USAGE, usageLogs)
    set({ usageLogs })
  },

  deleteUsageByResource: (resourceId: string) => {
    const usageLogs = get().usageLogs.filter((u: UsageLog) => u.resourceId !== resourceId)
    save(LS_USAGE, usageLogs)
    set({ usageLogs })
  },

  getUsageByDateRange: (from: string | null, to: string | null) => {
    const logs = get().usageLogs
    if (!from && !to) return logs
    
    return logs.filter((l: UsageLog) => {
      const logDate = new Date(l.ts)
      if (from && logDate < new Date(from + 'T00:00:00')) return false
      if (to && logDate > new Date(to + 'T23:59:59')) return false
      return true
    })
  },

  getRecentLogs: (limit: number = 12) => {
    return get().usageLogs
      .slice()
      .sort((a: UsageLog, b: UsageLog) => new Date(b.ts).getTime() - new Date(a.ts).getTime())
      .slice(0, limit)
  },

  loadUsageLogs: () => {
    set({ usageLogs: load<UsageLog>(LS_USAGE) })
  }
}))

export default useUsageStore
