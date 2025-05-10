import { SelectField } from '@/components/form/select-field';
import { SubscribeButton } from '@/components/form/subscribe-button';
import { TextField } from '@/components/form/text-field';
import { fieldContext, formContext } from '@/hooks/form-context';
import { createFormHook } from '@tanstack/react-form';

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    SelectField,
  },
  formComponents: {
    SubscribeButton,
  },
});
