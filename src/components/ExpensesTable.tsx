import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { ExpenseType } from "@/store/expensesSlice"
import type { RootState } from "@/store/store"
import { Trash2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { actions as expensesActions } from "@/store/expensesSlice"
import addCommas from "@/module/addCommas"
import Alert from "./Alert"
import { sortExpenses } from "@/module/sortExpenses"

function ExpensesTable() {
  const { expenses } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  const sortedExpenses = sortExpenses(expenses)
  const hasExpenses = sortedExpenses.length > 0

  return (
    <>
      <div className="hidden overflow-x-auto rounded-md bg-card sm:block">
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
              sortedExpenses.map((expense: ExpenseType) => {
                const date = new Date(expense.date)

                return <TableRow key={expense.id} className="relative">
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{`$${addCommas(Number(expense.amount))}`}</TableCell>
                  <TableCell>{date.toLocaleDateString()}</TableCell>
                  <TableCell className="capitalize relative pr-8">
                    {expense.category}

                    <Alert
                      trigger={
                        <Trash2
                          strokeWidth={2.3}
                          className="absolute w-4 aspect-square top-1/2 -translate-y-1/2 right-2 cursor-pointer text-red-500"
                        />
                      }
                      actionWhenAccept={() => dispatch(expensesActions.REMOVE_EXPENSE({ id: expense.id }))}
                      title="Are you sure?"
                      description="Be aware, You cannot undo this action."
                    />
                  </TableCell>
                </TableRow>
              })
              : <TableRow>
                <TableCell colSpan={4}>There are no added expenses.</TableCell>
              </TableRow>}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:hidden">
        {hasExpenses ?
          sortedExpenses.map((expense: ExpenseType) => {
            const date = new Date(expense.date)

            return (
              <div
                key={expense.id}
                className="relative flex flex-col gap-2 rounded-md border border-border bg-card p-4 text-sm shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-base">{expense.title}</p>
                    <p className="text-xs text-muted-foreground">{date.toLocaleDateString()}</p>
                  </div>

                  <Alert
                    trigger={
                      <Trash2
                        strokeWidth={2.3}
                        className="h-5 w-5 text-red-500"
                      />
                    }
                    actionWhenAccept={() => dispatch(expensesActions.REMOVE_EXPENSE({ id: expense.id }))}
                    title="Are you sure?"
                    description="Be aware, You cannot undo this action."
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary">
                    {expense.category}
                  </span>
                  <span className="rounded-full bg-muted px-2 py-1 font-semibold text-muted-foreground">
                    {`$${addCommas(Number(expense.amount))}`}
                  </span>
                </div>
              </div>
            )
          })
          : <div className="rounded-md border border-dashed border-border bg-card p-4 text-center text-sm text-muted-foreground">
            There are no added expenses.
          </div>
        }
      </div>

    </>
  )
}

export default ExpensesTable