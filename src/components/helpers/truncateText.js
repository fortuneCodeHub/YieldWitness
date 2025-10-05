const truncateText = (text, limit) => {
    return text.length > limit ? `${text.slice(0, limit)}...` : text;
};

export default truncateText