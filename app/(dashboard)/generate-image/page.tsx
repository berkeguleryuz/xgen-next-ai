import ImageUserInput from "@/components/image-generation/ImageUserInput";
import ImageUserOutput from "@/components/image-generation/ImageUserOutput";
import { fetchModels } from "@/utils/model-actions";
import React from "react";

interface searchParams {
  model_id?: string;
}

const GenerateImagePage = async ({
  searchParams,
}: {
  searchParams: Promise<searchParams>;
}) => {
  const model_id = (await searchParams).model_id;
  const { data: userModels } = await fetchModels();
  return (
    <section className="container mx-auto grid p-4 gap-4 grid-cols-1 lg:grid-cols-5 overflow-hidden">
      <div className="lg:col-span-2 ">
        <ImageUserInput userModels={userModels || []} model_id={model_id} />
      </div>
      <div className="lg:col-span-3">
        <ImageUserOutput />
      </div>
    </section>
  );
};

export default GenerateImagePage;
