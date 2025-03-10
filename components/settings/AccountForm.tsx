"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { User } from "@supabase/supabase-js";
import React, { useId } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
import toast from "react-hot-toast";
import { updateProfile } from "@/utils/auth/auth-actions";

interface AccountFormProps {
  user: User;
}

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50, {
      message: "Username must be less than 50 characters.",
    }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
});

const AccountForm = ({ user }: AccountFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.user_metadata.full_name,
      email: user?.email,
    },
  });

  const toastId = useId();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Updating profile...", {
      id: toastId,
    });

    try {
      const { success, error } = await updateProfile(values);
      if (!success) {
        toast.error(error, {
          id: toastId,
        });
      } else {
        toast.success("Profile updated successfully", {
          id: toastId,
        });
      }
    } catch (error: unknown) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
        {
          id: toastId,
        },
      );
    }
  }

  return (
    <Card className="bg-transparent border-lime-500/10 text-white">
      <CardHeader>
        <CardTitle className="px-4">Manage Your Account</CardTitle>
        <CardContent className="flex flex-col gap-4 p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={user?.user_metadata.full_name}
                        {...field}
                        className="border-none active:border-none active:ring-0 focus:border-none focus:ring-0 focus:ring-offset-0 active:ring-offset-0 active"
                      />
                    </FormControl>
                    <FormDescription className="text-sm text-lime-200">
                      This is your public display name.
                    </FormDescription>
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
                        disabled
                        placeholder={user?.email}
                        {...field}
                        className="cursor-not-allowed"
                      />
                    </FormControl>
                    <FormDescription className="text-sm text-lime-200">
                      Your email address is used for login and notifications.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                className="bg-transparent hover:bg-lime-500/50 border text-white px-4 py-2 rounded-md">
                Update Profile
              </button>
            </form>
          </Form>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default AccountForm;
