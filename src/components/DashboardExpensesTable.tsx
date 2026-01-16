import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { ExpenseType } from "@/store/expensesSlice"
import addCommas from "@/module/addCommas"
import { Link } from "react-router-dom"

interface DashboardExpensesTableProps {
  expenses: ExpenseType[]
  limit?: number
}

export function DashboardExpensesTable({ expenses, limit = 5 }: DashboardExpensesTableProps) {
  const displayExpenses = expenses.slice(0, limit)
  const hasExpenses = displayExpenses.length > 0

  return (
    <>
      <div className="overflow-x-auto rounded-md bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hasExpenses ?
              displayExpenses.map((expense: ExpenseType) => {
                const date = new Date(expense.date)
                return (
                  <TableRow key={expense.id}>
                    <TableCell className="text-sm">{expense.title}</TableCell>
                    <TableCell className="text-sm">{`$${addCommas(Number(expense.amount))}`}</TableCell>
                    <TableCell className="text-sm">{date.toLocaleDateString()}</TableCell>
                    <TableCell className="capitalize text-sm">{expense.category}</TableCell>
                  </TableRow>
                )
              })
              : <TableRow>
                <TableCell colSpan={4} className="text-center text-sm text-muted-foreground">
                  No expenses yet
                </TableCell>
              </TableRow>}
          </TableBody>
        </Table>
      </div>
      {expenses.length > limit && (
        <div className="mt-2 text-right">
          <Link to="/expenses" className="text-sm text-primary hover:underline">
            View all expenses →
          </Link>
        </div>
      )}
    </>
  )
}

