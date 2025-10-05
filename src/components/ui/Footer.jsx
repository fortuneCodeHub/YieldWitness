import { Facebook, Twitter, Linkedin, Rss } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* About */}
        <div>
            <div className="mb-5">
                <Link href="/" className="relative text-2xl font-bold poppins-bold-italic">
                    <span className="text-[#0EA5A4]">Yield</span>
                    <span className="text-gray-400">Witness</span>
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0EA5A4]"></span>
                </Link>
            </div>
            <h3 className="text-white font-semibold text-lg mb-4">About</h3>
            <p className="text-sm leading-relaxed">
                A modern blog covering Finance & Tech news, insights, and analysis. 
                Our mission is to simplify complex topics for everyday readers.
            </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Finance</a></li>
            <li><a href="#" className="hover:text-white">Tech</a></li>
            <li><a href="#" className="hover:text-white">Markets</a></li>
            {/* <li><a href="#" className="hover:text-white">Analysis</a></li> */}
            <li><a href="#" className="hover:text-white">Guides</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">Advertise</a></li>
            <li><a href="#" className="hover:text-white">Sitemap</a></li>
            <li><a href="#" className="hover:text-white">RSS Feed</a></li>
          </ul>
        </div>

        {/* Social + Small Ad */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
          <div className="flex gap-4 mb-6">
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
              <Rss className="h-5 w-5" />
            </a>
          </div>

          {/* Optional Tiny Footer Ad */}
          <div className="w-full h-20 bg-gray-800 flex items-center justify-center text-gray-400 text-xs">
            728×90 Ad Space
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} YieldWitness. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer