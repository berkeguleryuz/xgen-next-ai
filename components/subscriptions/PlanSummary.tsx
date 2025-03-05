import { Tables } from "@/database.types";
import { User } from "@supabase/supabase-js";
import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import PricingSheet from "./PricingSheet";

type Product = Tables<"products"> & {
  index?: number;
};
type Price = Tables<"prices">;
type Subscription = Tables<"subscriptions">;

interface ProductWithPrices extends Product {
  prices: Price[];
}

interface PriceWithProduct extends Price {
  products: Product | null;
}

interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface PlanSummaryProps {
  subscription: SubscriptionWithProduct | null;
  user: User | null;
  products: ProductWithPrices[] | null;
}

const PlanSummary = ({ subscription, user, products }: PlanSummaryProps) => {
  if (!subscription || subscription.status !== "active") {
    return (
      <Card className="max-w-2xl bg-transparent text-white p-0 border-lime-100">
        <CardContent className="p-4 px-4">
          <div className="flex items-center justify-between text-2xl font-bold tracking-tight">
            <span>Plan Summary</span>
            <Badge className="bg-lime-500 text-black items-center justify-center">
              No Plan
            </Badge>
          </div>

          <div className="grid grid-cols-8 gap-4">
            <div className="col-span-5 flex flex-col pr-12 gap-1">
              <div className="flex text-sm items-center justify-between">
                <span>Image Generation Credits</span>
                <span className="font-medium">0 remaining</span>
              </div>
              <div>
                <Progress value={50} className="w-full bg-lime-300 " />
              </div>

              <div className="flex text-sm items-center justify-between">
                <span>Post Credits</span>
                <span className="font-medium">0 remaining</span>
              </div>
              <div>
                <Progress value={50} className="w-full bg-lime-300 " />
              </div>
            </div>
            <div className="col-span-full flex flex-col pr-12">
              Please upgrade to a plan to continue generating images and posts.
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <span className="flex ml-auto flex-row">
            <PricingSheet
              user={user}
              products={products ?? []}
              subscription={subscription}
            />
          </span>
        </CardFooter>
      </Card>
    );
  }

  console.log(subscription);
  const {
    products: subscriptionProduct,
    unit_amount,
    currency,
  } = subscription?.prices;

  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format((unit_amount || 0) / 100);
  return (
    <Card className="max-w-2xl bg-transparent text-white p-0 border-lime-100">
      <CardContent className="p-4 px-4">
        <div className="flex items-center justify-between text-2xl font-bold tracking-tight">
          <span>Plan Summary</span>
          <Badge className="bg-lime-500 text-black items-center justify-center">
            {subscriptionProduct?.name} Plan
          </Badge>
        </div>

        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-5 flex flex-col pr-12 gap-1">
            <div className="flex text-sm items-center justify-between">
              <span>Image Generation Credits</span>
              <span className="font-medium">0 remaining</span>
            </div>
            <div>
              <Progress value={50} className="w-full bg-lime-300 " />
            </div>

            <div className="flex text-sm items-center justify-between">
              <span>Post Credits</span>
              <span className="font-medium">0 remaining</span>
            </div>
            <div>
              <Progress value={50} className="w-full bg-lime-300 " />
            </div>
          </div>
          <div className="col-span-full flex flex-col pr-12">
            Please upgrade to a plan to continue generating images and posts.
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <span className="flex ml-auto flex-row">
          <PricingSheet
            user={user}
            products={products ?? []}
            subscription={subscription}
          />
        </span>
      </CardFooter>
    </Card>
  );
};

export default PlanSummary;
