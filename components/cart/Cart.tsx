"use client";

import { useAppDispatch, useCart, useCartTotal } from "@/redux/hooks";
import { removeFromCart } from "@/redux/slices/cartSlice";
import AppButton from "@/components/ui/AppButton";

export default function CartPage() {
  const { items, branch } = useCart();
  const total = useCartTotal();
  const dispatch = useAppDispatch();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Your Order {branch && `(${branch})`}
      </h1>

      {items.map((item) => (
        <div
          key={item.id + item.persons}
          className="flex justify-between items-center border-b py-4"
        >
          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-500">
              {item.persons} persons × {item.quantity}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <p>৳ {item.price * item.quantity}</p>

            <button
              onClick={() =>
                dispatch(
                  removeFromCart({
                    id: item.id,
                    persons: item.persons,
                  })
                )
              }
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="text-right mt-6 text-xl font-bold">Total: ৳ {total}</div>

      <div className="text-right mt-4">
        <AppButton href="/checkout" size="lg">
          Checkout
        </AppButton>
      </div>
    </div>
  );
}
