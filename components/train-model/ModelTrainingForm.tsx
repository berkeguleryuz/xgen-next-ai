"use client";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InfoIcon, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Separator } from "../ui/separator";
import toast from "react-hot-toast";
import { getPresignedStorageUrl } from "@/utils/model-actions";

const ACCEPTED_ZIP_FILE_TYPES = [
  "application/zip",
  "application/x-zip-compressed",
];
const MAX_FILE_SIZE = 45 * 1024 * 1024;

const formSchema = z.object({
  modelName: z.string({
    required_error: "Model name is required",
  }),
  gender: z.enum(["man", "woman", "character"]),
  zipFile: z
    .any()
    .refine((files) => files?.[0] instanceof File, "Please upload a zip file")
    .refine(
      (files) =>
        files?.[0]?.type && ACCEPTED_ZIP_FILE_TYPES.includes(files?.[0]?.type),
      "Please upload a valid zip file",
    )
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Please upload a file smaller than ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    ),
});
const ModelTrainingForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modelName: "",
      zipFile: undefined,
      gender: "man",
    },
  });

  const fileRef = form.register("zipFile");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    toast.loading("Training model...");

    try {
      const data = await getPresignedStorageUrl(values.zipFile[0].name);
      console.log(data);
      if (data.error) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      const urlResponse = await fetch(data.signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": values.zipFile[0].type,
        },
        body: values.zipFile[0],
      });

      if (!urlResponse.ok) {
        throw new Error("Error uploading file");
      }

      const res = await urlResponse.json();

      toast.success("File uploaded successfully");
      console.log(res);

      const formData = new FormData();
      formData.append("fileKey", res.Key);
      formData.append("modelName", values.modelName);
      formData.append("gender", values.gender);

      toast.loading("Initiating training...");

      const response = await fetch("/api/train", {
        method: "POST",
        body: formData,
      });

      const results = await response.json();

      if (!response.ok || results.error) {
        // console.log("Results", results);
        throw new Error(results.error || "Error starting training process");
      }

      toast.success("Model training started successfully");
      console.log(results);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(errorMessage);
    }
    console.log(values);
  }

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <fieldset className="grid gap-6 rounded-[8px] border border-lime-500/20 p-4 bg-black/20">
            <legend className="text-2xl font-bold text-center bg-gradient-to-r from-lime-500 to-lime-300 bg-clip-text text-transparent">
              Model Settings
            </legend>
            <div className="flex flex-row justify-between gap-4">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="modelName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter model name"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormDescription className="text-sm text-lime-100">
                        This is the name of the model you will use to generate
                        images.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator
                orientation="vertical"
                className="h-full bg-lime-500/10"
              />
              <div className="flex flex-row items-center justify-start w-full">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1">
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="man" />
                            </FormControl>
                            <FormLabel className="font-normal">Man</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="woman" />
                            </FormControl>
                            <FormLabel className="font-normal">Woman</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="character" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Character
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="w-full">
              <FormField
                control={form.control}
                name="zipFile"
                render={() => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Upload Training Data</span>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="w-4 h-4 text-lime-500" />
                        </TooltipTrigger>
                        <TooltipContent
                          sideOffset={4}
                          side="bottom"
                          className="bg-lime-950 text-white font-normaloverflow-hidden"
                          collisionPadding={20}>
                          <p>They are the rules for the training data.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="text-sm font-light text-gray-300">
                      <ul>
                        <p className="text-sm font-light text-lime-200">
                          Please follow the below guidelines to upload the
                          training data:
                        </p>
                        <li>
                          <span className="text-lime-200">⁂ </span>
                          <span>
                            Upload a zip file containing the training data.
                          </span>
                        </li>
                        <li>
                          <span className="text-lime-200">⁂ </span>
                          <span>
                            The zip file should contains minimum 10 - maximum 15
                            images to train the model better.
                          </span>
                        </li>
                        <li>
                          <span className="text-lime-200">⁂ </span>
                          <span>
                            Do not include any different people in the images.
                          </span>
                        </li>
                        <li>
                          <span className="text-lime-200">⁂ </span>
                          <span>
                            The images should be in good quality and clear. (1:1
                            recommended)
                          </span>
                        </li>
                        <li>
                          <span className="text-lime-200">⁂ </span>
                          <span>Maximum 45MB file size is allowed.</span>
                        </li>
                      </ul>
                    </div>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".zip"
                        className=""
                        placeholder="Upload training data"
                        {...fileRef}
                      />
                    </FormControl>
                    <FormDescription className="text-sm text-lime-200">
                      Upload a zip file containing the training data. (max 45MB)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="font-semibold leading-tight tracking-wider text-white px-12 py-2 rounded-md bg-lime-500/10 border border-lime-500 hover:bg-lime-700 transition-all duration-300 mx-auto text-center"
              disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Generate
            </Button>
          </fieldset>
        </form>
      </Form>
    </div>
  );
};

export default ModelTrainingForm;
