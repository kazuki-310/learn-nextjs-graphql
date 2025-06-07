'use client';

import { useRouter } from 'next/navigation';
import { useAppForm } from '@/hooks/use-app-form';
import { Role } from '@/lib/graphql/__generated__';
import { createUser } from '../new/_server-actions/actions';
import { createUserSchema } from '@/schemas/user';

const USER_ROLE_OPTIONS = [
  { value: Role.Admin, label: '管理者' },
  { value: Role.Editor, label: '編集者' },
  { value: Role.Viewer, label: '閲覧者' },
];

export function UserForm() {
  const router = useRouter();

  const form = useAppForm({
    defaultValues: {
      name: '',
      email: '',
      role: Role.Admin,
    },
    onSubmit: async ({ value }) => {
      try {
        await createUser(value);
        router.push('/users');
      } catch (error) {
        console.error('Error creating user:', error);
      }
    },
    validators: {
      onChange: createUserSchema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="mt-3 flex justify-around gap-6 py-6"
    >
      <div className="flex flex-col gap-3">
        <form.AppField
          name="name"
          // asyncDebounceMs={500}
          // validators={{
          //   onChangeAsync: formSchema.shape.name,
          // }}
        >
          {(field) => <field.TextField label="Name" />}
        </form.AppField>

        <form.AppField
          name="email"
          // asyncDebounceMs={500}
          // validators={{
          //   onChangeAsync: formSchema.shape.email,
          // }}
        >
          {(field) => <field.TextField label="Email" />}
        </form.AppField>

        <form.AppField name="role">
          {(field) => (
            <field.SelectField
              label="role"
              selectOptions={USER_ROLE_OPTIONS}
              defaultValue={field.state.value}
            />
          )}
        </form.AppField>
      </div>

      <form.AppForm>
        <form.SubscribeButton label="Submit" />
      </form.AppForm>
    </form>
  );
}
