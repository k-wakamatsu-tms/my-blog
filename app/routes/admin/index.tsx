import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";
import { createRoute } from "honox/factory";
import { createPrismaClient } from "../../lib/prisma";
import DeleteButton from "../../islands/deleteButton";

export default createRoute(async (c) => {
  const prisma = await createPrismaClient(c.env.DB);

  const posts = await prisma.post.findMany({
    include: {
      category: true,
      tags: true,
    },
  });

  return c.render(
    <div class="p-6">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold">記事一覧</h2>
        <a
          href="/admin/posts/create"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          新規作成
        </a>
      </div>
      <table class="min-w-full bg-white mt-6">
        <thead>
          <tr>
            <th class="py-2">タイトル</th>
            <th class="py-2">カテゴリ</th>
            <th class="py-2">タグ</th>
            <th class="py-2">アクション</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td class="border px-4 py-2">{post.title}</td>
              <td class="border px-4 py-2">{post.category?.name}</td>
              <td class="border px-4 py-2">
                {post.tags.map((tag) => tag.name).join(",")}
              </td>
              <td class="border px-4 py-2">
                <a
                  href={`/admin/posts/${post.id}`}
                  class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  編集
                </a>
                <DeleteButton articleId={post.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>,
    { title: "Dashboard" }
  );
});
