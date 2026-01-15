"use client";

import UserLayout from "@/components/layout/UserLayout";
import { useCart, useCartTotal, useAppDispatch } from "@/redux/hooks";
import { removeFromCart, clearCart } from "@/redux/slices/cartSlice";
import Link from "next/link";

const CartPage = () => {
  const { items, branch } = useCart();
  const total = useCartTotal();
  const dispatch = useAppDispatch();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 my-16">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        <div className="bg-yellow-50 border border-yellow-200 p-8 rounded-lg text-center">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link
            href="/menu"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold transition"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 my-10">
      <h1 className="text-3xl font-bold mb-6">
        Your Cart {branch && `(${branch})`}
      </h1>

      {/* Cart Items */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="divide-y">
          {items.map((item) => (
            <div
              key={item.id + item.persons}
              className="p-4 sm:p-6 flex justify-between items-center hover:bg-gray-50 transition"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  {item.persons} person{item.persons > 1 ? "s" : ""} ×{" "}
                  {item.quantity} = ৳{item.price * item.quantity}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-bold text-yellow-600">
                  ৳{item.price * item.quantity}
                </span>
                <button
                  onClick={() =>
                    dispatch(
                      removeFromCart({
                        id: item.id,
                        persons: item.persons,
                      })
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">৳{total}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="font-semibold">৳50</span>
          </div>
          <div className="border-t pt-2 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-yellow-600">৳{total + 50}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 flex-col sm:flex-row">
        <button
          onClick={() => dispatch(clearCart())}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-semibold transition"
        >
          Clear Cart
        </button>
        <Link
          href="/menu"
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition text-center"
        >
          Continue Shopping
        </Link>
        <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
