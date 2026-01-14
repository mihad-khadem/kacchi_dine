"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const team = [
  {
    quote:
      "Kacchi Dine was built on one belief — Bangladeshi food deserves world-class standards. Our mission is to protect that legacy while growing this brand nationally and globally.",
    name: "Md. Sahabuddin Talukdar",
    designation: "Chairman",
    src: "/team/chairman_sahabuddin.jpg",
  },
  {
    quote:
      "My focus is turning our vision into execution — expanding our branches, strengthening systems, and ensuring every customer experiences the same premium Kacchi Dine quality.",
    name: "Md. Mintu Talukder",
    designation: "Managing Director",
    src: "/team/md_mintu_sir.jpg",
  },
  {
    quote:
      "Strong financial discipline allows us to grow without compromising quality. We make sure every taka is invested where it creates the most long-term value for the company.",
    name: "Md. Eastiaque Muhammad",
    designation: "Chief Financial Officer",
    src: "/team/cfo_eastiaque.jpeg",
  },
  {
    quote:
      "From kitchen workflow to customer service, my responsibility is to make sure every operation runs smoothly, efficiently, and at the highest standard every single day.",
    name: "Md. Sohel Mahmud",
    designation: "General Manager",
    src: "/team/GM_sohelmasud.jpg",
  },
  {
    quote:
      "Our people are our strength. We focus on building skilled, motivated teams who understand our culture, our food, and our commitment to excellence.",
    name: "Ayesha Ahmed Asha",
    designation: "Head Of HR",
    src: "/team/hr_ayesha.jpeg",
  },
];

export default function AnimatedLeadership() {
  const [active, setActive] = useState(team[0]);

  const handlePrev = () => {
    const currentIndex = team.indexOf(active);
    const length = team.length;
    const prevIndex = (currentIndex - 1 + length) % length;
    setActive(team[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = team.indexOf(active);
    const length = team.length;
    const nextIndex = (currentIndex + 1) % length;
    setActive(team[nextIndex]);
  };

  const isActive = (index: number) => team[index] === active;
  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
      {/* Image */}
      <div className="relative h-96 w-full">
        <AnimatePresence>
          {team.map((member, index) =>
            isActive(index) ? ( // only show the active image
              <motion.div
                key={member.name}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotateY: randomRotateY(),
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  zIndex: 999,
                  y: [0, -80, 0],
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: randomRotateY(),
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 origin-bottom"
              >
                <Image
                  src={member.src}
                  alt={member.name}
                  fill
                  draggable={false}
                  className="rounded-3xl object-cover object-center"
                />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Text */}
      <div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active.name}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="text-2xl font-bold dark:text-white text-black">
              {active.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              {active.designation}
            </p>

            <motion.p className="text-lg text-gray-500 mt-8 dark:text-neutral-300">
              {active.quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-6 pt-5">
          <Button className="h-8 rounded" onClick={handlePrev}>
            <ArrowLeft />
          </Button>
          <Button className="h-8 rounded" onClick={handleNext}>
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
