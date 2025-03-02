/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Database } from "@/database.types";
import { imageGenerationFormSchema } from "@/components/image-generation/ImageUserInput";
import { z } from "zod";
import Replicate from "replicate";
import { createClient } from "@/utils/supabase/server";
import { imageMeta } from "image-meta";
import { randomUUID } from "crypto";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  useFileOutput: false,
});

interface ImageResponse {
  error: string | null;
  success: boolean;
  data: any | null;
}

export async function generateImageAction(
  input: z.infer<typeof imageGenerationFormSchema>,
): Promise<ImageResponse> {
  if (!process.env.REPLICATE_API_TOKEN) {
    return {
      error: "REPLICATE_API_TOKEN is not set",
      success: false,
      data: null,
    };
  }

  const modelInput = input.model.startsWith("berkeguleryuz/")
    ? {
        model: `dev`,
        prompt: input.prompt,
        lora_scale: 1,
        guidance: input.guidance,
        aspect_ratio: input.aspect_ratio,
        num_images: input.num_outputs,
        output_format: input.output_format,
        output_quality: 80,
        prompt_strength: 0.8,
        num_inference_steps: input.num_inference_steps,
        extra_lora_scale: 0,
      }
    : {
        prompt: input.prompt,
        go_fast: true,
        guidance: input.guidance,
        megapixels: "1",
        aspect_ratio: input.aspect_ratio,
        num_images: input.num_outputs,
        output_format: input.output_format,
        output_quality: 80,
        prompt_strength: 0.8,
        num_inference_steps: input.num_inference_steps,
      };

  try {
    const output = await replicate.run(input.model as `${string}/${string}`, {
      input: modelInput,
    });

    console.log("Output", output);

    return {
      error: null,
      success: true,
      data: output,
    };
  } catch (error: any) {
    return {
      error: error.message || "Failed to generate image",
      success: false,
      data: null,
    };
  }
}

export async function imgUrlToBlob(url: string) {
  const response = fetch(url);
  const blob = (await response).blob();

  return (await blob).arrayBuffer();
}

type storeImageInput = {
  url: string;
} & Database["public"]["Tables"]["generated_images"]["Insert"];

export async function storeImages(data: storeImageInput[]) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "Unauthorized",
      success: false,
      data: null,
    };
  }

  const uploadResults = [];

  for (const img of data) {
    const arrayBuffer = await imgUrlToBlob(img.url);
    const { width, height, type } = imageMeta(new Uint8Array(arrayBuffer));

    const fileName = `image_${randomUUID()}.${type}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: storageError } = await supabase.storage
      .from("generated_images")
      .upload(filePath, arrayBuffer, {
        contentType: `image/${type}`,
        cacheControl: "3600",
        upsert: false,
      });

    if (storageError) {
      uploadResults.push({
        fileName,
        error: storageError.message,
        success: false,
        data: null,
      });
      continue;
    }

    const { data: dbData, error: dbError } = await supabase
      .from("generated_images")
      .insert([
        {
          user_id: user.id,
          model: img.model,
          prompt: img.prompt,
          aspect_ratio: img.aspect_ratio,
          guidance: img.guidance,
          num_inference_steps: img.num_inference_steps,
          output_format: img.output_format,
          image_name: fileName,
          width,
          height,
        },
      ])
      .select();

    if (dbError) {
      uploadResults.push({
        fileName,
        error: dbError.message,
        success: !dbError,
        data: dbData || null,
      });
      continue;
    }
  }

  console.log("Upload Results", uploadResults);

  return {
    error: null,
    success: true,
    data: { results: uploadResults },
  };
}

export async function getImages(limit?: number) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "Unauthorized",
      success: false,
      data: null,
    };
  }

  let query = supabase
    .from("generated_images")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    return {
      error: error.message || "Failed to get images",
      success: false,
      data: null,
    };
  }

  const imageWithUrls = await Promise.all(
    data.map(
      async (
        image: Database["public"]["Tables"]["generated_images"]["Row"],
      ) => {
        const { data } = await supabase.storage
          .from("generated_images")
          .createSignedUrl(`${user.id}/${image.image_name}`, 3600);

        return {
          ...image,
          url: data?.signedUrl,
        };
      },
    ),
  );

  return {
    error: null,
    success: true,
    data: imageWithUrls || null,
  };
}

export async function deleteImage(id: number) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "Unauthorized",
      success: false,
      data: null,
    };
  }

  const { data: imageData, error: fetchError } = await supabase
    .from("generated_images")
    .select("image_name")
    .eq("id", id)
    .single();

  if (fetchError) {
    return {
      error: fetchError.message,
      success: false,
      data: null,
    };
  }

  if (!imageData || !imageData.image_name) {
    return {
      error: "Image not found",
      success: false,
      data: null,
    };
  }

  const { data, error } = await supabase
    .from("generated_images")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    return {
      error: error.message,
      success: false,
      data: null,
    };
  }

  const storagePath = `${user.id}/${imageData.image_name}`;
  const { error: storageError } = await supabase.storage
    .from("generated_images")
    .remove([storagePath]);

  if (storageError) {
    console.error("Failed to delete from storage:", storageError);
    return {
      error: "Image deleted from database but failed to delete from storage",
      success: true,
      data: data,
    };
  }

  return { error: null, success: true, data: data };
}
