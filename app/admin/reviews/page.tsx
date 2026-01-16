"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

type Review = {
  id: number;
  customer: string;
  rating: number;
  comment: string;
  date: string;
  approved: boolean;
};

const sampleReviews: Review[] = [
  {
    id: 1,
    customer: "Ananya Gupta",
    rating: 5,
    comment: "Amazing Kacchi Biryani! Loved the delivery service.",
    date: "2026-01-12",
    approved: true,
  },
  {
    id: 2,
    customer: "Sophia Allen",
    rating: 4,
    comment: "Great taste but delivery was a bit late.",
    date: "2026-01-11",
    approved: false,
  },
  {
    id: 3,
    customer: "Ethan Rodriguez",
    rating: 5,
    comment: "Excellent family combo, very satisfying.",
    date: "2026-01-10",
    approved: true,
  },
  {
    id: 4,
    customer: "Priya Sharma",
    rating: 3,
    comment: "Good food but packaging could be better.",
    date: "2026-01-09",
    approved: false,
  },
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(sampleReviews);
  const [search, setSearch] = useState("");
  const [showApproved, setShowApproved] = useState(true);

  const toggleApprove = (id: number) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, approved: !r.approved } : r))
    );
  };

  const filtered = reviews
    .filter(
      (r) =>
        r.customer.toLowerCase().includes(search.toLowerCase()) ||
        r.comment.toLowerCase().includes(search.toLowerCase())
    )
    .filter((r) => (showApproved ? true : !r.approved))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Customer Reviews</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
        <Input
          placeholder="Search by customer or comment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex items-center gap-2">
          <Switch
            checked={showApproved}
            onCheckedChange={() => setShowApproved(!showApproved)}
          />
          <span>Show Approved Only</span>
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.length === 0 && (
          <p className="text-gray-500 text-center">No reviews found.</p>
        )}

        {filtered.map((r) => (
          <div
            key={r.id}
            className="border rounded-lg p-4 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">{r.customer}</h3>
              <p className="text-yellow-400 font-semibold">
                {"⭐".repeat(r.rating)}
              </p>
              <p className="text-gray-600">{r.comment}</p>
              <p className="text-gray-400 text-sm">{r.date}</p>
            </div>

            <div className="flex gap-2 mt-4 sm:mt-0">
              <Button
                size="sm"
                className={`${
                  r.approved
                    ? "bg-green-400 hover:bg-green-500"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => toggleApprove(r.id)}
              >
                {r.approved ? "Approved" : "Approve"}
              </Button>
              {!r.approved && (
                <Button
                  size="sm"
                  className="bg-red-400 hover:bg-red-500"
                  onClick={() => toggleApprove(r.id)}
                >
                  Reject
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
