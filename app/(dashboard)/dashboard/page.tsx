import QuickActions from "@/components/dashboard/QuickActions";
import RecentImages from "@/components/dashboard/RecentImages";
import RecentModels from "@/components/dashboard/RecentModels";
import StatsCard from "@/components/dashboard/StatsCard";
import Gallery from "@/components/my-generations/Gallery";
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
      <h1 className="text-3xl font-bold">Dashboard</h1>

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
        <RecentImages images={images?.slice(0, 3) ?? []} />
        <div className="h-full flex flex-col space-y-6">
          <QuickActions />
          <RecentModels models={models ?? []} />
        </div>
      </div>

      <p className="text-sm text-lime-500/50">
        Here you can view all the images you have generated.
      </p>
      <span>Click on an image to view it.</span>
      <Gallery images={images || []} />
    </section>
  );
}
