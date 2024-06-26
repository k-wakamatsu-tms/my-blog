import { Style, css } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";
import { Script } from "honox/server";
import Header from "../components/header";
import Footer from "../components/footer";

export default jsxRenderer(({ children, title }) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        {import.meta.env.PROD ? (
          <link href="/static/assets/style.css" rel="stylesheet" />
        ) : (
          <link href="/app/style.css" rel="stylesheet" />
        )}
        <Script src="/app/client.ts" async />
        <Style />
      </head>
      <body class={"bg-gray-100 text-gray-800 flex flex-col min-h-screen"}>
        <Header />
        <main class={"container mx-auto px-6 py-8 flex-grow"}>{children}</main>
        <Footer />
      </body>
    </html>
  );
});
