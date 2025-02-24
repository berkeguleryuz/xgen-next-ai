import ImageUserInput from "@/components/image-generation/ImageUserInput";
import React from "react";

const GenerateImagePage = () => {
  return (
    <section className="container mx-auto grid gap-4 grid-cols-3 overflow-hidden">
      <ImageUserInput />
      <div className="col-span-2 p-4 rounded-xl flex items-center justify-center">
        Output Image
      </div>
    </section>
  );
};

export default GenerateImagePage;
