"use client";

import { useState } from "react";
import AppButton from "@/components/ui/AppButton";
import { Input } from "@/components/ui/input";

type CMSPage = {
  id: number;
  title: string;
  slug: string;
  status: "PUBLISHED" | "DRAFT";
  updatedAt: string;
};

const initialPages: CMSPage[] = [
  {
    id: 1,
    title: "About Us",
    slug: "about-us",
    status: "PUBLISHED",
    updatedAt: "2026-01-10",
  },
  {
    id: 2,
    title: "Privacy Policy",
    slug: "privacy-policy",
    status: "PUBLISHED",
    updatedAt: "2026-01-08",
  },
  {
    id: 3,
    title: "Terms & Conditions",
    slug: "terms-conditions",
    status: "DRAFT",
    updatedAt: "2026-01-05",
  },
];

export default function AdminCMSPage() {
  const [pages, setPages] = useState<CMSPage[]>(initialPages);
  const [search, setSearch] = useState("");

  const filteredPages = pages.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">CMS Pages</h1>
          <p className="text-gray-600 mt-1">
            Manage website content and static pages
          </p>
        </div>

        <AppButton href="/admin/cms/create">+ Create Page</AppButton>
      </div>

      {/* Search */}
      <div className="mb-6 max-w-sm">
        <Input
          placeholder="Search by title or slug"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-6 py-4 font-semibold">Title</th>
              <th className="text-left px-6 py-4 font-semibold">Slug</th>
              <th className="text-left px-6 py-4 font-semibold">Status</th>
              <th className="text-left px-6 py-4 font-semibold">
                Last Updated
              </th>
              <th className="text-right px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredPages.length > 0 ? (
              filteredPages.map((page) => (
                <tr
                  key={page.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {page.title}
                  </td>

                  <td className="px-6 py-4 text-gray-600">/{page.slug}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        page.status === "PUBLISHED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {page.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-600">{page.updatedAt}</td>

                  <td className="px-6 py-4 text-right space-x-2">
                    <AppButton
                      variant="soft"
                      size="sm"
                      href={`/admin/cms/${page.id}`}
                    >
                      Edit
                    </AppButton>

                    <AppButton
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPages((prev) =>
                          prev.map((p) =>
                            p.id === page.id
                              ? {
                                  ...p,
                                  status:
                                    p.status === "PUBLISHED"
                                      ? "DRAFT"
                                      : "PUBLISHED",
                                }
                              : p
                          )
                        )
                      }
                    >
                      Toggle
                    </AppButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No CMS pages found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
