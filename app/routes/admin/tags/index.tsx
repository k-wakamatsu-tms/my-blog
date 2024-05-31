import { zValidator } from "@hono/zod-validator";
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";
import { createRoute } from "honox/factory";
import { z } from "zod";
import { createPrismaClient } from "../../../lib/prisma";

export default createRoute(async (c) => {
  const prisma = await createPrismaClient(c.env.DB);

  const tags = await prisma.tag.findMany();

  return c.render(
    <div class="p-6">
      <h2 class="text-2xl font-bold">タグマスタ</h2>
      <form method="POST" class="mt-6">
        <div class="mb-4">
          <label class="block text-gray-700">タグ名</label>
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
            <th class="py-2">タグ名</th>
            <th class="py-2">アクション</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr key={tag.id}>
              <td class="border px-4 py-2">{tag.name}</td>
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
      return c.redirect("/admin/tags", 303);
    }

    const prisma = await createPrismaClient(c.env.DB);

    await prisma.tag.create({
      data: {
        name: result.data.name,
      },
    });

    return c.redirect("/admin/tags", 303);
  })
);
