import { zodResolver } from "@hookform/resolvers/zod";
import React, { useId } from "react";
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
import toast from "react-hot-toast";
import { resetPassword } from "@/utils/auth/auth-actions";

const formSchema = z.object({
  email: z.string().email({
    message: "Please use a valid email address.",
  }),
});

const ResetPasswordForm = ({ className }: { className?: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const toastId = useId();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Sending password reset email...", {
      id: toastId,
    });

    try {
      const { success, error } = await resetPassword({
        email: values?.email || "",
      });
      if (!success) {
        toast.error(error, {
          id: toastId,
        });
      } else {
        toast.success("Password reset email sent", {
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
    <div className={cn("grid gap-6 ", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          <Button
            type="submit"
            className="w-full bg-lime-600 hover:bg-lime-700">
            Reset Password
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
