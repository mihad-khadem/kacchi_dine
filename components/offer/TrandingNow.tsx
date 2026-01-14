import { Clock, Flame } from "lucide-react";
import React from "react";

export const TrandingNow = () => {
  return (
    <>
      {/* Trending Banner */}
      <div className="mt-8 bg-yellow-400 text-white rounded-xl my-5 p-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Flame /> Trending Today
          </h3>
          <p className="text-sm mt-1">
            Kacchi Biryani + Borhani combo is selling fast!
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock /> Ends 12:00 AM
        </div>
      </div>
    </>
  );
};
