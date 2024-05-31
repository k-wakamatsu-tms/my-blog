import dayjs from "dayjs/esm";
import relativeTime from "dayjs/esm/plugin/relativeTime";
import { createRoute } from "honox/factory";
import { FC } from "hono/jsx";
import { PrismaD1 } from "@prisma/adapter-d1";
import { Post, PrismaClient } from "@prisma/client";

dayjs.extend(relativeTime);

const ArticleList: FC<{ article: Post }> = ({ article }) => {
  return (
    <div class={"mb-4 p-4 border rounded-lg shadow-sm bg-white"}>
      <a
        href={`articles/${article.id}`}
        class={"text-blue-500 hover:text-blue-700"}
      >
        {article.title}
      </a>
      <p class="text-gray-600">{article.createdAt.toString()}</p>
    </div>
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
        <p class="text-gray-700 mb-6">
          大阪在住のエンジニアです。主に技術系のことやたまに日常のことなどを発信していきます。
          <br />
          メインはWeb系
        </p>
      </section>
      <section class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">最新の投稿</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((article) => (
            <ArticleList article={article} />
          ))}
        </div>
      </section>
    </>
  );
});
