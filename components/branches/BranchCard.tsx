import Image from "next/image";
import AppCard from "@/components/ui/AppCard";
import AppButton from "@/components/ui/AppButton";

type Branch = {
  name: string;
  address: string;
  phone: string;
  time: string;
  map: string;
};

export default function BranchCard({
  name,
  address,
  phone,
  time,
  map,
}: Branch) {
  return (
    <AppCard title={name} description={address}>
      <div className="space-y-3 text-sm text-gray-600">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/kacchi_logo.png"
            alt={name}
            width={64}
            height={64}
            className="rounded-full border border-yellow-300 shadow-sm"
          />
        </div>

        <p>📞 {phone}</p>
        <p>⏰ {time}</p>

        <div className="flex flex-wrap gap-3 pt-3">
          <AppButton
            href={`/order?branch=${encodeURIComponent(name)}`}
            size="sm"
          >
            Order
          </AppButton>

          <AppButton href={map} variant="outline" size="sm">
            Map
          </AppButton>

          <AppButton
            href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
            variant="outline"
            size="sm"
          >
            Call
          </AppButton>
          <AppButton size="sm">Book Now</AppButton>
        </div>
      </div>
    </AppCard>
  );
}
