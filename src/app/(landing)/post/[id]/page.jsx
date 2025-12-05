import PostPageContent from "@/components/ui/PostPageContent";
import Head from "next/head";
// import Script from "next/script";
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
}


const PostPage = async ({ params }) => {

  // Fetch post data again (you could also pass it from generateMetadata)
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

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
