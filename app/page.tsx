import HeroSection from "@/components/HeroSection";
import UserInput from "@/components/home/UserInput";
import UserOutput from "@/components/home/UserOutput";

export default function Home() {
  return (
    <main className="relative h-full w-full text-white">
      <HeroSection />
      <div className="grid md:grid-cols-2 gap-24 container mb-24 mx-auto">
        <UserInput />
        <UserOutput />
      </div>
    </main>
  );
}
