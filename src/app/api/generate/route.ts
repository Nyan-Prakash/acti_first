import { streamText } from "ai";
import { openai } from "@/lib/ai/client";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/ai/prompts";
import { generateSchema } from "@/lib/validators";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = generateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const result = streamText({
      model: openai("gpt-4o"),
      system: SYSTEM_PROMPT,
      prompt: buildUserPrompt(parsed.data),
      maxOutputTokens: 4096,
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch {
    return NextResponse.json(
      { error: "Failed to generate activities" },
      { status: 500 }
    );
  }
}
