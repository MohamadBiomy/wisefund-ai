import { createSlice } from "@reduxjs/toolkit";


export interface SideBarReducer {
  opened: boolean
}

const initialState: SideBarReducer = {
  opened: false
}

const sideBarReducer = createSlice({
  name: "sidebar",
  initialState: initialState,
  reducers: {
    TOGGLE_BAR: (state, action) => {
      return {
        ...state,
        opened: action.payload.opened
      }
    }
  }
})


export default sideBarReducer.reducer
export const { TOGGLE_BAR } = sideBarReducer.actions