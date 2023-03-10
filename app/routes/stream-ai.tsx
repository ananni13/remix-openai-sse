import { Fragment, useEffect, useState } from "react";
import { useEventSource } from "~/lib/use-event-source";

export default function Component() {
  const [inputPrompt, setInputPrompt] = useState<string>("");

  const [prompt, setPrompt] = useState<string>("");

  return (
    <div>
      <h1>Stream AI</h1>
      <label htmlFor="prompt">Prompt</label>
      <textarea
        id="prompt"
        name="prompt"
        value={inputPrompt}
        onChange={(e) => setInputPrompt(e.target.value)}
        required
        minLength={2}
      />
      <button onClick={() => setPrompt(inputPrompt)}>Ask</button>
      <button
        onClick={() => {
          setPrompt("");
          setInputPrompt("");
        }}
      >
        Clear
      </button>
      {prompt && <Prompt prompt={prompt} />}
    </div>
  );
}

function Prompt({ prompt }: { prompt: string }) {
  const token = useEventSource(`/sse/ai?prompt=${prompt}`, {
    closeOnData: "[DONE]",
  });
  const [message, setMessage] = useState<any[]>([]);
  useEffect(() => {
    if (token) {
      setMessage((message) => message.concat(JSON.parse(token)));
    }
  }, [token]);

  return (
    <div style={{ whiteSpace: "pre-wrap" }}>
      <p>
        {message.map((m, i) => (
          <Fragment key={i}>{m.choices[0]?.delta?.content}</Fragment>
        ))}
      </p>
    </div>
  );
}
