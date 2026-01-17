"use client";

import { useState } from "react";

import UserLayout from "@/components/layout/UserLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { menuItems } from "@/public/data/menu";

import { MenuCard } from "@/components/ui/MenuCard";
import { HeadingFont } from "@/components/ui/headingFont";

interface MenuItem {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  prices: {
    one?: number;
    three?: number;
    five?: number;
  };
}

const categories: string[] = [
  "All",
  "Kacchi",
  "Chicken Biryani",
  "Mutton Tehari",
  "Polao",
  "Others",
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [pages, setPages] = useState<Record<string, number>>({});

  const handlePageChange = (category: string, newPage: number) => {
    setPages((prev) => ({ ...prev, [category]: newPage }));
  };

  const handleCategoryChange = (val: string) => {
    setActiveCategory(val);
    setPages({}); // Reset all pages when category changes
  };

  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8">
        <HeadingFont text="Choose Your Favorite Dish " />

        <Tabs value={activeCategory} onValueChange={handleCategoryChange}>
          <div className="flex justify-start sm:justify-center overflow-x-auto scrollbar-hide">
            <TabsList className="inline-flex min-w-max space-x-2 px-2 mb-6 bg-transparent">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="px-3 py-2 text-sm rounded-md transition-all whitespace-nowrap
                   data-[state=active]:bg-yellow-400 data-[state=active]:text-white data-[state=active]:shadow-md
                   bg-gray-200 text-gray-800 hover:bg-gray-300 hover:scale-105"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((cat) => {
            const filteredItems = (menuItems as MenuItem[]).filter(
              (item) => cat === "All" || item.category === cat,
            );
            const currentPage = pages[cat] || 1;
            const itemsPerPage = 6;
            const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
            const paginatedItems = filteredItems.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage,
            );

            return (
              <TabsContent key={cat} value={cat}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {paginatedItems.map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        className={`px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md transition-colors ${
                          currentPage === i + 1
                            ? "bg-yellow-400 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                        }`}
                        onClick={() => handlePageChange(cat, i + 1)}
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
      </div>
    </UserLayout>
  );
}
