'use client'
import Footer from '@/components/ui/Footer'
import Header from '@/components/ui/Header'
import RowFeed from '@/components/ui/RowFeed'
import TopBar from '@/components/ui/TopBar'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MonetagBanner from '../ads/MonetagBanner'

const CategoryContent = ({ category, name }) => {

    const { data: posts, postLoading, postError } = useSelector((state) => state.post);

    // Posts states to display data dynamically
    const [rowFeeds, setRowFeeds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!postLoading && Array.isArray(posts) && posts.length > 0) {
            // Filter posts belonging to the category given
            const newPosts = posts.filter(
                (post) => post.category?.toLowerCase() === category
            );

            // Shuffle and set
            const rows = createRowFeedsData(newPosts);
            setRowFeeds(rows);
            setLoading(false);
        }
    }, [posts, postLoading]);

    // Helper: Shuffle Function
    const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

    // ROW FEEDS
    // Shuffle all posts
    const createRowFeedsData = (posts) => {
        return shuffleArray(posts);
    };


  return (
    <>
        <div className="font-sans bg-background text-foreground min-h-screen relative">
           
           {/* Right Ad */}
            <div
                className="fixed hidden bg-gray-50 border border-dashed border-gray-200 rounded p-6 xl:flex items-center justify-center text-sm text-gray-500 w-[120px] h-[400px] top-40 right-2"
            >
                {/* Desktop: spans both columns; Mobile: full width */}
                <MonetagBanner zone="10294151" />
            </div>

            {/* Left Ad */}
            <div
                // key={`ad-${idx}`}
                className="fixed hidden bg-gray-50 border border-dashed border-gray-200 rounded p-6 xl:flex items-center justify-center text-sm text-gray-500 w-[120px] h-[400px] top-40 left-2"
            >
                {/* Desktop: spans both columns; Mobile: full width */}
                <MonetagBanner zone="10294153" />
            </div>

            {/* Top utility bar */}
            <TopBar />
            {/* Navigation bar */}
            <Header />
            {/* Row Feed */}
            <RowFeed 
             feedName={name ? name : category}
             posts={rowFeeds}
             loading={loading}
            />
            {/* Footer */}
            <Footer />
        </div>
    </>
  )
}

export default CategoryContent
