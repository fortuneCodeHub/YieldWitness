import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import Post from "@/models/post";
import { writeFile, unlink } from "fs/promises";
import path from "path";

// Utility function to authenticate
async function authenticate(request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  const token = cookies.yield_witness_auth || null;

  if (!token) {
    return { error: "Not Authenticated" };
  }

  try {
    await connectToDB()
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { decoded };
  } catch (err) {
    return { error: "Invalid or expired token" };
  }
}

// PATCH /api/protected/posts/[id] → Update a post
// export async function PATCH(request) {
//     const { error, decoded } = await authenticate(request);
//     if (error) {
//         return NextResponse.json({ success: false, error }, { status: 401 });
//     }

//     try {
//         const body = await request.json();
//         const { id, update } = body; // { id, update: { username, access, etc. } }
//         // const { decoded } = auth

//         if (!id || !update) {
//             return NextResponse.json({ success: false, error: "Invalid input" }, { status: 400 });
//         }

//         // Get user and check admin access
//         if (decoded.id) {
//             const user = await User.findById(decoded.id);
//             if (!user || user.access !== "admin") {
//                 return NextResponse.json(
//                     { error: "Forbidden: Admin access required" },
//                     { status: 403 }
//                 );
//             }
//         }

//         const newPost = await Post.findByIdAndUpdate(id, update, { new: true }).lean();
//         if (!newPost) {
//             return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
//         }

//         return NextResponse.json({ success: true, post: newPost });
//     } catch (err) {
//         return NextResponse.json({ success: false, error: err.message }, { status: 500 });
//     }
// }


export async function PATCH(request, { params }) {
    const { error, decoded } = await authenticate(request);
    if (error) {
      return NextResponse.json({ success: false, error }, { status: 401 });
    }
  
    try {
      const { id } = await params;
  
      if (!id) {
        return NextResponse.json({ success: false, error: "Invalid post ID" }, { status: 400 });
      }
  
      // Check admin rights
      const user = await User.findById(decoded.id);
      if (!user || user.access !== "admin") {
        return NextResponse.json(
          { error: "Forbidden: Admin access required" },
          { status: 403 }
        );
      }
  
      // Parse multipart form-data
      const formData = await request.formData();
      const blocksJson = formData.get("blocks");
      let newBlocks = blocksJson ? JSON.parse(blocksJson) : [];
  
      // Get the existing post
      const existingPost = await Post.findById(id);
      if (!existingPost) {
        return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
      }
  
      // Collect all old image URLs
      const oldImages = (existingPost.content || [])
        .filter((b) => b.type === "image" && b.content?.startsWith("/uploads/content/"))
        .map((b) => b.content);
  
      // Process new blocks: replace placeholders with actual file URLs
      for (let block of newBlocks) {
        if (block.type === "image" && block.content?.startsWith("image-")) {
          const file = formData.get(block.content); // get File by placeholder key
          if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const ext = path.extname(file.name);
            const filename = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
            const filePath = path.join(process.cwd(), "public/uploads/content", filename);
  
            await writeFile(filePath, buffer);
            block.content = `/uploads/content/${filename}`;
          }
        }
      }
  
      // Figure out which old images are no longer in new content
      const newImages = newBlocks.filter((b) => b.type === "image").map((b) => b.content);
      const imagesToDelete = oldImages.filter((img) => !newImages.includes(img));
  
      for (const img of imagesToDelete) {
        try {
          const oldPath = path.join(process.cwd(), "public", img);
          await unlink(oldPath);
          console.log("Deleted old image:", oldPath);
        } catch (err) {
          console.warn("Failed to delete old image:", err.message);
        }
      }
  
      // Update the post content and other fields
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { content: newBlocks, built: true },
        { new: true }
      ).lean();
  
      return NextResponse.json({ success: true, post: updatedPost });
    } catch (err) {
      console.error("Update Post API Error:", err);
      return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}