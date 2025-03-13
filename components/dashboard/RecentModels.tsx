import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Database } from "@/database.types";
import { Badge } from "../ui/badge";

interface RecentModelsProps {
  models: Database["public"]["Tables"]["models"]["Row"][];
}

const RecentModels = ({ models }: RecentModelsProps) => {
  return (
    <Card className="bg-lime-500/10 border-lime-500/20 text-white">
      <CardHeader>
        <CardTitle>Recent Models</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-4">
          {models.length === 0 ? (
            <p className="text-xl font-bold mt-12">No recent models</p>
          ) : (
            models.map((model) => {
              return (
                <div key={model.id} className="flex items-center justify-between space-x-4">
                  <div>
                    <p className="text-sm font-medium">{model.model_name}</p>
                    <p className="text-xs text-white/70">{model.gender}</p>
                  </div>
                  <Badge className="bg-lime-500/10 border-lime-500/20">
                    {model.training_status}
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
