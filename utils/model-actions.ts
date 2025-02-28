"use server";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";

export async function getPresignedStorageUrl(filePath: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: urlData, error } = await supabaseAdmin.storage
    .from("training_data")
    .createSignedUploadUrl(`${user?.id}/${new Date().getTime()}_${filePath}`);

  return {
    signedUrl: urlData?.signedUrl || "",
    error: error?.message || null,
  };
}

export async function fetchModels() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error, count } = await supabase
    .from("models")
    .select("*", {
      count: "exact",
    })
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  return {
    error: error?.message || null,
    success: !error,
    data: data || null,
    count: count || 0,
  };
}

export async function deleteModel(
  id: number,
  model_id: string,
  model_version: string,
) {
  const supabase = await createClient();

  if (model_version) {
    try {
      const res = await fetch(
        `https://api.replicate.com/v1/models/berkeguleryuz/${model_id}/versions/${model_version}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
          },
        },
      );
      if (!res.ok) {
        throw new Error("Failed to delete model version");
      }
    } catch (error) {
      console.error("Error deleting model version", error);

      return {
        error: "Failed to delete model version",
        success: false,
      };
    }
  }

  if (model_id) {
    try {
      const res = await fetch(
        `https://api.replicate.com/v1/models/berkeguleryuz/${model_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
          },
        },
      );
      if (!res.ok) {
        console.log(res);
        throw new Error("Failed to delete model " + model_id);
      }
    } catch (error) {
      console.error("Error deleting model", error);

      return {
        error: "Failed to delete model " + model_id,
        success: false,
      };
    }
  }

  const { error } = await supabase.from("models").delete().eq("id", id);

  return {
    error: error?.message,
    success: !error,
  };
}
