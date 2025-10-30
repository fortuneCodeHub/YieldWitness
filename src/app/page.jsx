'use client'
import EditorsPicks from "@/components/ui/EditorsPicks";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import LatestFeed from "@/components/ui/LatestFeed";
import RowFeed from "@/components/ui/RowFeed";
import TopBar from "@/components/ui/TopBar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {

  const { data: posts, postLoading, postError } = useSelector((state) => state.post);

  // Posts states to display data dynamically
  const [heroPosts, setHeroPosts] = useState([]);
  const [latestFeeds, setLatestFeeds] = useState([]);
  const [editorsPicks, setEditorsPicks] = useState([]);
  const [rowFeeds, setRowFeeds] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!postLoading && Array.isArray(posts) && posts.length > 0) {
      const heroes = createHeroPostsData(posts);
      const latest = createLatestFeedsData(posts, heroes);
      const editors = createEditorsPicksData(posts);
      const rows = createRowFeedsData(posts);

      setHeroPosts(heroes);
      setLatestFeeds(latest);
      setEditorsPicks(editors);
      setRowFeeds(rows);
      setLoading(false)
    }
    console.log(posts);
    
  }, [posts, postLoading]);

  // Helper: Shuffle Function
  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

  // HERO POSTS
  // Get the latest post from each category (finance, tech, markets, guides).
  // If any is missing, fill up with other random posts until there are 4 total.
  const createHeroPostsData = (posts) => {
    const categories = ["finance", "tech", "insurance", "laws", "markets", "guides"];
    const heroCandidates = [];

    categories.forEach((cat) => {
      const categoryPosts = posts
        .filter((post) => post.category === cat)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      if (categoryPosts.length > 0) {
        heroCandidates.push(categoryPosts[0]);
      }
    });

    // Fill remaining slots if we have less than 4 hero posts
    if (heroCandidates.length < 4) {
      const remaining = posts.filter(
        (p) => !heroCandidates.some((h) => h._id === p._id)
      );
      const shuffled = shuffleArray(remaining);
      heroCandidates.push(...shuffled.slice(0, 4 - heroCandidates.length));
    }

    return heroCandidates.slice(0, 4);
  };

  // LATEST FEEDS
  // Pick random posts not in heroPosts, max 8 posts
  const createLatestFeedsData = (posts, heroPosts = []) => {
    const excludedIds = heroPosts.map((h) => h._id);
    const remaining = posts.filter((p) => !excludedIds.includes(p._id));
    return shuffleArray(remaining).slice(0, 8);
  };

  // EDITOR’S PICKS
  // Random selection, up to 5 posts
  const createEditorsPicksData = (posts) => {
    return shuffleArray(posts).slice(0, 5);
  };

  // ROW FEEDS
  // Shuffle all posts
  const createRowFeedsData = (posts) => {
    return shuffleArray(posts);
  };


  return (
    <div className="font-sans bg-background text-foreground min-h-screen relative">
      {/* Right Ad */}
      <div
        className="fixed hidden bg-gray-50 border border-dashed border-gray-200 rounded p-6 xl:flex items-center justify-center text-sm text-gray-500 w-[120px] h-[400px] top-40 right-2"
      >
        {/* Desktop: spans both columns; Mobile: full width */}
        Native Ad — your ad goes here (responsive)
      </div>

      {/* Left Ad */}
      <div
        // key={`ad-${idx}`}
        className="fixed hidden bg-gray-50 border border-dashed border-gray-200 rounded p-6 xl:flex items-center justify-center text-sm text-gray-500 w-[120px] h-[400px] top-40 left-2"
      >
        {/* Desktop: spans both columns; Mobile: full width */}
        Native Ad — your ad goes here (responsive)
      </div>

      {/* Top utility bar */}
      <TopBar />
      {/* Navigation bar */}
      <Header />
      {/* Hero section */}
      <Hero posts={heroPosts} loading={loading} />
      {/* Latest Feed */}
      <LatestFeed posts={latestFeeds} loading={loading} />
      {/* Editors Picks */}
      <EditorsPicks posts={editorsPicks} loading={loading} />
      {/* Row Feed */}
      <RowFeed posts={rowFeeds} loading={loading} />
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home