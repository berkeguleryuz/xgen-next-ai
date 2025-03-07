import React from "react";
import {
  getProducts,
  getSubscription,
  getUser,
} from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import PlanSummary from "@/components/subscriptions/PlanSummary";
import { getCredits } from "@/utils/credit-actions";
import PricingDialog from "@/components/subscriptions/PricingDialog";

const SubscriptionsPage = async () => {
  const supabase = await createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase),
  ]);

  if (!user) {
    return redirect("/login");
  }

  const { data: credits } = await getCredits();

  return (
    <section className="container mx-auto grid p-4 gap-4 overflow-hidden min-h-screen">
      <div className="">
        <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
        <p className="text-sm text-lime-200">
          Here you can see all the subscriptions you have.
        </p>

        <div className="grid gap-10 mt-5">
          <PlanSummary
            credits={credits}
            subscription={subscription}
            user={user}
            products={products || []}
          />
        </div>
      </div>
      <div className="mt-4 flex">
          <PricingDialog
            activePlan={true}
            subscription={subscription}
            user={user}
            products={products || []}
            activeProduct={subscription?.prices?.products?.name.toLowerCase() || ""}
          />
      </div>
    </section>
  );
};

export default SubscriptionsPage;
