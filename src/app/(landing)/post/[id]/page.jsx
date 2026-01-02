import PostPageContent from "@/components/ui/PostPageContent";
import Head from "next/head";
// import Script from "next/script";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  try {
    const postId = await params;
    const devPort = Number(process.env.NEXT_PUBLIC_DEV_PORT);
    const allowed = [3000,3001,3002,3003,3004,3005,3006,3007];

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://www.yieldnvest.com"
        : allowed.includes(devPort)
          ? `http://localhost:${devPort}`
          : "http://localhost:3000";
    
    const res = await fetch(
      `${baseUrl}/api/auth/posts/${postId}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch post");

    const { post } = await res.json();

    if (!post) throw new Error("Post not found");

    return {
      title: post.title,
      description: post.excerpt,
      keywords: post.keywords || [
        "Yield Invest",
        "Yield Invest New York",
        "personal finance blog",
        "tech blog",
        "market analysis",
        "investment insights",
        "personal financial technology",
        "insurance blog",
        "law blog",
        "legal insights",
        "business law articles",
        "AI blogging tools",
        "Next.js blog",
        "modern blogging platform",
        "personal financial literacy",
        "insurance trends",
        "legal technology",
        "FinTech",
        "InsurTech",
        "blog builder"
      ],
      openGraph: {
        images: [
          { 
            url: post.thumbnail,
          }
        ],
      },
    };
    
  } catch (err) {
    console.error("Metadata error:", err);

    return {
      title: "Post not found | Yieldnvest",
      description: "This post is unavailable.",
    };
  }
  
}


const PostPage = async ({ params }) => {

  // Fetch post data again (you could also pass it from generateMetadata)
  const devPort = Number(process.env.NEXT_PUBLIC_DEV_PORT);
  const allowed = [3000,3001,3002,3003,3004,3005,3006,3007];

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://www.yieldnvest.com"
      : allowed.includes(devPort)
        ? `http://localhost:${devPort}`
        : "http://localhost:3000";

  const { id } = await params

  const response = await fetch(`${baseUrl}/api/auth/posts/${id}`);
  const data = await response.json();
  const { post } = data;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.thumbnail,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Developer",
      "name": "Fortune",
      url: "https://www.yieldnvest.com/",
    },
    publisher: {
      "@type": "Self-employed",
      "name": "yieldInvest",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.yieldnvest.com/opengraph-image.png",
      },
    },
    url: `https://www.yieldnvest.com/post/${post._id}`,
  };

  return (
    <>
      {/* <Head> */}
        {/* ✅ JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      {/* </Head> */}
      <PostPageContent />
    </>
  );
};

export default PostPage;
