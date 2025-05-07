export function Spinner() {
  return (
    <div className="flex justify-center py-6" aria-label="読み込み中">
      <div className="h-6 w-6 animate-spin rounded-full border-3 border-blue-500 border-t-transparent" />
    </div>
  );
}
