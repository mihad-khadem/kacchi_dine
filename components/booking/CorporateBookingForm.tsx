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

export default function CorporateBooking() {
  const [form, setForm] = useState<any>({});
  const [alertOpen, setAlertOpen] = useState(false);

  const set = (k: string, v: string) => setForm({ ...form, [k]: v });

  const submit = () => {
    console.log("Corporate Booking", form);
    // Trigger the alert by setting state
    setAlertOpen(true);
  };

  return (
    <div className="bg-black/90 border border-yellow-500/40 rounded-xl p-8 max-w-4xl mx-auto shadow-[0_0_40px_rgba(250,204,21,0.15)] mt-8">
      <h2 className="text-3xl font-bold gold-outline gold-animate mb-6 text-center">
        Corporate & Event Booking
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Company Name"
          onChange={(e) => set("company", e.target.value)}
          className="bg-black border-yellow-500/30 text-yellow-300"
        />
        <Input
          placeholder="Contact Person"
          onChange={(e) => set("person", e.target.value)}
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
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="banani">Banani</SelectItem>
            <SelectItem value="dhanmondi">Dhanmondi</SelectItem>
            <SelectItem value="mirpur">Mirpur</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => set("event", v)}>
          <SelectTrigger className="bg-black border-yellow-500/30 text-yellow-300">
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="meeting">Meeting</SelectItem>
            <SelectItem value="party">Party</SelectItem>
            <SelectItem value="office">Office Lunch</SelectItem>
            <SelectItem value="wedding">Wedding</SelectItem>
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

        <Select onValueChange={(v) => set("budget", v)}>
          <SelectTrigger className="bg-black border-yellow-500/30 text-yellow-300">
            <SelectValue placeholder="Budget Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="50k">Below 50k</SelectItem>
            <SelectItem value="100k">50k – 100k</SelectItem>
            <SelectItem value="200k">100k+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Textarea
        placeholder="Tell us about your event..."
        onChange={(e) => set("note", e.target.value)}
        className="mt-4 bg-black border-yellow-500/30 text-yellow-300"
      />

      <Button
        onClick={submit}
        className="w-full mt-6 bg-yellow-500 text-black font-bold hover:bg-yellow-400"
      >
        Request Corporate Booking
      </Button>

      {/* Render AppAlert as component */}
      {alertOpen && (
        <AppAlert
          type="success"
          message="Corporate booking request sent!"
          title="Celebrate 🎉"
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
        />
      )}
    </div>
  );
}
