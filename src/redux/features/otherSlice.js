import { createSlice } from "@reduxjs/toolkit"

export const otherSlice = createSlice({
    name: 'otherSlice',
    initialState: {
        // sidebarDropDown: null,
        sidebarDropDown: 'Food Estate',
    },
    reducers: {
        setOtherSlice: (state, action) => {
            state.sidebarDropDown = action.payload.sidebarDropDown
        },
    },
})

export const { setOtherSlice } = otherSlice.actions
export default otherSlice.reducer
