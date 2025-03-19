"use client";
import React, { useState } from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import { MessageCircleDashed } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import useGeneratedStore from "@/store/useGeneratedStore";

// const images = [
//   {
//     src: "/logo.png",
//     alt: "xGen",
//   },
//   {
//     src: "/logow.png",
//     alt: "xGen",
//   },
//   {
//     src: "/logob.png",
//     alt: "xGen",
//   },
//   {
//     src: "/login.avif",
//     alt: "xGen",
//   },
// ];

const ImageUserOutput = () => {
  const images = useGeneratedStore((state) => state.images);
  // const loading = useGeneratedStore((state) => state.loading);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-black/20 hover:bg-black/30 transition-all duration-300 border-lime-500/20 text-white backdrop-blur-sm p-4 rounded-lg h-full">
      <BorderBeam
        duration={7}
        size={111}
        className="from-lime-100 via-lime-800 to-transparent"
      />
      <div className="relative flex flex-col gap-4">
        <div>
          <fieldset className="grid gap-6 rounded-[8px] border bg-black/20  min-h-[675px] border-lime-500/20 p-4">
            <legend className="text-lg font-bold">Model Output</legend>
            {images.length > 0 ? (
              <div className="relative flex flex-col items-center justify-center h-[600px] w-full">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative max-w-[700px] max-h-[700px] rounded-lg">
                    <Image
                      src={images[currentIndex].url}
                      alt={"Generated Image xGen"}
                      width={480}
                      height={480}
                      className="object-contain rounded-lg"
                    />
                  </div>

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-1 lg:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors">
                        <ChevronLeft className="w-6 h-6 text-white" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-1 lg:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors">
                        <ChevronRight className="w-6 h-6 text-white" />
                      </button>
                    </>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentIndex
                            ? "bg-lime-500"
                            : "bg-lime-500/30"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[500px] text-center p-4">
                <MessageCircleDashed className="w-24 h-24 text-lime-500 text-opacity-75" />
                <h3 className="text-xl font-semibold mb-2">No Output Yet</h3>
              </div>
            )}
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default ImageUserOutput;
