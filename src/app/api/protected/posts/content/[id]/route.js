import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import Post from "@/models/post";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// ===== Cloudinary Configuration =====
cloudinary.config({
  cloud_name: "dojv5hvhn",
  api_key: 411134211575489,
  api_secret: "IgX34rLO9GLI7gyWopnMHLGVN5o",
});

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

    // Collect all old Cloudinary image public_ids
    const oldImages = (existingPost.content || [])
      .filter((b) => b.type === "image" && b.content?.includes("cloudinary.com"))
      .map((b) => {
        const match = b.content.match(/\/upload\/(?:v\d+\/)?([^/.]+)/);
        return match ? match[1] : null;
      })
      .filter(Boolean);

    // Upload new images to Cloudinary
    for (let block of newBlocks) {
      if (block.type === "image" && block.content?.startsWith("image-")) {
        const file = formData.get(block.content);
        if (file) {
          const buffer = Buffer.from(await file.arrayBuffer());

          // Upload to Cloudinary
          const uploadResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "yieldwitness/posts/content" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            uploadStream.end(buffer);
          });

          // Replace placeholder with Cloudinary URL
          block.content = uploadResponse.secure_url;
          block.public_id = uploadResponse.public_id;
        }
      }
    }

    // Identify old Cloudinary images that are no longer in use
    const newImagePublicIds = newBlocks
      .filter((b) => b.type === "image" && b.content?.includes("cloudinary.com"))
      .map((b) => {
        const match = b.content.match(/\/upload\/(?:v\d+\/)?([^/.]+)/);
        return match ? match[1] : null;
      })
      .filter(Boolean);

    const imagesToDelete = oldImages.filter((pid) => !newImagePublicIds.includes(pid));

    // Delete unused images from Cloudinary
    for (const pid of imagesToDelete) {
      try {
        await cloudinary.uploader.destroy(pid);
        console.log("Deleted old Cloudinary image:", pid);
      } catch (err) {
        console.warn("Failed to delete old Cloudinary image:", err.message);
      }
    }

    // Update the post content and mark as built
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
