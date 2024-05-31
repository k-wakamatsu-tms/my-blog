import { FC } from "hono/jsx";

const Header: FC = () => {
  return (
    <header class="bg-white shadow">
      <div class="container mx-auto px-6 py-4 flex justify-between items-center">
        <div class="text-xl font-semibold text-gray-900">Kouta-W Blog</div>
        <nav class="flex space-x-4">
          <a href="/" class="text-gray-600 hover:text-gray-900">
            Home
          </a>
          <a href="/about" class="text-gray-600 hover:text-gray-900">
            About
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
