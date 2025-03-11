import AccountForm from "@/components/settings/AccountForm";
import SecuritySettings from "@/components/settings/SecuritySettings";
import { getUser } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const SettingsPage = async () => {
  const supabase = await createClient();
  const user = await getUser(supabase);

  if (!user) {
    redirect("/login");
  }

  return (
    <section className="min-h-screen">
      <div className="flex flex-col gap-4 p-4 mt-2">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-sm text-lime-200">
          Here you can manage your account settings.
        </p>
      </div>
      <fieldset className="grid gap-4 max-w-2xl rounded-[8px] border bg-lime-500/10 border-lime-500/10 p-4">
        <legend className="text-3xl text-center font-semibold tracking-wide">
          Account
        </legend>
        <AccountForm user={user} />
        <SecuritySettings user={user} />
      </fieldset>
    </section>
  );
};

export default SettingsPage;
