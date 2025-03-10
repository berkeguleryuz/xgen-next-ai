import { supabaseAdmin } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function validateUserCredits(userId: string) {
  const { data: userCredits, error } = await supabaseAdmin
    .from("credits")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    throw new Error("Failed to get user credits");
  }

  const credits = userCredits?.model_training_count || 0;

  if (credits <= 0) {
    throw new Error("You have no model training credits");
  }

  return credits;
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error("REPLICATE_API_TOKEN is not set");
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const input = {
      fileKey: formData.get("fileKey") as string,
      modelName: formData.get("modelName") as string,
      gender: formData.get("gender") as string,
    };

    if (!input.fileKey || !input.modelName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const oldCredits = await validateUserCredits(user.id);

    const fileName = input.fileKey.replace("training_data/", "");
    const { data: fileUrl } = await supabaseAdmin.storage
      .from("training_data")
      .createSignedUrl(fileName, 3600);

    if (!fileUrl?.signedUrl) {
      throw new Error("Failed to get the file URL");
    }

    // console.log("FileUrl", fileUrl);
    // console.log("Input", input);

    const modelId = `${user.id}_${Date.now()}_${input.modelName
      .toLowerCase()
      .replace(" ", "-")}`;

    await replicate.models.create("berkeguleryuz", modelId, {
      visibility: "private",
      hardware: "gpu-t4",
    });

    const training = await replicate.trainings.create(
      "ostris",
      "flux-dev-lora-trainer",
      "b6af14222e6bd9be257cbc1ea4afda3cd0503e1133083b9d1de0364d8568e6ef",
      {
        destination: `berkeguleryuz/${modelId}`,
        input: {
          steps: 1000,
          resolution: "1024",
          input_images: fileUrl.signedUrl,
          trigger_word: "CLDRN",
        },
        webhook: `${
          process.env.NEXT_PUBLIC_APP_URL
        }/api/webhooks/training?userId=${
          user.id
        }&modelName=${encodeURIComponent(
          input.modelName,
        )}&fileName=${encodeURIComponent(fileName)}`,
        webhook_events_filter: ["completed"],
      },
    );

    await supabaseAdmin.from("models").insert({
      model_id: modelId,
      user_id: user.id,
      model_name: input.modelName,
      gender: input.gender,
      training_status: training.status,
      trigger_word: "CLDRN",
      training_steps: 1000,
      training_id: training.id,
    });

    await supabaseAdmin
      .from("credits")
      .update({ model_training_count: oldCredits - 1 })
      .eq("user_id", user?.id);

    // console.log("Training", training);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
