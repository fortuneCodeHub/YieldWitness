import PostPageContent from "@/components/ui/PostPageContent";
import Head from "next/head";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  const postId = await params;
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  const response = await fetch(`${baseUrl}/api/protected/posts/${postId.id}`);
  const post = await response.json();

  return {
    title: `${post.title} - YieldWitness: Finance & Tech Blog`,
    // description: post.excerpt,
    openGraph: {
      images: [
        { 
          url: `${baseUrl}${post.thumbnail}`,
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
