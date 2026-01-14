import Image from "next/image";
import React from "react";

export const AboutUs = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white leading-tight">
            We don’t just serve Kacchi.
            <span className="text-yellow-400"> We serve emotions.</span>
          </h1>
          <p className="mt-6 text-neutral-600 dark:text-neutral-400 text-lg">
            Kacchi Dine was born from a simple idea — bring authentic Chatgaiya
            Kacchi Biryani to every home with uncompromising quality, hygiene,
            and love.
          </p>
        </div>

        <Image
          src="/kacchi_logo.jpeg"
          alt="Kacchi Dine"
          width={500}
          height={500}
          className="rounded-2xl shadow-lg"
        />
      </div>
    </>
  );
};
