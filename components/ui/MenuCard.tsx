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
  <div className="bg-white shadow-md rounded-lg p-3 sm:p-4 flex flex-col justify-between min-h-80 sm:min-h-90">
    <Image
      src={item.image}
      alt={item.name}
      width={400}
      height={144}
      className="w-full h-32 sm:h-36 object-cover rounded-md mb-3"
    />
    <div className="flex-1 flex flex-col">
      <h3 className="font-semibold text-base sm:text-lg mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {item.name}
      </h3>
      <p
        className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 flex-1 overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}
      >
        {item.description}
      </p>

      <div className="flex flex-col gap-1 text-yellow-600 font-semibold text-sm sm:text-base">
        {item.prices.one && <span>1 Person: ৳{item.prices.one}</span>}
        {item.prices.three && <span>3 Persons: ৳{item.prices.three}</span>}
        {item.prices.five && <span>5 Persons: ৳{item.prices.five}</span>}
      </div>
    </div>

    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3 sm:mt-4">
      <Link href={`/menu/${item.slug}`} className="flex-1">
        <button className="w-full bg-gray-200 text-gray-800 py-2 px-3 sm:px-4 rounded-md hover:bg-gray-300 transition text-sm sm:text-base">
          View Details
        </button>
      </Link>
      <AppButton
        href={`/order?item=${item.id}`}
        className="flex-1 py-2 px-3 sm:px-4 text-sm sm:text-base"
      >
        Order Now
      </AppButton>
    </div>
  </div>
);
