import { css } from "hono/css";
import { createRoute } from "honox/factory";

const classForm = css`
  background-color: #fff;
  padding: 1.5rem;
  border-width: 1px;
  border-radius: 0.75rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
`;

const classDivInputs = css`
  row-gap: 0.5rem;
  flex-direction: column;
  display: flex;
`;

const classDivButton = css`
  justify-content: flex-end;
  display: flex;
  margin-top: 1rem;
`;

const classInputTitle = css`
  padding: 0.5rem;
  border-color: rgb(209 213 219);
  border-width: 1px;
  border-radius: 0.375rem;
  width: 100%;
`;

const grayColor = css`
  color: rgb(107 114 128);
`;

const classTextRed = css`
  color: rgb(239 68 68);
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

// app/routes/nested/index.tsx
export default createRoute((c) => {
  return c.render(<div>Content</div>, { title: "Dashboard" });
});
