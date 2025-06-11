import { z } from 'zod';
import { Role } from '@/lib/graphql/__generated__';

export const baseUserSchema = z.object({
  name: z.string().min(1, '名前は必須項目です'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  role: z.nativeEnum(Role),
});

export const createUserSchema = baseUserSchema.extend({
  password: z
    .string()
    .min(8, 'パスワードは8文字以上で入力してください')
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'パスワードは大文字、小文字、数字を含む必要があります'),
});

export const updateUserSchema = baseUserSchema;

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;