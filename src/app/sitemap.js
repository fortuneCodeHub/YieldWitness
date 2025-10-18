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
        url: `https://yieldwitness.vercel.app/post/${post._id}`,
        lastModified: new Date(post.updatedAt),
        // changeFrequency: ,
        // priority: ,
    }))

    return [
        {
            url: `https://yieldwitness.vercel.app/`,
            lastModified: new Date()
        },
        {
            url: `https://yieldwitness.vercel.app/finance`,
            lastModified: new Date()
        },
        {
            url: `https://yieldwitness.vercel.app/tech`,
            lastModified: new Date()
        },
        {
            url: `https://yieldwitness.vercel.app/investment`,
            lastModified: new Date()
        },
        {
            url: `https://yieldwitness.vercel.app/law`,
            lastModified: new Date()
        },
        {
            url: `https://yieldwitness.vercel.app/markets`,
            lastModified: new Date()
        },
        ...postEntries,
    ]
}