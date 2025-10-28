import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import "../styles/globals.css";
import ReduxLandingProvider from "@/components/hooks/ReduxLandingProvider";
import Script from "next/script";
import AnalyticsTracker from "@/components/ui/AnalyticsTracker";

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
    default: "YieldInvest: Smarter Blogging for Finance, Tech, Markets, Insurance & Law",
    template: "%s - YieldInvest: Finance, Tech, Markets, Insurance & Law"
  },
  description:
    "YieldInvest is a modern blogging platform focused on finance, technology, markets, insurance, and law. Explore expert insights, data-driven analysis, and well-researched guides crafted for professionals and curious readers.",
  keywords: [
    "YieldInvest",
    "finance blog",
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
    title: "YieldInvest: Smarter Blogging for Finance, Tech, Markets, Insurance & Law",
    description:
      "Discover YieldInvest — a next-generation blogging platform for finance, technology, markets, insurance, and law. Read expert guides, market updates, and legal insights written by professionals and enthusiasts.",
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
      "Join YieldInvest — your go-to source for finance, technology, insurance, and law blogs. Explore expert insights and analysis on modern industries.",
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
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-H1QYN3T4M0"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H1QYN3T4M0', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} ${poppins.className} antialiased`}
      >
        <AnalyticsTracker /> {/* 👈 placed here once */}
        <ReduxLandingProvider>
          {children}
        </ReduxLandingProvider>
      </body>
    </html>
  );
}
