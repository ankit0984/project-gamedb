// import { NextResponse } from "next/server";

// export async function middleware(request) {
//   // Get both tokens from cookies
//   const accessToken = request.cookies.get("accessToken")?.value;
//   const refreshToken = request.cookies.get("refreshToken")?.value;
//   const currentPath = request.nextUrl.pathname;

//   // debug purposes
//   // console.log('Access Token:', accessToken)
//   // console.log('Refresh Token:', refreshToken)
//   // console.log('Current Path:', currentPath)

//   // Check if user is authenticated (both tokens must be present)
//   const isAuthenticated = accessToken && refreshToken;

//   // Login page is public
//   if (currentPath === "/login") {
//     // If user is already logged in (has both tokens), redirect to home
//     if (isAuthenticated) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//     // Allow access to login page if not logged in
//     return NextResponse.next();
//   }

//   // For all other protected routes
//   if (!isAuthenticated) {
//     // Store the attempted URL to redirect back after login
//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("callbackUrl", currentPath);
//     return NextResponse.redirect(loginUrl);
//   }

//   // User has both tokens, allow access to protected routes
//   return NextResponse.next();
// }

// // Configure which routes are protected
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - public folder
//      */
//     "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
//   ],
// };

import { NextResponse } from "next/server";

export async function middleware(request) {
  // Get both tokens from cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const currentPath = request.nextUrl.pathname;

  // Check if user is authenticated (both tokens must be present)
  const isAuthenticated = accessToken && refreshToken;

  // Public pages that don't require authentication
  const publicPaths = [
    "/login",
    "/register",
    "/reset-password",
    "/passwd-reset",
  ];

  // Allow access to public pages
  if (publicPaths.includes(currentPath)) {
    // If the user is already logged in and tries to access "/login" or similar, redirect them to home
    if (isAuthenticated && currentPath === "/login") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next(); // Allow access to other public pages
  }

  // Protected routes: redirect unauthenticated users to login
  if (!isAuthenticated) {
    // Store the attempted URL to redirect back after login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", currentPath);
    return NextResponse.redirect(loginUrl);
  }

  // User has both tokens, allow access to protected routes
  return NextResponse.next();
}

// Configure which routes are protected
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     *
     * Ensure public paths like /register and /change-password are accessible
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
