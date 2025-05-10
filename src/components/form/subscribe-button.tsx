import { useFormContext } from '@/hooks/form-context';
import clsx from 'clsx';

export function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <button
          type="submit"
          className={clsx(
            'my-auto w-[200px] rounded-md p-2 text-white',
            canSubmit ? 'bg-blue-500 hover:bg-blue-600' : 'cursor-not-allowed bg-gray-400',
          )}
          disabled={isSubmitting || !canSubmit}
        >
          {label}
        </button>
      )}
    </form.Subscribe>
  );
}
