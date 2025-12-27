export default function AdContainer({
    width = "100%",
    height = "auto",
    className = "",
    mainClassName,
    children,
}) {
  return (
    <div
      className={`relative overflow-hidden ${className} ${mainClassName}`}
      style={{
        width,
        height,
        display: "none",
        maxWidth: "100%",
      }}
    >
      {children}
    </div>
  );
}

// Responsive sidebar ad
// <ImageAd
//   src="/ads/sidebar.gif"
//   width="100%"
//   height="300px"
//   className="rounded-lg shadow"
// />

// Leaderboard ad
// <VideoAd
//   src="/ads/leaderboard.mp4"
//   width="728px"
//   height="90px"
// />
