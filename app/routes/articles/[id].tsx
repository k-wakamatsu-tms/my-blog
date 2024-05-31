import dayjs from "dayjs/esm";
import relativeTime from "dayjs/esm/plugin/relativeTime";
import { createRoute } from "honox/factory";
import { createPrismaClient } from "../../lib/prisma";
import { parseMarkdown } from "../../utils";
import Time from "../../components/time";

dayjs.extend(relativeTime);

export default createRoute(async (c) => {
  const { id } = c.req.param();
  const prisma = await createPrismaClient(c.env.DB);
  const article = await prisma.post.findUnique({
    where: {
      id: id,
    },
    include: {
      tags: true,
      category: true,
    },
  });

  if (!article) {
    return c.notFound();
  }

  const parsedContent = parseMarkdown(article.content);

  return c.render(
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <article>
        <header class="mb-6">
          <h2 class="text-3xl font-bold mb-2">{article.title}</h2>
          <Time created_at={article.createdAt.toString()}>
            {dayjs(article.createdAt).format("YYYY-MM-DD HH:mm:ss")}
          </Time>
          <div class="mt-4">
            <span class="bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
              カテゴリ: {article.category.name}
            </span>
            {article.tags.map((tag) => (
              <span class="bg-green-200 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                {tag.name}
              </span>
            ))}
          </div>
        </header>
        <section>
          <div
            id="contents"
            class="prose prose-lg"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          ></div>
        </section>
      </article>
    </div>
  );
});
