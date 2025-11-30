import React from 'react'
import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

interface ChartProps {
  type: 'bar' | 'line'
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor?: string | string[]
      borderColor?: string | string[]
    }[]
  }
  options?: ChartOptions
  height?: number
}

/**
 * Chart wrapper component using Chart.js
 * @param type - Chart type (bar or line)
 * @param data - Chart data with labels and datasets
 * @param options - Additional Chart.js options
 * @param height - Chart height in pixels
 */
const Chart: React.FC<ChartProps> = ({ 
  type, 
  data, 
  options = {},
  height = 220
}) => {
  const defaultBarOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    },
    ...options as ChartOptions<'bar'>
  }

  const defaultLineOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    },
    ...options as ChartOptions<'line'>
  }

  return (
    <div style={{ height: `${height}px` }}>
      {type === 'bar' ? (
        <Bar data={data} options={defaultBarOptions} />
      ) : (
        <Line data={data} options={defaultLineOptions} />
      )}
    </div>
  )
}

export default Chart
