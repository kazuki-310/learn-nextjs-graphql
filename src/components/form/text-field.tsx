import { useFieldContext } from '@/hooks/form-context';

export function TextField({ label }: { label: string }) {
  const field = useFieldContext<string>();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label}>{label}</label>
      <input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className="w-[300px] rounded-md border-2 border-gray-300 p-2"
      />

      {field.state.meta.errors && (
        <span className="text-xs text-red-500">{field.state.meta.errors[0]?.message}</span>
      )}
    </div>
  );
}
