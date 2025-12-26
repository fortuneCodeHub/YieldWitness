'use client'
import MonetagBanner from "@/components/ads/MonetagBanner";
import AdPageDisplay from "@/components/ui/AdPageDisplay";
import VideoAd from "@/components/ui/ads/VideoAd";
import Header from "@/components/ui/Header";
import TopBar from "@/components/ui/TopBar";

const Invalid = () => {

    return (
      <>
        <div className="font-sans bg-background text-foreground min-h-screen relative">

            {/* Page Ads Display */}
            <AdPageDisplay
                leftTag={VideoAd}
                rightTag={VideoAd}
                leftUrl="/assets/ads/videos/flash-sale-winter.mp4"
                rightUrl="/assets/ads/videos/fashion-women.mp4"
            />

            {/* Top utility bar */}
            <TopBar />
            {/* Navigation bar */}
            <Header />

            <div className="max-w-3xl mx-auto flex flex-col items-center justify-center h-[80vh] text-center px-4">
                {/* Subtle animated 404 */}
                <h1 className="russo-one-regular text-[6rem] md:text-[8rem] font-bold text-gray-800 dark:text-gray-200 animate-pulse">
                    404
                </h1>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-semibold mt-2 text-gray-700 dark:text-gray-300">
                    Page Not Found
                </h2>

                {/* Gentle description */}
                <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-md">
                    Sorry, the page you’re looking for doesn’t exist.  
                    Maybe head back and keep reading something inspiring ✨
                </p>

                {/* Home link */}
                <a
                    href="/"
                    className="mt-6 px-5 py-2 rounded-md border border-gray-300 dark:border-[#0EA5A4] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#0EA5A4] transition-colors duration-200"
                >
                    ← Back to Home
                </a>
            </div>


        </div>
      </>
    )
  }
  
  export default Invalid