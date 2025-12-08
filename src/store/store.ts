import { configureStore } from "@reduxjs/toolkit";
import SideBarReducer from "./sidebarSlice";
import BalanceReducer from "./balanceSlice";
import CategoriesReducer from "./categoriesSlice";
import ExpensesReducer from "./expensesSlice";
import { loadState, saveState } from "./localStorage";

// Load state from localStorage
const persistedState = loadState()

const store = configureStore({
  reducer: {
    sidebar: SideBarReducer,
    balance: BalanceReducer,
    categories: CategoriesReducer,
    expenses: ExpensesReducer
  },
  preloadedState: persistedState,
})

// Save state to localStorage on every change
store.subscribe(() => {
  saveState(store.getState())
})

export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;