import AdContainer from "./AdContainer";

export default function VideoAd({
    href = "https://otieu.com/4/10292310",
  src,
  width,
  height,
  className = "",
  autoplay = true,
  muted = true,
  loop = true,
  controls = false,
  poster,
  mainClassName = "A9FQ2X7M",
  objectFit = "object-cover"
}) {
  return (
    <AdContainer width={width} height={height} className={className} mainClassName={mainClassName}>
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="block w-full h-full"
        >
            <video
                className={`w-full h-full pointer-events-none ${objectFit}`}
                src={src}
                autoPlay={autoplay}
                muted={muted}
                loop={loop}
                controls={controls}
                playsInline
                poster={poster}
            />
        </a>
    </AdContainer>
  );
}