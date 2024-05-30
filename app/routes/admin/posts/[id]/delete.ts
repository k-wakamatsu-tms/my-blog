import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";
import { createRoute } from "honox/factory";
import { createPrismaClient } from "../../../../lib/prisma";

export const POST = createRoute(async (c) => {
  const { id } = c.req.param();
  const prisma = await createPrismaClient(c.env.DB);

  await prisma.post.delete({
    where: {
      id: id,
    },
  });

  return c.redirect("/admin/", 303);
});
