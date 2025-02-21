import HeroSection from "@/components/HeroSection";
import UserInput from "@/components/home/UserInput";
import UserOutput from "@/components/home/UserOutput";
import { BioProvider } from "@/context/BioContext";

export default function Home() {
  return (
    <main className="relative h-full w-full text-white">
      <HeroSection />

      <BioProvider>
        <div className="grid md:grid-cols-2 gap-24 container mb-24 mx-auto">
          <UserInput />
          <UserOutput />
        </div>
      </BioProvider>
    </main>
  );
}
