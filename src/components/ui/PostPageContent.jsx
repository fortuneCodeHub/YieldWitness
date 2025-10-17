'use client'
import BlogPost from "./BlogPost";
import Footer from "./Footer";
import Header from "./Header";
import TopBar from "./TopBar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";

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
        (post) => post._id?.toLowerCase() === slug
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
        <div className="fixed hidden bg-gray-50 border border-dashed border-gray-200 rounded p-6 xl:flex items-center justify-center text-sm text-gray-500 w-[120px] h-[400px] top-40 right-2">
          Native Ad — your ad goes here (responsive)
        </div>

        {/* Left Ad */}
        <div className="fixed hidden bg-gray-50 border border-dashed border-gray-200 rounded p-6 xl:flex items-center justify-center text-sm text-gray-500 w-[120px] h-[400px] top-40 left-2">
          Native Ad — your ad goes here (responsive)
        </div>

        {/* Top utility bar */}
        <TopBar />
        {/* Navigation bar */}
        <Header />
        {/* Blog Post Content */}
        <BlogPost post={post} loading={loading} posts={posts} />
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default PostPageContent;
