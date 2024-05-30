import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";
import { createRoute } from "honox/factory";

export default createRoute(async (c) => {
  const adapter = new PrismaD1(c.env.DB);
  const prisma = new PrismaClient({ adapter });

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
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => c.redirect("/admin/posts/create", 301)}
        >
          新規作成
        </button>
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
          <tr>
            <td class="border px-4 py-2">サンプル記事</td>
            <td class="border px-4 py-2">カテゴリ1</td>
            <td class="border px-4 py-2">タグ1,タグ2</td>
            <td class="border px-4 py-2">
              <button class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                編集
              </button>
              <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                削除
              </button>
            </td>
          </tr>
          {posts.map((post) => (
            <tr key={post.id}>
              <td class="border px-4 py-2">{post.title}</td>
              <td class="border px-4 py-2">{post.category?.name}</td>
              <td class="border px-4 py-2">
                {post.tags.map((tag) => tag.name).join(",")}
              </td>
              <td class="border px-4 py-2">
                <button
                  class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  onClick={() => c.redirect(`/admin/posts/${post.id}`)}
                >
                  編集
                </button>
                <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>,
    { title: "Dashboard" }
  );
});
