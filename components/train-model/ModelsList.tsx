"use client";
import { Database } from "@/database.types";
import React from "react";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { Clock, Loader2, PersonStanding, Trash, XIcon } from "lucide-react";
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
        <p className="text-2xl font-bold text-lime-200">
          No models created yet
        </p>
        <p className="text-sm text-lime-300/70">
          Train a new model to get started
        </p>
        <Link
          href="/train-model"
          className="text-lime-200 border border-lime-500/20 px-4 py-2 rounded-md hover:text-lime-400 hover:bg-black/20 transition-all duration-300">
          Train a new model
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((model) => (
        <div
          key={model.id}
          className="bg-black/20 border border-lime-500/20 rounded-lg overflow-hidden hover:bg-black/30 transition-all duration-300">
          <div className="p-6">
            <div className="flex justify-between items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold text-lime-200">
                {model.model_name}
              </h3>
              <div className="flex items-center gap-2">
                <AlertDialog>
                  <AlertDialogTrigger className="hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-1 px-2 rounded-md">
                    <Trash className="w-4 h-4" />
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-black/90 border border-lime-500/20 text-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-lime-200">
                        Are you sure you want to delete this model?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-lime-300/70">
                        This action cannot be undone. This will permanently
                        delete your model and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="text-white bg-black/20 border border-lime-500/20 hover:bg-black/30 transition-all duration-300 hover:text-white">
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
                    <div className="p-1 text-xs bg-lime-500/20 rounded-md px-2 text-lime-200">
                      Ready to use
                    </div>
                  ) : model.training_status === "canceled" ||
                    model.training_status === "failed" ? (
                    <div className="p-1 text-xs bg-red-500/20 rounded-md px-2 flex items-center gap-2 text-red-200">
                      <XIcon className="w-4 h-4" />
                      {model.training_status}
                    </div>
                  ) : (
                    <div className="p-1 text-xs bg-lime-500/20 rounded-md px-2 flex items-center gap-2 text-lime-200">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Training
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p className="text-sm text-lime-300/70 mb-6">
              Created{" "}
              {formatDistance(model.created_at, new Date(), {
                addSuffix: true,
              })}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-black/20 border border-lime-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <PersonStanding className="w-5 h-5 text-lime-200" />
                  <p className="text-lime-200 text-sm font-medium">Type</p>
                </div>
                <p className="text-lime-300/70 text-sm">
                  {model.gender?.toLowerCase() === "male"
                    ? "Male"
                    : model.gender?.toLowerCase() === "female"
                    ? "Female"
                    : "Character"}
                </p>
              </div>

              <div className="bg-black/20 border border-lime-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-lime-200" />
                  <p className="text-lime-200 text-sm font-medium">
                    Training Time
                  </p>
                </div>
                <p className="text-lime-300/70 text-sm">
                  {Math.round(Number(model.training_time) / 60 || 0)} minutes
                </p>
              </div>
            </div>

            <Link
              href={
                model.training_status === "succeeded"
                  ? `/generate-image?model_id=${model.model_id}:${model.version}`
                  : "#"
              }
              className={cn(
                "inline-flex w-full justify-center items-center gap-2 py-2 px-4 rounded-md bg-lime-500/10 border border-lime-500/20 text-lime-200  hover:bg-lime-500/20 transition-all duration-300",
                model.training_status !== "succeeded" &&
                  "pointer-events-none opacity-50",
              )}>
              {model.training_status === "succeeded" ? (
                <span>Generate Image</span>
              ) : (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Not ready yet</span>
                </div>
              )}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModelsList;
