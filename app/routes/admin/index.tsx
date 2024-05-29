import { createRoute } from "honox/factory";

// app/routes/nested/index.tsx
export default createRoute((c) => {
  return c.render(<div>Content</div>, { title: "Dashboard" });
});
