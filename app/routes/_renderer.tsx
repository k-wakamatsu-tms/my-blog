import { Style, css } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";
import { Script } from "honox/server";
import Header from "../components/header";

const bodyClass = css`
  background-color: rgb(229 231 235);
`;

const containerClass = css`
  max-width: 760px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-top: 3rem;
  padding-bottom: 5rem;

  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 640px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

export default jsxRenderer(({ children, title }) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <Script src="/app/client.ts" async />
        <Style />
      </head>
      <body class={bodyClass}>
        <div class={containerClass}>
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
});
