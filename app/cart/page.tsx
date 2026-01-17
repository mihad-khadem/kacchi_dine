"use client";

import { useState } from "react";
import UserLayout from "@/components/layout/UserLayout";
import {
  useCart,
  useCartTotal,
  useAppDispatch,
  useAppliedCoupon,
  useDiscountAmount,
  useActiveOffers,
} from "@/redux/hooks";
import { removeFromCart, clearCart } from "@/redux/slices/cartSlice";
import { applyCoupon, removeCoupon } from "@/redux/slices/offersSlice";
import Link from "next/link";
import { HeadingFont } from "@/components/ui/headingFont";

const CartPage = () => {
  const { items, branch } = useCart();
  const total = useCartTotal();
  const dispatch = useAppDispatch();
  const appliedCoupon = useAppliedCoupon();
  const discountAmount = useDiscountAmount();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  if (items.length === 0) {
    return (
      <UserLayout>
        <div className="max-w-4xl mx-auto p-6 my-16">
          <HeadingFont text="Your Cart" />
          <div className="bg-yellow-50 border border-yellow-200 p-8 rounded-lg text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Link
              href="/menu"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto p-6 my-10">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

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
                        }),
                      )
                    }
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded transition text-sm font-semibold"
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
          {/* Coupon Section */}
          <div className="mb-6 pb-6 border-b">
            <h3 className="font-semibold mb-3">Apply Coupon Code</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => {
                  setCouponInput(e.target.value.toUpperCase());
                  setCouponError("");
                }}
                placeholder="Enter coupon code"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
              />
              <button
                onClick={() => {
                  if (!couponInput.trim()) {
                    setCouponError("Enter a coupon code");
                    return;
                  }
                  dispatch(
                    applyCoupon({ code: couponInput, cartTotal: total }),
                  );
                  if (appliedCoupon === couponInput) {
                    setCouponError("");
                  } else {
                    setCouponError("Invalid or expired coupon");
                  }
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Apply
              </button>
            </div>
            {couponError && (
              <p className="text-red-500 text-sm mt-2">{couponError}</p>
            )}
            {appliedCoupon && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex justify-between items-center">
                <span className="text-green-700 font-semibold">
                  ✓ {appliedCoupon} applied
                </span>
                <button
                  onClick={() => {
                    dispatch(removeCoupon());
                    setCouponInput("");
                  }}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">৳{total}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span className="font-semibold">-৳{discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-semibold">৳50</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-yellow-600">
                ৳{Math.max(0, total - discountAmount + 50)}
              </span>
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
          <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </UserLayout>
  );
};

export default CartPage;
