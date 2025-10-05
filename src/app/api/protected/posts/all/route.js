import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import Post from "@/models/post";

// Authenticate utility
async function authenticate(request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  const token = cookies.yield_witness_auth;

//   if (!token) {
//     const authHeader = request.headers.get("authorization");
//     if (authHeader?.startsWith("Bearer ")) {
//       token = authHeader.split(" ")[1];
//     }
//   }

  if (!token) {
    return { error: "Not Authenticated" };
  }

  try {
    await connectToDB();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { decoded };
  } catch (err) {
    return { error: "Invalid or expired token" };
  }
}

// GET /api/posts/all → Fetch all posts for only Admins
export async function GET(request) {
  try {
    // Authenticate
    const auth = await authenticate(request);
    if (auth.error) {
      return NextResponse.json({ error: auth.error, success: false }, { status: 401 });
    }

    const { decoded } = auth;

    // Get user and check admin access
    const user = await User.findById(decoded.id);
    if (!user || user.access !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required", success: false },
        { status: 403 }
      );
    }

    // Fetch posts
    const posts = await Post.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, posts }, { status: 200 });
  } catch (err) {
    console.error("Fetch Posts API Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
