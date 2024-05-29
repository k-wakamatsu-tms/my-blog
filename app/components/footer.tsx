import { FC } from "hono/jsx";

const Footer: FC = () => {
  return (
    <footer class="bg-white shadow mt-8">
      <div class="container mx-auto px-6 py-4 text-center text-gray-600">
        &copy; 2024 kouta-w.com. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
