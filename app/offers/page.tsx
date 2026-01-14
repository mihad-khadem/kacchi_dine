import OffersGrid from "@/components/offer/OfferGrid";
import { PromoOffers } from "@/components/offer/PromoOffers";
import { TrandingNow } from "@/components/offer/TrandingNow";
import { HeadingFont } from "@/components/ui/headingFont";

// offers page
const OffersPage = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <HeadingFont text="Get You Desired Meal" />
      {/* Trending Banner */}
      <TrandingNow />
      {/* Promo Codes */}
      <PromoOffers />
      {/* Offers Page and Grid */}
      <OffersGrid />
    </section>
  );
};

export default OffersPage;
