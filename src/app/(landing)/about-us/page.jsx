import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import TopBar from "@/components/ui/TopBar";
import Link from "next/link";

export const metadata = {
    title: "About Us - YieldInvest: Finance, Tech, Insurance & Law Blog",
    description:
      "Learn about YieldInvest — a modern blog dedicated to finance, technology, insurance, and law. Our mission is to make complex topics simple and insightful for everyone.",
};
  
export default function AboutPage() {
    return (
      <>
        {/* Top utility bar */}
        <TopBar />
        {/* Navigation bar */}
        <Header />
        <section className="max-w-5xl mx-auto px-6 py-20 text-gray-800">

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center">
              About
              <Link href="/" className="relative font-bold poppins-bold-italic ms-3">
                  <span className="text-[#0EA5A4]">Yield</span>
                  <span className="text-[#0F172A]">Invest</span>
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0EA5A4]"></span>
              </Link>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto text-center">
              Your digital window into the world of finance, technology, insurance, and law.
            </p>
          </div>
    
          <div className="space-y-10 text-lg leading-relaxed text-center">
            <p>
              <strong>YieldInvest</strong> is more than just a blog — it’s a platform for thinkers,
              professionals, and everyday readers who want to stay ahead of change. We simplify complex
              ideas across <span className="font-semibold">finance, tech, insurance, and law</span> —
              delivering insights that inform, inspire, and empower.
            </p>
    
            <p>
              Our mission is simple: to bridge the gap between industries and ideas. Whether it’s
              decoding blockchain’s role in banking, exploring AI in legal systems, or analyzing the
              future of digital insurance, we bring depth and clarity to every topic we touch.
            </p>
    
            <div className="border-l-4 border-blue-600 pl-6 italic text-gray-700">
              “At YieldInvest, we believe knowledge should be accessible, practical, and deeply human.
              Every story we publish carries a purpose — to help you make better, smarter decisions.”
            </div>
    
            <p>
              Founded by passionate writers and developers, YieldInvest merges technology with
              storytelling to create a space that feels personal and professional at once. Our readers
              include investors, entrepreneurs, legal experts, students, and everyday curious minds
              looking to understand the trends shaping our world.
            </p>
    
            <p>
              We are constantly evolving, driven by curiosity and guided by truth. If you share our
              passion for meaningful insights, we invite you to explore our latest posts and become part
              of the YieldInvest community.
            </p>
          </div>
    
          <div className="mt-16 text-center">
            <a
              href="/"
              className="inline-block bg-[#0EA5A4] text-white px-8 py-3 rounded-full font-medium hover:bg-[#6eebeb] transition-colors"
            >
              Explore Latest Articles
            </a>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </>
    );
}
  