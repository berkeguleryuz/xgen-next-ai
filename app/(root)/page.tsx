import BackHero from "@/components/home/BackHero";
import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";
import { getProducts } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";
import CallToAction from "@/components/home/CallToAction";

export default async function Home() {
  const supabase = await createClient();
  const [products] = await Promise.all([getProducts(supabase)]);

  // if (user) {
  //   return redirect("/dashboard");
  // }

  return (
    <main className="relative z-0 h-full w-full text-white">
      <HeroSection />
      <PricingSection products={products ?? []} />
      <BackHero />
      <FeaturesSection />
      <FAQSection />
      <CallToAction />
      <Footer />
    </main>
  );
}
