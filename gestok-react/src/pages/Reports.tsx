import React, { useState } from 'react'
import { Card, Input, Button, Chart, Table } from '@/components/ui'
import useResourceStore from '@/stores/resourceStore'
import useUsageStore from '@/stores/usageStore'
import { formatDate } from '@/utils/helpers'

const Reports: React.FC = () => {
  const { resources } = useResourceStore()
  const { getUsageByDateRange, getRecentLogs } = useUsageStore()
  const [dateRange, setDateRange] = useState({ from: '', to: '' })

  const filteredLogs = getUsageByDateRange(dateRange.from, dateRange.to)
  
  const aggregated: Record<string, number> = {}
  filteredLogs.forEach(log => {
    aggregated[log.resourceId] = (aggregated[log.resourceId] || 0) + log.amount
  })

  const chartData = {
    labels: resources.map(r => r.name),
    datasets: [{
      label: 'Consumo',
      data: resources.map(r => Math.round((aggregated[r.id] || 0) * 100) / 100),
      backgroundColor: 'rgba(47, 111, 159, 0.85)'
    }]
  }

  const recentLogs = getRecentLogs(12)

  const columns = [
    { key: 'resource', header: 'Recurso', render: (_: any, row: any) => {
      const resource = resources.find(r => r.id === row.resourceId)
      return resource?.name || '(eliminado)'
    }},
    { key: 'amount', header: 'Cantidad' },
    { key: 'ts', header: 'Fecha', render: (val: string) => formatDate(val) },
    { key: 'notes', header: 'Notas', render: (val: string) => val || '—' }
  ]

  return (
    <div className="space-y-6">
      <Card title="Reportes" subtitle="Análisis de consumo">
        <div className="flex gap-4 items-end mb-6 flex-wrap">
          <Input
            label="Desde"
            type="date"
            value={dateRange.from}
            onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
          />
          <Input
            label="Hasta"
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
          />
          <Button variant="ghost" onClick={() => setDateRange({ from: '', to: '' })}>
            Limpiar
          </Button>
        </div>

        <Chart type="bar" data={chartData} height={220} />
      </Card>

      <Card title="Últimos registros" subtitle="12 registros más recientes">
        <Table columns={columns} data={recentLogs} emptyMessage="No hay registros" />
      </Card>
    </div>
  )
}

export default Reports