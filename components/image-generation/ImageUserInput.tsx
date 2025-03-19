"use client";
import React, { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon, Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import useGeneratedStore from "@/store/useGeneratedStore";
import { Tables } from "@/database.types";

export const imageGenerationFormSchema = z.object({
  model: z.string({
    required_error: "Model is required",
  }),
  prompt: z.string({
    required_error: "Prompt is required",
  }),
  guidance: z
    .number({
      required_error: "Guidance is required",
    })
    .min(3, { message: "Guidance must be at least 3" })
    .max(5, { message: "Guidance must be less than 5" }),
  num_outputs: z
    .number()
    .min(1, { message: "Number of outputs must be at least 1" })
    .max(4, { message: "Number of outputs must be less than 4" }),
  aspect_ratio: z.string({
    required_error: "Aspect ratio is required",
  }),
  output_format: z.string({
    required_error: "Output format is required",
  }),
  output_quality: z
    .number({
      required_error: "Output quality is required",
    })
    .min(80, { message: "Output quality must be at least 80" })
    .max(100, { message: "Output quality must be less than 100" }),
  num_inference_steps: z
    .number({
      required_error: "Number of inference steps is required",
    })
    .min(1, { message: "Number of inference steps must be at least 1" })
    .max(50, { message: "Number of inference steps must be less than 50" }),
});

interface ImageUserInputProps {
  userModels: Tables<"models">[];
  model_id?: string;
}

const ImageUserInput = ({ userModels, model_id }: ImageUserInputProps) => {
  const generateImage = useGeneratedStore((state) => state.generateImage);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof imageGenerationFormSchema>>({
    resolver: zodResolver(imageGenerationFormSchema),
    defaultValues: {
      model: model_id
        ? `berkeguleryuz/${model_id}`
        : "black-forest-labs/flux-dev",
      prompt: "",
      guidance: 3.5,
      num_outputs: 1,
      output_format: "webp",
      aspect_ratio: "1:1",
      output_quality: 80,
      num_inference_steps: 28,
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "model") {
        let newSteps;

        if (value.model === "black-forest-labs/flux-schnell") {
          newSteps = 4;
        } else {
          newSteps = 28;
        }
        if (newSteps !== undefined) {
          form.setValue("num_inference_steps", newSteps);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  async function onSubmit(values: z.infer<typeof imageGenerationFormSchema>) {
    setLoading(true);
    const newValues = {
      ...values,
      prompt: values.model.startsWith("berkeguleryuz/")
        ? (() => {
            const modelId = values.model
              .replace("berkeguleryuz/", "")
              .split(":")[0];
            const selectedModel = userModels.find(
              (model) => model.model_id === modelId,
            );
            return `photo of a ${selectedModel?.trigger_word || "CLDRN"} ${
              selectedModel?.gender
            }, ${values.prompt}`;
          })()
        : values.prompt,
    };
    await generateImage(newValues);
    setLoading(false);
  }
  return (
    <div className="bg-black/20 hover:bg-black/30 transition-all duration-300 border-lime-500/20 text-white backdrop-blur-sm p-4 rounded-lg h-full">
      <h2 className="text-3xl font-bold pb-2 decoration-dashed decoration-lime-500">
        User Input
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full items-start gap-6">
          <fieldset className="grid gap-6 rounded-[8px] border border-lime-500/20 p-4 bg-black/20 h-full flex-1">
            <legend className="text-lg font-bold text-right">
              Model Settings
            </legend>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex items-center gap-2">
                        <span>Model</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="w-4 h-4 text-lime-500" />
                          </TooltipTrigger>
                          <TooltipContent
                            sideOffset={4}
                            side="bottom"
                            className="bg-lime-950 text-white font-normal"
                            collisionPadding={20}>
                            <p>
                              This is the model you want to use to generate the
                              image.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl className="bg-transparent">
                        <SelectTrigger className="bg-transparent border-lime-500/10 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-lime-500/10 active:ring-0 active:ring-offset-0 hover:bg-lime-500/10">
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-lime-50 font-semibold">
                        <SelectItem
                          value="black-forest-labs/flux-dev"
                          className="focus:bg-lime-500/70 flex">
                          <div className="flex items-center gap-2">
                            <p>Flux Dev</p>
                          </div>
                        </SelectItem>
                        <SelectItem
                          value="black-forest-labs/flux-schnell"
                          className="focus:bg-lime-500/70">
                          <div className="flex items-center gap-2">
                            <p>Flux Schnell</p>
                          </div>
                        </SelectItem>

                        {userModels?.map(
                          (model) =>
                            model.training_status === "succeeded" && (
                              <SelectItem
                                key={`${model.model_id}:${model.version}`}
                                value={`berkeguleryuz/${model.model_id}:${model.version}`}
                                className="focus:bg-lime-500/70">
                                <div className="flex items-center gap-2">
                                  <p>{model.model_name}</p>
                                </div>
                              </SelectItem>
                            ),
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="guidance"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span>Guidance</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="w-4 h-4 text-lime-500" />
                          </TooltipTrigger>
                          <TooltipContent
                            sideOffset={4}
                            side="bottom"
                            className="bg-lime-950 text-white font-normal"
                            collisionPadding={20}>
                            <p>
                              This is the guidance of the model. It is a
                              multiplier for the prompt.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <span className="">{value}</span>
                    </FormLabel>
                    <FormControl>
                      <Slider
                        defaultValue={[3.5]}
                        max={5}
                        min={3}
                        step={0.1}
                        className="w-full"
                        onValueChange={(value) => {
                          onChange(value[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="num_inference_steps"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span>Number of Inference Steps</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="w-4 h-4 text-lime-500" />
                          </TooltipTrigger>
                          <TooltipContent
                            sideOffset={4}
                            side="bottom"
                            className="bg-lime-950 text-white font-normal"
                            collisionPadding={20}>
                            <p>
                              This is the number of inference steps of the
                              model. It is a multiplier for the prompt.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <span className="">{value}</span>
                    </FormLabel>
                    <FormControl>
                      <Slider
                        defaultValue={[28]}
                        max={
                          form.getValues("model") ===
                          "black-forest-labs/flux-schnell"
                            ? 4
                            : 50
                        }
                        min={1}
                        step={1}
                        className="w-full"
                        onValueChange={(value) => {
                          onChange(value[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="output_quality"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span>Output Quality</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="w-4 h-4 text-lime-500" />
                          </TooltipTrigger>
                          <TooltipContent
                            sideOffset={4}
                            side="bottom"
                            className="bg-lime-950 text-white font-normal"
                            collisionPadding={20}>
                            <p>
                              This is the quality of the output image. It is a
                              multiplier for the prompt.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <span className="">{value}</span>
                    </FormLabel>
                    <FormControl>
                      <Slider
                        defaultValue={[80]}
                        max={100}
                        min={80}
                        step={1}
                        className="w-full"
                        onValueChange={(value) => {
                          onChange(value[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span>Prompt</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="w-4 h-4 text-lime-500" />
                          </TooltipTrigger>
                          <TooltipContent
                            sideOffset={4}
                            side="bottom"
                            className="bg-lime-950 text-white font-normal"
                            collisionPadding={20}>
                            <p>
                              That is the prompt that will be used to generate
                              the image.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="w-full bg-transparent border-lime-500/10 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[6rem]"
                        placeholder="Enter a prompt to generate an image"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-row justify-between gap-1">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="num_outputs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center gap-2 whitespace-nowrap">
                            <span>Number of Outputs</span>
                            <Tooltip>
                              <TooltipTrigger>
                                <InfoIcon className="w-4 h-4 text-lime-500 flex-shrink-0" />
                              </TooltipTrigger>
                              <TooltipContent
                                sideOffset={4}
                                side="bottom"
                                className="bg-lime-950 text-white font-normal"
                                collisionPadding={20}>
                                <p>
                                  This is the number of images you want to
                                  generate.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value.toString()}>
                          <FormControl className="bg-transparent">
                            <SelectTrigger className="bg-transparent border-lime-500/10 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-lime-500/10 active:ring-0 active:ring-offset-0 hover:bg-lime-500/10">
                              <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-lime-50 font-semibold">
                            <SelectItem
                              value="1"
                              className="focus:bg-lime-500/70 flex">
                              <div className="flex items-center gap-2">
                                <p>1</p>
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="black-forest-labs/flux-schnell"
                              className="focus:bg-lime-500/70">
                              <div className="flex items-center gap-2">
                                <p>2</p>
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="3"
                              className="focus:bg-lime-500/70">
                              <div className="flex items-center gap-2">
                                <p>3</p>
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="4"
                              className="focus:bg-lime-500/70">
                              <div className="flex items-center gap-2">
                                <p>4</p>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="aspect_ratio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center gap-2 whitespace-nowrap">
                            <span>Aspect Ratio</span>
                            <Tooltip>
                              <TooltipTrigger>
                                <InfoIcon className="w-4 h-4 text-lime-500 flex-shrink-0" />
                              </TooltipTrigger>
                              <TooltipContent
                                sideOffset={4}
                                side="bottom"
                                className="bg-lime-950 text-white font-normal"
                                collisionPadding={20}>
                                <p>
                                  This is the aspect ratio of the image you want
                                  to generate.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value.toString()}>
                          <FormControl className="bg-transparent">
                            <SelectTrigger className="bg-transparent border-lime-500/10 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-lime-500/10 active:ring-0 active:ring-offset-0 hover:bg-lime-500/10">
                              <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-lime-50 font-semibold">
                            <SelectItem
                              value="1:1"
                              className="focus:bg-lime-500/70 flex">
                              <div className="flex items-center gap-2">
                                <p>1:1</p>
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="16:9"
                              className="focus:bg-lime-500/70">
                              <div className="flex items-center gap-2">
                                <p>16:9</p>
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="21:9"
                              className="focus:bg-lime-500/70">
                              <div className="flex items-center gap-2">
                                <p>21:9</p>
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="3:2"
                              className="focus:bg-lime-500/70">
                              <div className="flex items-center gap-2">
                                <p>3:2</p>
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="2:3"
                              className="focus:bg-lime-500/70">
                              <div className="flex items-center gap-2">
                                <p>2:3</p>
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="4:5"
                              className="focus:bg-lime-500/70">
                              <div className="flex items-center gap-2">
                                <p>4:5</p>
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="5:4"
                              className="focus:bg-lime-500/70">
                              <div className="flex items-center gap-2">
                                <p>5:4</p>
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="3:4"
                              className="focus:bg-lime-500/70">
                              <div className="flex items-center gap-2">
                                <p>3:4</p>
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="4:3"
                              className="focus:bg-lime-500/70">
                              <div className="flex items-center gap-2">
                                <p>4:3</p>
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="9:16"
                              className="focus:bg-lime-500/70">
                              <div className="flex items-center gap-2">
                                <p>9:16</p>
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="9:21"
                              className="focus:bg-lime-500/70">
                              <div className="flex items-center gap-2">
                                <p>9:21</p>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="output_format"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex items-center gap-2">
                        <span>Output Format</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="w-4 h-4 text-lime-500" />
                          </TooltipTrigger>
                          <TooltipContent
                            sideOffset={4}
                            side="bottom"
                            className="bg-lime-950 text-white font-normal"
                            collisionPadding={20}>
                            <p>This is the format of the output image.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}>
                      <FormControl className="bg-transparent">
                        <SelectTrigger className="bg-transparent border-lime-500/10 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-lime-500/10 active:ring-0 active:ring-offset-0 hover:bg-lime-500/10">
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-lime-50 font-semibold">
                        <SelectItem
                          value="webp"
                          className="focus:bg-lime-500/70 flex">
                          <div className="flex items-center gap-2">
                            <p>WEBP</p>
                          </div>
                        </SelectItem>
                        <SelectItem
                          value="png"
                          className="focus:bg-lime-500/70">
                          <div className="flex items-center gap-2">
                            <p>PNG</p>
                          </div>
                        </SelectItem>
                        <SelectItem
                          value="jpg"
                          className="focus:bg-lime-500/70">
                          <div className="flex items-center gap-2">
                            <p>JPG</p>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
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

export default ImageUserInput;
