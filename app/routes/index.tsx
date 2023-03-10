import { useEventSource } from "~/lib/use-event-source";

export default function Component() {
  const time = useEventSource("/sse/time", { event: "time" });

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>SSE</h1>
      <div>
        {time && (
          <time dateTime={time}>
            {new Date(time).toLocaleTimeString("en", {
              minute: "2-digit",
              second: "2-digit",
              hour: "2-digit",
            })}
          </time>
        )}
      </div>
    </div>
  );
}
