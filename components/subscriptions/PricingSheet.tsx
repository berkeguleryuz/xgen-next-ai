import { Tables } from "@/database.types";
import { User } from "@supabase/supabase-js";
import React from "react";
import HoverButton from "../ui/hover-button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import PricingDialog from "./PricingDialog";

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

interface PricingSheetProps {
  subscription: SubscriptionWithProduct | null;
  user: User | null;
  products: ProductWithPrices[] | null;
}

const PricingSheet = ({ user, products, subscription }: PricingSheetProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild >
        <div className="relative">
          <HoverButton />
        </div>
      </DialogTrigger>
      <DialogTitle />
      <DialogContent className="max-w-5xl bg-black/90 border-lime-800/50 border-2 ">
        <PricingDialog
          products={products ?? []}
          user={user}
          subscription={subscription}
          mostPopularProduct="xPro"
        />
      </DialogContent>
    </Dialog>
  );
};

export default PricingSheet;
