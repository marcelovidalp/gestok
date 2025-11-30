import React from 'react'
import { Card, Button, Table } from '@/components/ui'
import useResourceStore from '@/stores/resourceStore'
import useUsageStore from '@/stores/usageStore'
import { fmtCLP, calculateMonthlyProjection, formatDate } from '@/utils/helpers'

const Costs: React.FC = () => {
  const { resources, exchangeRate, updateExchangeRate, loading } = useResourceStore()
  const { usageLogs } = useUsageStore()

  const totalInventory = resources.reduce((sum, r) => sum + (r.priceCLP * r.stock), 0)
  const monthlyProjection = calculateMonthlyProjection(usageLogs, resources)

  const columns = [
    { key: 'name', header: 'Recurso' },
    { key: 'priceCLP', header: 'Precio CLP', render: (val: number) => fmtCLP(val) },
    { key: 'priceUSD', header: 'Precio USD', render: (val: number) => val ? val.toFixed(2) : '—' },
    { key: 'stock', header: 'Stock' },
    { key: 'total', header: 'Valor total CLP', render: (_: any, row: any) => fmtCLP(row.priceCLP * row.stock) }
  ]

  return (
    <div className="space-y-6">
      <Card title="Costos y presupuestos" subtitle="Análisis financiero">
        <div className="flex gap-4 items-center mb-6 flex-wrap">
          <Button variant="primary" onClick={updateExchangeRate} disabled={loading}>
            {loading ? 'Actualizando...' : 'Actualizar tipo de cambio'}
          </Button>
          <div className="text-sm text-muted dark:text-gray-400">
            Última actualización: {exchangeRate ? formatDate(exchangeRate.ts) : '—'}
          </div>
        </div>

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