import Link from "next/link";
import React from "react";
import { AnimatedGradientText } from "../ui/animated-gradient-tsx";
import { StarsIcon } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="flex  flex-col items-center justify-center h-[calc(100vh-100px)]">
      <div>
        <AnimatedGradientText className="px-6">
          <h1 className="text-sm font-bold flex gap-2 items-center">
            Next Generation AI <StarsIcon className="w-4 h-4" />
          </h1>
        </AnimatedGradientText>
      </div>
      <h1 className="lg:text-7xl text-4xl mx-auto text-center font-bold">
        Welcome to xGen
      </h1>
      <p className="text-base lg:text-xl mx-auto text-center font-light px-4 text-lime-50">
        The AI-powered platform for creating and managing your social media
        accounts.
      </p>
      <div className="flex flex-row gap-4 mt-4">
        <Link
          href={"/login?state=signup"}
          className="text-white px-6 py-2 rounded-md bg-lime-500/10 border border-lime-500 hover:bg-transparent transition-all duration-300">
          <h1 className="text-sm font-bold">Get Started</h1>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
