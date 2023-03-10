import { serverError } from "remix-utils";

export async function chatGPT({
  prompt = "Hello!",
  stream = false,
}: {
  prompt?: string | null;
  stream?: boolean;
}) {
  if (
    !process.env.OPENAI_API_KEY ||
    typeof process.env.OPENAI_API_KEY !== "string"
  ) {
    throw serverError({ message: "Missing OpenAI API key" });
  }

  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 256,
      stream,
    }),
  });
}
