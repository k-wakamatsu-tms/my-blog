import { useRef } from "hono/jsx";

export default function DeleteButton({ articleId }: { articleId: string }) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleClickDelete = () => {
    dialogRef.current?.showModal();
  };

  return (
    <div>
      <dialog ref={dialogRef}>
        <form method="POST" action={`/posts/${articleId}/delete`}>
          <p>本当に削除しますか？</p>
          <div>
            <button
              value={"cancel"}
              formmethod="dialog"
              class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              キャンセル
            </button>
            <button
              type="submit"
              class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              削除
            </button>
          </div>
        </form>
      </dialog>
      <button
        type="button"
        class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        onClick={handleClickDelete}
      >
        削除
      </button>
    </div>
  );
}
