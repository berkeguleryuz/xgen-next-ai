"use client";
import ModelTrainingForm from "@/components/train-model/ModelTrainingForm";
import TrainingGuidelines from "@/components/train-model/TrainingGuidelines";
import GradientCard from "@/components/ui/gradient-card";
import { Brain, ImportIcon } from "lucide-react";
import React from "react";

const TrainModelPage = () => {
  return (
    <section className="container mx-auto p-4">
      <GradientCard
        icon={Brain}
        title="Train Your Custom Model"
        description="Create your own AI model by training it with your custom images. Follow the guidelines below to ensure the best results."
      />

      <div className="py-12">
        <ModelTrainingForm />
      </div>

      <GradientCard
        icon={ImportIcon}
        title="Training Guidelines"
        gradientFrom="from-lime-200"
        gradientTo="to-lime-500">
        <TrainingGuidelines />
      </GradientCard>
    </section>
  );
};

export default TrainModelPage;
