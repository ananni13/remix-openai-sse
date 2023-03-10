type BaseChatCompletionsChoice = {
  index: number;
  finish_reason: "stop" | "length" | "content_filter" | null;
};

type ChatCompletionsChoice = BaseChatCompletionsChoice & {
  message: {
    role: "system" | "user" | "assistant";
    content: string;
  };
};

type ChunkChatCompletionsChoice = BaseChatCompletionsChoice & {
  delta: {
    content?: string;
  };
};

type BaseChatCompletionsResponse<Choice> = {
  id: string;
  created: number;
  model: string;
  choices: Choice[];
};

type ChatCompletionsResponse =
  BaseChatCompletionsResponse<ChatCompletionsChoice> & {
    object: "chat.completion";
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  };

type ChunkChatCompletionsResponse =
  BaseChatCompletionsResponse<ChunkChatCompletionsChoice> & {
    object: "chat.completion.chunk";
  };
