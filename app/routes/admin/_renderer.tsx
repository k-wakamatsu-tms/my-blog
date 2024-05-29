import { jsxRenderer } from "hono/jsx-renderer";

export default jsxRenderer(({ children, Layout, title }) => {
  return (
    <Layout title={title}>
      {/* Pass the title prop to the parent renderer */}
      {children}
    </Layout>
  );
});
