import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Auth selectors
export const useAuthRole = () => useAppSelector((state) => state.auth.role);
export const useAuthToken = () => useAppSelector((state) => state.auth.token);
export const useAuthUser = () => useAppSelector((state) => state.auth.user);
export const useAuthLoading = () =>
  useAppSelector((state) => state.auth.loading);
export const useAuthError = () => useAppSelector((state) => state.auth.error);

// Cart selectors
export const useCart = () => useAppSelector((state) => state.cart);
export const useCartItems = () => useAppSelector((state) => state.cart.items);
export const useCartBranch = () => useAppSelector((state) => state.cart.branch);
export const useCartTotal = () => {
  const items = useAppSelector((state) => state.cart.items);
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

// Branches selectors
export const useBranches = () => useAppSelector((state) => state.branches.list);
export const useSelectedBranch = () =>
  useAppSelector((state) => state.branches.selected);
export const useBranchesLoading = () =>
  useAppSelector((state) => state.branches.loading);
export const useBranchesError = () =>
  useAppSelector((state) => state.branches.error);

// Menu selectors
export const useMenuItems = () => useAppSelector((state) => state.menu.items);
export const useMenuCategory = () =>
  useAppSelector((state) => state.menu.category);
export const useMenuLoading = () =>
  useAppSelector((state) => state.menu.loading);
export const useMenuError = () => useAppSelector((state) => state.menu.error);
