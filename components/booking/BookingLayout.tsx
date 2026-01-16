"use client";

import { useState } from "react";
import BranchSelector from "@/components/booking/BranchSelector";
import TableBookingForm from "@/components/booking/TableBookingForm";
import CorporateBookingForm from "@/components/booking/CorporateBookingForm";
import { Button } from "@/components/ui/button";
import { HeadingFont } from "../ui/headingFont";

export default function BookingsPage() {
  const [type, setType] = useState<"table" | "corporate">("table");
  const [branch, setBranch] = useState<any>(null);

  return (
    <div className="min-h-screen bg-[#fffaf5] text-white p-8">
      <div className="text-3xl font-bold text-center text-yellow-400 mb-8">
        <HeadingFont text="Book your Desired Experience with us" />
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <Button
          variant={type === "table" ? "default" : "outline"}
          onClick={() => setType("table")}
        >
          Book a Table
        </Button>
        <Button
          variant={type === "corporate" ? "default" : "outline"}
          onClick={() => setType("corporate")}
        >
          Corporate
        </Button>
      </div>

      <div className="max-w-xl mx-auto space-y-8">
        <BranchSelector
          value={branch?.id}
          onChange={(id) => {
            const selected = [
              { id: "banani", name: "Banani" },
              { id: "dhanmondi", name: "Dhanmondi" },
              { id: "mirpur", name: "Mirpur" },
              { id: "uttara", name: "Uttara" },
            ].find((b) => b.id === id);
            setBranch(selected);
          }}
        />

        {branch && (
          <p className="text-sm text-yellow-400 text-center">
            Booking will go to {branch.name}
          </p>
        )}

        {type === "table" ? (
          <TableBookingForm branch={branch?.name} />
        ) : (
          <CorporateBookingForm />
        )}
      </div>
    </div>
  );
}
