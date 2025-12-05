'use client'
import Footer from '@/components/ui/Footer'
import Header from '@/components/ui/Header'
import RowFeed from '@/components/ui/RowFeed'
import TopBar from '@/components/ui/TopBar'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

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
