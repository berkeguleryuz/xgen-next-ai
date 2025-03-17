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
      <Card className="bg-lime-500/10 text-white border-lime-500/20 col-span-3">
        <CardHeader>
          <CardTitle>Recent Images</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <p className="text-xl font-bold mt-12">No recent images</p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="bg-lime-500/10 text-white border-lime-500/20 col-span-3">
      <CardHeader>
        <CardTitle>Recent Images</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full">
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem
                key={image.id}
                className="basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="space-y-2">
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-lg",
                      image.height && image.width
                        ? `aspect-[${image.width}/${image.height}]`
                        : "aspect-square",
                    )}>
                    <Image
                      src={image.url || ""}
                      alt={image.prompt || ""}
                      width={image.width || 100}
                      height={image.height || 100}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {image.prompt}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-black" />
          <CarouselNext className="right-2 bg-black" />
        </Carousel>
        <div className="flex justify-end">
          <Link href={"/my-generations"}>
            <Button className="bg-lime-500/10 text-white border-lime-500/20 hover:bg-lime-500/20">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentImages;
