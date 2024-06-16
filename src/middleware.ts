import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;
    console.log(token);

    // Redirect to dashboard if the user is already authenticated
    // and trying to access sign-in, sign-up, or home page
    if (
        token &&
        (url.pathname.startsWith("/login") ||
            url.pathname.startsWith("/signup"))
    ) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (
        !token &&
        (url.pathname.startsWith("/user") ||
            url.pathname.startsWith("/buy-pet") ||
            url.pathname.startsWith("/sell-pet") ||
            url.pathname.startsWith("/pet"))
    ) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/pet/:path*", "/login", "/signup", "/user/:path*", "/buy-pet", '/sell-pet'],
};
