import { Tables } from "@/database.types";
import { User } from "@supabase/supabase-js";
import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import PricingSheet from "./PricingSheet";
import { format } from "date-fns";

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
  credits: Tables<"credits"> | null;
}

const PlanSummary = ({
  subscription,
  user,
  products,
  credits,
}: PlanSummaryProps) => {
  if (!credits || !subscription || subscription.status !== "active") {
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

  const {
    products: subscriptionProduct,
    unit_amount,
    currency,
  } = subscription?.prices || {};

  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency!,
    minimumFractionDigits: 0,
  }).format((unit_amount || 0) / 100);

  const imageGenerationCount = credits.image_generation_count ?? 0;
  const postGenerationCount = credits.post_generation_count ?? 0;
  const modelTrainingCount = credits.model_training_count ?? 0;

  const maxImageGenerationCount = credits?.max_image_generation_count ?? 0;
  const maxPostGenerationCount = credits?.max_post_generation_count ?? 0;
  const maxModelTrainingCount = credits?.max_model_training_count ?? 0;

  return (
    <Card className="max-w-4xl bg-transparent text-white p-0 border-lime-100">
      <CardContent className="p-4 px-4">
        <div className="flex items-center justify-between text-2xl font-bold tracking-tight">
          <span>Plan Summary</span>
          <Badge className="bg-lime-500 hover:bg-lime-600 text-black items-center justify-center">
            {subscriptionProduct?.name} Plan
          </Badge>
        </div>

        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-5 flex flex-col pr-12 gap-1">
            <div className="flex text-sm items-center justify-between">
              <span>Image Generation Credits</span>
              <span className="font-medium">
                {imageGenerationCount} remaining
              </span>
            </div>
            <div>
              <Progress
                value={(imageGenerationCount / maxImageGenerationCount) * 100}
                className="w-full bg-lime-300 "
              />
            </div>

            <div className="flex text-sm items-center justify-between">
              <span>Post Credits</span>
              <span className="font-medium">
                {postGenerationCount} remaining
              </span>
            </div>
            <div>
              <Progress
                value={(postGenerationCount / maxPostGenerationCount) * 100}
                className="w-full bg-lime-300 "
              />
            </div>

            <div className="flex text-sm items-center justify-between">
              <span>Model Training Credits</span>
              <span className="font-medium">
                {modelTrainingCount} remaining
              </span>
            </div>
            <div>
              <Progress
                value={(modelTrainingCount / maxModelTrainingCount) * 100}
                className="w-full bg-lime-300 "
              />
            </div>
          </div>
          <div className="col-span-3 items-center justify-between gap-4 flex flex-row flex-wrap">
            <div className="flex flex-col pb-0">
              <div className="text-sm font-normal">Price / Month</div>
              <div className="flex-1 pt-1 text-sm font-bold">{priceString}</div>
            </div>

            <div className="">
              <div className="text-sm font-normal">Next Billing Date</div>
              <div className="flex-1 pt-1 text-sm font-bold">
                {format(
                  new Date(subscription.current_period_end),
                  "MMM d, yyyy",
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-4 border-lime-100">
        <div className="flex flex-col mt-4 pb-0">
          <div className="text-2xl font-bold tracking-tight text-left">
            Included in Plan
          </div>
          <div className="flex-1 pt-1 text-sm font-bold">
            <div className="flex flex-row text-center items-center gap-2">
              <div className="w-8 flex justify-center">
                <span className="text-2xl text-lime-200">✿</span>
              </div>
              <p>
                {maxImageGenerationCount} Image Generations
              </p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="w-8 flex justify-center">
                <span className="text-2xl text-lime-200">♻︎</span>
              </div>
              <p>
                {maxPostGenerationCount} Post Generations
              </p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="w-8 flex justify-center">
                <span className="text-2xl text-lime-200">♽</span>
              </div>
              <p>
                {maxModelTrainingCount} Model Training
              </p>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PlanSummary;
