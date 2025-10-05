"use client";

import { useState } from "react";
import {
    Menu,
    X,
    Home,
    FileText,
    BarChart2,
    //   Users,
    FilePlus, 
    Settings,
    LogOut,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children, page }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter()

  const navItems = [
    { name: "Dashboard", icon: Home, url: '/dashboard'},
    { name: "Posts", icon: FileText, url: '/dashboard/posts'},
    { name: "New Post", icon: FilePlus, url: '/dashboard/new-post'},
    // { name: "Users", icon: Users },
    { name: "Settings", icon: Settings, url: '/dashboard/settings'},
  ];

  const logout = async () => {
    await fetch("/api/protected/logout", { method: "POST" });
    
    window.location.href = "/";
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <Link href="/" className="relative text-2xl font-bold poppins-bold-italic">
                <span className="text-[#0EA5A4]">Yield</span>
                <span className="text-[#0F172A]">Witness</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0EA5A4]"></span>
            </Link>
          <button
            className="lg:hidden text-gray-600 dark:text-gray-300"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-6 space-y-2 px-4">
          {
            navItems.map((item) => (
                <button
                    key={item.name}
                    className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 ${ page === item?.name ? "bg-gray-700" : "" } dark:hover:bg-gray-700 cursor-pointer`}
                    onClick={() => router.push(item.url)}
                >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                </button>
            ))}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t dark:border-gray-700">
          <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-red-500 cursor-pointer" onClick={logout}>
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white dark:bg-gray-800 shadow px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-gray-600 dark:text-gray-300"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {page && page}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <img
              src="/assets/images/bot-1.png"
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto lg:p-6 p-3">
          {children}
        </main>
      </div>
    </div>
  );
}
