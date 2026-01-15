import React from "react";
import { Heart, ChefHat, MapPin, Truck } from "lucide-react";

function ValueCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 text-center shadow hover:shadow-lg transition">
      <div className="w-12 h-12 mx-auto flex items-center justify-center bg-yellow-400/20 text-yellow-400 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{desc}</p>
    </div>
  );
}
export const OurValue = () => {
  return (
    <>
      {/* Values */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        <ValueCard
          icon={<ChefHat />}
          title="Authentic Taste"
          desc="Traditional recipes, no shortcuts, no compromises."
        />
        <ValueCard
          icon={<Heart />}
          title="Made with Love"
          desc="Every plate is cooked like it’s for our own family."
        />
        <ValueCard
          icon={<Truck />}
          title="Fast Delivery"
          desc="Hot, fresh, and delivered right on time."
        />
        <ValueCard
          icon={<MapPin />}
          title="Multiple Branches"
          desc="Serving Kacchi lovers across the world."
        />
      </div>
    </>
  );
};
