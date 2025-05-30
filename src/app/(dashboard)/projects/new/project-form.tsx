'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { createProject } from './_server-actions/actions';
import { Project } from '@/lib/graphql/__generated__';
import { updateProject } from '../[id]/_server-actions/actions';

const formSchema = z.object({
  title: z.string().min(1, '商品名は必須項目です'),
  description: z.string().optional(),
  price: z.coerce.number().int().min(0, '価格は0以上の整数を入力してください'),
});

type FormValues = z.infer<typeof formSchema>;

export function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const isEditMode = !!project;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: project?.title ?? '',
      description: project?.description ?? '',
      price: project?.price ?? 0,
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = form;

  const onSubmit = async (data: FormValues) => {
    try {
      if (isEditMode) {
        await updateProject(project.id, data);
      } else {
        await createProject(data);
      }

      router.push('/projects');
    } catch (error) {
      console.error('Error creating/updating project:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タイトル</FormLabel>
              <FormControl>
                <Input placeholder="タイトルを入力してください" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>商品説明</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="商品の説明を入力してください"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>価格（円）</FormLabel>
              <FormControl>
                <Input type="number" min="0" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEditMode ? '更新' : '作成'}
        </Button>
      </form>
    </Form>
  );
}
