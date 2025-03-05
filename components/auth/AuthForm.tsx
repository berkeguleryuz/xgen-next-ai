"use client";
import React, { Fragment, useState } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import LoginForm from "@/components/auth/LoginForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import SignupForm from "@/components/auth/SignupForm";
import { ArrowLeftIcon } from "lucide-react";

const AuthForm = ({ state }: { state: string }) => {
  const [mode, setMode] = useState(state);
  return (
    <div className="flex flex-col">
      <fieldset className="grid gap-4 rounded-[8px] border bg-lime-500/10 border-lime-500/10 p-4">
        <legend className="text-3xl font-semibold tracking-wide">
          {mode === "reset"
            ? "Reset Password"
            : mode === "login"
            ? "Login"
            : "Sign Up"}
        </legend>
        <p className="text-sm text-neutral-300">
          {mode === "reset"
            ? "Enter your email to reset your password"
            : mode === "login"
            ? "Enter your email and password to login"
            : "Enter your email and password to sign up"}
        </p>

        {mode === "login" && (
          <Fragment>
            <LoginForm />
            <div className="flex flex-row justify-between">
              <button
                onClick={() => setMode("reset")}
                className="text-sm text-neutral-300 p-0 hover:text-lime-500">
                Need to reset your password?
              </button>
              <button
                onClick={() => setMode("signup")}
                className="text-sm text-neutral-300 p-0 hover:text-lime-500">
                Don&apos;t have an account?
              </button>
            </div>
          </Fragment>
        )}
        {mode === "signup" && (
          <Fragment>
            <SignupForm />
            <p className="text-sm text-neutral-300">
              By signing up, you agree to the{" "}
              <Link href="/terms" className="text-lime-500">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-lime-500">
                Privacy Policy
              </Link>
            </p>
            <Separator className="" />
            <div className="flex flex-row justify-between">
              <button
                onClick={() => setMode("login")}
                className="text-sm text-neutral-300 p-0 hover:text-lime-500">
                Already have an account?
              </button>
            </div>
          </Fragment>
        )}
        {mode === "reset" && (
          <Fragment>
            <ResetPasswordForm />
            <div className="flex flex-row justify-between">
              <button
                onClick={() => setMode("login")}
                className="text-sm text-neutral-300 p-0 hover:text-lime-500 flex gap-2 items-center">
                <ArrowLeftIcon className="w-4 h-4" />
                Back to login
              </button>
            </div>
          </Fragment>
        )}
      </fieldset>
    </div>
  );
};

export default AuthForm;
