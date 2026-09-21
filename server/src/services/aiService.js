import { env } from "../config/env.js";
import { getBug } from "./bugService.js";

const schema = {
  type: "object",
  properties: {
    hint: { type: "string" },
    nextStep: { type: "string" },
    confidence: { type: "number", minimum: 0, maximum: 1 }
  },
  required: ["hint", "nextStep", "confidence"],
  additionalProperties: false
};

function mockHint(bug) {
  if (bug.id === 1) {
    return {
      hint: "Inspect the dependency array of the effect.",
      nextStep: "Compare every value used inside the effect with the dependency array.",
      confidence: 0.9
    };
  }

  if (bug.id === 2) {
    return {
      hint: "Look at the HTTP status returned after creation.",
      nextStep: "Check which status code communicates successful resource creation.",
      confidence: 0.94
    };
  }

  return {
    hint: "Trace what happens when the awaited operation rejects.",
    nextStep: "Make sure the rejection reaches the application's central error handler.",
    confidence: 0.88
  };
}

function parseStructuredOutput(text) {
  const cleaned = text.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  const parsed = JSON.parse(cleaned);

  if (
    typeof parsed.hint !== "string" ||
    typeof parsed.nextStep !== "string" ||
    typeof parsed.confidence !== "number"
  ) {
    throw new Error("AI returned an invalid structured response.");
  }

  return {
    hint: parsed.hint,
    nextStep: parsed.nextStep,
    confidence: Math.max(0, Math.min(1, parsed.confidence))
  };
}

export async function getAiHint({ bugId, question }) {
  const bug = await getBug(bugId);

  // Safe local fallback means the project works without a paid AI key.
  if (env.aiProvider !== "openai-compatible" || !env.openAiApiKey || !env.openAiModel) {
    return {
      provider: "mock",
      ...mockHint(bug)
    };
  }

  const prompt = [
    "You are a debugging mentor.",
    "Do not reveal the complete final fix.",
    "Give a small hint that helps the learner reason about the bug.",
    "Return ONLY valid JSON matching this schema:",
    JSON.stringify(schema),
    "",
    `Problem: ${bug.title}`,
    `Description: ${bug.description}`,
    `Broken code:\n${bug.brokenCode}`,
    `Expected behavior: ${bug.expectedBehavior}`,
    `Learner question: ${question}`
  ].join("\n");

  const response = await fetch(`${env.openAiBaseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.openAiApiKey}`
    },
    body: JSON.stringify({
      model: env.openAiModel,
      temperature: 0.2,
      messages: [
        { role: "system", content: "You are a precise debugging mentor." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    const body = await response.text();
    const error = new Error(`AI provider returned ${response.status}: ${body.slice(0, 200)}`);
    error.statusCode = 502;
    error.code = "AI_PROVIDER_ERROR";
    throw error;
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;

  if (!text) {
    const error = new Error("AI provider returned no content.");
    error.statusCode = 502;
    error.code = "AI_EMPTY_RESPONSE";
    throw error;
  }

  return {
    provider: "openai-compatible",
    ...parseStructuredOutput(text)
  };
}
