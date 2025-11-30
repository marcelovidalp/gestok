import React, { useState } from 'react'
import { Card, Select, Input, Button } from '@/components/ui'
import useResourceStore from '@/stores/resourceStore'
import useUsageStore from '@/stores/usageStore'
import { genId, nowISOLocal, validateUsage } from '@/utils/helpers'
import { UsageLog } from '@/types'

const Register: React.FC = () => {
  const { resources } = useResourceStore()
  const { addUsage } = useUsageStore()
  const [formData, setFormData] = useState({
    resourceId: '',
    amount: '',
    ts: nowISOLocal(),
    notes: ''
  })
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const usageData: Partial<UsageLog> = {
      resourceId: formData.resourceId,
      amount: Number(formData.amount),
      ts: formData.ts,
      notes: formData.notes
    }

    const validationError = validateUsage(usageData)
    if (validationError) {
      setError(validationError)
      return
    }

    const newUsage: UsageLog = {
      ...usageData as UsageLog,
      id: genId()
    }

    addUsage(newUsage)
    setFormData({ resourceId: '', amount: '', ts: nowISOLocal(), notes: '' })
    setError(null)
    alert('Registro guardado exitosamente')
  }

  const resourceOptions = [
    { value: '', label: 'Seleccione recurso' },
    ...resources.map(r => ({ value: r.id, label: `${r.name} (${r.unit})` }))
  ]

  return (
    <Card title="Registrar uso / consumo" subtitle="Registrar consumo de recursos">
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Recurso"
            options={resourceOptions}
            value={formData.resourceId}
            onChange={(e) => setFormData({...formData, resourceId: e.target.value})}
          />
          <Input
            label="Cantidad usada"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            placeholder="Ej. 2"
          />
          <Input
            label="Fecha y hora"
            type="datetime-local"
            value={formData.ts}
            onChange={(e) => setFormData({...formData, ts: e.target.value})}
          />
          <Input
            label="Notas"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Opcional"
          />
        </div>

        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

        <div className="flex gap-2 mt-4">
          <Button type="submit" variant="primary">Registrar</Button>
          <Button type="button" variant="ghost" onClick={() => {
            setFormData({ resourceId: '', amount: '', ts: nowISOLocal(), notes: '' })
            setError(null)
          }}>
            Limpiar
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Register