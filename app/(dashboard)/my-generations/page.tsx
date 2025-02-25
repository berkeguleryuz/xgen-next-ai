import Gallery from "@/components/my-generations/Gallery";
import { getImages } from "@/utils/image-actions";
import React from "react";

const MyGenerationsPage = async () => {
  const { data: images } = await getImages();

  return (
    <section className="py-4 w-full h-full">
      <h1 className="text-3xl font-bold">My Generations</h1>
      <p className="text-sm text-lime-500/50">
        Here you can view all the images you have generated.
      </p>
      <span>Click on an image to view it.</span>
      <Gallery images={images || []} />
    </section>
  );
};

export default MyGenerationsPage;
