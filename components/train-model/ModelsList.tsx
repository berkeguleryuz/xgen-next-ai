"use client";
import { Database } from "@/database.types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { Clock, Loader2, PersonStanding, Trash, XIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { deleteModel } from "@/utils/model-actions";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type ModelType = {
  error: string | null;
  success: boolean;
  data: Database["public"]["Tables"]["models"]["Row"][] | null;
};

interface ModelsListProps {
  models: ModelType;
}

const ModelsList = ({ models }: ModelsListProps) => {
  const { data } = models;

  const router = useRouter();

  const handleDeleteModel = async (
    id: number,
    model_id: string,
    model_version: string,
  ) => {
    const toastId = toast.loading("Deleting model...");

    const { success, error } = await deleteModel(id, model_id, model_version);

    if (error) {
      toast.error(error || "Failed to delete model", { id: toastId });
    }

    if (success) {
      toast.success("Model deleted successfully", { id: toastId });
      router.refresh();
    }
  };

  if (data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-2">
        <p className="text-2xl font-bold">No models created yet</p>
        <p className="text-sm text-gray-500">
          Train a new model to get started
        </p>
        <Link
          href="/train-model"
          className="text-lime-500 border border-lime-500/30 px-4 py-2 rounded-md hover:text-lime-400 hover:bg-lime-500/10 transition-all duration-300">
          Train a new model
        </Link>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-6">
      {data?.map((model) => (
        <Card
          key={model.id}
          className="bg-lime-500/10 border border-lime-500/20 text-white">
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center gap-2">
                {model.model_name}
                <div className="flex items-center gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger className="hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-1 px-2 rounded-md">
                      <Trash className="w-4 h-4" />
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-lime-500/10 border border-lime-500/20 text-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-lime-200">
                          Are you sure you want to delete this model?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-white">
                          This action cannot be undone. This will permanently
                          delete your model and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="text-white bg-lime-500/10 border border-lime-500/20 hover:bg-lime-500/50 transition-all duration-300 hover:text-white">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="text-white bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all duration-300"
                          onClick={() =>
                            handleDeleteModel(
                              model.id,
                              model.model_id || "",
                              model.version || "",
                            )
                          }>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <div className="flex items-end gap-2">
                    {model.training_status === "succeeded" ? (
                      <div className="p-1 text-xs bg-lime-500/40 rounded-md px-2">
                        Ready to use
                      </div>
                    ) : model.training_status === "canceled" ||
                      model.training_status === "failed" ? (
                      <div className="p-1 text-xs bg-red-500/40 rounded-md px-2 flex items-center gap-2">
                        <XIcon className="w-4 h-4" />
                        {model.training_status}
                      </div>
                    ) : (
                      <div className="p-1 text-xs bg-lime-500/40 rounded-md px-2 flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Training
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardTitle>
            <CardDescription className="text-lime-300">
              Created{" "}
              {formatDistance(model.created_at, new Date(), {
                addSuffix: true,
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full flex items-center justify-center gap-2">
              <div className="text-lime-200 border border-lime-500/20 rounded-md bg-lime-500/10 p-4 w-full flex flex-col items-center justify-center gap-3">
                <div className="flex items-center gap-2">
                  <PersonStanding className="w-5 h-5" />
                  <p className="text-lime-200 text-base font-semibold">Type</p>
                </div>
                <Separator className="w-full bg-lime-500/20" />
                <p className="text-white text-sm font-normal">
                  {model.gender?.toLowerCase() === "male"
                    ? "Male"
                    : model.gender?.toLowerCase() === "female"
                    ? "Female"
                    : "Character"}
                </p>
              </div>

              <div className="text-lime-200 border border-lime-500/20 rounded-md bg-lime-500/10 p-4 w-full flex flex-col items-center justify-center gap-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <p className="text-lime-200 text-base font-semibold whitespace-nowrap">
                    Training Time
                  </p>
                </div>
                <Separator className="w-full bg-lime-500/20" />
                <p className="text-white text-sm font-normal">
                  {Math.round(Number(model.training_time) / 60 || 0)}
                </p>
              </div>
            </div>
          </CardContent>
          <div className="p-6 pt-0">
            <Link
              href={
                model.training_status === "succeeded"
                  ? `/generate-image?model_id=${model.model_id}:${model.version}`
                  : "#"
              }
              className={cn(
                "inline-flex w-full justify-center items-center gap-2 py-2 px-4 rounded-md bg-lime-500/10 border border-lime-500/20 text-lime-200 hover:text-lime-400 hover:bg-lime-500/20 transition-all duration-300",
                model.training_status !== "succeeded" &&
                  "pointer-events-none opacity-50",
              )}>
              <div className={``}>
                {model.training_status === "succeeded" ? (
                  <span>Generate Image</span>
                ) : (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Not ready yet</span>
                  </div>
                )}
              </div>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ModelsList;
