"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const branches = [
  { id: "banani", name: "Banani" },
  { id: "dhanmondi", name: "Dhanmondi" },
  { id: "mirpur", name: "Mirpur" },
  { id: "uttara", name: "Uttara" },
];

type Props = {
  value?: string;
  onChange: (value: string) => void;
};

export default function BranchSelector({ value, onChange }: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-black border border-yellow-500/40 text-yellow-300 focus:ring-yellow-400">
        <SelectValue placeholder="Select Branch" />
      </SelectTrigger>

      <SelectContent className="bg-black border border-yellow-500/40 text-yellow-300">
        {branches.map((branch) => (
          <SelectItem
            key={branch.id}
            value={branch.id}
            className="focus:bg-yellow-500/20 focus:text-yellow-300"
          >
            {branch.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
