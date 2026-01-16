import { createSlice } from "@reduxjs/toolkit"

export interface IncomeSource {
  title: string
  id: string
  per: "day" | "month" | "week"
  amount: number
  category: string
  startingDate: string  // When the source was first created
  lastPaymentDate: string  // When the last payment was applied
}

export interface IncomeSources {
  incomeSources: IncomeSource[]
  sortBy: "title" | "amount" | "category" | "recent",
  calcTotalPer: IncomeSource["per"]
}

const initialState: IncomeSources = {
  incomeSources: [],
  sortBy: "recent",
  calcTotalPer: "month"
}

const incomeSourcesReducer = createSlice({
  name: "incomeSources",
  initialState: initialState,
  reducers: {
    ADD_SOURCE: (state, action) => {
      const now = new Date().toISOString()
      state.incomeSources.unshift({
        title: action.payload.title,
        per: action.payload.per,  // Make sure to include this!
        amount: action.payload.amount,
        startingDate: action.payload.startingDate || now,
        lastPaymentDate: action.payload.startingDate || now,  // First payment date
        category: action.payload.category,
        id: Date.now().toString()
      })
    },
    REMOVE_SOURCE: (state, action) => {
      state.incomeSources = state.incomeSources.filter(incomeSource => incomeSource.id !== action.payload.id)
    },
    UPDATE_SORT: (state, action) => {
      state.sortBy = action.payload.sortBy
    },
    REMOVE_ALL: (state) => {
      state.incomeSources = []
    }, 
    UPDATE_CALC_PER: (state, action) => {
      state.calcTotalPer = action.payload.per
    },
    UPDATE_LAST_PAYMENT_DATE: (state, action) => {
      const source = state.incomeSources.find(s => s.id === action.payload.id)
      if (source) {
        source.lastPaymentDate = action.payload.date
      }
    }
  }
})

export default incomeSourcesReducer.reducer
export const sourcesActions = incomeSourcesReducer.actions