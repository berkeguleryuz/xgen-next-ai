import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import { getProducts } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";


export default async function Home() {
  const supabase = await createClient();
  const [ products] = await Promise.all([
    getProducts(supabase),
  ]);

  // if (user) {
  //   return redirect("/dashboard");
  // }

  return (
    <main className="relative h-full w-full text-white">
      <HeroSection />
      <PricingSection products={products ?? []} />
    </main>
  );
}
