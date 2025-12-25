"use client";

import { useRouter } from "next/navigation";
import truncateText from "../helpers/truncateText";
import MonetagSimpleBanner from "../ads/MonetagSimpleBanner";

const EditorsPicks = ({ posts, loading }) => {
  const router = useRouter();

  const picks = [
    {
      id: "1",
      title: "The Rise of Decentralized Finance in 2025",
      excerpt:
        "Decentralized finance has grown into a trillion-dollar ecosystem, disrupting traditional banking models. This deep dive explores risks, opportunities, and the future trajectory of DeFi adoption.",
      category: "Finance",
      thumbnail: "https://source.unsplash.com/800x500/?finance,blockchain",
      readTime: "12 min read",
      color: "bg-[#0EA5A4]",
    //   toc: "View TOC",
    },
    {
      id: "2",
      title: "Big Tech’s Bet on Quantum: Are We Ready?",
      excerpt:
        "Quantum breakthroughs could shift global power dynamics in cybersecurity, AI, and logistics. We examine how Google, IBM, and startups are positioning themselves in this emerging race.",
      category: "Tech",
      thumbnail: "https://source.unsplash.com/800x500/?quantum,technology",
      readTime: "15 min read",
      color: "bg-[#2563EB]",
    //   toc: "View TOC",
    },
    {
      id: "3",
      title: "Global Inflation Trends and Market Resilience",
      excerpt:
        "With inflation cooling in some regions but persisting in others, investors face uncertainty. This editorial analyzes macroeconomic policies shaping the next decade of global markets.",
      category: "Markets",
      thumbnail: "https://source.unsplash.com/800x500/?inflation,market",
      readTime: "10 min read",
      color: "bg-yellow-500",
    //   toc: "View TOC",
    },
    {
      id: "4",
      title: "AI Ethics: The Coming Debate in Finance",
      excerpt:
        "From bias in lending algorithms to automated wealth advice, this deep dive unpacks the ethical considerations around AI adoption in global finance.",
      category: "Guides",
      thumbnail: "https://source.unsplash.com/800x500/?ai,ethics",
      readTime: "14 min read",
      color: "bg-purple-600",
    //   toc: "View TOC",
    },
  ];

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

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Editor’s Picks</h2>

      {/* Horizontal scroll container */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        { loading ? (   
          picks.map((pick) => (
            <article
              key={pick.id}
              role="button"
              tabIndex={0}
              onClick={() => router.push(`/post/${pick.id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") router.push(`/post/${pick.id}`);
              }}
              className="max-w-[350px] md:max-w-[400px] lg:max-w-[500px] bg-white rounded-lg shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#0EA5A4] cursor-pointer flex-shrink-0"
            >
              {/* Image */}
              <div className="w-full h-40 overflow-hidden rounded-t-lg">
                <img
                  src={pick.thumbnail}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col justify-between h-48">
                <div>
                  {/* <span className={`inline-block text-xs font-semibold px-2 py-1 rounded text-white ${pick?.color ? pick?.color : 'bg-[#2563EB]'}`}>
                    {pick.category}
                  </span> */}

                  <h3 className="mt-2 text-lg font-semibold text-[#0F172A] leading-snug line-clamp-2">
                    []
                  </h3>

                  <p className="mt-2 text-sm text-[#64748B] line-clamp-3">
                    {pick.excerpt}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-[#64748B]">
                  <span className="px-2 py-1 bg-gray-100 rounded">
                    {pick.readTime}
                  </span>
                  {/* <span className="text-[#0EA5A4] font-medium hover:underline">
                    {pick.toc}
                  </span> */}
                </div>
              </div>
            </article>
          ))
        ) : (
          posts.map((post) => (
            <article
              key={post._id}
              role="button"
              tabIndex={0}
              onClick={() => router.push(`/post/${post.slug}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") router.push(`/post/${post.slug}`);
              }}
              className="max-w-[350px] md:max-w-[400px] lg:max-w-[500px] bg-white rounded-lg shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#0EA5A4] cursor-pointer flex-shrink-0"
            >
              {/* Image */}
              <div className="w-full h-40 overflow-hidden rounded-t-lg">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col justify-between h-48">
                <div>
                  <span className={`inline-block text-xs font-semibold px-2 py-1 rounded text-white ${categoryBadgeClass(post.category)}`}>
                    {post?.category === "finance" ? "personal-finance" : post.category}
                  </span>

                  <h3 className="mt-2 text-[14px] md:text-lg font-semibold text-[#0F172A] leading-snug line-clamp-2">
                    {truncateText(post.title, 50)}
                  </h3>

                  <p className="mt-2 text-[10px] md:text-sm text-[#64748B] line-clamp-3">
                    {truncateText(post.excerpt, 100)}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-[#64748B]">
                  <span className="px-2 py-1 bg-gray-100 rounded">
                    {post.readTime}
                  </span>
                  {/* <span className="text-[#0EA5A4] font-medium hover:underline">
                    {pick.toc}
                  </span> */}
                </div>
              </div>
            </article>
          ))
        ) }
      </div>

      {/* Inline ad space */}
      <div className="mt-8 bg-white rounded h-20 flex items-center justify-center text-sm text-gray-500">
        {/* <MonetagSimpleBanner zone="10294153" /> */}
      </div>
    </section>
  );
};

export default EditorsPicks;
