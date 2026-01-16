import Image from "next/image";
import AppButton from "@/components/ui/AppButton";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cartSlice";

type FoodCardProps = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  price: number;
  category?: string;
};

export default function FoodCard({
  id,
  name,
  description,
  image,
  price,
  category,
}: FoodCardProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        name,
        price,
        quantity: 1,
        persons: 1,
        image,
      })
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden border border-yellow-100">
      {image && (
        <div className="relative h-40 bg-gray-100">
          <Image src={image} alt={name} fill className="object-cover" />
          {category && (
            <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded font-semibold">
              {category}
            </span>
          )}
        </div>
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-900">{name}</h2>
        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-yellow-600">৳{price}</span>
          <AppButton size="sm" onClick={handleAddToCart}>
            Add to Cart
          </AppButton>
        </div>
      </div>
    </div>
  );
}
