import ModelsList from "@/components/train-model/ModelsList";
import { fetchModels } from "@/utils/model-actions";
import React from "react";

const MyModelsPage = async () => {
  const data = await fetchModels();
  // console.log(data);
  return (
    <section className="min-h-screen">
      <div className="flex flex-col p-4 mt-2">
        <h1 className="text-3xl font-bold">My Models</h1>
        <p className="text-sm text-lime-200">
          Here you can see all the models you have created.
        </p>
      </div>
      <ModelsList models={data} />
    </section>
  );
};

export default MyModelsPage;
