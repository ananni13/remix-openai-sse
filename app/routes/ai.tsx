import type { ActionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { badRequest } from "remix-utils";
import { chatGPT } from "~/lib/chatgpt.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const userPrompt = formData.get("prompt");
  const systemPrompt = formData.get("system");

  if (!userPrompt || typeof userPrompt !== "string") {
    throw badRequest({ message: "Bad user prompt" });
  }

  if (systemPrompt && typeof systemPrompt !== "string") {
    throw badRequest({ message: "Bad system prompt" });
  }

  return chatGPT({ userPrompt, systemPrompt });
}

export default function Component() {
  const data = useActionData<typeof action>();

  return (
    <div>
      <h1>AI</h1>
      <Form method="post">
        <div>
          <label htmlFor="system">System Prompt</label>
          <input id="system" name="system" type="text" />
        </div>
        <div>
          <label htmlFor="prompt">User Prompt</label>
          <textarea id="prompt" name="prompt" required minLength={2} />
        </div>
        <div>
          <button>Ask</button>
          <button type="reset">Clear</button>
        </div>
      </Form>
      <div>
        {data?.choices[0]?.message && <p>{data.choices[0].message.content}</p>}
      </div>
    </div>
  );
}
