"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { menuItems } from "@/public/data/menu";

import { MenuCard } from "@/components/ui/MenuCard";

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
  "Kacchi",
  "Chicken Biryani",
  "Mutton Tehari",
  "Polao",
  "Others",
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const filteredItems = (menuItems as MenuItem[]).filter(
    (item) => item.category === activeCategory
  );
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">Our Menu</h1>

      <Tabs
        value={activeCategory}
        onValueChange={(val: string) => {
          setActiveCategory(val);
          setCurrentPage(1);
        }}
      >
        <div className="flex justify-center">
          <TabsList className="flex justify-center mb-6 gap-2">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="px-4 py-2 rounded transition
                   data-[state=active]:bg-yellow-400
                   data-[state=active]:text-white
                   bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {categories.map((cat) => (
          <TabsContent key={cat} value={cat}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-3 mt-6">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-yellow-400 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
