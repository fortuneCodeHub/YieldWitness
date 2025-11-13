"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import truncateText from "../helpers/truncateText";

const RowFeed = ({ feedName, posts = [], loading }) => {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedArticles, setPaginatedArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 5;

  function categoryBadgeClass(category = "") {
    switch (category.toLowerCase()) {
      case "finance":
        return "bg-[#0EA5A4]";
      case "tech":
        return "bg-[#2563EB]";
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
        console.log(err);
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      window.alert("Link copied to clipboard");
    }
  }

  // ✅ Fixed pagination effect
  useEffect(() => {
    if (!posts.length) return;

    const total = Math.ceil(posts.length / perPage);
    setTotalPages(total);

    const paginated = posts.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    );
    setPaginatedArticles(paginated);
  }, [posts, currentPage, loading]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 pb-9">
      <div className="lg:max-w-[75%] text-start">
        <h2 className="text-2xl font-bold mb-6 capitalize">
          All {feedName && feedName} Posts
        </h2>

        <div className="px-5">
          <div className="space-y-6">
            {!loading && paginatedArticles.length > 0 ? (
              paginatedArticles.map((post) => (
                <article
                  key={post._id}
                  role="button"
                  tabIndex={0}
                  onClick={() => router.push(`/post/${post.slug}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      router.push(`/post/${post.slug}`);
                  }}
                  className="bg-white rounded-lg shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#0EA5A4] cursor-pointer flex flex-col md:flex-row overflow-hidden"
                >
                  {/* Image */}
                  <div className="md:w-1/3 w-full h-48 md:h-60">
                    <img
                      src={post.thumbnail || "https://source.unsplash.com/600x400/?news"}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col justify-between md:w-2/3">
                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded text-white ${categoryBadgeClass(
                            post.category
                          )}`}
                        >
                          {post?.category === "finance" ? "personal-finance" : post.category}
                        </span>

                        {post.sponsored && (
                          <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-700">
                            Sponsored
                          </span>
                        )}
                      </div>

                      <h3 className="mt-3 text-[15px] md:text-lg font-semibold text-[#0F172A] leading-snug">
                        {truncateText(post.title, 50)}
                      </h3>

                      <p className="mt-2 text-[11px] md:text-sm text-[#64748B]">
                        {truncateText(post.excerpt, 80)}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-[#64748B]">
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
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-[#0EA5A4]"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M5 2a2 2 0 00-2 2v13l7-4 7 4V4a2 2 0 00-2-2H5z" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-[#64748B]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 5v14l7-4 7 4V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"
                              />
                            </svg>
                          )}
                        </button>

                        {/* Share */}
                        <button
                          onClick={(e) => handleShare(e, post)}
                          aria-label="Share"
                          className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-[#64748B]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 8a3 3 0 10-2.83-4H9a3 3 0 100 6h3.17A3 3 0 1015 8zM8 20v-2a2 2 0 012-2h4"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              !loading && (
                <p className="text-gray-500 text-center py-10">
                  No posts available.
                </p>
              )
            )}
          </div>

          {/* Pagination UI */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-[#0EA5A4] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Ad Slot */}
      <div className="md:col-span-2 bg-gray-50 border border-dashed border-gray-200 rounded p-6 flex items-center justify-center text-sm text-gray-500 mt-5">
        Native Ad — your ad goes here (responsive)
      </div>
    </section>
  );
};

export default RowFeed;
