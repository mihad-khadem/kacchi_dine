# Redux Centralization Guide

## Overview

Our app now has a fully centralized Redux setup with proper type safety, persistence, and custom hooks.

## File Structure

```
redux/
├── store/
│   └── store.ts          # Redux store configuration with persistence
├── slices/
│   ├── authSlice.ts      # Authentication state (user, role, token)
│   ├── cartSlice.ts      # Shopping cart state
│   ├── branchesSlice.ts  # Branches data
│   └── menuSlice.ts      # Menu items data
├── hooks.ts              # Custom typed hooks (USE THESE!)
└── Providers.tsx         # Redux provider with hydration
```

## Key Improvements Made

### 1. **Type Safety** ✅

- All slices now have proper TypeScript types
- Custom hooks with automatic type inference
- No more manual `RootState` imports

### 2. **State Persistence** ✅

- Cart & auth state auto-save to localStorage
- State rehydrates on page refresh
- No data loss on browser reload

### 3. **Custom Hooks** ✅

Replace `useSelector` with custom hooks:

```typescript
// ❌ OLD (verbose & repeats RootState)
const role = useSelector((state: RootState) => state.auth.role);
const items = useSelector((state: RootState) => state.cart.items);

// ✅ NEW (clean & typed)
const role = useAuthRole();
const items = useCartItems();
const total = useCartTotal();
```

### 4. **Better Error Handling** ✅

All slices now include:

- `loading` state for async operations
- `error` state for failures
- `setError` actions for handling errors

## Usage Examples

### Navbar Component (Before → After)

```typescript
// ❌ BEFORE
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const role = useSelector((state: RootState) => state.auth.role);

// ✅ AFTER
import { useAuthRole } from "@/redux/hooks";

const role = useAuthRole();
```

### Cart Component (Before → After)

```typescript
// ❌ BEFORE
const { items, branch } = useSelector((state: RootState) => state.cart);
const dispatch = useDispatch();
const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

// ✅ AFTER
import { useAppDispatch, useCart, useCartTotal } from "@/redux/hooks";

const { items, branch } = useCart();
const dispatch = useAppDispatch();
const total = useCartTotal();
```

## Available Hooks

### Auth Hooks

```typescript
useAuthRole(); // "admin" | "user" | null
useAuthToken(); // JWT token string or null
useAuthUser(); // { id, email, name } | null
useAuthLoading(); // Loading state
useAuthError(); // Error message or null
```

### Cart Hooks

```typescript
useCart(); // { items, branch }
useCartItems(); // CartItem[]
useCartBranch(); // string | null
useCartTotal(); // Calculated total price
useAppDispatch(); // Typed dispatch for cart actions
```

### Branches Hooks

```typescript
useBranches(); // Branch[]
useSelectedBranch(); // Branch | null
useBranchesLoading(); // boolean
useBranchesError(); // string | null
```

### Menu Hooks

```typescript
useMenuItems(); // MenuItem[]
useMenuCategory(); // string
useMenuLoading(); // boolean
useMenuError(); // string | null
```

## Actions Available

### Auth Actions

```typescript
import {
  setRole,
  setToken,
  setUser,
  setLoading,
  setError,
  logout,
} from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hooks";

const dispatch = useAppDispatch();

// Set user role
dispatch(setRole("admin"));

// Set authentication token
dispatch(setToken("jwt_token_here"));

// Set user info
dispatch(setUser({ id: "1", email: "user@example.com", name: "John" }));

// Clear everything
dispatch(logout());
```

### Cart Actions

```typescript
import { addToCart, removeFromCart, clearCart } from "@/redux/slices/cartSlice";
import { useAppDispatch } from "@/redux/hooks";

const dispatch = useAppDispatch();

// Add item to cart
dispatch(
  addToCart({
    id: "1",
    name: "Kacchi Biryani",
    image: "/image.jpg",
    persons: 3,
    price: 450,
    quantity: 1,
    branch: "Dhaka",
  })
);

// Remove item
dispatch(removeFromCart({ id: "1", persons: 3 }));

// Clear cart
dispatch(clearCart());
```

### Branches Actions

```typescript
import { selectBranch, setError } from "@/redux/slices/branchesSlice";
import { useAppDispatch } from "@/redux/hooks";

const dispatch = useAppDispatch();

// Select a branch
dispatch(selectBranch(branchData));

// Set error
dispatch(setError("Failed to load branches"));
```

### Menu Actions

```typescript
import { setCategory, setError } from "@/redux/slices/menuSlice";
import { useAppDispatch } from "@/redux/hooks";

const dispatch = useAppDispatch();

// Change menu category
dispatch(setCategory("Biryani"));

// Set error
dispatch(setError("Failed to load menu"));
```

## LocalStorage Persistence

State is automatically saved to localStorage when changed:

- `localStorage.cart` - Cart state
- `localStorage.auth` - Authentication state

And automatically restored on app load in `Providers.tsx`.

## Next Steps to Complete Centralization

### 1. Update Remaining Components

Update all components using `useSelector` to use custom hooks:

```bash
# Search for remaining useSelector usage:
grep -r "useSelector" src/components/
```

### 2. Add Async Thunks (For API Calls)

Create `redux/thunks/authThunks.ts` for login/register:

```typescript
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    return response.json();
  }
);
```

### 3. Add Error Handling

Wrap dispatches in try-catch:

```typescript
try {
  dispatch(addToCart(item));
} catch (error) {
  dispatch(setError("Failed to add item"));
}
```

### 4. Add Redux Devtools (Optional)

Install: `npm install -D redux-devtools-extension`

```typescript
import { composeWithDevTools } from "redux-devtools-extension";

export const store = configureStore({
  reducer: { ... },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...),
  compose: composeWithDevTools()
});
```

## Migration Checklist

- [x] Type safety in all slices
- [x] Custom hooks for common selectors
- [x] LocalStorage persistence
- [x] Hydration on app load
- [x] Error handling states
- [x] Better action types
- [ ] Async thunks for API calls
- [ ] Update all component usages
- [ ] Add Redux DevTools
- [ ] Remove direct `localStorage.cart/auth` access (use Redux instead)

## Questions?

All Redux state flows through custom hooks for consistency and type safety. Never use raw `useSelector` or `useDispatch` - always use the custom hooks from `@/redux/hooks`.
