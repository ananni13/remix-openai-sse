import { useEffect, useState } from "react";
import { useEventSource } from "remix-utils";

export default function Component() {
  const [prompt, setPrompt] = useState<string>("hello");

  return (
    <div>
      <h1>Welcome to Remix-Stream-AI</h1>
      {prompt && <Prompt prompt={prompt} />}
    </div>
  );
}

function Prompt({ prompt }: { prompt: string }) {
  const token = useEventSource(`/sse/ai?prompt=${prompt}`);
  const [message, setMessage] = useState<any[]>([]);
  useEffect(() => {
    if (token && token !== "[DONE]") {
      setMessage((message) => [...message, JSON.parse(token)]);
    }
  }, [token]);

  return (
    <div>
      {message.map((m) => (
        <span>{m.choices[0]?.delta?.content}</span>
      ))}
    </div>
  );
}
