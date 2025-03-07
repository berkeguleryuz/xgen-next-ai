"use client";
import React, { useState } from "react";
import HoverButton from "./ui/hover-button";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Tables } from "@/database.types";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

type Product = Tables<"products"> & {
  index?: number;
};
type Price = Tables<"prices">;

interface ProductWithPrices extends Product {
  prices: Price[];
}

interface PricingProps {
  products: ProductWithPrices[];
  mostPopularProduct?: string;
}

const PricingSection = ({
  products,
  mostPopularProduct = "xPro",
}: PricingProps) => {
  const [billingInterval, setBillingInterval] = useState("month");
  return (
    <section className="px-1 md:px-0 lg:container mx-auto min-h-screen">
      <div className="flex flex-col text-center items-center justify-center gap-4">
        <div className="mb-4">
          <HoverButton />
        </div>
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
          or downgrade{" "}
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
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center mx-auto gap-4 md:gap-8 items-center justify-center">
        {products
          .sort((a, b) => String(a.id).localeCompare(String(b.id)))
          .map((product) => {
            const price = product?.prices.find(
              (price) => price.interval === billingInterval,
            );
            if (!price) return null;

            const priceString = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: price.currency!,
              minimumFractionDigits: 0,
            }).format((price?.unit_amount || 0) / 100);

            const monthlyPrice = product.prices.find(
              (p) => p.interval === "month",
            );
            const yearlyPrice = product.prices.find(
              (p) => p.interval === "year",
            );
            const savings =
              monthlyPrice?.unit_amount && yearlyPrice?.unit_amount
                ? 100 -
                  ((yearlyPrice.unit_amount / 12) * 100) /
                    monthlyPrice.unit_amount
                : 0;

            const monthlyEquivalent = yearlyPrice?.unit_amount
              ? new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: yearlyPrice.currency!,
                  minimumFractionDigits: 0,
                }).format(yearlyPrice.unit_amount / 12 / 100)
              : null;

            const yearlyTotal = yearlyPrice?.unit_amount
              ? new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: yearlyPrice.currency!,
                  minimumFractionDigits: 0,
                }).format(yearlyPrice.unit_amount / 100)
              : null;

            return (
              <div
                key={product.id}
                className={cn(
                  "group relative min-h-[300px] w-full rounded-2xl p-px shadow-2xl transition-all duration-500",
                  "bg-gradient-to-b from-lime-600/20 to-lime-800/20",
                  "hover:shadow-lime-900/20 hover:shadow-[0_8px_40px]",
                  "before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-b before:from-lime-500/20 before:to-lime-800/20 before:blur-xl before:transition-all before:duration-500",
                  "hover:before:blur-2xl hover:before:from-lime-500/40 hover:before:to-lime-800/40",
                  product.name === mostPopularProduct &&
                    "bg-gradient-to-b from-lime-500/30 to-lime-700/30 shadow-lime-900/30 shadow-[0_8px_40px] md:-translate-y-8",
                )}>
                <div
                  className={cn(
                    "relative h-full rounded-2xl p-8",
                    "bg-gradient-to-b from-black/90 to-black/95 backdrop-blur-sm",
                    "flex flex-col gap-6",
                    "border border-lime-800/50",
                    "transition-all duration-500",
                    "group-hover:border-lime-700/50",
                    product.name === mostPopularProduct &&
                      "from-black/95 to-black/98 border-lime-600/50",
                  )}>
                  <h2 className="text-2xl flex items-center gap-2 leading-6 font-semibold text-lime-200 justify-between">
                    {product.name}

                    {product?.name?.toLocaleLowerCase() ===
                      mostPopularProduct?.toLocaleLowerCase() && (
                      <Badge className="bg-lime-700 text-white">
                        Most Popular
                      </Badge>
                    )}
                  </h2>
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <p className="text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-lime-200 bg-clip-text text-transparent">
                        {billingInterval === "year"
                          ? monthlyEquivalent
                          : priceString}
                      </p>
                      <span className="text-lime-400">/month</span>
                    </div>
                    {billingInterval === "year" && (
                      <div className="space-y-1">
                        <p className="text-sm text-lime-300">
                          {yearlyTotal} billed yearly
                        </p>
                        {savings > 0 && (
                          <p className="text-sm text-lime-500 font-medium">
                            Save {Math.round(savings)}% compared to monthly
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="min-h-[60px]">{product.description}</p>
                  <Link
                    href={`/login?state=signup`}
                    className={cn(
                      "flex items-center justify-center bg-lime-600 border border-lime-700 hover:bg-lime-700 transition-all duration-300 text-white px-4 py-2 rounded-md",
                      product.name === mostPopularProduct &&
                        "bg-lime-700 hover:bg-lime-600",
                    )}>
                    Subscribe
                  </Link>
                  <div className="pt-6 px-6">
                    <ul className="flex flex-col gap-2 min-h-[200px]">
                      {Object.values(product.metadata || {}).map(
                        (feature, index) => {
                          if (feature) {
                            return (
                              <li
                                key={index}
                                className="flex items-center gap-2">
                                <CheckIcon className="w-4 h-4 text-lime-500" />
                                <p className="text-lime-200">{feature}</p>
                              </li>
                            );
                          }
                        },
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};
export default PricingSection;
