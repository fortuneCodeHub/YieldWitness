"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bookmark, Share2 } from "lucide-react";
import { formatDate } from "../helpers/formatDate";
import RelatedPosts from "./RelatedPosts";
import AccordionBlock from "./AccordionBlock";

const BlogPost = ({ post, loading, posts }) => {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(false);

  // useEffect(() => {
    // console.log(post);
  // }, [post])

  function categoryBadgeClass(category) {
    switch (category?.toLowerCase()) {
      case "finance":
        return "bg-[#0EA5A4]";
      case "tech":
        return "bg-[#2563EB]";
      case "insurance":
        return "bg-yellow-500";
      case "law":
        return "bg-purple-600";
      default:
        return "bg-gray-500";
    }
  }

  async function handleShare() {
    const url = `${typeof window !== "undefined" ? window.location.origin : ""}/post/${post.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url,
        });
      } catch (err) {
        console.log(err);
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      window.alert("Link copied to clipboard");
    }
  }

  // 🧩 RENDER BLOCKS DYNAMICALLY
  const renderContentBlock = (block) => {
    switch (block.type) {
      case "heading":
        return (
          <h2
            key={block.id}
            className="text-2xl font-semibold text-gray-900 mt-8 mb-4"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        );

      case "heading3":
        return (
          <h3
            key={block.id}
            className="text-xl font-semibold text-gray-800 mt-6 mb-3"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        );
  
      case "heading4":
        return (
          <h4
            key={block.id}
            className="text-lg font-medium text-gray-700 mt-4 mb-2"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        );

      case "text":
        return (
          <p
            key={block.id}
            className="leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        );

      case "image":
        return (
          <div key={block.id} className="my-6">
            <img
              src={block.content}
              alt="Article content"
              className="rounded-lg w-full object-cover"
              style={{ aspectRatio: block.ratio === "auto" ? "16:9" : block.ratio }}
            />
          </div>
        );

      case "quote":
        return (
          <blockquote
            key={block.id}
            className="border-l-4 border-[#0EA5A4] pl-4 italic text-gray-700 my-6"
          >
            {block.content}
          </blockquote>
        );

      case "video":
        return (
          <div key={block.id} className="my-6 aspect-video">
            <iframe
              src={block.content}
              className="w-full h-full rounded-lg"
              title="Video content"
              allowFullScreen
            />
          </div>
        );

      case "code":
        return (
          <pre
            key={block.id}
            className="bg-gray-900 text-gray-100 text-sm rounded-lg p-4 overflow-x-auto my-6"
          >
            <code>{block.content}</code>
          </pre>
        );

      case "columns":
        // example: block.content = { left: "...", right: "..." }
        return (
          <div
            key={block.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6"
          >
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: block.content.left || "" }}
            />
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: block.content.right || "" }}
            />
          </div>
        );

      case "ads":
        return (
          <div
            key={block.id}
            className="my-3 bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-sm text-gray-500"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        );

      case "button":
        const sizeClasses = {
          sm: "px-3 py-1 text-sm",
          md: "px-4 py-2 text-base",
          lg: "px-6 py-3 text-lg",
        };
        return (
          <div key={block.id} className="my-6">
            <a
              href={block.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block rounded text-white font-medium ${sizeClasses[block.size || "md"]}`}
              style={{ backgroundColor: block.color || "#2563EB" }}
            >
              {block.text || "Click Me"}
            </a>
          </div>
        );
  
      case "anchor":
        return (
          <a
            key={block.id}
            href={block.href || "#"}
            target={block.target || "_self"}
            className="text-blue-600 underline hover:text-blue-800"
          >
            {block.text || "Anchor Link"}
          </a>
        );

      case "accordion":
        return (
          <div key={block.id} className="my-6">
            <AccordionBlock data={block} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <article className="max-w-5xl mx-auto px-4 py-10">
      {loading ? (
        <div>Please be patient while the post loads...</div>
      ) : (
        <>
          {/* Hero Section */}
          <header className="mb-8">
            {/* <div className="w-full h-72 md:h-96 rounded-xl overflow-hidden mb-6">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div> */}
    
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight capitalize">
              {post.title}
            </h1>
            <div className="flex items-center justify-between mb-4">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${categoryBadgeClass(
                  post.category
                )}`}
              >
                {post.category}
              </span>
    
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setBookmarked((prev) => !prev)}
                  className="p-2 rounded hover:bg-gray-100"
                  aria-label="Bookmark"
                >
                  <Bookmark
                    className={`h-5 w-5 ${
                      bookmarked ? "text-[#0EA5A4] fill-[#0EA5A4]" : "text-gray-600"
                    }`}
                  />
                </button>
    
                <button
                  onClick={handleShare}
                  className="p-2 rounded hover:bg-gray-100"
                  aria-label="Share"
                >
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
    
            <div className="text-sm text-gray-500">
              By{" "}
              <span className="font-medium text-gray-700">
                {post.author}
              </span>{" "}
              • {formatDate(post.createdAt)} • {post.readTime}
            </div>
            <div className="my-6">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="rounded-lg w-full object-cover aspect-[16/9]"
                // style={{ aspectRatio: "16:9" }}
              />
            </div>
          </header>
    
          {/* 🧱 Render Dynamic Content Blocks */}
          <div className="prose prose-lg max-w-none text-[#0F172A]">
            {Array.isArray(post.content) && post.content.length > 0 ? (
              post.content.map((block) => renderContentBlock(block))
            ) : (
              <p className="text-gray-500 italic">
                No content available for this post.
              </p>
            )}
          </div>
    
          {/* Related posts */}
          <RelatedPosts post={post} posts={posts} />

        </>
      )}
    </article>
  );
};

export default BlogPost;
