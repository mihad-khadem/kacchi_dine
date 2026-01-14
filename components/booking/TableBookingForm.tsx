"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function TableBooking() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    branch: "",
    date: "",
    time: "",
    guests: "",
    note: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    console.log("Table Booking", form);
    alert("Table booking request sent!");
  };

  return (
    <div className="bg-black/90 border border-yellow-500/40 rounded-xl p-8 max-w-3xl mx-auto shadow-[0_0_40px_rgba(250,204,21,0.15)]">
      <h2 className="text-3xl font-bold gold-outline gold-animate mb-6 text-center">
        Reserve a Table
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="bg-black border-yellow-500/30 text-yellow-300"
        />

        <Input
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="bg-black border-yellow-500/30 text-yellow-300"
        />

        <Select onValueChange={(v) => handleChange("branch", v)}>
          <SelectTrigger className="bg-black border-yellow-500/30 text-yellow-300">
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="banani">Banani</SelectItem>
            <SelectItem value="dhanmondi">Dhanmondi</SelectItem>
            <SelectItem value="mirpur">Mirpur</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="date"
          onChange={(e) => handleChange("date", e.target.value)}
          className="bg-black border-yellow-500/30 text-yellow-300"
        />

        <Input
          type="time"
          onChange={(e) => handleChange("time", e.target.value)}
          className="bg-black border-yellow-500/30 text-yellow-300"
        />

        <Input
          type="number"
          min={1}
          placeholder="Guests"
          onChange={(e) => handleChange("guests", e.target.value)}
          className="bg-black border-yellow-500/30 text-yellow-300"
        />
      </div>

      <Textarea
        placeholder="Special requests (optional)"
        onChange={(e) => handleChange("note", e.target.value)}
        className="mt-4 bg-black border-yellow-500/30 text-yellow-300"
      />

      <Button
        onClick={handleSubmit}
        className="w-full mt-6 bg-yellow-500 text-black font-bold hover:bg-yellow-400"
      >
        Reserve Table
      </Button>
    </div>
  );
}
