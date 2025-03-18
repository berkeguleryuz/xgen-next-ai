"use client";
import React from "react";
import { AnimatedGradientText } from "../ui/animated-gradient-tsx";
import {
  BrainIcon,
  CalendarIcon,
  ImageUpIcon,
  MessageCircleIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import loginBg from "@/public/login.avif";
import { motion } from "framer-motion";
import Link from "next/link";

const featureList = [
  {
    title: "Image Generation",
    description: "Generate images using a variety of AI models.",
    icon: <ImageUpIcon className="w-5 h-5" strokeWidth={1.5} />,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Post Scheduling",
    description: "Schedule posts to social media platforms.",
    icon: <CalendarIcon className="w-5 h-5" strokeWidth={1.5} />,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Content Generation",
    description: "Generate content for your social media platforms.",
    icon: <MessageCircleIcon className="w-5 h-5" strokeWidth={1.5} />,
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Model Training",
    description: "Train your own AI models.",
    icon: <BrainIcon className="w-5 h-5" strokeWidth={1.5} />,
    gradient: "from-green-500 to-emerald-500",
  },
];

const FeaturesSection = () => {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 pointer-events-none" />
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 relative items-center justify-center">
        <div className="col-span-full space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex flex-col items-center justify-center space-y-4">
            <AnimatedGradientText className="bg-gradient-to-r from-lime-500 to-lime-200 text-transparent bg-clip-text text-5xl font-bold">
              Features
            </AnimatedGradientText>
            <h2 className="text-3xl font-bold text-center">
              Find the best AI tools for your needs
            </h2>
            <p className="text-lg leading-relaxed tracking-wide text-white/70 max-w-2xl text-center">
              We&apos;ve compiled and automated the best AI tools for your
              needs. From image generation to plan to send posts on social
              media, we&apos;ve got you covered.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-6 p-8 rounded-2xl items-startbackdrop-blur-sm h-[600px] justify-center">
          {featureList.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 group hover:bg-white/5 p-4 rounded-xl transition-all duration-300 w-full">
              <span
                className={cn(
                  "p-3 rounded-xl text-white bg-gradient-to-br",
                  feature.gradient,
                  "group-hover:scale-110 transition-transform duration-300",
                )}>
                {feature.icon}
              </span>
              <div>
                <h3 className="text-xl font-bold group-hover:text-lime-500 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-base pt-2 text-white/70">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={cn(
            "relative h-[500px] rounded-2xl overflow-hidden group",
            "before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-black/50 before:z-10",
            "after:absolute after:inset-0 after:bg-gradient-to-r after:from-lime-500/10 after:to-transparent after:opacity-0 after:group-hover:opacity-100 after:transition-opacity after:duration-500",
            "shadow-[0_0_50px_rgba(132,204,22,0.1)] group-hover:shadow-[0_0_50px_rgba(132,204,22,0.2)] transition-shadow duration-500",
          )}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(132,204,22,0.1),transparent_50%)] z-30" />

          <motion.div
            initial={{ scale: 1.1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full">
            <Image
              src={loginBg}
              alt="AI Features Background"
              className="w-full h-full object-cover transition-transform duration-700"
              priority
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 p-8 z-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-4">
              <h3 className="text-2xl font-bold text-white">
                Experience the Future of AI
              </h3>
              <p className="text-white/80 text-lg max-w-md">
                Discover how our AI-powered platform can transform your creative
                workflow and boost your productivity.
              </p>
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 mt-2 py-3 bg-lime-500 text-white rounded-lg font-medium hover:bg-lime-600 transition-colors duration-300 shadow-lg shadow-lime-500/20">
                  Get Started
                </motion.button>
              </Link>
            </motion.div>
          </div>

          <div className="absolute top-4 right-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <Link href="https://clodron.com" target="_blank">
                <span className="text-white/90 text-sm font-medium">
                  Powered by Clodron
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
