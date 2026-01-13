import CallToAction from "@/components/home/CallToAction";
import HeroCarousel from "@/components/home/Hero";
import Branches from "@/components/home/OurBranches";
import PopularFoods from "@/components/home/PopularFoods";
import { Review } from "@/components/home/Review";
import TodaysOffers from "@/components/home/TodaysOffers";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="mt-4 mb-12">
        <HeroCarousel />
      </section>

      {/* Offers */}
      <div className="mb-12">
        <TodaysOffers />
      </div>

      {/* Popular Foods */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <PopularFoods />
      </section>

      {/* Branches */}
      <section className="max-w-7xl mx-auto px-6 mb-8">
        <Branches />
      </section>
      {/* Review */}
      <section className="max-w-7xl mx-auto px-6 mb-8">
        <Review />
      </section>
      {/* CTA + Footer */}
      <CallToAction />
      <Footer />
    </div>
  );
}
