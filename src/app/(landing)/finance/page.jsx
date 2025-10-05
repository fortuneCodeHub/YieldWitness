'use client'
import Footer from '@/components/ui/Footer'
import Header from '@/components/ui/Header'
import RowFeed from '@/components/ui/RowFeed'
import TopBar from '@/components/ui/TopBar'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Finance = () => {

    const { data: posts, postLoading, postError } = useSelector((state) => state.post);

    // Posts states to display data dynamically
    const [rowFeeds, setRowFeeds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!postLoading && Array.isArray(posts) && posts.length > 0) {
            // Filter finance posts only
            const financePosts = posts.filter(
                (post) => post.category?.toLowerCase() === "finance"
            );

            // Shuffle and set
            const rows = createRowFeedsData(financePosts);
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
            {/* Row Feed */}
            <RowFeed 
             feedName="Finance"
             posts={rowFeeds}
             loading={loading}
            />
            {/* Footer */}
            <Footer />
        </div>
    </>
  )
}

export default Finance
