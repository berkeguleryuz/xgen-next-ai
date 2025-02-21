"use server";

import { createGroq } from "@ai-sdk/groq";
import { generateObject } from "ai";
import { z } from "zod";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generatePost(
  input: string,
  temperature: number,
  model: string,
) {
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

  return { data };
}
