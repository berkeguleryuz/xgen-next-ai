"use client";
import React, { useState } from "react";
import HoverButton from "../ui/hover-button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Tables } from "@/database.types";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import { usePathname, useRouter } from "next/navigation";
import { checkoutWithStripe, createStripePortal } from "@/utils/stripe/server";
import { getErrorRedirect } from "@/utils/helpers";
import { getStripe } from "@/utils/stripe/client";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

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

interface PricingDialogProps {
  subscription: SubscriptionWithProduct | null;
  user: User | null;
  products: ProductWithPrices[] | null;
  mostPopularProduct?: string;
  activePlan?: boolean;
  activeProduct?: string;
}

const renderPricingButton = ({
  subscription,
  user,
  product,
  price,
  mostPopularProduct,
  handleStripeCheckout,
  handleStripePortalRequest,
}: {
  subscription: SubscriptionWithProduct | null;
  user: User | null;
  product: ProductWithPrices;
  price: Price;
  mostPopularProduct: string;
  handleStripeCheckout: (price: Price) => Promise<void>;
  handleStripePortalRequest: () => Promise<void>;
}) => {
  if (
    user &&
    subscription &&
    subscription?.prices?.products?.name?.toLowerCase() ===
      product.name?.toLowerCase()
  ) {
    return (
      <button
        onClick={() => handleStripePortalRequest()}
        className={cn(
          "flex items-center justify-center bg-lime-600 border border-lime-700 hover:bg-lime-700 transition-all duration-300 text-white px-4 py-2 rounded-md",
          product.name === mostPopularProduct &&
            "bg-lime-500 hover:bg-lime-600 font-semibold",
        )}>
        Manage Subscription
      </button>
    );
  }

  if (user && subscription) {
    return (
      <button
        onClick={() => handleStripePortalRequest()}
        className={cn(
          "flex items-center justify-center bg-transparent border border-lime-700 hover:bg-lime-700 transition-all duration-300 text-white px-4 py-2 rounded-md",
          product.name === mostPopularProduct &&
            "bg-lime-500 hover:bg-lime-600 font-semibold",
        )}>
        Switch Plan
      </button>
    );
  }

  

  if (user && !subscription) {
    return (
      <button
        onClick={() => handleStripeCheckout(price)}
        className={cn(
          "flex items-center justify-center bg-lime-600 border border-lime-700 hover:bg-lime-700 transition-all duration-300 text-white px-4 py-2 rounded-md",
          product.name === mostPopularProduct &&
            "bg-lime-500 hover:bg-lime-600 font-semibold",
        )}>
        Subscribe
      </button>
    );
  }
};

const PricingDialog = ({
  user,
  products,
  mostPopularProduct = "",
  subscription,
  activePlan = false,
  activeProduct = "",
}: PricingDialogProps) => {
  const [billingInterval, setBillingInterval] = useState("month");
  const router = useRouter();
  const currentPath = usePathname();

  const handleStripeCheckout = async (price: Price) => {
    // console.log("Handle stripe checkout", price);
    if (!user) {
      return router.push("/login");
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPath,
    );

    if (errorRedirect) {
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      return router.push(
        getErrorRedirect(
          currentPath,
          "stripe_checkout_error",
          "Failed to create checkout session",
        ),
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });
  };

  const handleStripePortalRequest = async () => {
    toast.custom(() => (
      <div
        className={cn(
          "bg-lime-700 text-white px-4 py-2 rounded-md",
          "animate-in fade-in-0 zoom-in-95 flex items-center justify-center",
        )}>
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        Redirecting to Stripe...
      </div>
    ));
    const redirectUrl = await createStripePortal(currentPath);
    return router.push(redirectUrl);
  };
  return (
    <section className="container mx-auto min-h-[50vh] text-white">
      {!activePlan && (
        <div className="flex flex-col text-center items-center justify-center gap-4">
          <div className="mb-4">
            <HoverButton />
          </div>
          <h1 className="-mt-4 text-5xl bg-transparent text-center bg-gradient-to-r from-lime-500 via-lime-800 via-40% to-lime-400 bg-clip-text text-transparent font-bold tracking-tight">
            That suits you best
          </h1>
          <p className="text-base max-w-2xl text-lime-200">
            You can educate a model, or get a custom model for your business.
            Also you can automate your social media posts and images with our
            scraping and automation tools. You can also{" "}
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
      )}
      <div
        className={cn(
          "flex gap-4 items-center justify-center",
          !activePlan ? "py-12" : "pb-12",
        )}>
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
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center mx-auto gap-8 items-center justify-center">
        {products &&
          products
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
                    product.name === activeProduct.toLowerCase() &&
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
                      activePlan && "min-h-[300px]",
                    )}>
                    <h2 className="text-2xl flex items-center gap-2 leading-6 font-semibold text-lime-200 justify-between">
                      {product.name}

                      {product?.name?.toLocaleLowerCase() ===
                        activeProduct?.toLocaleLowerCase() && (
                        <Badge className="bg-lime-700 text-white hover:bg-lime-600">
                          Active
                        </Badge>
                      )}

                      {product?.name?.toLocaleLowerCase() ===
                        mostPopularProduct?.toLocaleLowerCase() && (
                        <Badge className="bg-lime-700 text-white hover:bg-lime-600">
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
                    <p className="min-h-[85px]">{product.description}</p>
                    {/* <Link
                    href={`/login?state=signup`}
                    className={cn(
                      "flex items-center justify-center bg-lime-600 border border-lime-700 hover:bg-lime-700 transition-all duration-300 text-white px-4 py-2 rounded-md",
                      product.name === mostPopularProduct &&
                        "bg-lime-700 hover:bg-lime-600",
                    )}>
                    Subscribe
                  </Link> */}
                    {renderPricingButton({
                      subscription,
                      user,
                      product,
                      price,
                      mostPopularProduct,
                      handleStripeCheckout,
                      handleStripePortalRequest,
                    })}
                  </div>
                </div>
              );
            })}
      </div>
    </section>
  );
};
export default PricingDialog;
