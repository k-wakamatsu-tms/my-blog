import { zValidator } from "@hono/zod-validator";
import { PrismaD1 } from "@prisma/adapter-d1";
import { Category, PrismaClient, Tag } from "@prisma/client";
import { FC } from "hono/jsx";
import { createRoute } from "honox/factory";
import { z } from "zod";

type Data = {
  error?: Record<string, string[] | undefined>;
  title?: string;
  content?: string;
  category?: string;
  tags?: string[];
};

const Page: FC<{ categories: Category[]; tags: Tag[]; data?: Data }> = ({
  categories,
  tags,
  data,
}) => {
  return (
    <div class="p-6">
      <h2 class="text-2xl font-bold">記事編集</h2>
      <form method="POST" class="mt-6">
        <div class="mb-4">
          <div>
            <label class="block text-gray-700">タイトル</label>
            <input
              type="text"
              name="title"
              value={data?.title}
              class="w-full p-2 border border-gray-300 rounded mt-2"
            />
            {data?.error?.title && <p>{data.error.title}</p>}
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">カテゴリ</label>
            <select
              name="category"
              class="w-full p-2 border border-gray-300 rounded mt-2"
            >
              <option value="">選択してください</option>
              {categories.map((category) => (
                <option value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">タグ</label>
            <select
              name="tags"
              multiple
              class="w-full p-2 border border-gray-300 rounded mt-2"
            >
              {tags.map((tag) => (
                <option value={tag.id}>{tag.name}</option>
              ))}
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">本文</label>
            <textarea
              name="content"
              class="w-full p-2 border border-gray-300 rounded mt-2"
              rows={10}
            >
              {data?.content}
            </textarea>
            {data?.error?.content && <p>{data.error.content}</p>}
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            保存
          </button>
        </div>
      </form>
    </div>
  );
};

export default createRoute(async (c) => {
  const { id } = c.req.param();
  const adapter = new PrismaD1(c.env.DB);
  const prisma = new PrismaClient({ adapter });
  const categories = await prisma.category.findMany();
  const tags = await prisma.tag.findMany();

  if (id === "create") {
    return c.render(<Page categories={categories} tags={tags} />);
  } else {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    if (!post) {
      return c.redirect("/admin", 303);
    }
    return c.render(
      <Page
        categories={categories}
        tags={tags}
        data={{ title: post.title, content: post.content }}
      />
    );
  }
});

const schema = z.object({
  title: z.string().min(3).max(255),
  content: z.string().min(3),
  category: z.string(),
  tags: z.array(z.string()),
});

export const POST = createRoute(
  zValidator("form", schema, async (result, c) => {
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });
    const categories = await prisma.category.findMany();
    const tags = await prisma.tag.findMany();

    if (!result.success) {
      const { title, content } = result.data;
      return c.render(
        <Page
          categories={categories}
          tags={tags}
          data={{ title, content, error: result.error.flatten().fieldErrors }}
        />
      );
    }
  }),
  async (c) => {
    const { title, content, category, tags } = c.req.valid("form");
    const adapter = new PrismaD1(c.env.DB);
    const prisma = new PrismaClient({ adapter });

    await prisma.post.create({
      data: {
        title,
        content,
        categoryId: category,
        tags: {
          connect: tags.map((tag) => ({ id: tag })),
        },
      },
    });
    return c.redirect("/", 303);
  }
);
