import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice";
import branchesReducer from "../slices/branchesSlice";
import menuReducer from "../slices/menuSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    branches: branchesReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Persist cart state to localStorage
if (typeof window !== "undefined") {
  store.subscribe(() => {
    const state = store.getState();
    try {
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("auth", JSON.stringify(state.auth));
    } catch (error) {
      console.error("Failed to persist state:", error);
    }
  });
}
