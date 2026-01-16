"use client";

import { useState } from "react";
import { useCart, useCartTotal, useAppDispatch } from "@/redux/hooks";
import { clearCart } from "@/redux/slices/cartSlice";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AppButton from "@/components/ui/AppButton";
import AppAlert from "@/components/ui/AppAlert";

export default function CheckoutForm() {
  const { items, branch } = useCart();
  const total = useCartTotal();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    paymentMethod: "cod",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Order submitted:", {
        ...formData,
        branch,
        items,
        total,
      });

      dispatch(clearCart());
      setAlertOpen(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        notes: "",
        paymentMethod: "cod",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name *
          </label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Full Name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email *
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone *
          </label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+880 1XXXXXXXXX"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Address *
          </label>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Your Delivery Address"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Special Instructions
        </label>
        <Textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any special requests?"
          rows={3}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Payment Method *
        </label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="cod">Cash on Delivery</option>
          <option value="card">Debit/Credit Card</option>
          <option value="mobile">Mobile Banking</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">Subtotal:</span>
          <span className="font-semibold">৳{total}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">Delivery:</span>
          <span className="font-semibold">৳50</span>
        </div>
        <div className="border-t border-gray-300 pt-2 flex justify-between items-center">
          <span className="font-bold text-lg">Total:</span>
          <span className="font-bold text-xl text-yellow-600">
            ৳{total + 50}
          </span>
        </div>
      </div>

      <AppButton
        type="submit"
        disabled={isSubmitting || items.length === 0}
        className="w-full"
      >
        {isSubmitting ? "Processing..." : "Place Order"}
      </AppButton>

      <AppAlert
        open={alertOpen}
        title="Order Placed Successfully!"
        message="Your order has been placed. You will receive a confirmation email shortly."
        duration={1500}
        onClose={() => setAlertOpen(false)}
      />
    </form>
  );
}
