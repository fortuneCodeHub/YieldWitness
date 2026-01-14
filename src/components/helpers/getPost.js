import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export async function getPostById(slug) {
  await connectToDB();
  try {
    const post = await Post.findOne({ 
      slug,
      category: { $nin: ["art-design", "photography", "sustainable-living", "books-literature", "climate-tech-sl", "green-finance-sl", "diy-home-sl", "skill-dev-bl"] } 
    }).lean(); // <-- lean() returns plain JS object
    if (!post) return null;

    // Convert ObjectIds and Dates to strings
    return {
      ...post,
      _id: post._id.toString(),
      user: post.user?.toString(),             // if user is an ObjectId
      createdAt: new Date(post.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }), // e.g., "3 Dec 2025"
      updatedAt: post.updatedAt?.toISOString(),
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function getAllPosts() {
  await connectToDB();
  try {
    const posts = await Post.find({
      category: { $nin: ["art-design", "photography", "sustainable-living", "books-literature", "climate-tech-sl", "green-finance-sl", "diy-home-sl", "skill-dev-bl"] }
    }).sort({ createdAt: -1 }).lean(); // get all posts, newest first

    // Convert ObjectIds and Dates to strings for each post
    const formattedPosts = posts.map(post => ({
      ...post,
      _id: post._id.toString(),
      user: post.user?.toString(),
      createdAt: new Date(post.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }), // e.g., "3 Dec 2025"
      updatedAt: post.updatedAt?.toISOString(),
      // createdAt: post.createdAt?.toISOString(),
      // updatedAt: post.updatedAt?.toISOString(),
    }));

    return formattedPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}