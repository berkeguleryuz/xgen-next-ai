"use client";
import { motion } from "framer-motion";
import React from "react";

const TrainingGuidelines = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-4 rounded-lg border border-lime-500/20 bg-black/20">
        <h3 className="text-lg font-semibold mb-3 text-lime-200">
          Image Requirements
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-lime-500 mt-2" />
            <span className="text-sm text-lime-300">
              High quality, clear images (1:1 aspect ratio recommended)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-lime-500 mt-2" />
            <span className="text-sm text-lime-300">
              Single person per image for best results
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-lime-500 mt-2" />
            <span className="text-sm text-lime-300">
              Well-lit, professional photos with good resolution
            </span>
          </li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="p-4 rounded-lg border border-lime-500/20 bg-black/20">
        <h3 className="text-lg font-semibold mb-3 text-lime-200">
          Training Process
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-lime-500 mt-2" />
            <span className="text-sm text-lime-300">
              10-15 images per model for optimal training
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-lime-500 mt-2" />
            <span className="text-sm text-lime-300">
              Maximum file size: 45MB
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-lime-500 mt-2" />
            <span className="text-sm text-lime-300">
              Training time: approximately 30 minutes
            </span>
          </li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="p-4 rounded-lg border border-lime-500/20 bg-black/20">
        <h3 className="text-lg font-semibold mb-3 text-lime-200">
          Best Practices
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-lime-500 mt-2" />
            <span className="text-sm text-lime-300">
              Use consistent lighting across all images
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-lime-500 mt-2" />
            <span className="text-sm text-lime-300">
              Include various angles and expressions
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-lime-500 mt-2" />
            <span className="text-sm text-lime-300">
              Avoid group photos or complex backgrounds
            </span>
          </li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="p-4 rounded-lg border border-lime-500/20 bg-black/20">
        <h3 className="text-lg font-semibold mb-3 text-lime-200">
          Common Issues to Avoid
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-lime-500 mt-2" />
            <span className="text-sm text-lime-300">
              Blurry or low-resolution images
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-lime-500 mt-2" />
            <span className="text-sm text-lime-300">
              Multiple people in the same image
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-lime-500 mt-2" />
            <span className="text-sm text-lime-300">
              Inconsistent lighting or backgrounds
            </span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default TrainingGuidelines;
