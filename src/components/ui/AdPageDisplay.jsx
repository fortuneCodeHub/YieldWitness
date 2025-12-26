import React from 'react'
import VideoAd from './ads/VideoAd'
import ImageAd from './ads/ImageAd'
import GifAd from './ads/GifAd'

export default function AdPageDisplay({
    leftTag: LeftTag = ImageAd,
    rightTag: RightTag = ImageAd,
    leftUrl,
    rightUrl,
    leftAdWidth = "100%",
    rightAdwidth = "100%",
    leftAdHeight = "100%",
    rightAdHeight = "100%",
    rightTagClassName = "",
    leftTagClassName = ""
}) {
  return (
    <>
        {/* Right Ad */}
        <div
            className={`fixed hidden bg-gray-50 border border-dashed border-gray-200 rounded xl:flex items-center justify-center text-sm text-gray-500 w-[140px] h-[400px] top-40 right-2 ${rightTagClassName}`}
        >
            {/* Desktop: spans both columns; Mobile: full width */}
            {/* <MonetagBanner zone="10294151" /> */}
            <RightTag
                src={rightUrl}
                width={rightAdwidth}
                height={rightAdHeight}
            />
        </div>

        {/* Left Ad */}
        <div
            // key={`ad-${idx}`}
            className={`fixed hidden bg-gray-50 border border-dashed border-gray-200 rounded xl:flex items-center justify-center text-sm text-gray-500 w-[120px] h-[400px] top-40 left-2 ${leftTagClassName}`}
        >
            {/* Desktop: spans both columns; Mobile: full width */}
            {/* <MonetagBanner zone="10294153" /> */}
            <LeftTag
                src={leftUrl}
                width={leftAdWidth}
                height={leftAdHeight}
            />
        </div>
    </>
  )
}
