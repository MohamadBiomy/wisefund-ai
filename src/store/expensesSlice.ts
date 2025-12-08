import { createSlice } from "@reduxjs/toolkit"


export interface ExpenseType {
  title: string
  amount: number
  id: string
  date: string
  category: string
}

export interface ExpensesReducer {
  expenses: ExpenseType[]
  sortBy: "title" | "amount" | "date" | "category" | "recent"
  calcExpensesFrom: number
}

const initialState: ExpensesReducer = {
  expenses: [],
  sortBy: "recent",
  calcExpensesFrom: 30
}

const ExpensesReducer = createSlice({
  name: "expenses",
  initialState: initialState,
  reducers: {
    ADD_EXPENSE: (state, action) => {
      state.expenses.unshift({
        title: action.payload.title,
        amount: action.payload.amount,
        id: Date.now().toString(),
        category: action.payload.category,
        date: action.payload.date
      });
    },
    REMOVE_EXPENSE: (state, action) => {
      state.expenses = state.expenses.filter(expense => expense.id !== action.payload.id)
    },
    UPDATE_SORT: (state, action) => {
      state.sortBy = action.payload.sortBy
    },
    REMOVE_ALL: (state) => {
      state.expenses = []
    }, 
    UPDATE_CALC_FROM: (state, action) => {
      state.calcExpensesFrom = action.payload.days
    }
  }
})

export default ExpensesReducer.reducer
export const actions = ExpensesReducer.actions