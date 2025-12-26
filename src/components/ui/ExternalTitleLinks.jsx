import React from "react";
import truncateText from "../helpers/truncateText";

export default function ExternalTitleLinks({
  as: Tag = "h2",
  href = "https://otieu.com/4/10292310",
  children,
  className = "",
  mainClassName = "A9FQ2X7M",
  truncate = true,
}) {
  const handleOpen = () => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <div className={mainClassName}>
      <Tag
        className={`cursor-pointer font-bold leading-tight ${className}`}
        role="link"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
      >
      {truncate ? truncateText(children) : children}
      </Tag>
    </div>
  );
}
