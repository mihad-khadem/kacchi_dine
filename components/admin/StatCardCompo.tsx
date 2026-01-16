import React from "react";

export const StatCardCompo = ({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: "yellow" | "green" | "blue" | "purple";
}) => {
  const borderMap = {
    yellow: "border-yellow-400",
    green: "border-green-400",
    blue: "border-blue-400",
    purple: "border-purple-400",
  };

  return (
    <div
      className={`bg-white rounded-lg shadow p-6 border-l-4 ${borderMap[color]}`}
    >
      <p className="text-gray-600 text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  );
};
