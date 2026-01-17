import AppButton from "@/components/ui/AppButton";

export default function CallToAction() {
  return (
    <section className="bg-yellow-400 text-black py-16 text-center sm:px-6  rounded-lg shadow-md  mx-auto ">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Hungry Yet?</h2>
      <p className="text-lg md:text-xl mb-6 px-4">
        Order your favorite Kacchi Biryani and enjoy the authentic taste!
      </p>

      <AppButton href="/menu" size="lg" variant="outline">
        Order Now
      </AppButton>
      <AppButton href="/contact" size="lg" variant="outline" className="ml-4">
        Contact Us
      </AppButton>
    </section>
  );
}
