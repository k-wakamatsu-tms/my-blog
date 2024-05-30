import { createRoute } from "honox/factory";
import { createPrismaClient } from "../../../lib/prisma";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

export default createRoute(async (c) => {
  const prisma = await createPrismaClient(c.env.DB);

  const categories = await prisma.category.findMany();

  return c.render(
    <div class="p-6">
      <h2 class="text-2xl font-bold">カテゴリーマスタ</h2>
      <form method="POST" class="mt-6">
        <div class="mb-4">
          <label class="block text-gray-700">カテゴリ名</label>
          <input
            type="text"
            name="name"
            class="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          追加
        </button>
      </form>
      <table class="min-w-full bg-white mt-6">
        <thead>
          <tr>
            <th class="py-2">カテゴリ名</th>
            <th class="py-2">アクション</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td class="border px-4 py-2">{category.name}</td>
              <td class="border px-4 py-2">
                <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

const schema = z.object({
  name: z.string().nonempty(),
});

export const POST = createRoute(
  zValidator("form", schema, async (result, c) => {
    console.log(result);
    if (!result.success) {
      return c.redirect("/admin/categories", 303);
    }

    const prisma = await createPrismaClient(c.env.DB);

    await prisma.category.create({
      data: {
        name: result.data.name,
      },
    });

    return c.redirect("/admin/categories", 303);
  })
);
