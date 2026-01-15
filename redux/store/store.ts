import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice";
import branchesReducer from "../slices/branchesSlice";
import menuReducer from "../slices/menuSlice";
import offersReducer from "../slices/offersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    branches: branchesReducer,
    menu: menuReducer,
    offers: offersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Persist cart & offers state to localStorage
if (typeof window !== "undefined") {
  store.subscribe(() => {
    const state = store.getState();
    try {
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("auth", JSON.stringify(state.auth));
      localStorage.setItem("offers", JSON.stringify(state.offers));
    } catch (error) {
      console.error("Failed to persist state:", error);
    }
  });
}
