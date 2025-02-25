import Gallery from "@/components/my-generations/Gallery";
import { getImages } from "@/utils/image-actions";

export default async function DashboardPage() {
  const { data: images } = await getImages();

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-sm text-lime-500/50">
        Here you can view all the images you have generated.
      </p>
      <span>Click on an image to view it.</span>
      <Gallery images={images || []} />
    </div>
  );
}
