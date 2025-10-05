import { NextResponse } from "next/server";

export async function POST() {
  // Expire the JWT cookie
  const response = NextResponse.json({ success: true, message: "Logged out" });

  response.cookies.set("yield_witness_auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    expires: new Date(0), // Expire immediately
    maxAge: 0, // Deletes the cookie
    path: "/",
  });

  return response;
}