import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MonetagVignette from "../ads/MonetagVignette";

const RelatedPosts = ({ post, posts }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const router = useRouter(0);

  useEffect(() => {
    if (post && Array.isArray(posts) && posts.length > 0) {
      // Shuffle posts
      const shuffled = [...posts].sort(() => Math.random() - 0.5);

      // console.log("Shuffled posts", shuffled);
      

      // Filter by same category (exclude current post)
      const sameCategory = shuffled.filter(
        (p) => p.category === post.category && p.slug !== post.slug
      );

      // console.log("Same Category", sameCategory);

      // Pick up to 3 related posts
      const related = sameCategory.slice(0, 3);

      setRelatedPosts(related);
    }
  }, [post, posts]);

  if (!post) return null;

  return (
    <section className="mt-16">
      <h3 className="text-xl font-semibold mb-6">Related Articles</h3>

      {relatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPosts.map((rel) => (
            <div
              key={rel._id}
              onClick={() => router.push(`/post/${rel.slug}`)}
              className="cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={rel.thumbnail}
                alt={rel.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h4 className="text-sm font-semibold text-gray-600">
                  {rel.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No related posts</p>
      )}

      <div
        className="md:col-span-2 bg-white rounded p-3 flex items-center justify-center text-sm text-gray-500"
      >
        {/* Desktop: spans both columns; Mobile: full width */}
        {/* Native Ad — your ad goes here (responsive) */}
        <MonetagVignette zone="10294168" />
      </div>
    </section>
  );
};

export default RelatedPosts;
