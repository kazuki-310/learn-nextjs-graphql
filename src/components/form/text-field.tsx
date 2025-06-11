import { useFieldContext } from '@/hooks/form-context';

export function TextField({
  label,
  type = 'text',
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  const field = useFieldContext<string>();
  const fieldId = field.name;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={fieldId}>{label}</label>
      <input
        id={fieldId}
        name={field.name}
        type={type}
        placeholder={placeholder}
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
