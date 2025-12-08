import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import "../styles/globals.css";
import ReduxLandingProvider from "@/components/hooks/ReduxLandingProvider";
import Script from "next/script";
import AnalyticsTracker from "@/components/ui/AnalyticsTracker";
import CookieBanner from "@/components/ui/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://www.yieldnvest.com/'),
  title: {
    default: "YieldInvest: Smarter Blogging for Personal Finance, Tech & Insurance",
    template: "%s - YieldInvest: Smarter Blogging for Personal Finance, Tech & Insurance"
  },
  description:
    "YieldInvest is a modern blogging platform focused on personal finance, technology, markets, insurance, and law. Explore expert insights, data-driven analysis, and well-researched guides crafted for professionals and curious readers.",
  keywords: [
    "YieldInvest",
    "personal finance blog",
    "tech blog",
    "market analysis",
    "investment insights",
    "financial technology",
    "insurance blog",
    "law blog",
    "legal insights",
    "business law articles",
    "AI blogging tools",
    "Next.js blog",
    "modern blogging platform",
    "financial literacy",
    "insurance trends",
    "legal technology",
    "FinTech",
    "InsurTech",
    "blog builder"
  ],
  openGraph: {
    title: "YieldInvest: Smarter Blogging for Personal Finance, Tech & Insurance",
    description:
      "Discover YieldInvest — a next-generation blogging platform for personal finance, technology and insurance. Read expert guides, market updates, and legal insights written by professionals and enthusiasts.",
    url: "https://www.yieldnvest.com/",
    siteName: "YieldInvest",
    images: [
      {
        // url: "/assets/projects/yieldInvest-preview.png",
        width: 1200,
        height: 630,
        alt: "YieldInvest Blog Platform"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "YieldInvest: Smart Blog for Finance, Tech, Insurance & Law",
    description:
      "Join YieldInvest — your go-to source for personal finance, technology and insurance blogs. Explore expert insights and analysis on modern industries.",
    // images: ["/assets/projects/yieldInvest-preview.png"],
    creator: "@yieldInvest"
  },
  alternates: {
    canonical: "https://www.yieldnvest.com/"
  },
};


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // normal, semi-bold, bold
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

        {/* ⭐ Monetag Meta Tag */}
        <meta
          name="monetag"
          content="27d26179399fa6522376f6ef50247398"
        />

        {/* ⭐ Google AdSense Meta Tag */}
        <meta
          name="google-adsense-account"
          content="ca-pub-6125522055453874"
        />

        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-H1QYN3T4M0`}
          strategy="afterInteractive"
        />
        {/* <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H1QYN3T4M0', {
              page_path: window.location.pathname,
            });
          `}
        </Script> */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H1QYN3T4M0');
          `}
        </Script>

        {/* ⭐ Grow by Mediavine — MUST keep the initializer attribute */}
        <script
          suppressHydrationWarning
          data-grow-initializer=""
          dangerouslySetInnerHTML={{
            __html: `
              !(function(){
                window.growMe || (
                  (window.growMe = function(e){window.growMe._.push(e);}),
                  (window.growMe._ = [])
                );
                var e = document.createElement("script");
                e.type = "text/javascript";
                e.src = "https://faves.grow.me/main.js";
                e.defer = true;
                e.setAttribute("data-grow-faves-site-id",
                  "U2l0ZTowN2QyODY5OC1jYmI5LTQ4NjYtYjIzYy1iYTA4Nzg0NDEyN2U="
                );
                var t = document.getElementsByTagName("script")[0];
                t.parentNode.insertBefore(e, t);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} ${poppins.className} antialiased`}
      >
        <AnalyticsTracker /> {/* 👈 placed here once */}
        <ReduxLandingProvider>
          {children}
        </ReduxLandingProvider>

        <CookieBanner />
      </body>
    </html>
  );
}
