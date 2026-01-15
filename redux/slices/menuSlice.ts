import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { menuItems } from "@/public/data/menu";

export type MenuItem = {
  id: number;
  name: string;
  slug: string;
  category: string;
  prices?: { one?: number; three?: number; five?: number } | number;
  image: string;
  description: string;
};

type MenuState = {
  items: MenuItem[];
  category: string;
  loading: boolean;
  error: string | null;
};

const initialState: MenuState = {
  items: menuItems,
  category: "All",
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setCategory, setError } = menuSlice.actions;
export default menuSlice.reducer;
