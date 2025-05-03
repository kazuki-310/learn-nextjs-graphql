import { getProducts } from '@/lib/graphql/fetcher';
import { ProjectTable } from './project-table';
import { env } from '@/env.mjs';

export async function ProjectList() {
  // const envs = env.NEXT_PUBLIC_API_URL;
  // console.log('🚀 ~ ProjectList ~ envs:', envs);

  // console.log('✅ API URL:', process.env.NEXT_PUBLIC_API_URL);

  // const products = await getProducts();

  return <div className="p-6">{/* <ProjectTable products={products} /> */}</div>;
}
