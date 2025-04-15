import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    email: string | null; // Added email field
}

const initialState: AuthState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'false',
    token: null,
    email: null, // Initialize email as null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ token: string; email: string }>) => {
            state.isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
            state.token = action.payload.token;
            state.email = action.payload.email; // Store email on login
        },
        logout: (state) => {
            state.isLoggedIn = false;
            localStorage.setItem('isLoggedIn', 'false');
            state.token = null;
            state.email = null; // Clear email on logout
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;