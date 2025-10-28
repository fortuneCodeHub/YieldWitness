import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import "../styles/globals.css";
import ReduxLandingProvider from "@/components/hooks/ReduxLandingProvider";

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
    default: "YieldWitness: Smarter Blogging for Finance, Tech, Markets, Insurance & Law",
    template: "%s - YieldWitness: Finance, Tech, Markets, Insurance & Law"
  },
  description:
    "YieldWitness is a modern blogging platform focused on finance, technology, markets, insurance, and law. Explore expert insights, data-driven analysis, and well-researched guides crafted for professionals and curious readers.",
  keywords: [
    "YieldWitness",
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
    title: "YieldWitness: Smarter Blogging for Finance, Tech, Markets, Insurance & Law",
    description:
      "Discover YieldWitness — a next-generation blogging platform for finance, technology, markets, insurance, and law. Read expert guides, market updates, and legal insights written by professionals and enthusiasts.",
    url: "https://www.yieldnvest.com/",
    siteName: "YieldWitness",
    images: [
      {
        // url: "/assets/projects/yieldwitness-preview.png",
        width: 1200,
        height: 630,
        alt: "YieldWitness Blog Platform"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "YieldWitness: Smart Blog for Finance, Tech, Insurance & Law",
    description:
      "Join YieldWitness — your go-to source for finance, technology, insurance, and law blogs. Explore expert insights and analysis on modern industries.",
    // images: ["/assets/projects/yieldwitness-preview.png"],
    creator: "@yieldwitness"
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} ${poppins.className} antialiased`}
      >
        <ReduxLandingProvider>{children}</ReduxLandingProvider>
      </body>
    </html>
  );
}
