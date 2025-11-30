import React, { useState, useMemo } from 'react'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { Card, Input, Button } from '@/components/ui'
import useResourceStore from '@/stores/resourceStore'
import { genId, fmtCLP, validateResource } from '@/utils/helpers'
import { Resource } from '@/types'
import { Pencil, Trash2 } from 'lucide-react'
import { Box, IconButton, Tooltip } from '@mui/material'

const Resources: React.FC = () => {
  const { resources, addResource, updateResource, deleteResource } = useResourceStore()
  const [formData, setFormData] = useState({
    name: '',
    unit: '',
    priceCLP: '',
    stock: '',
    desc: ''
  })
  const [editId, setEditId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const resourceData: Partial<Resource> = {
      name: formData.name,
      unit: formData.unit,
      priceCLP: Number(formData.priceCLP),
      stock: Number(formData.stock),
      desc: formData.desc
    }

    const validationError = validateResource(resourceData)
    if (validationError) {
      setError(validationError)
      return
    }

    if (editId) {
      updateResource(editId, resourceData)
    } else {
      const newResource: Resource = {
        ...resourceData as Resource,
        id: genId(),
        priceUSD: 0,
        createdAt: new Date().toISOString()
      }
      addResource(newResource)
    }

    resetForm()
  }

  const startEdit = (resource: Resource) => {
    setFormData({
      name: resource.name,
      unit: resource.unit,
      priceCLP: String(resource.priceCLP),
      stock: String(resource.stock),
      desc: resource.desc || ''
    })
    setEditId(resource.id)
  }

  const resetForm = () => {
    setFormData({ name: '', unit: '', priceCLP: '', stock: '', desc: '' })
    setEditId(null)
    setError(null)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('¿Eliminar recurso?')) {
      deleteResource(id)
    }
  }

  const columns = useMemo<MRT_ColumnDef<Resource>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nombre',
        Cell: ({ row }) => (
          <Box>
            <Box sx={{ fontWeight: 500 }}>{row.original.name}</Box>
            {row.original.desc && (
              <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                {row.original.desc}
              </Box>
            )}
          </Box>
        ),
      },
      {
        accessorKey: 'unit',
        header: 'Unidad',
        size: 100,
      },
      {
        accessorKey: 'priceCLP',
        header: 'Precio CLP',
        Cell: ({ cell }) => fmtCLP(cell.getValue<number>()),
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
        size: 80,
      },
      {
        id: 'total',
        header: 'Total CLP',
        Cell: ({ row }) => fmtCLP((row.original.priceCLP || 0) * (row.original.stock || 0)),
      },
      {
        id: 'actions',
        header: 'Acciones',
        size: 100,
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Editar">
              <IconButton
                size="small"
                onClick={() => startEdit(row.original)}
                color="primary"
              >
                <Pencil size={16} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton
                size="small"
                onClick={() => handleDelete(row.original.id)}
                color="error"
              >
                <Trash2 size={16} />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    []
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Administrar recursos" subtitle={editId ? 'Editando recurso' : 'Agregar nuevo'}>
        <form onSubmit={handleSubmit}>
          <Input
            label="Nombre"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="Ej: Harina de trigo"
          />
          <Input
            label="Unidad"
            value={formData.unit}
            onChange={(e) => setFormData({...formData, unit: e.target.value})}
            placeholder="kg, L, paquete..."
          />
          <Input
            label="Precio c/u"
            type="number"
            value={formData.priceCLP}
            onChange={(e) => setFormData({...formData, priceCLP: e.target.value})}
            placeholder="Ej. 1200"
          />
          <Input
            label="Stock"
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({...formData, stock: e.target.value})}
            placeholder="Cantidad disponible"
          />
          <Input
            label="Descripción"
            value={formData.desc}
            onChange={(e) => setFormData({...formData, desc: e.target.value})}
            placeholder="Opcional"
          />

          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

          <div className="flex gap-2">
            <Button type="submit" variant="primary">
              {editId ? 'Guardar' : 'Agregar'}
            </Button>
            {editId && (
              <Button type="button" variant="ghost" onClick={resetForm}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </Card>

      <Card title="Lista de recursos" subtitle={`${resources.length} recursos`}>
        <MaterialReactTable
          columns={columns}
          data={resources}
          enableColumnActions={false}
          enableColumnFilters={false}
          enablePagination={true}
          enableSorting={true}
          enableBottomToolbar={true}
          enableTopToolbar={false}
          muiTableBodyRowProps={{ hover: true }}
          muiTableProps={{
            sx: {
              tableLayout: 'fixed',
            },
          }}
          initialState={{
            density: 'compact',
            pagination: { pageSize: 10, pageIndex: 0 },
          }}
          localization={{
            noRecordsToDisplay: 'No hay recursos',
          }}
        />
      </Card>
    </div>
  )
}

export default Resources