import dayjs from "dayjs/esm";
import relativeTime from "dayjs/esm/plugin/relativeTime";
import { createRoute } from "honox/factory";
import { FC } from "hono/jsx";
import { PrismaD1 } from "@prisma/adapter-d1";
import { Post, PrismaClient } from "@prisma/client";

dayjs.extend(relativeTime);

const ArticleList: FC<{ article: Post }> = ({ article }) => {
  return (
    <li class={"mb-4"}>
      <a
        href={`articles/${article.id}`}
        class={"text-blue-500 hover:text-blue-700"}
      >
        {article.title}
      </a>
      <p class="text-gray-600">{article.createdAt.toString()}</p>
    </li>
  );
};

export default createRoute(async (c) => {
  const adapter = new PrismaD1(c.env.DB);
  const prisma = new PrismaClient({ adapter });

  const posts = await prisma.post.findMany();

  return c.render(
    <>
      <section class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 class="text-2xl font-bold mb-4">ようこそ！</h1>
        <p class="text-gray-700 mb-6">tech, daily, etc...</p>
        {/* <a href="#" class="text-blue-500 hover:text-blue-700">
        続きを読む...
      </a> */}
      </section>
      <section class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">最新の投稿</h2>
        <ul>
          <li class={"mb-4"}>
            <a href={`articles/`} class={"text-blue-500 hover:text-blue-700"}>
              {"テストタイトル"}
            </a>
            <p class="text-gray-600">{"2024年5月29日"}</p>
          </li>

          {posts.map((article) => (
            <ArticleList article={article} />
          ))}
        </ul>
      </section>
    </>
  );
});
