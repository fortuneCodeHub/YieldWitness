"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { articles } from "@/constants";
import truncateText from "../helpers/truncateText";

/**
 * LatestFeed.jsx
 * - Uses Tailwind for styling
 * - No custom Card components needed
 */

const LatestFeed = ({ posts, loading }) => {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState({});

  function categoryBadgeClass(category) {
    // returns background color classes for main categories
    switch (category.toLowerCase()) {
      case "finance":
        return "bg-[#0EA5A4]"; // teal
      case "tech":
        return "bg-[#2563EB]"; // blue
      case "insurance":
        return "bg-yellow-500";
      case "law":
        return "bg-purple-600";
      default:
        return "bg-gray-400";
    }
  }

  function toggleBookmark(id) {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  async function handleShare(e, post) {
    e.stopPropagation();
    const url = `${typeof window !== "undefined" ? window.location.origin : ""}/post/${post.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url,
        });
      } catch (err) {
        // user cancelled or error
        console.log(err);
        
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      // lightweight UI feedback; replace with toast in a real app
      window.alert("Link copied to clipboard");
    }
  }

  // Build feed items and inject ad card after every 4th article
  const feedItems = [];

  if (!loading) {
    posts.forEach((post, idx) => {
      feedItems.push(
        <article
          key={post._id}
          role="button"
          tabIndex={0}
          onClick={() => router.push(`/post/${post.slug}`)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") router.push(`/post/${post.slug}`);
          }}
          className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#0EA5A4] cursor-pointer"
        >
          {/* Image */}
          <div className="w-full h-48 md:h-44 overflow-hidden">
            <img
              src={post.thumbnail}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
  
          {/* Content */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-semibold px-2 py-1 rounded text-white ${categoryBadgeClass(
                  post.category
                )}`}
              >
                {post.category}
              </span>
  
              {/* {post.sponsored && (
                <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-700">
                  Sponsored
                </span>
              )} */}
            </div>
  
            <h3 className="mt-3 text-[14px] md:text-lg font-semibold text-[#0F172A] leading-tight">
              {truncateText(post.title, 50)}
            </h3>
  
            <p className="mt-2 text-[12px] md:text-sm text-[#64748B]">
              {truncateText(post.excerpt, 100)}
            </p>
  
            <div className="mt-3 flex items-center justify-between text-xs text-[#64748B]">
              <div>
                By {post.author} • {post.readTime}
              </div>
  
              <div className="flex items-center gap-3">
                {/* Bookmark */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(post._id);
                  }}
                  aria-label="Bookmark"
                  className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-[#0EA5A4]"
                >
                  {bookmarked[post._id] ? (
                    /* filled bookmark (svg) */
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#0EA5A4]" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 2a2 2 0 00-2 2v13l7-4 7 4V4a2 2 0 00-2-2H5z" />
                    </svg>
                  ) : (
                    /* outline bookmark (svg) */
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5v14l7-4 7 4V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
                    </svg>
                  )}
                </button>
  
                {/* Share */}
                <button
                  onClick={(e) => handleShare(e, post)}
                  aria-label="Share"
                  className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 8a3 3 0 10-2.83-4H9a3 3 0 100 6h3.17A3 3 0 1015 8zM8 20v-2a2 2 0 012-2h4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </article>
      );
  
      // Insert native ad card after every 4th article
      if ((idx + 1) % 4 === 0) {
        feedItems.push(
          <div
            key={`ad-${idx}`}
            className="md:col-span-2 bg-gray-50 border border-dashed border-gray-200 rounded p-6 flex items-center justify-center text-sm text-gray-500"
          >
            {/* Desktop: spans both columns; Mobile: full width */}
            Native Ad — your ad goes here (responsive)
          </div>
        );
      }
    });
  
  } else {
    articles.forEach((article, idx) => {
      feedItems.push(
        <article
          key={article.id}
          role="button"
          tabIndex={0}
          onClick={() => router.push(`/post/${article.id}`)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") router.push(`/posts/${article.id}`);
          }}
          className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#0EA5A4] cursor-pointer"
        >
          {/* Image */}
          <div className="w-full h-48 md:h-44 overflow-hidden">
            <img
              src={article.thumbnail}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              {/* <span
                className={`text-xs font-semibold px-2 py-1 rounded text-white ${categoryBadgeClass(
                  article.category
                )}`}
              >
                {article.category}
              </span> */}

              {/* {article.sponsored && (
                <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-700">
                  Sponsored
                </span>
              )} */}
            </div>

            <h3 className="mt-3 text-lg font-semibold text-[#0F172A] leading-tight">
              []
            </h3>

            <p className="mt-2 text-sm text-[#64748B]">
              []
            </p>

            <div className="mt-3 flex items-center justify-between text-xs text-[#64748B]">
              <div>
                By {article.author}
              </div>

              <div className="flex items-center gap-3">
                {/* Bookmark */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(article.id);
                  }}
                  aria-label="Bookmark"
                  className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-[#0EA5A4]"
                >
                  {bookmarked[article.id] ? (
                    /* filled bookmark (svg) */
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#0EA5A4]" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 2a2 2 0 00-2 2v13l7-4 7 4V4a2 2 0 00-2-2H5z" />
                    </svg>
                  ) : (
                    /* outline bookmark (svg) */
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5v14l7-4 7 4V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
                    </svg>
                  )}
                </button>

                {/* Share */}
                <button
                  onClick={(e) => handleShare(e, article)}
                  aria-label="Share"
                  className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 8a3 3 0 10-2.83-4H9a3 3 0 100 6h3.17A3 3 0 1015 8zM8 20v-2a2 2 0 012-2h4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </article>
      );

      // Insert native ad card after every 4th article
      if ((idx + 1) % 4 === 0) {
        feedItems.push(
          <div
            key={`ad-${idx}`}
            className="md:col-span-2 bg-gray-50 border border-dashed border-gray-200 rounded p-6 flex items-center justify-center text-sm text-gray-500"
          >
            {/* Desktop: spans both columns; Mobile: full width */}
            Native Ad — your ad goes here (responsive)
          </div>
        );
      }
    });
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {feedItems}
      </div>
    </section>
  );
}

export default LatestFeed