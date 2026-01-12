import AppButton from "@/components/ui/AppButton";

export default function CallToAction() {
  return (
    <section className="bg-yellow-400 text-white py-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Hungry Yet?</h2>
      <p className="text-lg md:text-xl mb-6">
        Order your favorite Kacchi Biryani and enjoy the authentic taste!
      </p>

      <AppButton href="/order" size="lg" variant="outline">
        Order Now
      </AppButton>
    </section>
  );
}
