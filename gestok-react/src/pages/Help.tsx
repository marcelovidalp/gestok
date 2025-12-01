import React from 'react'
import { Card } from '@/components/ui'

const Help: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card title="Ayuda" subtitle="Guía de uso de Gestok">
        <div className="prose max-w-none">
          <h3 className="text-lg font-semibold mb-3">¿Cómo usar Gestok?</h3>
          
          <ol className="space-y-3 text-muted">
            <li>
              <strong className="text-gray-900 dark:text-white">1. Agrega recursos</strong>
              <p className="text-sm mt-1">Ve a la sección "Recursos" y agrega tus productos con precio CLP y stock inicial.</p>
            </li>
            
            <li>
              <strong className="text-gray-900 dark:text-white">2. Registra consumos</strong>
              <p className="text-sm mt-1">En "Registros" puedes registrar cada vez que uses un recurso. Estos datos sirven para calcular proyecciones mensuales.</p>
            </li>
            
            <li>
              <strong className="text-gray-900 dark:text-white">3. Consulta costos</strong>
              <p className="text-sm mt-1">En "Costos" verás el valor total de tu inventario y proyecciones de consumo mensual.</p>
            </li>
            
            <li>
              <strong className="text-gray-900 dark:text-white">4. Crea recetas</strong>
              <p className="text-sm mt-1">Puedes crear recetas combinando múltiples ingredientes y ver su costo total exacto en CLP.</p>
            </li>
            
            <li>
              <strong className="text-gray-900 dark:text-white">5. Revisa reportes</strong>
              <p className="text-sm mt-1">Analiza tu consumo histórico con gráficos y filtra por rango de fechas.</p>
            </li>
          </ol>

          <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">💾 Almacenamiento local</h4>
            <p className="text-sm text-muted dark:text-gray-300">
              Todos tus datos se guardan localmente en tu navegador (localStorage). No se envía información a ningún servidor externo.
            </p>
          </div>

          <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📊 Proyección mensual</h4>
            <p className="text-sm text-muted dark:text-gray-300">
              La proyección se calcula analizando tu historial de consumo y estimando el costo promedio diario proyectado a 30 días.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Help