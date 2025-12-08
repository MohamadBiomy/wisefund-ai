import { createSlice } from "@reduxjs/toolkit";


export interface CategoriesReducer {
  categories: {name: string, id:string}[]
}

const initialState: CategoriesReducer = {
  categories: [{
    name: "general",
    id: Date.now().toString()
  }]
}

const CategoriesReducer = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    ADD_CATEGORY: (state, action) => {
      state.categories.push({name: action.payload.name, id: Date.now().toString()})
    },
    REMOVE_CATEGORY: (state, action) => {
      state.categories = state.categories.filter(category => category.id !== action.payload.id)
    }
  }
})


export default CategoriesReducer.reducer
export const actions = CategoriesReducer.actions
