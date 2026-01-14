import { headers } from "next/headers";

export async function GET() {
  const headersList = await headers(); // ✅ MUST be awaited

  const host = headersList.get("host");
  const protocol =
    process.env.NODE_ENV === "production" ? "https" : "http";

  const baseUrl = `${protocol}://${host}`;

  const response = await fetch(`${baseUrl}/api/auth/posts`, {
    cache: "no-store",
  });

  const { posts } = await response.json();

  const siteUrl = "https://www.yieldnvest.com";

  const rssItems = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/post/${post.slug}</link>
      <guid>${siteUrl}/post/${post.slug}</guid>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt || ""}]]></description>
    </item>
  `
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Yieldnvest</title>
    <link>${siteUrl}</link>
    <description>Personal finance, tech, and sustainable money thinking</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
