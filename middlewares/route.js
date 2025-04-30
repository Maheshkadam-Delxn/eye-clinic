import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // 🔹 If no token & user tries to access protected routes, redirect to login
  if (!token && req.nextUrl.pathname.startsWith("/DOCTOR")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  return NextResponse.next();
}

// 🔹 Apply middleware to protected pages
export const config = {
  matcher: ["/DOCTOR/:path*"],
};
