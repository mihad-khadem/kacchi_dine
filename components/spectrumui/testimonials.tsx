"use client";

import { motion } from "framer-motion";
import { Heading, Play, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const mainTestimonial = {
  quote:
    "Kacchi Dine always delivers fresh and delicious meals, right to your doorstep.",
  author: "Rafiq H.",
  role: "Happy Customer",
  videoThumbnail: "/kacchi_logo.jpeg", // replace with actual thumbnail if you have
  videoUrl:
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/KUDFusLosxM?si=uUibBcQ8J8Il4jKq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>', // optional
};

const testimonials = [
  {
    id: 1,
    quote: "The biryani is top-notch! Fast delivery and excellent taste.",
    author: "Shabnam K.",
    role: "Food Enthusiast",
    avatar: "/kacchi_logo.jpeg",
    rating: 5,
  },
  {
    id: 2,
    quote: "I love the variety of dishes. Every order feels special.",
    author: "Tanvir A.",
    role: "Regular Customer",
    avatar: "/kacchi_logo.jpeg",
    rating: 5,
  },
  {
    id: 3,
    quote: "Amazing taste and hygiene. Kacchi Dine never disappoints.",
    author: "Lamia R.",
    role: "Food Blogger",
    avatar: "/kacchi_logo.jpeg",
    rating: 5,
  },
];

export default function KacchiTestimonial() {
  const cardWidth = 320;
  const gap = 24;
  const totalWidth = testimonials.length * (cardWidth + gap);

  return (
    <div className="max-w-full px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
      <div className="bg-neutral-100 dark:bg-neutral-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 sm:mb-10">
          <div className="flex items-center space-x-4">
            <Image
              src="/kacchi_logo.jpeg"
              alt="Kacchi Dine Logo"
              width={60}
              height={60}
              className="rounded-full"
            />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Real Stories from Our Customers
            </h1>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 mt-4 md:mt-0">
            People love Kacchi Dine for its authentic taste and quick service.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="grid md:grid-cols-2 bg-white dark:bg-neutral-800 rounded-2xl p-4 sm:p-6 gap-4 sm:gap-6 mb-10">
          <div className="flex flex-col relative group cursor-pointer">
            <Image
              alt="Video Thumbnail"
              className="w-full rounded-lg object-cover border border-neutral-200"
              height={200}
              width={200}
              src={mainTestimonial.videoThumbnail}
            />
            <div className="absolute bottom-2 left-2">
              <div className="bg-black/80 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center space-x-2 text-white">
                <Play className="w-4 h-4 fill-white" />
                <span className="font-medium text-sm">Watch Video</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-4">
            <blockquote className="font-medium text-base sm:text-lg text-neutral-900 dark:text-neutral-100">
              “{mainTestimonial.quote}”
            </blockquote>
            <div>
              <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">
                {mainTestimonial.author}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {mainTestimonial.role}
              </p>
            </div>
          </div>
        </div>

        {/* Scrolling Testimonials */}
        <div className="relative overflow-hidden mt-8">
          <motion.div
            className="flex space-x-4 sm:space-x-6"
            animate={{ x: [-totalWidth, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <Card className="shrink-0 w-64 sm:w-72 md:w-80 bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 space-y-3 shadow-sm min-h-45">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 sm:w-4 sm:h-4 fill-green-500 text-green-500"
                      />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed min-h-12 sm:min-h-16">
                    “{testimonial.quote}”
                  </p>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Image
                      width={40}
                      height={40}
                      loading="lazy"
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      className="rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-600"
                    />
                    <div>
                      <p className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
