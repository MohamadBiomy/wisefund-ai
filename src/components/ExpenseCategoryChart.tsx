import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import type { ExpenseType } from '@/store/expensesSlice'

interface ExpenseCategoryChartProps {
  expenses: ExpenseType[]
}

const ACCENT = '#03cf7c'
const PRIMARY = '#222'

// Generate primary color variations (lighter shades of gray)
const getPrimaryVariations = (count: number): string[] => {
  const variations: string[] = []
  const baseValue = 34
  for (let i = 0; i < count; i++) {
    const multiplier = 1 + (i * 0.4)
    const value = Math.min(Math.round(baseValue * multiplier), 200)
    variations.push(`rgb(${value}, ${value}, ${value})`)
  }
  return variations
}

export function ExpenseCategoryChart({ expenses }: ExpenseCategoryChartProps) {
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find(item => item.name === expense.category)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    existing ? existing.value += expense.amount : acc.push({ name: expense.category, value: expense.amount })
    return acc
  }, [] as { name: string; value: number }[])

  if (categoryData.length === 0) {
    return <div className="flex items-center justify-center h-64 text-muted-foreground"><p>No expenses data available</p></div>
  }

  const colors = getPrimaryVariations(categoryData.length)

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie 
          data={categoryData} 
          cx="50%" 
          cy="50%" 
          labelLine={false} 
          label={({ name, percent, cx, cy }) => (
            <text x={cx} y={cy} fill={ACCENT} textAnchor="middle" dominantBaseline="central" fontSize={12}>
              {`${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
            </text>
          )}
          outerRadius={80} 
          fill={PRIMARY} 
          dataKey="value"
        >
          {categoryData.map((_, i) => <Cell key={i} fill={colors[i] || PRIMARY} />)}
        </Pie>
        <Tooltip 
          formatter={(v: number | undefined) => v ? `$${v.toLocaleString()}` : '$0'} 
          contentStyle={{ color: ACCENT }}
        />
        <Legend wrapperStyle={{ color: ACCENT }} />
      </PieChart>
    </ResponsiveContainer>
  )
}

