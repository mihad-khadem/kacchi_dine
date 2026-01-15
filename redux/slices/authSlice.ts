import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  role: "admin" | "user" | null;
  token: string | null;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  role: null,
  token: null,
  user: null,
  loading: false,
  error: null,
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
    setUser(
      state,
      action: PayloadAction<{ id: string; email: string; name: string }>
    ) {
      state.user = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    logout(state) {
      state.role = null;
      state.token = null;
      state.user = null;
      state.error = null;
    },
  },
});

export const { setRole, setToken, setUser, setLoading, setError, logout } =
  authSlice.actions;
export default authSlice.reducer;
