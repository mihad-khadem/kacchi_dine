"use client";

import { useBranches } from "@/redux/hooks";
import { useState } from "react";
import BranchCard from "@/components/branches/BranchCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HeadingFont } from "../ui/headingFont";

const ITEMS_PER_PAGE = 8;

export default function BranchesGridPage() {
  const branches = useBranches();

  const [search, setSearch] = useState("");
  const [pages, setPages] = useState<Record<string, number>>({});

  const divisions = [
    "All",
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Mymensingh",
    "Rangpur",
  ];

  const handlePageChange = (division: string, page: number) => {
    setPages((prev) => ({ ...prev, [division]: page }));
  };

  const filtered = (division: string) =>
    branches.filter(
      (b) =>
        (division === "All" || b.division === division) &&
        (b.BranchName.toLowerCase().includes(search.toLowerCase()) ||
          b.Area.toLowerCase().includes(search.toLowerCase()))
    );

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8 ">
        <HeadingFont text="Our Branches" />
      </div>

      <Input
        placeholder="Search by branch or area..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPages({});
        }}
        className="mb-6"
      />

      <Tabs defaultValue="All">
        <div className="flex justify-start sm:justify-center overflow-x-auto scrollbar-hide">
          <TabsList className="inline-flex min-w-max space-x-2 px-2 mb-6 bg-transparent">
            {divisions.map((d) => (
              <TabsTrigger
                key={d}
                value={d}
                className="px-3 py-2 text-sm rounded-md transition-all whitespace-nowrap
                   data-[state=active]:bg-yellow-400 data-[state=active]:text-white data-[state=active]:shadow-md
                   bg-gray-200 text-gray-800 hover:bg-gray-300 hover:scale-105"
              >
                {d}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {divisions.map((division) => {
          const list = filtered(division);
          const current = pages[division] || 1;
          const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);
          const data = list.slice(
            (current - 1) * ITEMS_PER_PAGE,
            current * ITEMS_PER_PAGE
          );

          return (
            <TabsContent key={division} value={division}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((b) => (
                  <BranchCard
                    key={b.id}
                    name={b.BranchName}
                    address={b.address}
                    phone={b.phone}
                    time={b.time}
                    map={b.map}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(division, i + 1)}
                      className={`px-4 py-2 rounded ${
                        current === i + 1
                          ? "bg-yellow-400 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}
