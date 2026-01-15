import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { branches } from "@/public/data/branchesData";

export type Branch = {
  id: number;
  BranchName: string;
  Area: string;
  division: string;
  address: string;
  location: { lat: number; lng: number };
  phone: string;
  time: string;
  map: string;
};

type BranchesState = {
  list: Branch[];
  selected: Branch | null;
  loading: boolean;
  error: string | null;
};

const initialState: BranchesState = {
  list: branches,
  selected: null,
  loading: false,
  error: null,
};

const branchesSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {
    selectBranch(state, action: PayloadAction<Branch | null>) {
      state.selected = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { selectBranch, setError } = branchesSlice.actions;
export default branchesSlice.reducer;
