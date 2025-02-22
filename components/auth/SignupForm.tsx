"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { signUp } from "@/utils/auth/auth-actions";
import { redirect } from "next/navigation";

const passwordValidationRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$",
);

const formSchema = z
  .object({
    full_name: z
      .string()
      .min(2, {
        message: "Name is required.",
      })
      .max(25, {
        message: "Name must be less than 25 characters.",
      }),
    email: z.string().email({
      message: "Please use a valid email address.",
    }),
    password: z
      .string({
        required_error: "Password is required.",
      })
      .min(8, {
        message: "Password must be at least 8 characters long.",
      })
      .regex(passwordValidationRegex, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }),
    confirmPassword: z
      .string({
        required_error: "Confirm your password.",
      })
      .min(8, {
        message: "Password must be at least 8 characters long.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const SignupForm = ({ className }: { className?: string }) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    toast.loading("Signing up...");

    const formData = new FormData();
    formData.append("full_name", values.full_name);
    formData.append("email", values.email);
    formData.append("password", values.password);

    const { success, error } = await signUp(formData);

    if (!success) {
      toast.error(String(error) || "Something went wrong");
    } else {
      toast.success(
        "Sign up successful! Please check your email for verification.",
      );
      setLoading(false);
      redirect("/login");
    }
  }

  return (
    <div className={cn("grid gap-6 ", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    className="text-white font-semibold placeholder:text-neutral-300 bg-lime-500/10 border-none outline-none ring-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your@email.com"
                    {...field}
                    className="text-white font-semibold placeholder:text-neutral-300 bg-lime-500/10 border-none outline-none ring-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="********"
                    {...field}
                    className="text-white font-semibold placeholder:text-neutral-300 bg-lime-500/10 border-none outline-none ring-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="********"
                    {...field}
                    className="text-white font-semibold placeholder:text-neutral-300 bg-lime-500/10 border-none outline-none ring-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-lime-600 hover:bg-lime-700"
            disabled={loading}>
            {loading && <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
