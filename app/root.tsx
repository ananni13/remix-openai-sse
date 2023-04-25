import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import type { PropsWithChildren } from "react";
import styles from "~/styles/global.css";

export const meta: V2_MetaFunction = () => [
  {
    title: "New Remix App",
  },
];

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  return (
    <Document>
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <nav>
          <ul>
            <li>
              <Link to="/">SSE</Link>
            </li>
            <li>
              <Link to="/ai">AI</Link>
            </li>
            <li>
              <Link to="/stream-ai">Stream AI</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </Document>
  );
}

function Document({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <Document>
      <div>
        {isRouteErrorResponse(error) ? (
          <>
            <p>Oh no! - Something went wrong! 😔</p>
            <p>
              {error.status}
              {error.statusText && " - " + error.statusText}
            </p>
          </>
        ) : (
          <>
            <p>Oops! - An unexpected error occured! 😱</p>
            <p>{error instanceof Error ? error.message : "Unknown Error"}</p>
          </>
        )}
      </div>
    </Document>
  );
}
