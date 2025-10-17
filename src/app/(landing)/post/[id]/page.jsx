import PostPageContent from "@/components/ui/PostPageContent";
import Head from "next/head";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  const postId = await params;
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  const response = await fetch(`${baseUrl}/api/auth/posts/${postId.id}`);
  const data = await response.json();
  const { post } = data
  // console.log(post);
  

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [
        { 
          url: post.thumbnail,
        }
      ],
    },
  };
}


const PostPage = () => {

  return (
    <>
      <PostPageContent />
    </>
  );
};

export default PostPage;
