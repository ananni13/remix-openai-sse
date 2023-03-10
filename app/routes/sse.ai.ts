import type { LoaderArgs } from "@remix-run/node";
import { chatGPT } from "~/lib/chatgpt.server";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const prompt = url.searchParams.get("prompt");
  return await chatGPT({ prompt, stream: true });
}
