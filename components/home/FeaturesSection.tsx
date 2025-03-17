import React from "react";
import { AnimatedGradientText } from "../ui/animated-gradient-tsx";

const FeaturesSection = () => {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center py-24">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <AnimatedGradientText className="bg-gradient-to-r from-lime-500 to-lime-200 text-transparent bg-clip-text text-4xl font-bold">
          Features
        </AnimatedGradientText>
      </div>
    </section>
  );
};

export default FeaturesSection;
