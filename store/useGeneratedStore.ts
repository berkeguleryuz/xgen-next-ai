import { create } from "zustand";
import { imageGenerationFormSchema } from "@/components/image-generation/ImageUserInput";
import { z } from "zod";
import { generateImageAction, storeImages } from "@/utils/image-actions";
import toast from "react-hot-toast";

interface GeneratedStore {
  loading: boolean;
  images: Array<{ url: string }>;
  error: string | null;
  generateImage: (
    values: z.infer<typeof imageGenerationFormSchema>,
  ) => Promise<void>;
}

const useGeneratedStore = create<GeneratedStore>((set) => ({
  loading: false,
  images: [],
  error: null,

  generateImage: async (values: z.infer<typeof imageGenerationFormSchema>) => {
    set({ loading: true, error: null });

    const toastId = toast.loading("Generating image...");

    try {
      const { error, success, data } = await generateImageAction(values);

      if (!success) {
        set({ error: error, loading: false });
        return;
      }

      console.log("Data", data);

      const dataWithUrl = data.map((url: string) => {
        return {
          url,
          ...values,
        };
      });
      set({ images: dataWithUrl, loading: false });
      toast.success("Image generated successfully", { id: toastId });

      await storeImages(dataWithUrl);
      toast.success("Image stored successfully", { id: toastId });
    } catch (error) {
      console.error(error);
      set({ error: "An error occurred. Please try again", loading: false });
      toast.error("An error occurred. Please try again", { id: toastId });
    }
  },
}));

export default useGeneratedStore;
