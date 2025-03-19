import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Database } from "@/database.types";
import { Badge } from "../ui/badge";

interface RecentModelsProps {
  models: Database["public"]["Tables"]["models"]["Row"][];
}

const RecentModels = ({ models }: RecentModelsProps) => {
  return (
    <Card className="bg-gradient-to-br md:w-1/3 w-full from-black/40 to-black/20 border-lime-500/20 text-white backdrop-blur-sm">
      <CardHeader className="border-b border-lime-500/20">
        <CardTitle className="text-xl font-semibold bg-gradient-to-r from-lime-500 to-lime-300 bg-clip-text text-transparent">
          Recent Models
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-4">
          {models.length === 0 ? (
            <p className="text-xl font-bold mt-12">No recent models</p>
          ) : (
            models.map((model) => {
              return (
                <div
                  key={model.id}
                  className="flex items-center justify-between space-x-4 py-4">
                  <div>
                    <p className="text-sm font-medium">{model.model_name}</p>
                    <p className="text-xs text-white/70">{model.gender}</p>
                  </div>
                  <Badge
                    className={getStatusVariant(
                      model.training_status ?? "pending",
                    )}>
                    {model.training_status ?? "pending"}
                  </Badge>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentModels;

function getStatusVariant(status: string) {
  switch (status) {
    case "succeed":
      return "bg-lime-500/10 border-lime-500/20";
    case "processing":
    case "starting":
      return "bg-yellow-500/10 border-yellow-500/20";
    case "failed":
    case "canceled":
      return "bg-red-500/10 border-red-500/20";
    default:
      return "bg-gray-500/10 border-gray-500/20";
      break;
  }
}
