"use client";

import { Provider } from "react-redux";
import { store } from "./store/store";
import { useEffect } from "react";
import { setCart } from "./slices/cartSlice";
import { setRole, setToken, setUser } from "./slices/authSlice";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hydrate cart from localStorage
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const cartState = JSON.parse(savedCart);
        store.dispatch(setCart(cartState));
      }

      // Hydrate auth from localStorage
      const savedAuth = localStorage.getItem("auth");
      if (savedAuth) {
        const authState = JSON.parse(savedAuth);
        if (authState.role) store.dispatch(setRole(authState.role));
        if (authState.token) store.dispatch(setToken(authState.token));
        if (authState.user) store.dispatch(setUser(authState.user));
      }
    } catch (error) {
      console.error("Failed to hydrate state:", error);
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
