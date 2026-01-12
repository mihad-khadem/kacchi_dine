import Image from "next/image";
import { HeadingFont } from "../ui/headingFont";

const branches = [
  {
    id: 1,
    name: "Banani",
    address: "House 12, Road 7, Banani, Dhaka",
    image: "/kacchi_logo.jpeg",
  },
  {
    id: 2,
    name: "Gulshan",
    address: "Road 9, Gulshan 1, Dhaka",
    image: "/kacchi_logo.jpeg",
  },
  {
    id: 3,
    name: "Dhanmondi",
    address: "Road 27, Dhanmondi, Dhaka",
    image: "/kacchi_logo.jpeg",
  },
];

export default function Branches() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <HeadingFont text="📍 Our Branches" />

      <div className="grid md:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <div
            key={branch.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-yellow-100"
          >
            <div className="relative h-48">
              <Image
                src={branch.image}
                alt={branch.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5 text-center">
              <h3 className="text-xl font-bold text-gray-900">{branch.name}</h3>
              <p className="text-gray-600 mt-2">{branch.address}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
