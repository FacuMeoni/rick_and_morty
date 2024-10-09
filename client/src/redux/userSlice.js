import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: null,
        username: '',
        favorites: [],
        isAuthenticated: false,
    },
    reducers: {
        setUser(state, { payload }) {
            state.id = payload.userId;
            state.username = payload.username;
            state.favorites = payload.favorites;
            state.isAuthenticated = true;
        },  logoutUser(state) {
            state.id = null;
            state.username = '';
            state.favorites = [];
            state.isAuthenticated = false;
        },
    }
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
