"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Separator } from "../ui/separator";

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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <fieldset className="grid gap-6 rounded-[8px] border border-lime-500/10 p-4 bg-lime-500/10">
              <legend className="text-lg font-bold">Model Settings</legend>
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="llama3-8b"
                        {...field}
                        className="bg-transparent"
                      />
                    </FormControl>
                    <FormDescription>
                      This is the model you want to use.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UserInput;
