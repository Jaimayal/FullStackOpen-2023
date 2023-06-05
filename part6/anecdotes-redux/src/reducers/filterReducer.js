import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentFilter: "NONE",
    payload: {}
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        searchByText(state, action) {
            const text = action.payload
            state.currentFilter = "SEARCH"
            state.payload.text = text
            return state
        },
        clearCurrentFilters(state, action) {
            return initialState;
        }
    },
})



export const { searchByText, clearCurrentFilters } = filterSlice.actions
export default filterSlice.reducer;