"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    image: "/kacchi_logo.png",
    title: "Authentic Kacchi Biryani",
    subtitle: "Taste the tradition of Dhaka",
  },
  {
    image: "/kacchi_logo.jpeg",
    title: "Family Feast",
    subtitle: "Perfect for every celebration",
  },
  {
    image: "/kacchi_logo.jpeg",
    title: "Hot & Fresh",
    subtitle: "Delivered straight to your door",
  },
];

export default function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 1700, stopOnInteraction: false })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full h-[80vh]"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full h-[80vh]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl text-white mb-6">
                  {slide.subtitle}
                </p>
                <Link
                  href="/order"
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-8 py-3 rounded-full text-lg font-semibold transition"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-6" />
      <CarouselNext className="right-6" />
    </Carousel>
  );
}
