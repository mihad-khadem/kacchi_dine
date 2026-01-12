import HeroCarousel from "@/components/home/Hero";
import Branches from "@/components/home/OurBranches";
import PopularFoods from "@/components/home/PopularFoods";
import TodaysOffers from "@/components/home/TodaysOffers";
import Link from "next/link";

// Fake data for demo, replace with API calls
const offers = [
  {
    id: 1,
    title: "20% off on Kacchi Biryani",
    description: "Today only!",
    image: "/images/banners/offer1.jpg",
  },
  {
    id: 2,
    title: "Family Meal Deal",
    description: "Feed 4 people",
    image: "/images/banners/offer2.jpg",
  },
];

const popularFoods = [
  {
    id: 1,
    name: "Classic Kacchi Biryani",
    price: 450,
    image: "/images/food/kacchi1.jpg",
  },
  { id: 2, name: "Beef Kacchi", price: 500, image: "/images/food/kacchi2.jpg" },
  {
    id: 3,
    name: "Chicken Kacchi",
    price: 400,
    image: "/images/food/kacchi3.jpg",
  },
];

const branches = [
  { id: 1, name: "Banani", address: "House 12, Road 7, Banani, Dhaka" },
  { id: 2, name: "Gulshan", address: "Road 9, Gulshan 1, Dhaka" },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}

      <section className="mt-6">
        <HeroCarousel />
      </section>

      {/* Todays Offers */}
      <TodaysOffers />
      {/* Popular Foods Section */}
      <section className="max-w-7xl mx-auto px-6">
        <PopularFoods />
      </section>
      {/* Branches Section */}
      <section className="max-w-7xl mx-auto px-6 pb-3.5">
        <Branches />
      </section>

      {/* Call to Action */}
      <section className="bg-yellow-400 text-white py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Hungry Yet?</h2>
        <p className="text-lg md:text-xl mb-6">
          Order your favorite Kacchi Biryani and enjoy the authentic taste!
        </p>
        <Link
          href="/order"
          className="bg-white text-yellow-400 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition"
        >
          Order Now
        </Link>
      </section>
    </div>
  );
}
