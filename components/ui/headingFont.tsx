import React from "react";
type Props = {
  text: string | number;
};
// heading font component
export const HeadingFont = ({ text }: Props) => {
  return <div className="font-bold text-2xl text-yellow-400 py-4">{text}</div>;
};
