"use client";

import Gallery from "@/components/my-generations/Gallery";
import { getImages } from "@/utils/image-actions";
import React, { useEffect, useState } from "react";
import { Tables } from "@/database.types";

type ImageProps = {
  url: string | undefined;
} & Tables<"generated_images">;

const MyGenerationsPage = () => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const { data } = await getImages();
      setImages(data || []);
      setLoading(false);
    };

    fetchImages();
  }, []);

  const handleImageDeleted = (deletedImageId: number) => {
    setImages((prevImages) => 
      prevImages.filter((image) => Number(image.id) !== deletedImageId)
    );
  };

  return (
    <section className="p-4 w-full h-full">
      <h1 className="text-3xl font-bold">My Generations</h1>
      <p className="text-sm text-lime-500/50">
        Here you can view all the images you have generated.
      </p>
      <span>Click on an image to view it.</span>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
        </div>
      ) : (
        <Gallery 
          images={images} 
          onImageDeleted={handleImageDeleted} 
        />
      )}
    </section>
  );
};

export default MyGenerationsPage;
