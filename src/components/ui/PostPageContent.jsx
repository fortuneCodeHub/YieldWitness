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
import AdPageDisplay from "./AdPageDisplay";
import VideoAd from "./ads/VideoAd";

const PostPageContent = ({ pagePost }) => {
  const pathname = usePathname();
  const { data: posts, postLoading } = useSelector((state) => state.post);

  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);

  const slug = pathname.split("/").pop();

  useEffect(() => {
    if (!slug || !isNaN(Number(slug))) {
      window.location.href = "/invalid";
      return;
    }
  }, [slug]);

  useEffect(() => {
    setTimeout(() => {
        setPost(pagePost);
        setLoading(false);
    }, 3000);
  }, [slug]);

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

        {/* Page Ads Display */}
        <AdPageDisplay
          leftTag={VideoAd}
          rightTag={VideoAd}
          leftUrl="/assets/ads/videos/flash-sale-winter.mp4"
          rightUrl="/assets/ads/videos/fashion-women.mp4"
        />

        {/* Top utility bar */}
        <TopBar post={post} />
        {/* Navigation bar */}
        <Header post={post} />
        {/* Blog Post Content */}
        <BlogPost post={post} loading={loading} posts={posts} />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default PostPageContent;
