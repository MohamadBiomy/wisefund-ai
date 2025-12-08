import type { ExpensesReducer } from "@/store/expensesSlice"

export function sortExpenses(expensesState: ExpensesReducer) {
  const sortBy = expensesState.sortBy
  const expensesCopy = [...expensesState.expenses]

  switch (sortBy) {
    case "title":
      return expensesCopy.sort((a, b) => a.title.localeCompare(b.title))

    case "amount":
      return expensesCopy.sort((a, b) => a.amount - b.amount)

    case "date":
        return expensesCopy.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
      )

    case "category":
      return expensesCopy.sort((a, b) => a.category.localeCompare(b.category))

    case "recent":
        return expensesCopy

    default:
      return expensesCopy
  }
}