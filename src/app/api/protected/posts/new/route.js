import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { connectToDB } from "@/utils/database";
import Post from "@/models/post";
import { validateCreatePost } from "@/components/helpers/validateBackendForms";
import User from "@/models/user";
import { writeFile } from "fs/promises";
import path from "path";

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

// POST /api/posts/new → Create a new post
export async function POST(request) {
    try {
        // Authenticate
        const auth = await authenticate(request);
        if (auth.error) {
            return NextResponse.json({ error: auth.error }, { status: 401 });
        }
    
        const { decoded } = auth;
    
        // Check admin
        const user = await User.findById(decoded.id).lean();
        if (!user || user.access !== "admin") {
            return NextResponse.json(
            { success: false, error: "Access denied" },
            { status: 403 }
            );
        }
    
        // Parse multipart form-data
        const formData = await request.formData();
        const title = formData.get("title");
        const excerpt = formData.get("excerpt");
        const category = formData.get("category");
        const author = formData.get("author");
        const readTime = formData.get("readTime");
        const file = formData.get("thumbnail"); // This is the uploaded file
        const keywords = JSON.parse(formData.get("keywords"))
    
        // Validate required fields
        if (!title || !excerpt || !category || !file || !author || !readTime) {
            return NextResponse.json(
            { error: "All fields are required" },
            { status: 400 }
            );
        }
    
        // Save file to /public/uploads with custom name
        const buffer = Buffer.from(await file.arrayBuffer());
        const timestamp = Date.now();
        const ext = path.extname(file.name); // get original extension
        const filename = `${title.replace(/\s+/g, "_")}_${timestamp}${ext}`;
        const filePath = path.join(process.cwd(), "public/uploads/thumbnails", filename);
    
        
        // Save post to DB (store only the relative path for easy access)
        const newPost = await Post.create({
            user: decoded.id,
            title,
            excerpt,
            category,
            thumbnail: `/uploads/thumbnails/${filename}`, // <-- served from public/
            author,
            readTime,
            keywords,
            built: false,
        });
        
        await writeFile(filePath, buffer);
        return NextResponse.json({ success: true, post: newPost }, { status: 201 });
    } catch (err) {
      console.error("Create Post API Error:", err);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}


// export async function POST(request) {
//   try {
//     // Authenticate
//     const auth = await authenticate(request);
//     if (auth.error) {
//       return NextResponse.json({ error: auth.error }, { status: 401 });
//     }

//     const { decoded } = auth;

//     // Check admin
//     const user = await User.findById(decoded.id).lean();
//     if (!user || user.access !== "admin") {
//       return NextResponse.json({ success: false, error: "Access denied" }, { status: 403 });
//     }

//     const body = await request.json();
//     const { title, excerpt, category, thumbnail, author, readTime } = validateCreatePost(body);

//     // Validate
//     if (!title || !excerpt || !category || !thumbnail || !author || !readTime) {
//       return NextResponse.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     // Save post
//     const newPost = await Post.create({
//       user: decoded.id,
//       title,
//       excerpt,
//       category,
//       thumbnail,
//       author,
//       readTime,
//       built: false,
//     });

//     return NextResponse.json({ success: true, post: newPost },{ status: 201 });
//   } catch (err) {
//     console.error("Create Post API Error:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// ✅ GET /api/posts → Fetch all posts
// export async function GET() {
//   try {
//     await connectToDB();
//     const posts = await Post.find().sort({ createdAt: -1 });
//     return NextResponse.json({ success: true, posts }, { status: 200 });
//   } catch (err) {
//     console.error("Fetch Posts API Error:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
