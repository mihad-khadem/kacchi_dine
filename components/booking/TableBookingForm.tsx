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
import AppAlert from "../ui/AppAlert";

interface TableBookingFormProps {
  branch?: string;
}

export default function TableBookingForm({ branch }: TableBookingFormProps) {
  const [form, setForm] = useState<any>({});
  const [alertOpen, setAlertOpen] = useState(false);

  const set = (k: string, v: string) => setForm({ ...form, [k]: v });

  const submit = () => {
    console.log("Table Booking", { ...form, branch });
    setAlertOpen(true); // trigger alert
  };

  return (
    <div className="bg-black/90 border border-yellow-500/40 rounded-xl p-8 max-w-4xl mx-auto shadow-[0_0_40px_rgba(250,204,21,0.15)] mt-8">
      <h2 className="text-3xl font-bold gold-outline gold-animate mb-6 text-center">
        Table Booking
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Full Name"
          onChange={(e) => set("name", e.target.value)}
          className="bg-black border-yellow-500/30 text-yellow-300"
        />
        <Input
          placeholder="Phone"
          onChange={(e) => set("phone", e.target.value)}
          className="bg-black border-yellow-500/30 text-yellow-300"
        />
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => set("email", e.target.value)}
          className="bg-black border-yellow-500/30 text-yellow-300"
        />

        <Select onValueChange={(v) => set("branch", v)}>
          <SelectTrigger className="bg-black border-yellow-500/30 text-yellow-300">
            <SelectValue placeholder={branch ? branch : "Select Branch"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="banani">Banani</SelectItem>
            <SelectItem value="dhanmondi">Dhanmondi</SelectItem>
            <SelectItem value="mirpur">Mirpur</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Guests"
          onChange={(e) => set("guests", e.target.value)}
          className="bg-black border-yellow-500/30 text-yellow-300"
        />
        <Input
          type="date"
          onChange={(e) => set("date", e.target.value)}
          className="bg-black border-yellow-500/30 text-yellow-300"
        />
        <Input
          type="time"
          onChange={(e) => set("time", e.target.value)}
          className="bg-black border-yellow-500/30 text-yellow-300"
        />
      </div>

      <Textarea
        placeholder="Additional requests..."
        onChange={(e) => set("note", e.target.value)}
        className="mt-4 bg-black border-yellow-500/30 text-yellow-300"
      />

      <Button
        onClick={submit}
        className="w-full mt-6 bg-yellow-500 text-black font-bold hover:bg-yellow-400"
      >
        Request Table Booking
      </Button>

      {/* Render AppAlert as component */}
      {alertOpen && (
        <AppAlert
          type="success"
          message="Table booking request sent!"
          title="Celebrate 🎉"
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
        />
      )}
    </div>
  );
}
