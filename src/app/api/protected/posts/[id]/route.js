import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import Post from "@/models/post";
import { writeFile, unlink, fs } from "fs/promises";
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
export async function PATCH(request, { params }) {
    const auth = await authenticate(request);
    if (auth.error) {
      return NextResponse.json({ success: false, error }, { status: 401 });
    }
  
    try {
      const { id } = await params;
      if (!id) {
        return NextResponse.json({ success: false, error: "Invalid post ID" }, { status: 400 });
      }

      const { decoded } = auth
    //   console.log(decoded);

      // Check admin
      const user = await User.findById(decoded.id);
      if (!user || user.access !== "admin") {
        return NextResponse.json(
          { error: "Forbidden: Admin access required" },
          { status: 403 }
        );
      }
  
      const formData = await request.formData();
  
      // Extract fields
      const title = formData.get("title");
      const excerpt = formData.get("excerpt");
      const category = formData.get("category");
      const author = formData.get("author");
      const readTime = formData.get("readTime");
      const newThumbnail = formData.get("thumbnail"); // uploaded file if any
  
      // Get current post
      const existingPost = await Post.findById(id);
      if (!existingPost) {
        return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
      }
  
      let thumbnailPath = existingPost.thumbnail; // keep old thumbnail by default
  
      if (newThumbnail && typeof newThumbnail === "object" && newThumbnail.name) {
        // Delete old thumbnail if it exists
        if (existingPost.thumbnail) {
          const oldPath = path.join(process.cwd(), "public", existingPost.thumbnail);
          try {
            await unlink(oldPath);
            console.log("Old thumbnail deleted:", oldPath);
          } catch (err) {
            console.warn("Failed to delete old thumbnail:", err.message);
          }
        }
  
        // Save new thumbnail
        const buffer = Buffer.from(await newThumbnail.arrayBuffer());
        const timestamp = Date.now();
        const ext = path.extname(newThumbnail.name);
        const filename = `${title.replace(/\s+/g, "_")}_${timestamp}${ext}`;
        const filePath = path.join(process.cwd(), "public/uploads/thumbnails", filename);
  
        await writeFile(filePath, buffer);
        thumbnailPath = `/uploads/thumbnails/${filename}`;
      }
  
      // Update post
      const updateFields = {
        title,
        excerpt,
        category,
        author,
        readTime,
        thumbnail: thumbnailPath,
      };
  
      const updatedPost = await Post.findByIdAndUpdate(id, updateFields, { new: true }).lean();
  
      return NextResponse.json({ success: true, post: updatedPost });
    } catch (err) {
      console.error("Update Post API Error:", err);
      return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

// DELETE /api/protected/posts/[id] → Delete a post
export async function DELETE(request, { params }) {
    const { error, decoded } = await authenticate(request);
    if (error) {
      return NextResponse.json({ success: false, error }, { status: 401 });
    }
  
    try {
      const { id } = await params;
  
      if (!id) {
        return NextResponse.json({ success: false, error: "Post ID required" }, { status: 400 });
      }
  
      // Check admin
      if (decoded.id) {
        const user = await User.findById(decoded.id);
        if (!user || user.access !== "admin") {
          return NextResponse.json(
            { error: "Forbidden: Admin access required" },
            { status: 403 }
          );
        }
      }
  
      // 1. Find the post first
      const post = await Post.findById(id);
      if (!post) {
        return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
      }
  
      // 2. Collect images (thumbnail + content images)
      const imagesToDelete = [];
  
      if (post.thumbnail) {
        imagesToDelete.push(post.thumbnail);
      }
  
      if (Array.isArray(post.content)) {
        post.content.forEach((block) => {
          if (block.type === "image" && block.content) {
            imagesToDelete.push(block.content);
          }
        });
      }
  
      // 3. Delete images from filesystem (adjust if you use S3 or Cloudinary)
      for (const img of imagesToDelete) {
        try {
          // If URLs are stored like "/uploads/filename.jpg"
          const filePath = path.join(process.cwd(), "public", img.replace("/uploads/", "uploads/"));
          await unlink(filePath);
          console.log(`Deleted image: ${filePath}`);
        } catch (err) {
          console.warn(`Failed to delete image ${img}:`, err.message);
        }
      }
  
      // 4. Delete post
      await Post.findByIdAndDelete(id);
  
      return NextResponse.json({ success: true, message: "Post and images deleted successfully" });
    } catch (err) {
      return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

// GET - to help get a specific post, this is for the frontend post display page
export async function GET(request, { params }) {
    const { error } = await authenticate(request)
    if (!error) {
        return NextResponse.json({ success: false, error }, { status: 401 })
    }

    try {
        
        const id = await params
        if (!id) {
            return NextResponse.json({ success: false, error: "Post Id Required" }, { status: 400 })
        }

        const post = await Post.findById(id).lean()

        // Check if a post exists for that Id
        if (!post) {
            return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 })
        }

        // return the success response
        return NextResponse.json({ success: true, post }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 })
    }
}

// export async function PUT(request, { params }) {

// }