import { supabaseAdmin } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

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

    const fileName = input.fileKey.replace("training_data/", "");
    const { data: fileUrl } = await supabaseAdmin.storage
      .from("training_data")
      .createSignedUrl(fileName, 3600);

    if (!fileUrl?.signedUrl) {
      throw new Error("Failed to get the file URL");
    }

    console.log("FileUrl", fileUrl);
    console.log("Input", input);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
