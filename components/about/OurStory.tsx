import React from "react";
import AnimatedTestimonials from "./AnimatedTestimonials";

export const OurStory = () => {
  return (
    <>
      {/* Our Story */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h2 className="text-3xl font-bold text-yellow-400 dark:text-white mb-4">
          Our Story
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">
          We started in a small kitchen with one goal — make the best Kacchi
          Biryani in Bangladesh. Today, Kacchi Dine serves thousands of
          customers across multiple branches, but our soul remains the same:
          slow-cooked meat, premium basmati rice, and spices blended with care.
        </p>
        <div className="my-12">
          <AnimatedTestimonials />
        </div>
      </div>
    </>
  );
};
