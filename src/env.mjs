import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NEXT_PUBLIC_API_URL: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().url().min(1),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
});
