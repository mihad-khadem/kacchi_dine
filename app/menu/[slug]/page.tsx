"use client";
import { notFound, useParams } from "next/navigation";
import { menuItems } from "@/public/data/menu";
import AppButton from "@/components/ui/AppButton";
import Image from "next/image";

export default function MenuDetailsPage() {
  const params = useParams();
  const item = menuItems.find((m) => m.slug === params.slug);
  //   console.log(item);
  if (!item) return notFound();

  return (
    <div className="max-w-4xl my-36 mx-auto px-6  py-12 space-y-8">
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
            <div className="text-yellow-600 font-semibold space-y-1">
              {item.prices.one && <p>1 Person: ৳{item.prices.one}</p>}
              {item.prices.three && <p>3 Persons: ৳{item.prices.three}</p>}
              {item.prices.five && <p>5 Persons: ৳{item.prices.five}</p>}
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <AppButton href={`/order?item=${item.id}`} className="flex-1">
              Order Now
            </AppButton>
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
