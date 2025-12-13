import Post from "@/models/post";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(request) {
    const origin = request.headers.get("origin");
    const allowedOrigins = [
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:3004",
        "http://localhost:3005",
        // "https://framealchemy.vercel.app",
        // "https://www.framealchemy.vercel.app",
    ];
  
    const CORS_HEADERS = {
      "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Vary": "Origin",
    };
  
    try {
      await connectToDB();
  
      const posts = await Post.find({ category: "art-design" })
        .sort({ createdAt: -1 });
  
      return new NextResponse(JSON.stringify({ success: true, posts }), {
        status: 200,
        headers: CORS_HEADERS
      });
  
    } catch (err) {
      return new NextResponse(JSON.stringify({ error: "Server error" }), {
        status: 500,
        headers: CORS_HEADERS
      });
    }
}