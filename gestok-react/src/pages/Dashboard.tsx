import React, { useEffect } from 'react'
import { Card, Chart } from '@/components/ui'
import { Button } from '@/components/ui'
import useResourceStore from '@/stores/resourceStore'
import useUsageStore from '@/stores/usageStore'
import { fmtCLP, calculateMonthlyProjection } from '@/utils/helpers'

const Dashboard: React.FC = () => {
  const { resources, exchangeRate, updateExchangeRate, getTotalInventoryValue } = useResourceStore()
  const { usageLogs } = useUsageStore()

  useEffect(() => {
    // Auto-update exchange rate on mount if needed
    if (!exchangeRate || Date.now() - new Date(exchangeRate.ts).getTime() > 30 * 60 * 1000) {
      updateExchangeRate()
    }
  }, [])

  const totalResources = resources.length
  const totalLogs = usageLogs.length
  const totalInventoryValue = getTotalInventoryValue()
  const monthlyProjection = calculateMonthlyProjection(usageLogs, resources)

  const chartData = {
    labels: resources.map(r => r.name),
    datasets: [{
      label: 'Valor inventario CLP',
      data: resources.map(r => (r.priceCLP || 0) * (r.stock || 0)),
      backgroundColor: 'rgba(47, 111, 159, 0.9)'
    }]
  }

  return (
    <div className="space-y-6">
      <Card title="Resumen rápido" subtitle="Panel principal">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-center">
            <div className="text-sm text-muted dark:text-gray-400">Recursos</div>
            <div className="text-2xl font-bold text-accent dark:text-blue-400">{totalResources}</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-center">
            <div className="text-sm text-muted dark:text-gray-400">Registros</div>
            <div className="text-2xl font-bold text-accent dark:text-blue-400">{totalLogs}</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-center">
            <div className="text-sm text-muted dark:text-gray-400">Valor inventario (CLP)</div>
            <div className="text-2xl font-bold text-accent dark:text-blue-400">{fmtCLP(totalInventoryValue)}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6 flex-wrap">
          <Button variant="ghost" onClick={updateExchangeRate}>
            Actualizar tipo de cambio
          </Button>
          <div className="text-sm text-muted dark:text-gray-400">
            Tipo USD→CLP: {exchangeRate ? `${fmtCLP(exchangeRate.rate)}` : '—'}
          </div>
        </div>

        <Chart type="bar" data={chartData} height={180} />
      </Card>

      <Card title="Proyección mensual" subtitle="Basado en uso histórico">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
          <div className="text-sm text-muted dark:text-gray-300 mb-2">Proyección 30 días (CLP)</div>
          <div className="text-3xl font-bold text-accent dark:text-blue-400">
            {monthlyProjection > 0 ? fmtCLP(monthlyProjection) : 'No hay datos suficientes'}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Dashboard