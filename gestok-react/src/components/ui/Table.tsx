import React from 'react'

interface Column {
  key: string
  header: string
  render?: (value: any, row: any) => React.ReactNode
}

interface TableProps {
  columns: Column[]
  data: any[]
  emptyMessage?: string
  className?: string
}

/**
 * Responsive table component
 * @param columns - Array of column definitions with key, header and optional render function
 * @param data - Array of data objects to display
 * @param emptyMessage - Message to show when data is empty
 * @param className - Additional CSS classes
 */
const Table: React.FC<TableProps> = ({ 
  columns, 
  data, 
  emptyMessage = 'No hay datos disponibles',
  className = '' 
}) => {
  return (
    <div className={`table-wrap ${className}`}>
      <table className="min-w-full">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-8 text-muted">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
