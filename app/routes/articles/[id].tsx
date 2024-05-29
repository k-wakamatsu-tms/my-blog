import { css } from "hono/css";
import { createRoute } from "honox/factory";

const className = css`
  font-family: sans-serif;
`;

export default createRoute((c) => {
  const { id } = c.req.param();
  return c.render(
    <div>
      <h1 class={className}>Article: {id}</h1>
      <p>This is an article.</p>
    </div>
  );
});
