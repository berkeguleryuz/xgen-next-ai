import { Tables } from "@/database.types";
import React from "react";

type ImageProps = {
  url: string | undefined;
} & Tables<"generated_images">;

interface GalleryProps {
  images: ImageProps[];
}

const Gallery = ({ images }: GalleryProps) => {
  console.log(images);
  return <div>Gallery</div>;
};

export default Gallery;
