import Post from "@/models/post";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

// GET /api/posts/all → Fetch all posts for only Admins
export async function GET(request) {
  try {

    // connect to mongo db
    await connectToDB();

    // Fetch posts
    const posts = await Post.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, posts }, { status: 200 });
  } catch (err) {
    console.error("Fetch Posts API Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}