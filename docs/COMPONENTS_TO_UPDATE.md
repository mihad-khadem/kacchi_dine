# Components to Update - Migration Guide

## Status: Partially Complete ✅⏳

**3 of ~20 components already updated to use custom hooks.**

---

## ✅ Already Updated

These components are using custom hooks:

- ✅ `components/layout/Navbar.tsx` - Uses `useAuthRole()`
- ✅ `components/cart/Cart.tsx` - Uses `useCart()`, `useCartTotal()`
- ✅ `components/branches/BranchGrid.tsx` - Uses `useBranches()`

---

## ⏳ Components Still Using Old Pattern

Run this to find all remaining uses:

```bash
# In your terminal
grep -r "useSelector.*RootState" e:\projects\kacchi_dine\front-end\components\
grep -r "useDispatch" e:\projects\kacchi_dine\front-end\components\
```

---

## 🔄 Migration Template

For each component found, apply this pattern:

### Before (Old Pattern)

```typescript
"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/store";
import { someAction } from "@/redux/slices/someSlice";

export default function MyComponent() {
  const stateValue = useSelector((state: RootState) => state.someThing);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(someAction(...));
  };

  return <div>{stateValue}</div>;
}
```

### After (New Pattern - Using Custom Hooks)

```typescript
"use client";
import { useSomeSelector, useAppDispatch } from "@/redux/hooks";
import { someAction } from "@/redux/slices/someSlice";

export default function MyComponent() {
  const stateValue = useSomeSelector();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(someAction(...));
  };

  return <div>{stateValue}</div>;
}
```

---

## 📋 Available Custom Hooks

### Auth Hooks

```typescript
import {
  useAuthRole, // Get current role
  useAuthToken, // Get JWT token
  useAuthUser, // Get user profile
  useAuthLoading, // Get loading state
  useAuthError, // Get error message
} from "@/redux/hooks";
```

### Cart Hooks

```typescript
import {
  useCart, // Get { items, branch }
  useCartItems, // Get items only
  useCartBranch, // Get branch only
  useCartTotal, // Get calculated total (⭐ bonus!)
} from "@/redux/hooks";
```

### Branches Hooks

```typescript
import {
  useBranches, // Get all branches
  useSelectedBranch, // Get selected branch
  useBranchesLoading, // Get loading state
  useBranchesError, // Get error message
} from "@/redux/hooks";
```

### Menu Hooks

```typescript
import {
  useMenuItems, // Get menu items
  useMenuCategory, // Get current category
  useMenuLoading, // Get loading state
  useMenuError, // Get error message
} from "@/redux/hooks";
```

### Dispatch Hook

```typescript
import {
  useAppDispatch, // Typed dispatch for all actions
} from "@/redux/hooks";
```

---

## 🎯 Priority Components to Update

### High Priority (Likely Using Redux)

1. `components/home/PopularFoods.tsx` - Might use menu
2. `components/home/OurBranches.tsx` - Might use branches
3. `components/offer/OfferGrid.tsx` - Might use offers data
4. `components/order/CheckoutForm.tsx` - Might use cart/auth
5. `components/food/FoodCard.tsx` - Might use cart actions
6. `components/nav/UserMenu.tsx` - Probably uses auth role
7. `components/nav/OrderNowButton.tsx` - Might use dispatch

### Medium Priority

8. `components/booking/TableBookingForm.tsx` - Might use auth
9. `components/booking/CorporateBookingForm.tsx` - Might use auth
10. `components/booking/BranchSelector.tsx` - Might use branches

### Admin Components

11. `components/admin/AdminTopbar.tsx` - Might use auth role
12. `components/admin/AdminSidebar.tsx` - Might use auth role

---

## 🤖 Quick Find & Replace

### Step 1: Find Old Imports

Look for this pattern in components:

```typescript
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/store";
```

### Step 2: Replace Selectors

```typescript
// OLD
const cart = useSelector((state: RootState) => state.cart);

// NEW
import { useCart } from "@/redux/hooks";
const cart = useCart();
```

### Step 3: Replace Dispatch

```typescript
// OLD
const dispatch = useDispatch();

// NEW
import { useAppDispatch } from "@/redux/hooks";
const dispatch = useAppDispatch();
```

---

## ✨ Example: UserMenu Component

```typescript
// ❌ BEFORE
"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

export default function UserMenu() {
  const role = useSelector((state: RootState) => state.auth.role);
  const user = useSelector((state: RootState) => state.auth.user);

  if (!role) return <LoginButton />;

  return (
    <menu>
      <div>{user?.name}</div>
      {role === "admin" && <AdminLink />}
      {role === "user" && <OrdersLink />}
    </menu>
  );
}

// ✅ AFTER
("use client");
import { useAuthRole, useAuthUser } from "@/redux/hooks";

export default function UserMenu() {
  const role = useAuthRole();
  const user = useAuthUser();

  if (!role) return <LoginButton />;

  return (
    <menu>
      <div>{user?.name}</div>
      {role === "admin" && <AdminLink />}
      {role === "user" && <OrdersLink />}
    </menu>
  );
}
```

---

## 📊 Progress Tracker

As you update components, mark them below:

- [x] Navbar.tsx
- [x] Cart.tsx
- [x] BranchGrid.tsx
- [ ] PopularFoods.tsx
- [ ] OurBranches.tsx
- [ ] OfferGrid.tsx
- [ ] CheckoutForm.tsx
- [ ] FoodCard.tsx
- [ ] UserMenu.tsx
- [ ] OrderNowButton.tsx
- [ ] TableBookingForm.tsx
- [ ] CorporateBookingForm.tsx
- [ ] BranchSelector.tsx
- [ ] AdminTopbar.tsx
- [ ] AdminSidebar.tsx
- [ ] (Add others as found)

---

## 🚀 How to Mass Update

### Option 1: Use Find & Replace in VS Code

1. Press `Ctrl+Shift+H` (Find and Replace)
2. Find: `useSelector\(\(state: RootState\) => state\.([a-z]+)\.([a-z]+)\)`
3. This regex will help identify patterns

### Option 2: Do It Component by Component

1. Open each component
2. Find `useSelector` lines
3. Look up the corresponding custom hook
4. Replace the imports
5. Remove `RootState` import

### Option 3: Let the Type Errors Guide You

1. Remove old imports
2. TypeScript will error
3. VS Code will suggest the custom hooks
4. Accept the suggestions

---

## 💡 Tips for Updating

1. **Check the hooks file first** - `redux/hooks.ts` has all available hooks
2. **Look for patterns** - Most components follow similar patterns
3. **Test after each update** - Make sure nothing breaks
4. **Use type errors** - TypeScript will guide you to fixes
5. **Reference existing components** - Copy patterns from Navbar, Cart, BranchGrid

---

## 🆘 Need Help?

If a component uses Redux in a unique way:

1. Check `redux/hooks.ts` for available hooks
2. Check `REDUX_QUICK_REFERENCE.md` for examples
3. Check the already-updated components for patterns:
   - Navbar.tsx
   - Cart.tsx
   - BranchGrid.tsx

---

## 🎯 Expected Timeline

- **Each simple component**: 2-5 minutes
- **Each complex component**: 10-15 minutes
- **All 15 components**: 1-2 hours
- **With testing**: 2-3 hours

---

## ✅ You're Ready!

You have everything you need:

- ✅ Custom hooks ready to use
- ✅ Documentation complete
- ✅ Example components to follow
- ✅ Templates to copy from

Start with high-priority components and work your way down! 🚀
