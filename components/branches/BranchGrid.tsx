"use client";

import { useState } from "react";
import { branches } from "@/public/data/branchesData";
import BranchCard from "@/components/branches/BranchCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ITEMS_PER_PAGE = 8;

export default function BranchesGridPage() {
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

  const handlePageChange = (division: string, newPage: number) => {
    setPages((prev) => ({ ...prev, [division]: newPage }));
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPages({}); // Reset all pages on search change
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Our Branches</h1>

      {/* Search */}
      <Input
        placeholder="Search by branch or area..."
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="mb-6"
      />

      {/* Tabs */}
      <Tabs defaultValue="All">
        <div className="flex justify-center">
          <TabsList className="mb-8">
            {divisions.map((d) => (
              <TabsTrigger
                key={d}
                value={d}
                className="px-4 py-2 rounded transition
                   data-[state=active]:bg-yellow-400
                   data-[state=active]:text-white
                   bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                {d}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {divisions.map((division) => {
          const list = branches.filter(
            (b) =>
              (division === "All" || b.division === division) &&
              (b.BranchName.toLowerCase().includes(search.toLowerCase()) ||
                b.Area.toLowerCase().includes(search.toLowerCase()))
          );

          const currentPage = pages[division] || 1;
          const pageData = list.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
          );
          const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);

          return (
            <TabsContent key={division} value={division}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pageData.map((branch) => (
                  <BranchCard
                    key={branch.id}
                    name={branch.BranchName}
                    address={branch.address}
                    phone={branch.phone}
                    time={branch.time}
                    map={branch.map}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(division, i + 1)}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === i + 1
                          ? "bg-yellow-400 text-white"
                          : "bg-gray-100 hover:bg-yellow-100"
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
