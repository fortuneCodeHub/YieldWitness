import React from 'react'

const Preloader = () => {
  return (
    <>
        <div className="bg-white relative min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center relative">
                {/* Book animation */}
                <div className="book w-24 h-24 relative mx-auto">
                    <div className="page"></div>
                    <div className="page"></div>
                    <div className="page"></div>
                </div>
        
                <p className="mt-6 text-gray-600 font-medium animate-pulse">
                    Loading your dashboard...
                </p>
            </div>

            <style jsx>{`
                .book {
                    perspective: 1000px;
                    // background-color: red;
                }
                .page {
                    width: 100%;
                    height: 100%;
                    background: #f8fafc;
                    border: 2px solid #e5e7eb;
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform-origin: left center;
                    animation: flip 1.5s infinite ease-in-out;
                }
                .page:nth-child(2) {
                    animation-delay: 0.3s;
                }
                .page:nth-child(3) {
                    animation-delay: 0.6s;
                }
                @keyframes flip {
                    0% {
                    transform: rotateY(0deg);
                    }
                    50% {
                    transform: rotateY(-180deg);
                    }
                    100% {
                    transform: rotateY(-360deg);
                    }
                }
                `}
            </style>
        </div>
    </>
  )
}

export default Preloader
