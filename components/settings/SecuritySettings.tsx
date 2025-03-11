"use client";
import { User } from "@supabase/supabase-js";
import React, { useId } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import toast from "react-hot-toast";
import { resetPassword } from "@/utils/auth/auth-actions";

interface SecuritySettingsProps {
  user: User;
}

const SecuritySettings = ({ user }: SecuritySettingsProps) => {
  const toastId = useId();

  async function handleChangePassword() {
    toast.loading("Sending password reset email...", {
      id: toastId,
    });

    try {
      const { success, error } = await resetPassword({
        email: user?.email || "",
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
    <Card className="bg-transparent border-lime-500/10 text-white">
      <CardHeader>
        <CardTitle className="px-4">Security Settings</CardTitle>
        <CardDescription className="px-4 py-1 text-lime-200">
          Reset your password here.
        </CardDescription>
        <div className="px-4">
          <button
            type="submit"
            onClick={handleChangePassword}
            className="bg-transparent mx-auto hover:bg-lime-500/50 border text-white px-4 py-2 rounded-md">
            Send Reset Email
          </button>
        </div>
      </CardHeader>
    </Card>
  );
};

export default SecuritySettings;
