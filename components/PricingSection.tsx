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
      <div className="grid grid-cols-3 place-items-center mx-auto gap-8 items-center justify-center">
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

            return (
              <div
                key={product.id}
                className="relative min-h-[400px] w-full border border-lime-700 rounded-lg p-1 shadow-sm h-fit overflow-hidden bg-gradient-to-r from-lime-900 via-lime-700 to-lime-900">
                <div className="flex min-h-[400px] w-full flex-col p-6 border shadow-3xl rounded-lg bg-[#0A0A0A] border-lime-700 border-dotted z-10">
                  <h2 className="text-2xl flex items-center gap-2 leading-6 font-semibold text-lime-200 justify-between">
                    {product.name}

                    {product?.name?.toLocaleLowerCase() ===
                      mostPopularProduct?.toLocaleLowerCase() && (
                      <Badge className="bg-lime-700 text-white">
                        Most Popular
                      </Badge>
                    )}
                  </h2>
                  <div className="flex items-center font-semibold gap-2">
                    <p className="text-lime-200 text-5xl">{priceString}</p> /
                    <p className="text-lime-200 text-xl">{billingInterval}</p>
                  </div>
                  <p className="min-h-[60px]">{product.description}</p>
                  <Link
                    href={`/login?mode=signup`}
                    className={cn(
                      "flex items-center justify-center bg-lime-600 border border-lime-700 hover:bg-lime-700 transition-all duration-300 text-white px-4 py-2 rounded-md",
                      product.name === mostPopularProduct &&
                        "bg-lime-700 hover:bg-lime-600",
                    )}>
                    Subscribe
                  </Link>
                  <div className="pt-6 pb-8 px-6">
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
