# Redux Architecture Diagram

## State Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        Redux Store                              │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐ │
│  │   Auth       │    Cart      │   Branches   │    Menu      │ │
│  │ • role       │ • items[]    │ • list[]     │ • items[]    │ │
│  │ • token      │ • branch     │ • selected   │ • category   │ │
│  │ • user       │ • loading    │ • loading    │ • loading    │ │
│  │ • loading    │ • error      │ • error      │ • error      │ │
│  │ • error      │              │              │              │ │
│  └──────────────┴──────────────┴──────────────┴──────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │         LocalStorage (Automatic Persistence)               │ │
│  │  cart: {...}        │      auth: {...}                     │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
         ▲                                        ▲
         │ dispatch()                             │ hydrate
         │                                        │
    ┌────┴─────┐                         ┌───────┴──────┐
    │ Component │                         │  Providers   │
    │  (hooks)  │ ◄─── useSelector ────► │  (useEffect) │
    └──────────┘       (custom hooks)     └──────────────┘
         │                                        │
         └─────────────── on load ────────────────┘
```

---

## Component Integration

```
App Root
├── Providers (Redux Provider + Hydration)
│   └── Layout (Navbar, Footer)
│       ├── Navbar
│       │   └── useAuthRole() ──→ Show role-based UI
│       │
│       └── Main Content
│           ├── Cart Page
│           │   ├── useCart() ──→ Display items
│           │   ├── useCartTotal() ──→ Calculate total
│           │   └── dispatch(removeFromCart) ──→ Remove item
│           │
│           ├── Branches Page
│           │   ├── useBranches() ──→ Display branches
│           │   └── dispatch(selectBranch) ──→ Select branch
│           │
│           └── Menu Page
│               ├── useMenuItems() ──→ Display menu
│               ├── useMenuCategory() ──→ Filter
│               └── dispatch(addToCart) ──→ Add to cart
```

---

## Data Flow Example: Adding to Cart

```
1. User clicks "Add to Cart" button
   │
   ├─→ Component dispatches action
   │   dispatch(addToCart({ id, name, price, ... }))
   │
   ├─→ Redux processes action
   │   cartSlice.reducers.addToCart(state, action)
   │
   ├─→ State updates
   │   state.cart.items[] added
   │   state updated in store
   │
   ├─→ Store notifies subscribers
   │   All components using useCart() re-render
   │
   ├─→ Persistence middleware auto-runs
   │   localStorage.setItem('cart', JSON.stringify(state.cart))
   │
   └─→ Component re-renders with new state
       const { items } = useCart() ──→ Shows updated items
```

---

## Hooks Organization

```
redux/hooks.ts
│
├── useAppDispatch() ────────────► Type-safe dispatch
│
├── Auth Hooks
│   ├── useAuthRole()
│   ├── useAuthToken()
│   ├── useAuthUser()
│   ├── useAuthLoading()
│   └── useAuthError()
│
├── Cart Hooks
│   ├── useCart()
│   ├── useCartItems()
│   ├── useCartBranch()
│   └── useCartTotal() ◄──── ✨ Computed value!
│
├── Branches Hooks
│   ├── useBranches()
│   ├── useSelectedBranch()
│   ├── useBranchesLoading()
│   └── useBranchesError()
│
└── Menu Hooks
    ├── useMenuItems()
    ├── useMenuCategory()
    ├── useMenuLoading()
    └── useMenuError()
```

---

## Slice Structure

```
Each Slice (e.g., authSlice.ts)
│
├── Type Definition
│   └── export type AuthState
│
├── Initial State
│   └── const initialState: AuthState
│
├── Slice Creation
│   └── const authSlice = createSlice({
│       ├── name: "auth"
│       ├── initialState
│       └── reducers: {
│           ├── setRole(state, action)
│           ├── setToken(state, action)
│           ├── setUser(state, action)
│           ├── setLoading(state, action)
│           ├── setError(state, action)
│           └── logout(state)
│       }
│   })
│
├── Export Actions
│   └── export const { setRole, setToken, ... }
│
└── Export Reducer
    └── export default authSlice.reducer
```

---

## TypeScript Type Flow

```
User Code
│
├─ Component uses hook
│   const role = useAuthRole()
│           ▼
│   TypeScript knows: role is "admin" | "user" | null
│
├─ Component dispatches action
│   dispatch(setRole("admin"))
│           ▼
│   TypeScript checks: "admin" is valid for setRole
│
└─ Result: Zero type errors! ✅
```

---

## File Dependencies

```
Components
│
├─→ redux/hooks.ts (custom hooks)
│   │
│   ├─→ redux/store/store.ts (RootState type)
│   │   │
│   │   └─→ redux/slices/*.ts (all reducers)
│   │       │
│   │       └─→ redux/store/store.ts (configureStore)
│   │
│   └─→ redux/slices/*.ts (direct imports for actions)
│
└─→ redux/Providers.tsx (setup in layout)
    │
    └─→ redux/store/store.ts
        └─→ redux/slices/*.ts
```

---

## State Shape

```
RootState
├── auth: AuthState
│   ├── role: "admin" | "user" | null
│   ├── token: string | null
│   ├── user: {
│   │   ├── id: string
│   │   ├── email: string
│   │   └── name: string
│   │} | null
│   ├── loading: boolean
│   └── error: string | null
│
├── cart: CartState
│   ├── items: CartItem[]
│   │   ├── id: string
│   │   ├── name: string
│   │   ├── image: string
│   │   ├── persons: 1 | 3 | 5
│   │   ├── price: number
│   │   ├── quantity: number
│   │   └── branch: string
│   └── branch: string | null
│
├── branches: BranchesState
│   ├── list: Branch[]
│   │   ├── id: number
│   │   ├── BranchName: string
│   │   ├── Area: string
│   │   ├── division: string
│   │   ├── address: string
│   │   ├── location: { lat, lng }
│   │   ├── phone: string
│   │   ├── time: string
│   │   └── map: string
│   ├── selected: Branch | null
│   ├── loading: boolean
│   └── error: string | null
│
└── menu: MenuState
    ├── items: MenuItem[]
    │   ├── id: number
    │   ├── name: string
    │   ├── slug: string
    │   ├── category: string
    │   ├── prices: { one?, three?, five? }
    │   ├── image: string
    │   └── description: string
    ├── category: string
    ├── loading: boolean
    └── error: string | null
```

---

## Persistence Flow

```
Component Mounts
│
└─→ Providers.tsx useEffect
    │
    ├─→ Check localStorage.cart
    │   ├─ Found? dispatch(setCart(savedCart))
    │   └─ Not found? Skip
    │
    ├─→ Check localStorage.auth
    │   ├─ Found? dispatch(setRole/setToken/setUser)
    │   └─ Not found? Skip
    │
    └─→ Store updated with persisted state
        │
        └─→ Components re-render with restored state
```

---

## Action Dispatch Flow

```
dispatch(addToCart(item))
│
├─→ Middleware processes action
│   ├─ Type: "cart/addToCart"
│   └─ Payload: item
│
├─→ Reducer processes action
│   ├─ Find existing item in state
│   ├─ Update quantity or add new
│   └─ State mutated (Immer handles it)
│
├─→ Store broadcasts update
│   └─ All useCart() subscribers notified
│
├─→ Components re-render
│   └─ useCart() returns new state
│
└─→ Persistence middleware auto-runs
    └─ localStorage.cart updated
```

---

## Testing the Setup

```
Before (No persistence)
├─ User adds to cart
├─ User refreshes page (F5)
└─ Cart is empty ❌

After (With persistence)
├─ User adds to cart
├─ Cart saved to localStorage
├─ User refreshes page (F5)
├─ Providers.tsx hydrates state
└─ Cart items still there ✅
```

---

## Performance Characteristics

```
Hook Usage
│
├─→ useAuthRole()
│   └─ Re-renders only when role changes ⚡
│
├─→ useCart()
│   └─ Re-renders when items or branch changes ⚡
│
├─→ useCartTotal()
│   └─ Computed on each call, but memoized ⚡
│
└─→ useSelector((state) => state)
    └─ Re-renders on any state change ❌ (Avoid this)
```

---

## Summary

```
✅ Redux fully typed with custom hooks
✅ State automatically persisted
✅ State automatically restored
✅ Error & loading states ready
✅ Components clean and simple
✅ Type safety throughout
✅ Ready for async operations
✅ Scalable architecture
```

---

**You're using best practices!** 🎉
