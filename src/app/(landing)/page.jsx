// 'use client'
import MonetagBanner from "@/components/ads/MonetagBanner";
import { getAllPosts } from "@/components/helpers/getPost";
import AdPageDisplay from "@/components/ui/AdPageDisplay";
import ImageAd from "@/components/ui/ads/ImageAd";
import VideoAd from "@/components/ui/ads/VideoAd";
import EditorsPicks from "@/components/ui/EditorsPicks";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import LatestFeed from "@/components/ui/LatestFeed";
import RowFeed from "@/components/ui/RowFeed";
import TopBar from "@/components/ui/TopBar";
import Image from "next/image";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";


// Helper functions
const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

// HERO POSTS
const createHeroPostsData = (posts) => {
  const categories = ["finance", "tech", "insurance"];
  const heroCandidates = [];

  categories.forEach((cat) => {
    const categoryPosts = posts
      .filter((post) => post.category === cat)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (categoryPosts.length > 0) heroCandidates.push(categoryPosts[0]);
  });

  if (heroCandidates.length < 5) {
    const remaining = posts.filter(
      (p) => !heroCandidates.some((h) => h._id === p._id)
    );
    heroCandidates.push(...shuffleArray(remaining).slice(0, 5 - heroCandidates.length));
  }

  return heroCandidates.slice(0, 5);
};

// LATEST FEEDS
const createLatestFeedsData = (posts, heroPosts = []) => {
  const excludedIds = heroPosts.map((h) => h._id);
  const remaining = posts.filter((p) => !excludedIds.includes(p._id));
  return shuffleArray(remaining).slice(0, 8);
};

// EDITOR’S PICKS
const createEditorsPicksData = (posts) => shuffleArray(posts).slice(0, 5);

// ROW FEEDS
const createRowFeedsData = (posts) => shuffleArray(posts);

export default async function Home() {
  const posts = await getAllPosts()

  const heroPosts = createHeroPostsData(posts);
  const latestFeeds = createLatestFeedsData(posts, heroPosts);
  const editorsPicks = createEditorsPicksData(posts);
  const rowFeeds = createRowFeedsData(posts);

  const loading = false;

  return (
    <div className="font-sans bg-background text-foreground min-h-screen relative">
      <AdPageDisplay 
        leftTag={VideoAd}
        rightTag={VideoAd}
        leftUrl="/assets/ads/videos/flash-sale-winter.mp4"
        rightUrl="/assets/ads/videos/sale-discount.mp4"
      />

      {/* Top utility bar */}
      <TopBar post={heroPosts[0]} />
      {/* Navigation bar */}
      <Header post={heroPosts[0]} />
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

// export default Home
// SSR: Fetch posts on each request
// export async function getServerSideProps() {
//   try {
    
//     const posts = await getAllPosts()

//     return {
//       props: { posts },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: { posts: [] },
//     };
//   }
// }
