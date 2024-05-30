<div class="p-6">
  <h2 class="text-2xl font-bold">カテゴリーマスタ</h2>
  <form class="mt-6">
    <div class="mb-4">
      <label class="block text-gray-700">カテゴリ名</label>
      <input
        type="text"
        class="w-full p-2 border border-gray-300 rounded mt-2"
      />
    </div>
    <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      追加
    </button>
  </form>
  <table class="min-w-full bg-white mt-6">
    <thead>
      <tr>
        <th class="py-2">カテゴリ名</th>
        <th class="py-2">アクション</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border px-4 py-2">カテゴリ1</td>
        <td class="border px-4 py-2">
          <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
            削除
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>;
