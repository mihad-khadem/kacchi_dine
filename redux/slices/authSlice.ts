import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  role: "admin" | "user" | null;
  token?: string; // optional for JWT
};

const initialState: AuthState = {
  role: null,
  token: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole(state, action: PayloadAction<"admin" | "user" | null>) {
      state.role = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    logout(state) {
      state.role = null;
      state.token = undefined;
    },
  },
});

export const { setRole, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
