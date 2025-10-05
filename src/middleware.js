import { NextResponse } from "next/server";
import { verifyJWT } from "./components/helpers/jwttoken";

export async function middleware(request) {
    const pathname = request.nextUrl.pathname;

    // Function to handle invalid cases
    const handleInvalid = () => {
        if (pathname.startsWith("/api/protected")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.redirect(new URL("/invalid", request.url));
    };

    // Function to handle valid cases
    const handleValid = () => {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    };

    // Try to get JWT from cookie, this is for the web app on the browser only
    let token = request.cookies.get("yield_witness_auth")?.value;

    // Or from Authorization header for Postman or API fetching applications
    if (!token) {
        const authHeader = request.headers.get("authorization");
        if (authHeader?.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
    }

    // Check protected routes
    if (pathname.startsWith("/dashboard")) {
        if (!token) return handleInvalid();

        const { valid } = await verifyJWT(token);
        if (!valid) return handleInvalid();
    }

    if (pathname.startsWith("/access")) {
        if (token) return handleValid();

        const { valid } = await verifyJWT(token);
        if (valid) return handleValid();
    }
    
    // if (pathname.startsWith("/api/auth/signup")) {
    //     if (token) return handleValid();

    //     const { valid } = await verifyJWT(token);
    //     if (valid) return handleValid();
    // }
    
    if (pathname.startsWith("/api/protected")) {
        if (!token) return handleInvalid();

        const { valid } = await verifyJWT(token);
        if (!valid) return handleInvalid();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*", 
        "/access/:path*", 
        "/api/protected/:path*"
    ],
};
