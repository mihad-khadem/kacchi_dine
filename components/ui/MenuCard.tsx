import Link from "next/link";
import AppButton from "./AppButton";
import Image from "next/image";
interface MenuItem {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  prices: {
    one?: number;
    three?: number;
    five?: number;
  };
}
interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item }) => (
  <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between h-120">
    <Image
      src={item.image}
      alt={item.name}
      width={400}
      height={144}
      className="w-full h-36 object-cover rounded-md mb-3"
    />
    <div className="flex-1 flex flex-col">
      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
      <p className="text-gray-600 text-sm mb-1 flex-1">{item.description}</p>

      <div className="flex flex-col gap-1 text-yellow-600 font-semibold">
        {item.prices.one && <span>1 Person: ৳{item.prices.one}</span>}
        {item.prices.three && <span>3 Persons: ৳{item.prices.three}</span>}
        {item.prices.five && <span>5 Persons: ৳{item.prices.five}</span>}
      </div>
    </div>

    <div className="flex gap-3 mt-4">
      <Link href={`/menu/${item.slug}`} className="flex-1">
        <button className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition">
          View Details
        </button>
      </Link>
      <AppButton href={`/order?item=${item.id}`} className="flex-1">
        Order Now
      </AppButton>
    </div>
  </div>
);
