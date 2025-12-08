import type { ExpensesReducer } from "@/store/expensesSlice"

export function getExpensesFrom(days: number, exps: ExpensesReducer["expenses"]) {

  const date = new Date()
  date.setDate(date.getDate() - days)
  
  const expenses = [...exps]

  const calculatedExpenses = expenses.filter(exp => {
    if (new Date(exp.date) >= date) {
      return exp
    }
  })

  const totalAmount = calculatedExpenses.reduce((acc, curr) => {
    return +acc + +curr.amount
  }, 0)

  return {
    totalAmount,
    calculatedExpenses
  }
}
// "2025-12-05T21:00:00.000Z"