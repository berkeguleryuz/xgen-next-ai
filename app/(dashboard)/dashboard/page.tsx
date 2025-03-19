import QuickActions from "@/components/dashboard/QuickActions";
import RecentImages from "@/components/dashboard/RecentImages";
import RecentModels from "@/components/dashboard/RecentModels";
import StatsCard from "@/components/dashboard/StatsCard";
import { getCredits } from "@/utils/credit-actions";
import { getImages } from "@/utils/image-actions";
import { fetchModels } from "@/utils/model-actions";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: models, count: modelCount } = await fetchModels();
  const { data: credits } = await getCredits();
  const { data: images } = await getImages();

  const imageCount = images?.length || 0;
  return (
    <section className="p-4 min-h-screen">
      <h1 className="text-5xl font-bold">Dashboard</h1>

      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">
          Welcome back, {user?.user_metadata?.full_name}
        </h2>
      </div>

      <StatsCard
        modelCount={modelCount}
        imageCount={imageCount}
        credits={credits}
      />

      <div className="grid gap-6 grid-cols-4 mt-4">
        <RecentImages images={images?.slice(0, 6) ?? []} />
      </div>
      <div className="h-full w-full flex md:flex-row flex-col gap-4 mt-4">
        <QuickActions />
        <RecentModels models={models ?? []} />
      </div>
    </section>
  );
}
