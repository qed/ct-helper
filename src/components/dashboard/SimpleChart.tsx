import { MonthlyActivity } from '../../data/dashboardStats'
import Card from '../ui/Card'

interface SimpleChartProps {
  data: MonthlyActivity[]
  title: string
}

export default function SimpleChart({ data, title }: SimpleChartProps) {
  const maxLetters = Math.max(...data.map(d => d.letters))
  const maxInteractions = Math.max(...data.map(d => d.interactions))
  const maxValue = Math.max(maxLetters, maxInteractions)

  return (
    <Card>
      <h3 className="font-bold text-ct-navy mb-4">{title}</h3>

      <div className="flex items-end gap-2 h-48">
        {data.map((item) => (
          <div key={item.month} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex gap-1 items-end" style={{ height: '160px' }}>
              {/* Letters bar */}
              <div
                className="flex-1 bg-ct-navy rounded-t transition-all duration-300"
                style={{ height: `${(item.letters / maxValue) * 100}%` }}
                title={`Letters: ${item.letters}`}
              />
              {/* Interactions bar */}
              <div
                className="flex-1 bg-ct-teal rounded-t transition-all duration-300"
                style={{ height: `${(item.interactions / maxValue) * 100}%` }}
                title={`Interactions: ${item.interactions}`}
              />
            </div>
            <span className="text-xs text-gray-500">{item.month}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-6 mt-4 pt-4 border-t">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-ct-navy rounded" />
          <span className="text-sm text-gray-600">Letters</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-ct-teal rounded" />
          <span className="text-sm text-gray-600">Interactions</span>
        </div>
      </div>
    </Card>
  )
}
