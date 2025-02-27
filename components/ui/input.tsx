import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  const autocompleteValue =
    type === "password"
      ? props.autoComplete || "current-password"
      : props.autoComplete;

  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-300",
        "[&:-webkit-autofill]:transition-[background-color] [&:-webkit-autofill]:duration-[5000s] [&:-webkit-autofill]:ease-in-out",
        "[&:-webkit-autofill]:[transition-delay:9999s]",
        "[&:-webkit-autofill]:!bg-lime-500/10",
        "[&:-webkit-autofill]:!text-white",
        "[&:-webkit-autofill:hover]:!bg-lime-500/10",
        "[&:-webkit-autofill:focus]:!bg-lime-500/10",
        "[&:-webkit-autofill:active]:!bg-lime-500/10",
        "bg-lime-500/10 text-white",
        "[&:-webkit-autofill]:shadow-lime-500/10",
        "[&:-webkit-autofill]:text-white",
        "[&:-webkit-autofill]:[-webkit-text-fill-color:white]",
        "[&:-webkit-autofill]:font-bold",
        "file:bg-lime-200 file:text-black file:px-3 file:py-1 file:rounded file:mr-3 file:hover:bg-lime-300 file:transition-colors file:cursor-pointer",
        className,
      )}
      ref={ref}
      autoComplete={autocompleteValue}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
