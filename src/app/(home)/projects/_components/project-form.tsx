'use client';

import { useForm } from 'react-hook-form';
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
import { Project } from '@/lib/graphql/__generated__';
import { createProjectSchema, ProjectFormData } from '../new/_lib/schemas';
import { updateProject } from '../[id]/_lib/actions';
import { createProject } from '../new/_lib/actions';
import { toast } from 'sonner';
import { Suspense } from 'react';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';

export function ProjectForm({
  project,
  categoryOptions,
  locationOptions,
}: {
  project?: Project;
  categoryOptions?: React.ReactNode;
  locationOptions?: React.ReactNode;
}) {
  const router = useRouter();
  const isEditMode = !!project;

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(createProjectSchema),
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

  const onSubmit = async (data: ProjectFormData) => {
    try {
      if (isEditMode) {
        await updateProject(project.id, data);
        toast.success(`「${data.title}」を更新しました`);
      } else {
        await createProject(data);
        toast.success(`「${data.title}」を作成しました`);
      }

      router.push('/projects');
    } catch (error) {
      console.error('Error creating/updating project:', error);
      toast.error(isEditMode ? '更新に失敗しました' : '作成に失敗しました');
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

        {/* CC -> RSC -> CC Composition Pattern */}
        <div className="space-y-2">
          <FormLabel>カテゴリ</FormLabel>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="カテゴリを選択してください" />
            </SelectTrigger>
            <SelectContent>
              <Suspense fallback={<div className="p-2 text-sm">カテゴリ読み込み中...</div>}>
                {categoryOptions}
              </Suspense>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <FormLabel>場所</FormLabel>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="場所を選択してください" />
            </SelectTrigger>
            <SelectContent>
              <Suspense fallback={<div className="p-2 text-sm">場所読み込み中...</div>}>
                {locationOptions}
              </Suspense>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEditMode ? '更新' : '作成'}
        </Button>
      </form>
    </Form>
  );
}
