import { Database } from "@/database.types";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ImagesIcon, Package, Repeat1 } from "lucide-react";
import { FaRobot } from "react-icons/fa";
import { AiOutlineDingding } from "react-icons/ai";

interface StatsCardProps {
  modelCount: number;
  imageCount: number;
  credits: Database["public"]["Tables"]["credits"]["Row"] | null;
}

const StatsCard = ({ modelCount, imageCount, credits }: StatsCardProps) => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      <Card className="bg-lime-500/10 border-lime-500/20 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Images</CardTitle>
          <ImagesIcon className="w-4 h-4" />
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <div className="text-2xl flex items-end gap-2 font-bold">
            {imageCount}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-lime-500/10 border-lime-500/20 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Models</CardTitle>
          <FaRobot className="w-4 h-4" />
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <div className="text-2xl flex items-end gap-2 font-bold">
            {modelCount}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-lime-500/10 border-lime-500/20 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Image Credits</CardTitle>
          <Package className="w-4 h-4" />
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <div className="flex flex-row justify-center items-center gap-3 font-bold">
            <p className="text-2xl">{credits?.image_generation_count || 0}</p>
            <Repeat1 className="w-4 h-4" />
            <p className="text-lime-200 text-2xl">
              {credits?.max_image_generation_count || 0}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-lime-500/10 border-lime-500/20 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Model Credits
          </CardTitle>
          <AiOutlineDingding className="w-4 h-4" />
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <div className="flex flex-row justify-center items-center gap-3 font-bold">
            <p className="text-2xl">{credits?.model_training_count || 0}</p>
            <Repeat1 className="w-4 h-4" />
            <p className="text-lime-200 text-2xl">
              {credits?.max_model_training_count || 0}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCard;
