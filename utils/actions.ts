"use server";

import { createGroq } from "@ai-sdk/groq";
import { generateObject } from "ai";
import { z } from "zod";
import { createClient } from "./supabase/server";
import { supabaseAdmin } from "./supabase/admin";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
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

  const credits = userCredits?.post_generation_count || 0;

  if (credits <= 0) {
    throw new Error("You have no post generation credits");
  }

  return credits;
}

export async function generatePost(
  input: string,
  temperature: number,
  model: string,
) {
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

  try {
    const oldCredits = await validateUserCredits(user.id);

    const { object: data } = await generateObject({
      model: groq(model),
      system: `You need to generate 4 different versions of a linkedin post for the prompt. Use emojis if the user has requested them.`,
      prompt: input,
      maxTokens: 1024,
      temperature: temperature,
      schema: z.object({
        data: z.array(
          z.object({
            post: z.string().describe("Add generated post here"),
          }),
        ),
      }),
    });

    await supabaseAdmin
      .from("credits")
      .update({ post_generation_count: oldCredits - 1 })
      .eq("user_id", user.id);

    return { data, success: true, error: null };
  } catch (error) {
    console.error("Post generation error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to generate post",
      success: false,
      data: null,
    };
  }
}
