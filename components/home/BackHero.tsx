import React from "react";
import { AnimatedGradientText } from "../ui/animated-gradient-tsx";
import { StarsIcon } from "lucide-react";
import Link from "next/link";
import { Marquee } from "../ui/marquee";
import { cn } from "@/lib/utils";
import Image from "next/image";

const images = [
  "/hero/1.jpg",
  "/hero/2.jpg",
  "/hero/3.jpg",
  "/hero/4.jpg",
  "/hero/5.jpg",
  "/hero/6.png",
  "/hero/7.jpg",
  "/hero/8.jpg",
  "/hero/9.jpg",
];

const Column = ({
  reverse,
  duration,
  className,
}: {
  reverse: boolean;
  duration: string;
  className: string;
}) => {
  return (
    <Marquee
      reverse={reverse}
      pauseOnHover
      vertical
      className={cn(
        "w-full relative h-full flex flex-col items-center justify-center -z-10",
        className,
      )}
      style={
        {
          "--duration": duration,
        } as React.CSSProperties
      }>
      {images
        .sort(() => Math.random() - 0.5)
        .map((image, index) => (
          <Image
            key={index}
            src={image}
            alt="hero"
            priority
            className="w-full h-full object-cover rounded opacity-25 hover:opacity-75 transition-all duration-300 ease-in-out aspect-[1/2] z-1"
            width={1920}
            height={1080}
          />
        ))}
    </Marquee>
  );
};

const BackHero = () => {
  return (
    <section className="mt-24 rounded-b-full w-full relative overflow-hidden min-h-screen flex flex-col items-center justify-center">
      <div className="relative w-fit mx-auto z-40 flex flex-col items-center justify-center">
        <AnimatedGradientText className="px-6">
          <h1 className="text-sm font-bold flex gap-2 items-center">
            Next Generation AI <StarsIcon className="w-4 h-4" />
          </h1>
        </AnimatedGradientText>
        <h1 className="text-4xl max-w-2xl mx-auto text-center bg-gradient-to-r from-lime-500 to-lime-200 text-transparent bg-clip-text font-bold">
          The AI-powered platform for creating and managing your social media
          accounts.
        </h1>
        <p className="text-base lg:text-xl mx-auto text-center font-light px-4 text-lime-50">
          Your social media accounts will be grown by 10x with our AI-powered
          platform.
        </p>

        <Link
          href={"/login?state=signup"}
          className="bg-lime-500 text-white px-4 py-2 rounded-md hover:bg-lime-600 transition-all duration-300">
          Get Started
        </Link>
      </div>

      <div className="absolute top-0 w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 z-10">
        <Column reverse={false} duration="170s" className="w-full h-full" />
        <Column reverse={true} duration="110s" className="w-full h-full" />
        <Column reverse={false} duration="170s" className="w-full h-full" />
        <Column reverse={true} duration="210s" className="w-full h-full" />
        <Column reverse={false} duration="240s" className="w-full h-full" />
      </div>
    </section>
  );
};

export default BackHero;
