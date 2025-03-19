"use client";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import React from "react";

interface GradientCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  children?: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
}

const GradientCard = ({
  icon: Icon,
  title,
  description,
  children,
  gradientFrom = "from-lime-500",
  gradientTo = "to-lime-300",
  className = "",
}: GradientCardProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-lime-500/10 to-transparent rounded-lg blur-3xl" />
      <div className="relative p-8 rounded-lg border border-lime-500/20 bg-black/20 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-4">
          <Icon className="w-8 h-8 text-lime-500" />
          <h1
            className={`text-3xl font-bold bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}>
            {title}
          </h1>
        </motion.div>
        {description && <p className="text-sm text-lime-300">{description}</p>}
        {children}
      </div>
    </div>
  );
};

export default GradientCard;
