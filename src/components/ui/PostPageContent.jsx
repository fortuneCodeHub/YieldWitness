'use client'
import BlogPost from "./BlogPost";
import Footer from "./Footer";
import Header from "./Header";
import TopBar from "./TopBar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import MonetagVignette from "../ads/MonetagVignette";
import MonetagBanner from "../ads/MonetagBanner";

const PostPageContent = () => {
  const pathname = usePathname();
  const { data: posts, postLoading } = useSelector((state) => state.post);

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  const slug = pathname.split("/").pop();

  useEffect(() => {
    if (!slug || !isNaN(Number(slug))) {
      window.location.href = "/invalid";
      return;
    }
  }, [slug]);

  useEffect(() => {
    if (!postLoading && Array.isArray(posts) && posts.length > 0) {
      const currentPost = posts.find(
        (post) => post.slug?.toLowerCase() === slug
      );
      if (currentPost) {
        setPost(currentPost);
        setLoading(false);
      } else {
        window.location.href = '/'
      }
    }
  }, [posts, postLoading, slug]);

//   useEffect(() => {
//     if (post?.title) {
//       document.title = `${post.title} - YieldWitness: Finance & Tech Blog`;
  
//       const metaDesc = document.querySelector('meta[name="description"]');
//       if (metaDesc) metaDesc.setAttribute("content", post.excerpt || "");
//     }
//   }, [post]);

  return (
    <>

      <div className="font-sans bg-background text-foreground min-h-screen relative">

        {/* Right Ad */}
        <div
          className="fixed hidden bg-gray-50 border border-dashed border-gray-200 rounded p-6 xl:flex items-center justify-center text-sm text-gray-500 w-[120px] h-[400px] top-40 right-2"
        >
          {/* Desktop: spans both columns; Mobile: full width */}
          <MonetagBanner zone="10294151" />
        </div>

        {/* Left Ad */}
        <div
          // key={`ad-${idx}`}
          className="fixed hidden bg-gray-50 border border-dashed border-gray-200 rounded p-6 xl:flex items-center justify-center text-sm text-gray-500 w-[120px] h-[400px] top-40 left-2"
        >
          {/* Desktop: spans both columns; Mobile: full width */}
          <MonetagBanner zone="10294153" />
        </div>

        {/* Top utility bar */}
        <TopBar post={post} />
        {/* Navigation bar */}
        <Header post={post} />
        {/* Blog Post Content */}
        <BlogPost post={post} loading={loading} posts={posts} />

        <div
          className="md:col-span-2 bg-white rounded p-3 flex items-center justify-center text-sm text-gray-500"
        >
          {/* Desktop: spans both columns; Mobile: full width */}
          {/* Native Ad — your ad goes here (responsive) */}
          <MonetagVignette zone="10292653" />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default PostPageContent;
