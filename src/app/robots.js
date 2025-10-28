export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/dashboard", "/api/protected", "/access"],
            }
        ],
        sitemap: `https://www.yieldnvest.com/sitemap.xml`
    }
}