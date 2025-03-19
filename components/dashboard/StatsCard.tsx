"use client";
import { Database } from "@/database.types";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ImagesIcon, Package, Repeat1 } from "lucide-react";
import { FaRobot } from "react-icons/fa";
import { AiOutlineDingding } from "react-icons/ai";
import { motion } from "framer-motion";

interface StatsCardProps {
  modelCount: number;
  imageCount: number;
  credits: Database["public"]["Tables"]["credits"]["Row"] | null;
}

const stats = [
  {
    title: "Total Images",
    value: (props: StatsCardProps) => props.imageCount,
    icon: ImagesIcon,
    gradient: "from-lime-500/20 to-lime-500/10",
    hoverGradient: "from-lime-500/30 to-lime-500/20",
  },
  {
    title: "Total Models",
    value: (props: StatsCardProps) => props.modelCount,
    icon: FaRobot,
    gradient: "from-lime-500/20 to-lime-500/10",
    hoverGradient: "from-lime-500/30 to-lime-500/20",
  },
  {
    title: "Image Credits",
    value: (props: StatsCardProps) => props.credits?.image_generation_count || 0,
    maxValue: (props: StatsCardProps) => props.credits?.max_image_generation_count || 0,
    icon: Package,
    gradient: "from-lime-500/20 to-lime-500/10",
    hoverGradient: "from-lime-500/30 to-lime-500/20",
    showMax: true,
  },
  {
    title: "Model Credits",
    value: (props: StatsCardProps) => props.credits?.model_training_count || 0,
    maxValue: (props: StatsCardProps) => props.credits?.max_model_training_count || 0,
    icon: AiOutlineDingding,
    gradient: "from-lime-500/20 to-lime-500/10",
    hoverGradient: "from-lime-500/30 to-lime-500/20",
    showMax: true,
  },
];

const StatsCard = (props: StatsCardProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="group bg-black/20 hover:bg-black/30 transition-all duration-300 hover:scale-[1.02] hover:translate-y-1 border-lime-500/20 text-white backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium bg-gradient-to-r from-lime-500 to-lime-300 bg-clip-text text-transparent">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full bg-gradient-to-br ${stat.gradient} group-hover:${stat.hoverGradient} transition-colors duration-300`}>
                <stat.icon className="w-4 h-4 text-lime-500" />
              </div>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              {stat.showMax ? (
                <div className="flex flex-row justify-center items-center gap-3 font-bold">
                  <p className="text-2xl">{stat.value(props)}</p>
                  <Repeat1 className="w-4 h-4 text-lime-500" />
                  <p className="text-lime-200 text-2xl">
                    {stat.maxValue(props)}
                  </p>
                </div>
              ) : (
                <div className="text-2xl flex items-end gap-2 font-bold">
                  {stat.value(props)}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCard;
