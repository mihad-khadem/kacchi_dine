"use client";
import { notFound, useParams } from "next/navigation";
import { menuItems } from "@/public/data/menu";
import AppButton from "@/components/ui/AppButton";
import Image from "next/image";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cartSlice";

export default function MenuDetailsPage() {
  const params = useParams();
  const item = menuItems.find((m) => m.slug === params.slug);
  const dispatch = useAppDispatch();
  const [selectedPersons, setSelectedPersons] = useState<1 | 3 | 5>(1);
  const [quantity, setQuantity] = useState(1);

  if (!item) return notFound();

  const currentPrice =
    item.prices[`${selectedPersons}` as keyof typeof item.prices] ||
    item.prices.one ||
    0;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: String(item.id),
        name: item.name,
        image: item.image,
        persons: selectedPersons,
        price: currentPrice,
        quantity,
        branch: "Dhaka", // Default branch - can be made dynamic
      })
    );
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className="max-w-4xl my-36 mx-auto px-6 py-12 space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 w-full">
          <Image
            src={item.image}
            alt={item.name}
            width={500}
            height={400}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-between">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{item.name}</h1>
            <p className="text-gray-700">{item.description}</p>

            {/* Serving Size Selection */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Select Serving Size:</h3>
              <div className="flex gap-2">
                {(
                  [
                    { value: 1 as const, label: "1 Person" },
                    { value: 3 as const, label: "3 Persons" },
                    { value: 5 as const, label: "5 Persons" },
                  ] as const
                ).map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setSelectedPersons(value)}
                    disabled={
                      !item.prices[value as unknown as keyof typeof item.prices]
                    }
                    className={`px-4 py-2 rounded border-2 transition ${
                      selectedPersons === value
                        ? "border-yellow-400 bg-yellow-100 font-semibold"
                        : "border-gray-300 hover:border-yellow-400"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Display */}
            <div className="text-yellow-600 font-semibold space-y-1 border-t pt-4">
              {item.prices.one && <p>1 Person: ৳{item.prices.one}</p>}
              {item.prices.three && <p>3 Persons: ৳{item.prices.three}</p>}
              {item.prices.five && <p>5 Persons: ৳{item.prices.five}</p>}
            </div>

            {/* Quantity Selector */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Quantity:</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  −
                </button>
                <span className="text-lg font-semibold w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="text-2xl font-bold text-yellow-600 border-t pt-4">
              Total: ৳{(currentPrice * quantity).toFixed(0)}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg transition"
            >
              Add to Cart
            </button>
            <AppButton
              href="/menu"
              className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Back to Menu
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  );
}
