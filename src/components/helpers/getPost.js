import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export async function getPostById(slug) {
  await connectToDB();
  try {
    const post = await Post.findOne({ slug }).lean(); // <-- lean() returns plain JS object
    if (!post) return null;

    // Convert ObjectIds and Dates to strings
    return {
      ...post,
      _id: post._id.toString(),
      user: post.user?.toString(),             // if user is an ObjectId
      createdAt: post.createdAt?.toISOString(),
      updatedAt: post.updatedAt?.toISOString(),
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}