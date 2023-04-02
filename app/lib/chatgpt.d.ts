import {
  type ChatCompletionResponseMessageRoleEnum,
  type CreateChatCompletionResponseChoicesInner,
} from "openai";

declare module "openai" {
  // Add missing `delta` field for streaming responses
  interface CreateChatCompletionResponseChoicesInner {
    delta?: {
      role?: ChatCompletionResponseMessageRoleEnum;
      content?: string;
    };
  }
}

export default CreateChatCompletionResponseChoicesInner;
