"use client";

import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import AppButton from "@/components/ui/AppButton";
import { branches } from "@/public/data/branchesData";
import UserLayout from "@/components/layout/UserLayout";

export default function BranchDetailsPage() {
  const params = useParams();
  const branch = branches.find((b) => b.slug === params.slug);

  if (!branch) return notFound();

  const phoneNumber = branch.phone.replace(/[^0-9+]/g, "");
  const { lat, lng } = branch.location || {};

  return (
    <UserLayout>
      <section className="max-w-7xl mx-auto px-4 py-10 space-y-10 flex flex-col">
        {/* Header + Branch Info */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 bg-white shadow-lg rounded-xl p-6 space-y-8">
            <header className="flex flex-col md:flex-row items-center gap-6">
              <Image
                src="/kacchi_logo.png"
                alt={branch.BranchName}
                width={100}
                height={100}
                className="rounded-full border border-gray-200"
              />
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900">
                  {branch.BranchName}
                </h1>
                <p className="text-gray-600">
                  {branch.Area}, {branch.division}
                </p>
                {branch.highlight && (
                  <span className="inline-block mt-2 px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                    ⭐ Featured Branch
                  </span>
                )}
              </div>
            </header>

            <div className="space-y-2">
              <p>
                <strong>📍 Address:</strong> {branch.address}
              </p>
              <p>
                <strong>📞 Phone:</strong> {branch.phone}
              </p>
              {branch.whatsappNo && (
                <p>
                  <strong>💬 WhatsApp:</strong> {branch.whatsappNo}
                </p>
              )}
              <p>
                <strong>⏰ Opening Hours:</strong> {branch.time}
              </p>
            </div>
          </div>

          {/* Map */}
          {lat && lng && (
            <div className="flex-1 h-96 rounded-xl overflow-hidden shadow-lg">
              <iframe
                title={`${branch.BranchName} Location`}
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${lat},${lng}&zoom=15`}
              ></iframe>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <AppButton href="/menu">Order Now</AppButton>
          <AppButton href={`/bookings`}>Book Now</AppButton>
          {branch.whatsappLink && (
            <AppButton href={branch.whatsappLink}>WhatsApp</AppButton>
          )}
          <AppButton href={`tel:${phoneNumber}`}>Call</AppButton>
        </div>
      </section>
    </UserLayout>
  );
}
