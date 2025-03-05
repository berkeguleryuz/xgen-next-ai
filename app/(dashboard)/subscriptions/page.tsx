import React from "react";
import {
  getProducts,
  getSubscription,
  getUser,
} from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import PlanSummary from "@/components/subscriptions/PlanSummary";

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

  return (
    <section className="container mx-auto grid p-4 gap-4 overflow-hidden min-h-screen">
      <div className="">
        <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
        <p className="text-sm text-lime-200">
          Here you can see all the subscriptions you have.
        </p>

        <div className="grid gap-10 mt-5">
          <PlanSummary
            subscription={subscription}
            user={user}
            products={products || []}
          />
        </div>
      </div>
    </section>
  );
};

export default SubscriptionsPage;
