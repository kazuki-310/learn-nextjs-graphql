import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(1, '商品名は必須項目です'),
  description: z.string().optional(),
  price: z.coerce.number().int().min(0, '価格は0以上の整数を入力してください'),
});

export type ProjectFormData = z.infer<typeof createProjectSchema>;
