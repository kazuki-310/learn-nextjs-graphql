import { revalidateTag } from 'next/cache';

type ServerActionConfig = {
  revalidateTag?: string;
  errorMessage: string;
};

export function withServerAction<T extends readonly unknown[], R>(
  action: (...args: T) => Promise<R>,
  config: ServerActionConfig
) {
  return async (...args: T): Promise<R> => {
    try {
      const result = await action(...args);
      
      if (config.revalidateTag) {
        revalidateTag(config.revalidateTag);
      }
      
      return result;
    } catch (error) {
      console.error('GraphQL error:', error);
      throw new Error(config.errorMessage);
    }
  };
}