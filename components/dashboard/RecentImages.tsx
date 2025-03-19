"use client";
import { Tables } from "@/database.types";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface RecentImagesProps {
  images: Array<
    Tables<"generated_images"> & {
      url?: string;
    }
  >;
}

const RecentImages = ({ images }: RecentImagesProps) => {
  if (images.length === 0) {
    return (
      <Card className="flex w-full flex-col bg-gradient-to-br from-black/40 to-black/20 border-lime-500/20 text-white backdrop-blur-sm">
        <CardHeader className="border-b border-lime-500/20">
          <CardTitle className="text-xl font-semibold bg-gradient-to-r from-lime-500 to-lime-300 bg-clip-text text-transparent">
            Recent Images
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center min-h-[300px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold text-white/60">
            No recent images
          </motion.p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-black/40 to-black/20 border-lime-500/20 text-white backdrop-blur-sm col-span-4">
      <CardHeader className="border-b border-lime-500/20">
        <CardTitle className="text-xl font-semibold bg-gradient-to-r from-lime-500 to-lime-300 bg-clip-text text-transparent">
          Recent Images
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem
                key={image.id}
                className="basis-full sm:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2 group">
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-lime-500/20",
                      image.height && image.width
                        ? `aspect-[${image.width}/${image.height}]`
                        : "aspect-square",
                    )}>
                    <Image
                      src={image.url || ""}
                      alt={image.prompt || ""}
                      width={image.width || 100}
                      height={image.height || 100}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="text-sm text-white/60 line-clamp-2 group-hover:text-white/80 transition-colors duration-300">
                    {image.prompt}
                  </p>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-black" />
          <CarouselNext className="right-2 bg-black" />
        </Carousel>
        <div className="flex justify-end">
          <Link href={"/my-generations"}>
            <Button className="bg-gradient-to-r from-lime-500/20 to-lime-500/10 hover:from-lime-500/30 hover:to-lime-500/20 text-white border-lime-500/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-lime-500/20">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentImages;
