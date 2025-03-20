"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const CallToAction = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    "AI-Powered Content Generation",
    "Smart Scheduling",
    "Analytics Dashboard",
    "Multi-Platform Support",
    "Custom Models",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(132,204,22,0.4),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(132,204,22,0.1)_50%,transparent_35%)] bg-[length:20px_20px]" />
      </div>

      <div className="container mx-auto px-2 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="h-12 mb-2 overflow-hidden">
            <div
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateY(-${activeIndex * 48}px)` }}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="h-12 flex items-center justify-center text-lime-500 text-xl font-semibold">
                  {feature}
                </div>
              ))}
              {features.map((feature, index) => (
                <div
                  key={`repeat-${index}`}
                  className="h-12 flex items-center justify-center text-lime-500 text-xl font-semibold">
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <h2 className=" text-5xl sm:text-6xl md:text-7xl font-bold mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Transform Your Content
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-lime-300">
              With AI Magic
            </span>
          </h2>

          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of creators who are already using xGen to
            create, schedule, and manage their content with ease.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/login?state=signup"
              className="group relative px-12 py-6 bg-lime-500 text-black font-semibold rounded-full hover:bg-lime-400 transition-all duration-300"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              <span className="relative z-10 text-lg">Get Started Free</span>
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-lime-400 to-lime-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  transform: isHovered ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.3s ease-out",
                }}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-lime-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-lime-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </section>
  );
};

export default CallToAction;
