'use server';

import { SignupFormData } from '@/schemas/auth';
import { withServerAction } from '@/lib/utils/server-action-wrapper';
import { env } from '@/env.mjs';

export const signupAction = withServerAction(
  async (data: SignupFormData) => {
    const response = await fetch(`${env.NEXTAUTH_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || '登録に失敗しました');
    }

    return result;
  },
  {
    errorMessage: '登録に失敗しました',
  },
);
