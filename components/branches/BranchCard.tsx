import Image from "next/image";
import AppCard from "@/components/ui/AppCard";
import AppButton from "@/components/ui/AppButton";
import { TBranch } from "@/public/data/branchesData";
import { Star } from "lucide-react";

export default function BranchCard({
  BranchName,
  address,
  phone,
  whatsappNo,
  time,
  map,
  whatsappLink,
  isActive,
  highlight,
  slug,
  id,
  Area,
  division,
  location,
}: TBranch) {
  return (
    <AppCard className="flex flex-col justify-between h-full">
      {/* Branch Name */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{BranchName}</h3>

        {highlight && (
          <span className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
            <Star size={12} /> Featured
          </span>
        )}
      </div>

      {/* Logo */}
      <div className="flex justify-center my-3">
        <Image
          src="/kacchi_logo.png"
          alt={BranchName}
          width={60}
          height={60}
          className="rounded-full border border-yellow-300 shadow-sm"
        />
      </div>

      {/* Branch Info */}
      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <strong>📍 Address:</strong> {address}
        </p>
        <p>
          <strong>📞 Phone:</strong> {phone}
        </p>
        <p>
          <strong>💬 WhatsApp:</strong> {whatsappNo}
        </p>
        <p>
          <strong>⏰ Time:</strong> {time}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-2 mt-4">
        <AppButton href={`/branches/${slug}`} size="sm">
          Details
        </AppButton>

        <AppButton href={map} size="sm">
          Map
        </AppButton>

        <AppButton href={whatsappLink} size="sm">
          WhatsApp
        </AppButton>

        <AppButton href={`tel:${phone.replace(/[^0-9+]/g, "")}`} size="sm">
          Call
        </AppButton>
      </div>

      {!isActive && (
        <p className="mt-3 text-center text-sm text-red-500">
          Currently unavailable
        </p>
      )}
    </AppCard>
  );
}
