import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin');
  }

  return session.user;
}
