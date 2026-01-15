# Redux Quick Reference Card

## 📌 Golden Rule
**Always use custom hooks from `@/redux/hooks`, never raw `useSelector` or `useDispatch`**

---

## 🎯 Quick Imports

```typescript
// For reading state
import { 
  useAuthRole,           // Auth
  useCart, useCartTotal, // Cart
  useBranches,           // Branches
  useMenuItems           // Menu
} from "@/redux/hooks";

// For dispatching actions
import { useAppDispatch } from "@/redux/hooks";
import { setRole, logout } from "@/redux/slices/authSlice";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
```

---

## 🔐 Auth Examples

```typescript
// Check user role
const role = useAuthRole();
if (role === "admin") { /* show admin UI */ }

// Handle login
const dispatch = useAppDispatch();
const handleLogin = () => {
  dispatch(setRole("user"));
  dispatch(setToken("jwt_token"));
  dispatch(setUser({ id: "1", email: "user@app.com", name: "John" }));
};

// Logout
const handleLogout = () => {
  dispatch(logout());
};
```

---

## 🛒 Cart Examples

```typescript
// Display cart
const { items, branch } = useCart();
const total = useCartTotal();

items.forEach(item => (
  <div>
    {item.name} × {item.quantity} = ৳{item.price * item.quantity}
  </div>
));

// Add item
const dispatch = useAppDispatch();
dispatch(addToCart({
  id: "1",
  name: "Kacchi",
  image: "/img.jpg",
  persons: 3,
  price: 450,
  quantity: 1,
  branch: "Dhaka"
}));

// Remove item
dispatch(removeFromCart({ id: "1", persons: 3 }));

// Clear cart
import { clearCart } from "@/redux/slices/cartSlice";
dispatch(clearCart());
```

---

## 🏪 Branches Examples

```typescript
import { useBranches, useSelectedBranch } from "@/redux/hooks";
import { selectBranch } from "@/redux/slices/branchesSlice";

const branches = useBranches();
const selected = useSelectedBranch();
const dispatch = useAppDispatch();

// Select branch
dispatch(selectBranch(branches[0]));
```

---

## 🍖 Menu Examples

```typescript
import { useMenuItems, useMenuCategory } from "@/redux/hooks";
import { setCategory } from "@/redux/slices/menuSlice";

const items = useMenuItems();
const category = useMenuCategory();
const dispatch = useAppDispatch();

// Filter by category
const filtered = items.filter(i => i.category === "Kacchi");

// Change category
dispatch(setCategory("Kacchi"));
```

---

## 🔄 Loading & Error Handling

```typescript
import { useAuthLoading, useAuthError } from "@/redux/hooks";

const loading = useAuthLoading();
const error = useAuthError();

if (loading) return <Spinner />;
if (error) return <ErrorAlert message={error} />;
return <Content />;
```

---

## 💾 LocalStorage (Automatic)

✅ Cart state auto-saves to `localStorage.cart`
✅ Auth state auto-saves to `localStorage.auth`
✅ Auto-restores on page reload

**You don't need to do anything!**

---

## ❌ Don't Do This

```typescript
// ❌ WRONG - Don't use raw useSelector
const cart = useSelector(state => state.cart);

// ❌ WRONG - Don't access localStorage directly
const cart = JSON.parse(localStorage.getItem("cart"));

// ❌ WRONG - Don't use useDispatch without typing
const dispatch = useDispatch();

// ❌ WRONG - Don't import RootState in components
import { RootState } from "@/redux/store/store";
```

---

## ✅ Do This Instead

```typescript
// ✅ RIGHT - Use custom hooks
import { useCart, useAppDispatch } from "@/redux/hooks";

const { items, branch } = useCart();
const dispatch = useAppDispatch();

// ✅ Redux handles everything automatically
```

---

## 🚀 Performance Tips

1. **Use specific hooks** - `useAuthRole()` instead of `useAuthUser()`
2. **Memoize when needed** - Use `useMemo()` for expensive computations
3. **Split selectors** - Create separate hooks for each piece of state

```typescript
// ✅ GOOD - Only re-renders if role changes
const role = useAuthRole();

// ❌ BAD - Re-renders if ANY auth value changes
const { role } = useAppSelector(s => s.auth);
```

---

## 🎓 Learning Path

1. **Basics** → Use `useCart()` and `useAuthRole()`
2. **Actions** → Learn `addToCart()`, `setRole()`, etc.
3. **Dispatch** → Use `useAppDispatch()` with actions
4. **Advanced** → Create async thunks for API calls

---

## 📞 Need Help?

Check these files:
- **Setup details** → `REDUX_COMPLETE.md`
- **What changed** → `FIXES_APPLIED.md`
- **Original guide** → `REDUX_SETUP.md`
- **Hook source** → `redux/hooks.ts`
- **Slice source** → `redux/slices/*.ts`

---

**Remember: Custom hooks first, everything else second!** 🚀
