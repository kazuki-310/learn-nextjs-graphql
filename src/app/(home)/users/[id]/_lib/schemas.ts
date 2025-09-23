import { z } from 'zod';
import { Role } from '@/lib/graphql/__generated__';

export const updateUserSchema = z.object({
  name: z.string().min(1, '名前は必須項目です'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  role: z.nativeEnum(Role),
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;