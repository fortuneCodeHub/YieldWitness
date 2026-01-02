import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export async function getPostById(slug) {
  await connectToDB();
  return Post.findOne({slug}).lean();
}