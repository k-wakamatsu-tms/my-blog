import { Style, css } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";
import { Script } from "honox/server";

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
      <body class="flex">
        <aside class="w-64 h-screen bg-gray-800 text-white">
          <div class="p-6">
            <h1 class="text-xl font-bold">管理画面</h1>
          </div>
          <nav>
            <ul>
              <li>
                <a href="/admin" class="block p-4 hover:bg-gray-700">
                  記事一覧
                </a>
              </li>
              <li>
                <a href="/admin/categories" class="block p-4 hover:bg-gray-700">
                  カテゴリーマスタ
                </a>
              </li>
              <li>
                <a href="/admin/tags" class="block p-4 hover:bg-gray-700">
                  タグマスタ
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <main class={"flex-1 p-6 bg-gray-100"}>{children}</main>
      </body>
    </html>
  );
});
