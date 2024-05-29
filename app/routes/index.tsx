import dayjs from "dayjs/esm";
import relativeTime from "dayjs/esm/plugin/relativeTime";
import { css } from "hono/css";
import { createRoute } from "honox/factory";
import { FC } from "hono/jsx";
import Title from "../components/title";
import Time from "../components/time";
import { PrismaD1 } from "@prisma/adapter-d1";
import { Post, PrismaClient } from "@prisma/client";

dayjs.extend(relativeTime);

const ArticleList: FC<{ article: Post }> = ({ article }) => {
  const listClass = css`
    background-color: #fff;
    padding: 1.5rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  `;

  const titleClass = css`
    color: rgb(31 41 55);
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2rem;
    margin-bottom: 0.5rem;
  `;

  return (
    <li class={listClass}>
      <a href={`articles/${article.id}`}>
        <h3 class={titleClass}>{article.title}</h3>
        <Time created_at={article.createdAt.toString()}>
          {dayjs(article.createdAt).fromNow()}
        </Time>
      </a>
    </li>
  );
};

const className = css`
  font-family: sans-serif;
`;

export default createRoute(async (c) => {
  const adapter = new PrismaD1(c.env.DB);
  const prisma = new PrismaClient({ adapter });

  const posts = await prisma.post.findMany();

  return c.render(
    <>
      <section>
        <div>
          <Title>Posts</Title>
        </div>
        <ul>
          {posts.map((article) => (
            <ArticleList article={article} />
          ))}
        </ul>
      </section>
    </>
  );
});
