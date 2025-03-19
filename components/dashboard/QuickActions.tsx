"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import Link from "next/link";
import { CreditCard, Podcast, Settings, WandSparkles } from "lucide-react";
import { Button } from "../ui/button";
import { FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";

const actions = [
  {
    title: "Generate Image",
    icon: WandSparkles,
    href: "/image-generation",
    description: "Create stunning images with AI",
    color: "from-lime-500/20 to-lime-500/10",
    hoverColor: "from-lime-500/30 to-lime-500/20",
  },
  {
    title: "Generate Post",
    icon: Podcast,
    href: "/post-generator",
    description: "Create engaging social media posts",
    color: "from-lime-500/20 to-lime-500/10",
    hoverColor: "from-lime-500/30 to-lime-500/20",
  },
  {
    title: "Train New Model",
    icon: FaRobot,
    href: "/train-model",
    description: "Customize your AI models",
    color: "from-lime-500/20 to-lime-500/10",
    hoverColor: "from-lime-500/30 to-lime-500/20",
  },
  {
    title: "Subscriptions",
    icon: CreditCard,
    href: "/subscriptions",
    description: "Manage your subscription plans",
    color: "from-lime-500/20 to-lime-500/10",
    hoverColor: "from-lime-500/30 to-lime-500/20",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
    description: "Configure your preferences",
    color: "from-lime-500/20 to-lime-500/10",
    hoverColor: "from-lime-500/30 to-lime-500/20",
  },
];

const QuickActions = () => {
  return (
    <Card className="flex w-full flex-col bg-gradient-to-br from-black/40 to-black/20 border-lime-500/20 text-white backdrop-blur-sm">
      <CardHeader className="border-b border-lime-500/20">
        <CardTitle className="text-xl font-semibold bg-gradient-to-r from-lime-500 to-lime-300 bg-clip-text text-transparent">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        <div className="lg:col-span-3 col-span-2 w-full flex flex-wrap justify-center gap-4">
          {actions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-full md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)]">
              <Link href={action.href}>
                <Button className="w-full h-full min-h-[100px] flex flex-col items-center justify-center gap-2 bg-gradient-to-br hover:bg-gradient-to-br transition-all duration-300 hover:scale-[1.02] hover:ring-2 hover:ring-lime-500/20">
                  <div
                    className={`p-2 rounded-full bg-gradient-to-br ${action.color} group-hover:${action.hoverColor} transition-colors duration-300`}>
                    <action.icon className="w-5 h-5 text-lime-500" />
                  </div>
                  <span className="font-medium">{action.title}</span>
                  <span className="text-sm text-white/60">
                    {action.description}
                  </span>
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
