import { headers } from "next/headers";

export default async function sitemap() {
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const baseUrl = `${protocol}://${host}`;

    const response = await fetch(`${baseUrl}/api/auth/posts`);
    const data = await response.json();
    const { posts } = data

    const postEntries = posts.map((post) => ({
        url: `https://www.yieldnvest.com/post/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        // changeFrequency: ,
        // priority: ,
    }))

    return [
        {
            url: `https://www.yieldnvest.com/`,
            lastModified: new Date()
        },
        {
            url: `https://www.yieldnvest.com/finance`,
            lastModified: new Date()
        },
        {
            url: `https://www.yieldnvest.com/tech`,
            lastModified: new Date()
        },
        {
            url: `https://www.yieldnvest.com/insurance`,
            lastModified: new Date()
        },
        {
            url: `https://www.yieldnvest.com/law`,
            lastModified: new Date()
        },
        {
            url: `https://www.yieldnvest.com/markets`,
            lastModified: new Date()
        },
        ...postEntries,
    ]
}