import ModelTrainingForm from "@/components/train-model/ModelTrainingForm";
import React from "react";

const TrainModelPage = () => {
  return (
    <section className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Train Model</h1>
      <p className="text-sm text-lime-300">
        Train a model to generate posts for your business.
      </p>
      <div className="py-24">
        <ModelTrainingForm />
      </div>
    </section>
  );
};

export default TrainModelPage;
