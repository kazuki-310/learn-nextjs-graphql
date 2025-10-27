'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Button, Input, Textarea, VStack, Spinner, NativeSelectRoot, NativeSelectField } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { Project } from '@/lib/graphql/__generated__';
import { createProjectSchema, ProjectFormData } from '../new/_lib/schemas';
import { updateProject } from '../[id]/_lib/actions';
import { createProject } from '../new/_lib/actions';
import { toast } from 'sonner';
import { Suspense } from 'react';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={8} align="stretch">
        <Controller
          control={control}
          name="title"
          render={({ field, fieldState }) => (
            <Field.Root invalid={!!fieldState.error}>
              <Field.Label>タイトル</Field.Label>
              <Input placeholder="タイトルを入力してください" {...field} />
              {fieldState.error && <Field.ErrorText>{fieldState.error.message}</Field.ErrorText>}
            </Field.Root>
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field, fieldState }) => (
            <Field.Root invalid={!!fieldState.error}>
              <Field.Label>商品説明</Field.Label>
              <Textarea
                placeholder="商品の説明を入力してください"
                minHeight="120px"
                {...field}
              />
              {fieldState.error && <Field.ErrorText>{fieldState.error.message}</Field.ErrorText>}
            </Field.Root>
          )}
        />

        <Controller
          control={control}
          name="price"
          render={({ field, fieldState }) => (
            <Field.Root invalid={!!fieldState.error}>
              <Field.Label>価格（円）</Field.Label>
              <Input type="number" min="0" placeholder="0" {...field} />
              {fieldState.error && <Field.ErrorText>{fieldState.error.message}</Field.ErrorText>}
            </Field.Root>
          )}
        />

        {/* CC -> RSC -> CC Composition Pattern */}
        <Field.Root>
          <Field.Label mb={2}>カテゴリ</Field.Label>
          <NativeSelectRoot>
            <NativeSelectField placeholder="カテゴリを選択してください">
              <Suspense fallback={<option>カテゴリ読み込み中...</option>}>
                {categoryOptions}
              </Suspense>
            </NativeSelectField>
          </NativeSelectRoot>
        </Field.Root>

        <Field.Root>
          <Field.Label mb={2}>場所</Field.Label>
          <NativeSelectRoot>
            <NativeSelectField placeholder="場所を選択してください">
              <Suspense fallback={<option>場所読み込み中...</option>}>
                {locationOptions}
              </Suspense>
            </NativeSelectField>
          </NativeSelectRoot>
        </Field.Root>

        <Button type="submit" disabled={!isValid || isSubmitting} colorPalette="blue">
          {isSubmitting && <Spinner size="sm" mr={2} />}
          {isEditMode ? '更新' : '作成'}
        </Button>
      </VStack>
    </form>
  );
}
