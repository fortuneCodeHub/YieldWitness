import { getPostById } from "@/components/helpers/getPost";
import PostPageContent from "@/components/ui/PostPageContent";
import { identity } from "@tsparticles/engine";
import Head from "next/head";

export async function generateMetadata({ params }) {
  try {
    const postId = await params;
    
    const post = await getPostById(postId.id)

    // console.log("this is the post data", post)

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

  const { id } = await params

  const post = await getPostById(id)

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
      <PostPageContent pagePost={post} />
    </>
  );
};

export default PostPage;
