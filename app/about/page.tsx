import UserLayout from "@/components/layout/UserLayout";
import { AboutUs } from "@/components/about/AboutUs";
import { OurStory } from "@/components/about/OurStory";
import { OurValue } from "@/components/about/OurValue";
import { WhyKacchiDine } from "@/components/about/WhyKacchiDine";

export default function AboutPage() {
  return (
    <UserLayout>
      <section className="max-w-7xl mx-auto px-6 py-10">
        {/* About Us */}
        <AboutUs />
        {/* Our Story */}
        <OurStory />
        {/* Our Values */}
        <OurValue />
        {/* Why Kacchi Dine? */}
        <WhyKacchiDine />
      </section>
    </UserLayout>
  );
}
