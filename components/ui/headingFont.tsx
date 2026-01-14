"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
  speed?: number; // ms per letter
};

export const HeadingFont = ({ text, speed = 80 }: Props) => {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (index < text.length) {
            setDisplayed(text.slice(0, index + 1));
            setIndex(index + 1);
          } else {
            setTimeout(() => setDeleting(true), 1500); // pause before delete
          }
        } else {
          if (index > 0) {
            setDisplayed(text.slice(0, index - 1));
            setIndex(index - 1);
          } else {
            setDeleting(false);
          }
        }
      },
      deleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [index, deleting, text, speed]);

  return (
    <div className="py-4">
      <span className="font-bold text-2xl text-yellow-400">
        {displayed}
        <span className="animate-pulse">|</span>
      </span>
    </div>
  );
};
