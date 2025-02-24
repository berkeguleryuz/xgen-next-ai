import ImageUserInput from "@/components/image-generation/ImageUserInput";
import ImageUserOutput from "@/components/image-generation/ImageUserOutput";
import React from "react";

const GenerateImagePage = () => {
  return (
    <section className="container mx-auto grid p-4 gap-4 grid-cols-1 lg:grid-cols-5 overflow-hidden">
      <div className="lg:col-span-2 ">
        <ImageUserInput />
      </div>
      <div className="lg:col-span-3">
        <ImageUserOutput />
      </div>
    </section>
  );
};

export default GenerateImagePage;
