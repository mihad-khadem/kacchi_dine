# Redux Centralization Complete ✅

## What Was Done

Your Redux setup has been fully centralized and enhanced. Here's the comprehensive guide:

---

## 📁 Redux Structure

```
redux/
├── store/
│   └── store.ts                    # Store + persistence logic
├── slices/
│   ├── authSlice.ts               # Auth state management
│   ├── cartSlice.ts               # Cart state management
│   ├── branchesSlice.ts           # Branches data
│   └── menuSlice.ts               # Menu items data
├── hooks.ts                        # ⭐ Custom typed hooks (USE THESE!)
└── Providers.tsx                   # Redux provider with hydration
```

---

## 🎯 Core Features

### ✅ Type Safety
- All slices fully typed with TypeScript
- Custom hooks eliminate `RootState` imports
- Type inference in components

### ✅ State Persistence
- Cart & auth auto-save to localStorage
- Auto-restore on page refresh
- No more lost shopping carts!

### ✅ Custom Hooks
- 20+ pre-built selectors
- Cleaner component code
- Computed values included (e.g., cart total)

### ✅ Error Handling
- Loading states in all slices
- Error message support
- Ready for async operations

---

## 🚀 Updated Components

### Navbar.tsx
```typescript
// Before
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
const role = useSelector((state: RootState) => state.auth.role);

// After ✅
import { useAuthRole } from "@/redux/hooks";
const role = useAuthRole();
```

### Cart.tsx
```typescript
// Before
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/store";
const { items, branch } = useSelector((state: RootState) => state.cart);
const dispatch = useDispatch();
const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

// After ✅
import { useAppDispatch, useCart, useCartTotal } from "@/redux/hooks";
const { items, branch } = useCart();
const dispatch = useAppDispatch();
const total = useCartTotal();
```

### BranchGrid.tsx
```typescript
// Before
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
const branches = useSelector((state: RootState) => state.branches.list);

// After ✅
import { useBranches } from "@/redux/hooks";
const branches = useBranches();
```

---

## 📚 Complete Hook Reference

### Auth Hooks
```typescript
import { useAuthRole, useAuthToken, useAuthUser, useAuthLoading, useAuthError } from "@/redux/hooks";

const role = useAuthRole();           // "admin" | "user" | null
const token = useAuthToken();         // string | null
const user = useAuthUser();           // { id, email, name } | null
const loading = useAuthLoading();     // boolean
const error = useAuthError();         // string | null
```

### Cart Hooks
```typescript
import { useCart, useCartItems, useCartBranch, useCartTotal, useAppDispatch } from "@/redux/hooks";

const { items, branch } = useCart();
const items = useCartItems();
const branch = useCartBranch();
const total = useCartTotal();          // ⭐ Pre-calculated!
const dispatch = useAppDispatch();     // Typed dispatch
```

### Branches Hooks
```typescript
import { useBranches, useSelectedBranch, useBranchesLoading, useBranchesError } from "@/redux/hooks";

const branches = useBranches();
const selected = useSelectedBranch();
const loading = useBranchesLoading();
const error = useBranchesError();
```

### Menu Hooks
```typescript
import { useMenuItems, useMenuCategory, useMenuLoading, useMenuError } from "@/redux/hooks";

const items = useMenuItems();
const category = useMenuCategory();
const loading = useMenuLoading();
const error = useMenuError();
```

---

## 🔄 Redux Actions Reference

### Auth Actions
```typescript
import { setRole, setToken, setUser, setLoading, setError, logout } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hooks";

const dispatch = useAppDispatch();

// Set role
dispatch(setRole("admin"));
dispatch(setRole("user"));
dispatch(setRole(null));

// Set token
dispatch(setToken("jwt_token_here"));

// Set user data
dispatch(setUser({ id: "1", email: "user@app.com", name: "John Doe" }));

// Set loading (for async operations)
dispatch(setLoading(true));

// Set error
dispatch(setError("Login failed"));
dispatch(setError(null)); // Clear error

// Logout
dispatch(logout()); // Clears everything
```

### Cart Actions
```typescript
import { addToCart, removeFromCart, clearCart } from "@/redux/slices/cartSlice";
import { useAppDispatch } from "@/redux/hooks";

const dispatch = useAppDispatch();

// Add to cart
dispatch(addToCart({
  id: "1",
  name: "Kacchi Biryani",
  image: "/image.jpg",
  persons: 3,          // 1, 3, or 5
  price: 450,
  quantity: 1,
  branch: "Dhaka"
}));

// Remove from cart
dispatch(removeFromCart({
  id: "1",
  persons: 3
}));

// Clear entire cart
dispatch(clearCart());
```

### Branches Actions
```typescript
import { selectBranch, setError } from "@/redux/slices/branchesSlice";
import { useAppDispatch } from "@/redux/hooks";

const dispatch = useAppDispatch();

// Select a branch
const branch = branches[0];
dispatch(selectBranch(branch));

// Clear selection
dispatch(selectBranch(null));

// Set error
dispatch(setError("Failed to load branches"));
```

### Menu Actions
```typescript
import { setCategory, setError } from "@/redux/slices/menuSlice";
import { useAppDispatch } from "@/redux/hooks";

const dispatch = useAppDispatch();

// Change category
dispatch(setCategory("Kacchi"));
dispatch(setCategory("All"));

// Set error
dispatch(setError("Failed to load menu"));
```

---

## 💾 LocalStorage Integration

**Automatic Persistence:**
- Cart state saved to `localStorage.cart`
- Auth state saved to `localStorage.auth`
- Automatically restored on app load

**No Manual Work Needed:**
```typescript
// ✅ This is automatic - don't do it manually
// Just use Redux actions, everything else is handled
```

---

## 🛠️ Common Patterns

### Example 1: Component with Auth Check
```typescript
"use client";
import { useAuthRole } from "@/redux/hooks";

export default function AdminPanel() {
  const role = useAuthRole();
  
  if (role !== "admin") {
    return <div>Access Denied</div>;
  }
  
  return <div>Admin Content</div>;
}
```

### Example 2: Cart Management
```typescript
"use client";
import { useAppDispatch, useCart, useCartTotal } from "@/redux/hooks";
import { removeFromCart, clearCart } from "@/redux/slices/cartSlice";

export default function CheckoutPage() {
  const { items } = useCart();
  const total = useCartTotal();
  const dispatch = useAppDispatch();
  
  return (
    <>
      <p>Total: ৳{total}</p>
      <button onClick={() => dispatch(removeFromCart({...}))}>
        Remove Item
      </button>
    </>
  );
}
```

### Example 3: Loading & Error States
```typescript
"use client";
import { useAuthLoading, useAuthError } from "@/redux/hooks";

export default function LoginPage() {
  const loading = useAuthLoading();
  const error = useAuthError();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <LoginForm />;
}
```

---

## ✅ Files Modified

| File | Changes |
|------|---------|
| `redux/slices/authSlice.ts` | Enhanced types, added user/loading/error, new actions |
| `redux/slices/branchesSlice.ts` | Added proper types, error handling |
| `redux/slices/menuSlice.ts` | Added proper types, error handling |
| `redux/slices/cartSlice.ts` | Added `setCart()` for hydration |
| `redux/store/store.ts` | Added localStorage persistence |
| `redux/Providers.tsx` | Added state hydration logic |
| `redux/hooks.ts` | **NEW** - 20+ custom hooks |
| `components/layout/Navbar.tsx` | Updated to use custom hooks |
| `components/cart/Cart.tsx` | Updated to use custom hooks |
| `components/branches/BranchGrid.tsx` | Updated to use custom hooks |

---

## 📋 Next Steps

### Priority 1: Update All Components
Search for remaining `useSelector` usage:
```bash
grep -r "useSelector" components/ app/
```

Replace with appropriate custom hooks from `@/redux/hooks`.

### Priority 2: Add Async Operations
For API calls, create thunks:
```typescript
// redux/thunks/authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading, setError, setUser } from "../slices/authSlice";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      dispatch(setUser(data.user));
      return data;
    } catch (err) {
      dispatch(setError(err.message));
      throw err;
    }
  }
);
```

### Priority 3: Remove Direct localStorage Access
Replace any `localStorage.getItem/setItem` with Redux:
```typescript
// ❌ BEFORE
const cart = JSON.parse(localStorage.getItem("cart") || "{}");

// ✅ AFTER
const cart = useCart();
```

### Priority 4: Redux DevTools (Optional)
```bash
npm install -D redux-devtools-extension
```

Then update `store.ts`:
```typescript
import { composeWithDevTools } from "redux-devtools-extension";

export const store = configureStore(
  { reducer: { ... } },
  composeWithDevTools()
);
```

---

## 🔍 Type Safety Benefits

All hooks are fully typed:
```typescript
const role = useAuthRole(); // TS knows this is "admin" | "user" | null
const items = useCartItems(); // TS knows shape of CartItem[]
const total = useCartTotal(); // TS knows this is number
```

No more `as any` or type assertions needed!

---

## 🎉 You're All Set!

Your Redux setup is now:
- ✅ Fully centralized
- ✅ Type-safe
- ✅ Persistent across reloads
- ✅ Ready for async operations
- ✅ Documented and maintainable

Happy coding! 🚀
