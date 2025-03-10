import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import crypto from "crypto";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-templates/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  try {
    const body = await req.json();
    const url = new URL(req.url);

    const userId = url.searchParams.get("userId") ?? "";
    const modelName = url.searchParams.get("modelName") ?? "";
    const fileName = url.searchParams.get("fileName") ?? "";

    const id = req.headers.get("webhook-id") ?? "";
    const timestamp = req.headers.get("webhook-timestamp") ?? "";
    const webhookSignature = req.headers.get("webhook-signature") ?? "";

    const signedContent = `${id}.${timestamp}.${JSON.stringify(body)}`;

    const secret = await replicate.webhooks.default.secret.get();

    const secretBytes = Buffer.from(secret.key.split("_")[1], "base64");
    const signature = crypto
      .createHmac("sha256", secretBytes)
      .update(signedContent)
      .digest("base64");
    console.log(signature);

    const expectedSignatures = webhookSignature
      .split(" ")
      .map((sig) => sig.split(",")[1]);
    const isValid = expectedSignatures.some(
      (expectedSignature) => expectedSignature === signature,
    );
    console.log(isValid);

    if (!isValid) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    const { data: user, error: userError } =
      await supabaseAdmin.auth.admin.getUserById(userId);

    if (userError || !user) {
      return new NextResponse("User not found!", { status: 401 });
    }

    const userEmail = user.user?.email ?? "";
    const username = user.user?.user_metadata.full_name ?? "";

    if (body.status === "succeeded") {
      await resend.emails.send({
        from: "xGen <berke@clodron.com>",
        to: [userEmail],
        // from: "onboarding@resend.dev",
        // to: "berke@clodron.com",
        subject: "Model Training Completed",
        react: await EmailTemplate({
          userName: username,
          message: "Your model has been trained successfully!",
        }),
      });

      await supabaseAdmin
        .from("models")
        .update({
          training_status: body.status,
          training_time: body.metrics?.total_time ?? null,
          version: body.output?.version.split(":")[1] ?? null,
        })
        .eq("user_id", userId)
        .eq("model_name", modelName);
    } else {
      await resend.emails.send({
        from: "xGen <berke@clodron.com>",
        to: [userEmail],
        // from: "onboarding@resend.dev",
        // to: "berke@clodron.com",
        subject: `Model Training ${body.status}`,
        react: await EmailTemplate({
          userName: username,
          message: `Your model training has been ${body.status}`,
        }),
      });

      await supabaseAdmin
        .from("models")
        .update({
          training_status: body.status,
        })
        .eq("user_id", userId)
        .eq("model_name", modelName);

      const { data: oldCredits, error } = await supabaseAdmin
        .from("credits")
        .select("model_training_count")
        .eq("user_id", userId)
        .single();

      if (error) {
        throw new Error("Failed to get user credits");
      }

      await supabaseAdmin
        .from("credits")
        .update({ model_training_count: oldCredits?.model_training_count - 1 })
        .eq("user_id", userId)
        .single();
    }
    await supabaseAdmin.storage.from("training_data").remove([`${fileName}`]);

    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook (training) error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
