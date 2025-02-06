import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
    },
    reducers: {
        setUserSlice: (state, action) => {
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.email = action.payload.email
            state.username = action.payload.username
        },
    },
})

export const { setUserSlice } = userSlice.actions
export default userSlice.reducer
