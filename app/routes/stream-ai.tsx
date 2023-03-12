import { Fragment, useEffect, useState } from "react";
import { useEventSource } from "~/lib/use-event-source";

export default function Component() {
  const [inputPrompt, setInputPrompt] = useState<string>("");

  const [prompt, setPrompt] = useState<string>("");

  return (
    <div>
      <h1>Stream AI</h1>
      <div>
        <label htmlFor="prompt">Prompt</label>
        <textarea
          id="prompt"
          name="prompt"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          required
          minLength={2}
        />
      </div>
      <div>
        <button onClick={() => setPrompt(inputPrompt)}>Ask</button>
        <button
          onClick={() => {
            setPrompt("");
            setInputPrompt("");
          }}
        >
          Clear
        </button>
      </div>
      {prompt && <Prompt prompt={prompt} />}
    </div>
  );
}

function Prompt({ prompt }: { prompt: string }) {
  const { data: chunk, isOpen } = useEventSource(`/sse/ai?prompt=${prompt}`, {
    closeOnData: "[DONE]",
  });

  const [messages, setMessages] = useState<ChunkChatCompletionsResponse[]>([]);

  useEffect(() => {
    if (chunk) {
      setMessages((message) => message.concat(JSON.parse(chunk)));
    }
  }, [chunk]);

  return (
    <div style={{ whiteSpace: "pre-wrap" }}>
      <p>
        {messages.map((m, i) => (
          <Fragment key={i}>{m.choices[0]?.delta?.content}</Fragment>
        ))}
        {isOpen && <span className="cursor"></span>}
      </p>
    </div>
  );
}
