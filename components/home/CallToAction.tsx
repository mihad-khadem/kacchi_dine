import { Link } from "lucide-react";

// Call to Action component
export default function CallToAction() {
  return (
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
  );
}
