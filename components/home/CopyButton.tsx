"use client";
import React, { useState } from "react";
import { LucideCopy } from "lucide-react";
import toast from "react-hot-toast";

const CopyButton = ({ text }: { text: string }) => {
  const [label, setLabel] = useState("Copy");

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (error) {
      console.error("Failed to copy text: ", error);
      toast.error("Failed to copy text");
    }
  };

  const handleClick = () => {
    copyToClipboard(text);
    setLabel("Copied");
    setTimeout(() => {
      setLabel("Copy");
    }, 2000);
  };

  return (
    <button
      className="text-sm flex gap-2 font-semibold h-auto my-0 border-lime-500/10 px-2 border-t-0 rounded-b-lg pb-0.5 text-lime-200 hover:text-lime-500 bg-lime-800 mx-auto items-center text-center"
      onClick={handleClick}>
      <LucideCopy className="w-3 h-3 text-center" />
      <p className="text-sm font-semibold">{label}</p>
    </button>
  );
};

export default CopyButton;
