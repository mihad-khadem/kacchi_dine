import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  name: string;
  image: string;
  persons: 1 | 3 | 5;
  price: number;
  quantity: number;
  branch: string;
};

type CartState = {
  items: CartItem[];
  branch: string | null; // Lock cart to a branch
};

const initialState: CartState = {
  items: [],
  branch: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const item = action.payload;

      // Lock branch on first item
      if (!state.branch) {
        state.branch = item.branch;
      }

      // Block mixing branches
      if (state.branch !== item.branch) {
        alert("You can order from only one branch at a time.");
        return;
      }

      const existing = state.items.find(
        (i) => i.id === item.id && i.persons === item.persons
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push(item);
      }
    },

    removeFromCart(
      state,
      action: PayloadAction<{ id: string; persons: number }>
    ) {
      state.items = state.items.filter(
        (i) =>
          !(i.id === action.payload.id && i.persons === action.payload.persons)
      );

      if (state.items.length === 0) {
        state.branch = null;
      }
    },

    clearCart(state) {
      state.items = [];
      state.branch = null;
    },

    setCart(state, action: PayloadAction<CartState>) {
      return action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setCart } =
  cartSlice.actions;
export default cartSlice.reducer;
