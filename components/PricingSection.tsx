"use client";
import React, { useState } from "react";
import HoverButton from "./ui/hover-button";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Tables } from "@/database.types";

type Product = Tables<"products">;
type Price = Tables<"prices">;

interface ProductWithPrices extends Product {
  prices: Price[];
}

interface PricingProps {
  products: ProductWithPrices[];
}

const PricingSection = ({ products }: PricingProps) => {
  const [billingInterval, setBillingInterval] = useState("month");
  console.log(products);
  return (
    <section className="container mx-auto min-h-screen">
      <div className="flex flex-col text-center items-center justify-center gap-4">
        <HoverButton />
        <h1 className="-mt-4 text-5xl bg-transparent text-center bg-gradient-to-r from-lime-500 via-lime-800 via-40% to-lime-400 bg-clip-text text-transparent font-bold tracking-tight">
          That suits you best
        </h1>
        <p className="text-base max-w-3xl text-lime-200">
          You can educate a model, or get a custom model for your business. Also
          you can automate your social media posts and images with our scraping
          and automation tools. You can also{" "}
          <strong className="uppercase bg-lime-700 text-white px-2 py-1 rounded-md">
            upgrade
          </strong>{" "}
          or downgrade
          <strong className="uppercase bg-lime-700 text-white px-2 py-1 rounded-md">
            anytime
          </strong>
          .
        </p>
      </div>
      <div className="flex gap-4 py-12 items-center justify-center">
        <Label
          htmlFor="pricing-switch"
          className="font-semibold tracking-tight text-lg">
          Monthly
        </Label>
        <Switch
          checked={billingInterval === "year"}
          onCheckedChange={(checked) =>
            setBillingInterval(checked ? "year" : "month")
          }
          id="pricing-switch"
          className="data-[state=checked]:bg-lime-700 data-[state=unchecked]:bg-lime-500 data-[state=checked]:border-lime-500 data-[state=unchecked]:border-lime-500 data-[state=checked]:ring-4 data-[state=checked]:ring-lime-900"
        />
        <Label
          htmlFor="pricing-switch"
          className="font-semibold tracking-tight text-lg">
          Yearly
        </Label>
      </div>
    </section>
  );
};
export default PricingSection;
