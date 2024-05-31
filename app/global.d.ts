import {} from "hono";

type Head = {
  title?: string;
  hasScripts?: boolean;
};

declare module "hono" {
  interface Env {
    Variables: {};
    Bindings: { DB: D1Database };
  }
  interface ContextRenderer {
    (content: string | Promise<string>, head?: Head):
      | Response
      | Promise<Response>;
  }
}
