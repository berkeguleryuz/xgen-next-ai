"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeepSeekIcon, MetaIcon, MistralIcon } from "@/assets/icon/home-icons";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { generateBio } from "@/utils/actions";

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const userInputValues = `
    User Input: ${values.content}
    Tone: ${values.tone}
    Type: ${values.type}
    Add Emojis: ${values.emojis}
    `;

    try {
      const { data } = await generateBio(
        userInputValues,
        values.temperature,
        values.model,
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }

    console.log(userInputValues);
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
                            onValueChange={(value) => {
                              onChange(value[0]);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        About You
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="w-full bg-transparent border-lime-500/10 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[8rem]"
                          placeholder="Add your sample post or bio here and we will use it to generate your content"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl className="bg-transparent">
                          <SelectTrigger className="bg-transparent border-lime-500/10 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-lime-500/10 active:ring-0 active:ring-offset-0 hover:bg-lime-500/10">
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-lime-50 font-semibold">
                          <SelectItem
                            value="personal"
                            className="focus:bg-lime-500/70">
                            Personal
                          </SelectItem>
                          <SelectItem
                            value="brand"
                            className="focus:bg-lime-500/70">
                            Brand
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Tone
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl className="bg-transparent">
                          <SelectTrigger className="bg-transparent border-lime-500/10 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-lime-500/10 active:ring-0 active:ring-offset-0 hover:bg-lime-500/10">
                            <SelectValue placeholder="Select a tone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-lime-50 font-semibold">
                          <SelectItem
                            value="friendly"
                            className="focus:bg-lime-500/70">
                            Friendly
                          </SelectItem>
                          <SelectItem
                            value="professional"
                            className="focus:bg-lime-500/70">
                            Professional
                          </SelectItem>
                          <SelectItem
                            value="casual"
                            className="focus:bg-lime-500/70">
                            Casual
                          </SelectItem>
                          <SelectItem
                            value="formal"
                            className="focus:bg-lime-500/70">
                            Formal
                          </SelectItem>
                          <SelectItem
                            value="technical"
                            className="focus:bg-lime-500/70">
                            Technical
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="emojis"
                  render={({ field }) => (
                    <FormItem className="flex justify-between items-center">
                      <FormLabel className="flex gap-2 items-center">
                        <span>Emojis 🎢</span>{" "}
                        <p
                          className={cn(
                            field.value ? "text-lime-500" : "text-red-500",
                            "text-xs",
                          )}>
                          {field.value ? "[Active]" : "[Disabled]"}
                        </p>
                      </FormLabel>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="bg-lime-500/10 border-lime-500/10"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </fieldset>
            <Button
              type="submit"
              className="w-full bg-lime-600 hover:bg-lime-700">
              Generate
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UserInput;
