import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { branches } from "@/public/data/branchesData";
import { TBranch } from "@/public/data/branchesData";

type BranchesState = {
  list: TBranch[];
  selected: TBranch | null;
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
    selectBranch(state, action: PayloadAction<TBranch | null>) {
      state.selected = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { selectBranch, setError } = branchesSlice.actions;
export default branchesSlice.reducer;
