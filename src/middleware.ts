export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    // Skip auth paths, API routes, and static files
    '/((?!api|signin|signup|_next/static|_next/image|favicon.ico).*)',
  ],
}
