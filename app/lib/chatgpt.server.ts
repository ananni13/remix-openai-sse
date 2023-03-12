import { serverError } from "remix-utils";

export type ChatGPTRequest = {
  systemPrompt?: string | null;
  userPrompt?: string | null;
};

export async function chatGPT(
  options: ChatGPTRequest
): Promise<ChatCompletionsResponse> {
  return (await fetchChatGPT(options)).json();
}

export async function streamChatGPT(options: ChatGPTRequest) {
  return fetchChatGPT({ ...options, stream: true });
}

async function fetchChatGPT({
  userPrompt = "Hello!",
  systemPrompt = "",
  stream = false,
}: ChatGPTRequest & { stream?: boolean }) {
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
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 1024,
      temperature: 0.8,
      stream,
    }),
  });
}
