"use client";

import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import Link from "next/link";

export default function Header({ post }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Handle sticky on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Personal Finance", href: "/personal-finance" },
    { name: "Tech", href: "/tech" },
    { name: "Insurance", href: "/insurance" },
    // { name: "Law", href: "/law" },
    // { name: "Markets", href: "/markets" },
  ];

  return (
    <>
      {/* Header */}
      <header
        className={`w-full z-50 transition-all ${
          isSticky ? "sticky top-0 bg-white shadow-sm py-2" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            {/* Left: Logo */}

            <Link href="/" className="relative text-2xl font-bold poppins-bold-italic">
                <span className="text-[#0EA5A4]">Yield</span>
                <span className="text-[#0F172A]">Invest</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0EA5A4]"></span>
            </Link>

            {/* Center: Nav (desktop) */}
            <nav className="hidden md:flex gap-6 text-sm text-[#0F172A] font-medium">
                {navLinks.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    className="hover:text-[#0EA5A4]"
                >
                    {link.name}
                </Link>
                ))}
            </nav>

            {/* Right: Search + Subscribe + Mobile Menu */}
            <div className="flex items-center gap-4">
                {/* Search icon */}
                <button className="text-[#64748B] hover:text-[#0F172A]">
                    <Search size={18} />
                </button>

                {/* Subscribe CTA */}
                <Link
                    // href={ post ? `https://otieu.com/4/10292310` : '/'}
                    href={ post ? `/post/${post?.slug}` : '/'}
                    target="_blank"
                    className="hidden sm:inline-block bg-[#0EA5A4] text-white text-sm px-4 py-2 rounded-md hover:bg-[#0C8D8C]"
                >
                    Latest Blog
                </Link>

                {/* Mobile menu button */}
                <button
                className="md:hidden text-[#0F172A]"
                onClick={() => setIsOpen(!isOpen)}
                >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>
        </div>

            {/* Mobile menu dropdown */}
            {isOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4">
                <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                    <Link
                    key={link.name}
                    href={link.href}
                    className="text-[#0F172A] hover:text-[#0EA5A4] font-medium"
                    onClick={() => setIsOpen(false)}
                    >
                    {link.name}
                    </Link>
                ))}
                <Link
                    // href={ post ? `https://otieu.com/4/10292310` : '/'}
                    href={ post ? `/post/${post?.slug}` : '/'}
                    target="_blank"
                    className="bg-[#0EA5A4] text-white text-center px-4 py-2 rounded-md hover:bg-[#0C8D8C]"
                    onClick={() => setIsOpen(false)}
                >
                    Latest Blog
                </Link>
                </nav>
            </div>
            )}
        </header>

        {/* Mobile-only banner ad (320x50) */}
        {/* <div className="flex justify-center py-2">
            <div className="bg-gray-200 md:w-[70%] md:mx-auto w-[320px] h-[50px] flex items-center justify-center text-xs text-gray-500 rounded">
            Mobile Ad 320×50
            </div>
        </div> */}
    </>
  );
}
