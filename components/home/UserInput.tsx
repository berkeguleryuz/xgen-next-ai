"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "../ui/separator";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeepSeekIcon, MetaIcon, MistralIcon } from "@/assets/icon/home-icons";
import { Slider } from "../ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { InfoIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  model: z.string().min(1, "Username must be at least 2 characters."),
  temperature: z
    .number()
    .min(0, "Temperature must be bigger than 0")
    .max(2, "Temperature must be less than 2"),
  content: z
    .string()
    .min(50, "Content must be at least 50 characters.")
    .max(500, "Content must be less than 500 characters."),
  type: z.enum(["personal", "brand"], {
    errorMap: () => ({ message: "Type is required" }),
  }),
  tone: z.enum(["friendly", "professional", "casual", "formal", "technical"], {
    errorMap: () => ({ message: "Tone is required" }),
  }),
  emojis: z.boolean().default(false),
});

const UserInput = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "llama3-8b-8192",
      temperature: 1,
      content: "",
      type: "personal",
      tone: "friendly",
      emojis: false,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <div className="bg-transparent border border-lime-500/10 shadow-inner shadow-lime-500/10 transition-all duration-300 p-4 rounded-lg">
      <h2 className="text-3xl font-bold pb-2 decoration-dashed decoration-lime-500">
        User Input
      </h2>
      <Separator className="my-4 border-lime-500/10 divide-dashed decoration-dashed dashed decoration-slice" />
      <div className="relative flex flex-col gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full items-start gap-6">
            <fieldset className="grid gap-6 rounded-[8px] border border-lime-500/10 p-4 bg-lime-500/10">
              <legend className="text-lg font-bold text-right">
                Model Settings
              </legend>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
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
                            value="llama3-8b-8192"
                            className="focus:bg-lime-500/70 flex">
                            <div className="flex items-center gap-2">
                              <MetaIcon className="w-4 h-4" />
                              <p>Meta LLama</p>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="deepseek-r1-distill-qwen-32b"
                            className="focus:bg-lime-500/70">
                            <div className="flex items-center gap-2">
                              <DeepSeekIcon className="w-4 h-4" />
                              <p>DeepSeek</p>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="mixtral-8x7b-32768"
                            className="focus:bg-lime-500/70">
                            <div className="flex items-center gap-2">
                              <MistralIcon className="w-4 h-4" />
                              <p>Mistral</p>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="temperature"
                    render={({ field: { onChange, value } }) => (
                      <FormItem>
                        <FormLabel className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span>Creativity</span>
                            <Tooltip>
                              <TooltipTrigger>
                                <InfoIcon className="w-4 h-4 text-lime-500" />
                              </TooltipTrigger>
                              <TooltipContent
                                sideOffset={4}
                                side="bottom"
                                className="bg-lime-950 text-white font-normal"
                                collisionPadding={20}>
                                <p>This is the creativity of the model.</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <span className="">{value}</span>
                        </FormLabel>
                        <FormControl>
                          <Slider
                            defaultValue={[1]}
                            max={2}
                            min={0}
                            step={0.1}
                            className="w-full"
                            onValueChange={onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="grid gap-6 rounded-[8px] border border-lime-500/10 p-4 bg-lime-500/10">
              <legend className="text-right text-lg font-bold">
                User Settings
              </legend>

              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field: { onChange, value } }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        About You
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          defaultValue={value}
                          className="w-full bg-transparent border-lime-500/10 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          onChange={onChange}
                          placeholder="Tell us about yourself"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </fieldset>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UserInput;
