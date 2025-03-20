"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "../ui/animated-gradient-tsx";

const faqItems = [
  {
    question: "What is xGen?",
    answer:
      "xGen is a powerful platform that combines various AI models to help you generate content, images, and automate your social media workflow. It's designed to make your creative process more efficient and productive.",
  },
  {
    question: "How does the image generation work?",
    answer:
      "Our image generation uses state-of-the-art AI models to create high-quality images based on your text descriptions. You can customize various parameters like style, size, and composition to get exactly what you need.",
  },
  {
    question: "Can I train my own AI models?",
    answer:
      "Yes! We provide tools and infrastructure for training custom AI models. You can fine-tune existing models or train new ones based on your specific needs and data.",
  },
  {
    question: "What social media platforms are supported?",
    answer:
      "We currently support major social media platforms including Instagram, Twitter, Facebook, and LinkedIn. We're constantly adding support for more platforms based on user demand.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We take data security seriously. All your data is encrypted, and we follow industry best practices for data protection. We never share your data with third parties without your explicit consent.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-24 relative overflow-hidden">
      <div className="absolute text-white inset-0 bg-gradient-to-b from-black/50 to-black/20 pointer-events-none" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <AnimatedGradientText className="bg-gradient-to-r from-lime-500 to-lime-200 text-transparent bg-clip-text text-5xl font-bold">
            FAQ
          </AnimatedGradientText>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-white mt-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-white/80 mt-4 max-w-2xl mx-auto">
              Find answers to common questions about our AI-powered platform and
              its features.
            </p>
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "rounded-xl overflow-hidden",
                "bg-white/5 backdrop-blur-sm border border-white/10",
                "hover:border-lime-500/30 transition-colors duration-300",
              )}>
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left">
                <span className="text-lg font-medium text-white">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 90 : 0 }}
                  transition={{ duration: 0.3 }}>
                  <Plus className="w-5 h-5 text-lime-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden">
                    <div className="px-6 pb-4">
                      <p className="text-white/70 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
