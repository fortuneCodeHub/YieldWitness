"use client"
import Link from "next/link";
import { formatDate } from "../helpers/formatDate";
import truncateText from "../helpers/truncateText";

export default function Hero({ posts, loading }) {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        { loading ? (
            <>
                {/* Left: Large featured article */}
                <div className="lg:col-span-8 relative flex flex-col">
                    <div className="relative aspect-video rounded-lg mb-20 overflow-hidden shadow-sm">
                        <a href="">  
                            <img
                                src="https://source.unsplash.com/1200x675/?finance,technology"
                                alt=""
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                            {/* Overlay text */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <span className="inline-block text-xs font-semibold px-2 py-1 rounded bg-[#0EA5A4]">
                                    Finance
                                </span>
                                <h2 className="mt-3 text-2xl md:text-3xl font-bold leading-tight">
                                    []
                                </h2>
                                <p className="mt-2 text-sm text-gray-200 max-w-2xl">
                                    []
                                </p>
                                <div className="mt-3 text-xs text-gray-300">
                                    By Yielder
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="relative aspect-video rounded-lg mb-20 overflow-hidden shadow-sm">
                        <a href="">
                            <img
                                src="https://source.unsplash.com/1200x675/?finance,technology"
                                alt=""
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                            {/* Overlay text */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <span className="inline-block text-xs font-semibold px-2 py-1 rounded bg-[#2563EB]">
                                    Tech
                                </span>
                                <h2 className="mt-3 text-2xl md:text-3xl font-bold leading-tight">
                                    []
                                </h2>
                                <p className="mt-2 text-sm text-gray-200 max-w-2xl">
                                    []
                                </p>
                                <div className="mt-3 text-xs text-gray-300">
                                    By Jane Doe
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Right: Smaller featured cards + Ad */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Card 1 */}
                    <div className="relative rounded-lg overflow-hidden shadow-sm lg:aspect-[4/3] aspect-[16/9]">
                        <a href="">  
                            <div className="">
                                <img
                                src="https://source.unsplash.com/600x450/?technology"
                                alt=""
                                className="w-full h-full object-cover"
                                loading="lazy"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 p-4 text-white">
                                <span className="inline-block text-xs font-semibold px-2 py-1 rounded bg-yellow-500">
                                    Markets
                                </span>
                                <h3 className="mt-2 text-lg font-semibold leading-tight">
                                    []
                                </h3>
                            </div>
                        </a>
                    </div>

                    {/* Card 2 */}
                    <div className="relative rounded-lg overflow-hidden shadow-sm lg:aspect-[4/3] aspect-[16/9]">
                        <a href="">  
                            <div className="">
                                <img
                                src="https://source.unsplash.com/600x450/?stocks"
                                alt=""
                                className="w-full h-full object-cover"
                                loading="lazy"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 p-4 text-white">
                                <span className="inline-block text-xs font-semibold px-2 py-1 rounded bg-purple-600">
                                Guides
                                </span>
                                <h3 className="mt-2 text-lg font-semibold leading-tight">
                                    []
                                </h3>
                            </div>
                        </a>
                    </div>

                    {/* Ad slot (desktop only) */}
                    <div className="hidden lg:flex items-center justify-center bg-gray-100 text-gray-500 rounded w-full h-[400px]">
                    Ad Space 300×600
                    </div>
                </div>
            </>
        ) : (
            <>
                {/* Left: Large featured articles */}
                <div className="lg:col-span-8 relative flex flex-col">
                    {posts.slice(0, 2).map((post, i) => (
                    <div key={post._id} className="relative aspect-video rounded-lg mb-10 overflow-hidden shadow-sm">
                        <a href={`/post/${post.slug}`}>
                        <img
                            src={post.thumbnail || "https://source.unsplash.com/1200x675/?news"}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <span
                            className={`inline-block text-xs  font-semibold px-2 py-1 rounded ${
                                post.category === "finance"
                                ? "bg-[#0EA5A4]"
                                : post.category === "tech"
                                ? "bg-[#2563EB]"
                                : post.category === "insurance"
                                ? "bg-yellow-500"
                                : post.category === "tech"
                                ? "bg-purple-600"
                                : "bg-gray-600"
                            }`}
                            >
                                {post?.category === "finance" ? "personal-finance" : post.category}
                            </span>
                            <h2 className="mt-3 text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                                {truncateText(post?.title, 70)}
                            </h2>
                            <p className="mt-2 text-[10px] md:text-sm text-gray-200 max-w-2xl md:block hidden">
                                {truncateText(post?.excerpt, 120)}
                            </p>
                            <div className="mt-3 text-xs text-gray-300 md:block hidden">
                                By {post.author} • {formatDate(post?.createdAt)}
                            </div>
                        </div>
                        </a>
                    </div>
                    ))}
                </div>

                {/* Right: Smaller featured cards + Ad */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {posts.slice(2, 5).map((post) => (
                    <div
                        key={post._id}
                        className="relative rounded-lg overflow-hidden shadow-sm lg:aspect-[4/3] aspect-[16/9]"
                    >
                        <a href={`/post/${post.slug}`}>
                        <img
                            src={post.thumbnail || "https://source.unsplash.com/600x450/?news"}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 p-4 text-white">
                            <span
                            className={`inline-block text-xs font-semibold px-2 py-1 rounded ${
                                post.category === "finance"
                                ? "bg-[#0EA5A4]"
                                : post.category === "tech"
                                ? "bg-[#2563EB]"
                                : post.category === "insurance"
                                ? "bg-yellow-500"
                                : post.category === "law"
                                ? "bg-purple-600"
                                : "bg-gray-600"
                            }`}
                            >
                            {post?.category === "finance" ? "personal-finance" : post.category}
                            </span>
                            <h3 className="mt-2 text-lg font-semibold leading-tight">
                                {truncateText(post?.title, 50)}
                            </h3>
                        </div>
                        </a>
                    </div>
                    ))}

                    {/* Ad slot (desktop only) */}
                    {/* <div className="hidden lg:flex items-center justify-center bg-gray-100 text-gray-500 rounded w-full h-[400px]">
                    Ad Space 300×600
                    </div> */}
                </div>
            </>

        ) }

      {/* Inline leaderboard ad (below hero, desktop only) */}
      <div className="flex lg:col-span-12 justify-center mt-4">
        <div className="bg-white w-[970px] h-[50px] flex items-center justify-center text-gray-500 rounded">
          
        </div>
      </div>
    </section>
  );
}
