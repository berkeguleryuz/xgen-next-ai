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
import { toast } from "react-hot-toast";
import { LoaderCircle, Eye, EyeOff } from "lucide-react";
import { redirect } from "next/navigation";
import { login } from "@/utils/auth/auth-actions";

const passwordValidationRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
);

const formSchema = z.object({
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long.",
    })
    .regex(passwordValidationRegex, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
  confirmPassword: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long.",
    })
    .regex(passwordValidationRegex, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
});

const ResetPasswordForm = ({ className }: { className?: string }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    toast.loading("Signing up...");

    const formData = new FormData();
    formData.append("password", values.password);
    formData.append("confirmPassword", values.confirmPassword);

    const { success, error } = await login(formData);

    if (!success) {
      toast.error(String(error) || "Something went wrong");
    } else {
      toast.success("Login successful!");
      setLoading(false);
      redirect("/dashboard");
    }
  }

  return (
    <div className={cn("grid gap-6 ", className)}>
      <fieldset className="grid gap-4 rounded-[8px] border bg-lime-500/10 border-lime-500/10 p-4">
        <legend className="text-3xl font-semibold tracking-wide">
          Change Password
        </legend>
        <p className="text-sm text-neutral-300">
          Enter your new password below.
        </p>
      </fieldset>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      {...field}
                      className="text-white font-semibold placeholder:text-neutral-300 bg-lime-500/10 border-none outline-none ring-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-white transition-colors">
                      {showPassword ? (
                        <EyeOff className="text-lime-700 h-4 w-4" />
                      ) : (
                        <Eye className="text-lime-700 h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-lime-600 hover:bg-lime-700"
            disabled={loading}>
            {loading ? (
              <LoaderCircle className="w-4 h-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
