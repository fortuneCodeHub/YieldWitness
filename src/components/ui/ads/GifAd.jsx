import AdContainer from "./AdContainer";

export default function GifAd({
    href = "https://otieu.com/4/10292310",
    src,
    alt = "Advertisement",
    width,
    height,
    className = "",
    objectFit = "cover",
    mainClassName="A9FQ2X7M"
}) {

  return (
    <AdContainer width={width} height={height} className={className} mainClassName={mainClassName}>
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="block w-full h-full"
        >
            <img
                src={src}
                alt={alt}
                className="w-full h-full"
                style={{ objectFit }}
                loading="lazy"
            />
        </a>
    </AdContainer>
  );
}