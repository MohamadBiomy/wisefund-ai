import { createSlice } from "@reduxjs/toolkit";


export interface BalanceReducer {
  amount: number
  currency: "US" | "EUR"
  affectedByExpenses: boolean;
}

const initialState: BalanceReducer = {
  amount: 0,
  currency: "US",
  affectedByExpenses: true
}

const BalanceReducer = createSlice({
  name: "balance",
  initialState: initialState,
  reducers: {
    UPDATE_BALANCE: (state, action: { payload: { amount: number } }) => {
      state.amount = action.payload.amount;
    },
    UPDATE_CURRENCY: (state, action: { payload: { currency: "US" | "EUR" } }) => {
      state.currency = action.payload.currency;
    },
    INCREASE_BALANCE: (state, action: { payload: { amount: number} }) => {
      state.amount += action.payload.amount
    },
    DECREASE_BALANCE: (state, action: { payload: { amount: number} }) => {
      state.amount -= action.payload.amount
    },
    TOGGLE_EFFECT: (state) => {
      if (state.affectedByExpenses) {
        state.affectedByExpenses = false
      } else state.affectedByExpenses = true
    }
  }
})


export default BalanceReducer.reducer
export const actions = BalanceReducer.actions