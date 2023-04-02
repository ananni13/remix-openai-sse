import {
  Configuration,
  OpenAIApi,
  type CreateChatCompletionRequest,
  type CreateChatCompletionResponse,
} from "openai";

if (
  !process.env.OPENAI_API_KEY ||
  typeof process.env.OPENAI_API_KEY !== "string"
) {
  throw new Error("Missing OpenAI API key");
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

type ChatGPTRequest = {
  systemPrompt?: string | null;
  userPrompt?: string | null;
  stream?: boolean;
};

async function fetchChatGPT({
  userPrompt,
  systemPrompt,
  stream = false,
}: ChatGPTRequest) {
  const body: CreateChatCompletionRequest = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemPrompt ?? "",
      },
      { role: "user", content: userPrompt ?? "Hello!" },
    ],
    max_tokens: 1024,
    temperature: 0.8,
    stream,
  };

  if (!stream) {
    return (await openai.createChatCompletion(body)).data;
  } else {
    // openai node package doesn't fully support streaming sse responses,
    // just use standard fetch here
    return fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(body),
    }) as unknown as CreateChatCompletionResponse;
  }
}

export { type ChatGPTRequest, fetchChatGPT };
