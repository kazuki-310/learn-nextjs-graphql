import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    console.log('Middleware called for:', req.nextUrl.pathname);
    console.log('Token exists:', !!req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        console.log('Authorized callback:', req.nextUrl.pathname, 'Token:', !!token);

        // ダッシュボードルート（ルート、プロジェクト、ユーザー）は認証が必要
        const protectedPaths = ['/', '/projects', '/users'];
        const isProtectedPath = protectedPaths.some(
          (path) => req.nextUrl.pathname === path || req.nextUrl.pathname.startsWith(path + '/'),
        );

        if (isProtectedPath) {
          console.log('Protected path detected, token exists:', !!token);
          return !!token;
        }

        console.log('Non-protected path, allowing access');
        return true;
      },
    },
    pages: {
      signIn: '/signin',
    },
  },
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (auth pages)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
  ],
};
