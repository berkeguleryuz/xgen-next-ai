"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

interface AuthResponse {
  error: null | string;
  success: boolean;
  data: unknown | null;
}

export async function signUp(formData: FormData): Promise<AuthResponse> {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: formData.get("full_name") as string,
      },
    },
  };

  async function signUpNewUser() {
    const { data: signUpData, error } = await supabase.auth.signUp(data);

    return {
      error: error?.message || "Something went wrong [signUpNewUser]",
      success: !error,
      data: signUpData || null,
    };
  }

  return signUpNewUser();
}

export async function login(formData: FormData): Promise<AuthResponse> {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: signInData, error } = await supabase.auth.signInWithPassword(
    data,
  );

  return {
    error: error?.message || "Something went wrong [login]",
    success: !error,
    data: signInData || null,
  };
}

export async function logout(): Promise<void> {
  const supabase = await createClient();

  await supabase.auth.signOut();
  redirect("/login");
}
