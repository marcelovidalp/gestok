import React from 'react'
import { Card, Table } from '@/components/ui'
import useResourceStore from '@/stores/resourceStore'
import useUsageStore from '@/stores/usageStore'
import { fmtCLP, calculateMonthlyProjection } from '@/utils/helpers'

const Costs: React.FC = () => {
  const { resources } = useResourceStore()
  const { usageLogs } = useUsageStore()

  const totalInventory = resources.reduce((sum, r) => sum + (r.priceCLP * r.stock), 0)
  const monthlyProjection = calculateMonthlyProjection(usageLogs, resources)

  const columns = [
    { key: 'name', header: 'Recurso' },
    { key: 'priceCLP', header: 'Precio CLP', render: (val: number) => fmtCLP(val) },
    { key: 'stock', header: 'Stock' },
    { key: 'total', header: 'Valor total CLP', render: (_: any, row: any) => fmtCLP(row.priceCLP * row.stock) }
  ]

  return (
    <div className="space-y-6">
      <Card title="Costos y presupuestos" subtitle="Análisis financiero">
        <Table columns={columns} data={resources} emptyMessage="No hay recursos" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
            <div className="text-sm text-muted dark:text-gray-300 mb-2">Valor inventario (CLP)</div>
            <div className="text-3xl font-bold text-accent dark:text-blue-400">{fmtCLP(totalInventory)}</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
            <div className="text-sm text-muted dark:text-gray-300 mb-2">Proyección mensual (30 días)</div>
            <div className="text-3xl font-bold text-green-700 dark:text-green-400">
              {monthlyProjection > 0 ? fmtCLP(monthlyProjection) : '—'}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Costs