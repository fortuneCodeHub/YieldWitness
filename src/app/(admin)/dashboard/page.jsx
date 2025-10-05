'use client'
import DashboardLayout from '@/components/ui/DashboardLayout'
import React, { useEffect, useState } from 'react'
import { latestPosts } from '@/constants';
import { fetchUser } from '@/components/helpers/allFetchForUsers';
import Image from 'next/image';
import Preloader from '@/components/ui/Preloader';
import { useSelector } from 'react-redux';
import { formatDate } from '@/components/helpers/formatDate';
import Link from 'next/link';

const Dashboard = () => {

    // Get data from state
    const { data: user, userLoading, userError } = useSelector((state) => state.user);
    const { data: posts, postLoading, postError } = useSelector((state) => state.post)

    // Handle when posts is not loaded yet
    const totalPosts = posts?.length || 0;

    // Count by category
    const financePosts = posts?.filter((p) => p.category === "finance").length || 0;
    const techPosts = posts?.filter((p) => p.category === "tech").length || 0;
    const marketsPosts = posts?.filter((p) => p.category === "markets").length || 0;
    const guidesPosts = posts?.filter((p) => p.category === "guides").length || 0;

    // Build stats dynamically
    const stats = [
    { label: "Total Posts", value: totalPosts },
    { label: "Finance Posts", value: financePosts },
    { label: "Tech Posts", value: techPosts },
    { label: "Markets Posts", value: marketsPosts },
    { label: "Guides Posts", value: guidesPosts },
    ];

    console.log(user);
    console.log(posts);
    
  
    return (
        <>
            { userLoading && postLoading ? (
                <Preloader />
            ) : (
                <DashboardLayout page="Dashboard">
                    <div className="text-gray-800 dark:text-gray-100 min-h-screen py-5 lg:px-4">
                        {/* Stats grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
                            {stats.map((stat, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center"
                                >
                                    <h3 className="text-3xl font-bold text-[#0EA5A4]">
                                        {stat.value}
                                    </h3>
                                    <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Latest Posts Table */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
                            <div className="p-4 border-b dark:border-gray-700">
                                <h2 className="text-lg font-semibold">Latest Posts</h2>
                            </div>
                            {/* <table className="w-full text-sm text-left">
                                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                                    <tr>
                                        <th className="px-4 py-3">Title</th>
                                        <th className="px-4 py-3">Category</th>
                                        <th className="px-4 py-3">Author</th>
                                        <th className="px-4 py-3">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {latestPosts.map((post) => (
                                        <tr
                                            key={post.id}
                                            className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                        >
                                            <td className="px-4 py-3 font-medium">{post.title}</td>
                                            <td className="px-4 py-3">
                                            <span
                                                className={`px-2 py-1 rounded text-xs font-semibold text-white ${
                                                post.category === "Finance"
                                                    ? "bg-[#0EA5A4]"
                                                    : post.category === "Tech"
                                                    ? "bg-[#2563EB]"
                                                    : post.category === "Markets"
                                                    ? "bg-yellow-500"
                                                    : "bg-purple-600"
                                                }`}
                                            >
                                                {post.category}
                                            </span>
                                            </td>
                                            <td className="px-4 py-3">{post.author}</td>
                                            <td className="px-4 py-3">{post.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table> */}
                            { postLoading ? (
                                <div className='py-3 ps-3'>
                                    <h3 className='text-2xl font-semibold'>
                                        Loading Posts...
                                    </h3>
                                </div>
                            ) : (
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                                        <tr>
                                            <th className="px-4 py-3">Title</th>
                                            <th className="px-4 py-3">Category</th>
                                            <th className="px-4 py-3">Author</th>
                                            <th className="px-4 py-3">Date</th>
                                            <th className="px-4 py-3">Published</th>
                                            <th className='px-4 py-3'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <>
                                            { posts.length > 0 ? (
                                                posts.map((post, idx) => (
                                                    idx < 15 ? (
                                                        <tr
                                                            key={idx}
                                                            className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                                        >
                                                            <td className="px-4 py-3 font-medium">{post?.title}</td>
                                                            <td className="px-4 py-3">
                                                                <span
                                                                    className={`px-2 py-1 rounded text-xs font-semibold text-white ${
                                                                        post?.category === "finance"
                                                                        ? "bg-[#0EA5A4]"
                                                                        : post?.category === "tech"
                                                                        ? "bg-[#2563EB]"
                                                                        : post?.category === "markets"
                                                                        ? "bg-yellow-500"
                                                                        : post?.category === "guides"
                                                                        ? "bg-orange-500"
                                                                        : "bg-purple-600"
                                                                    }`}
                                                                >
                                                                {post?.category}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-3">{post?.author}</td>
                                                            <td className="px-4 py-3">{formatDate(post?.createdAt)}</td>
                                                            <td className="px-4 py-3">
                                                                {post?.built ? (
                                                                    <>
                                                                        <Link
                                                                            className='rounded-lg p-2 bg-orange-500 text-white hover:bg-orange-500 me-1'
                                                                            href={`/dashboard/builder?post_id=${post?._id}`}
                                                                        >
                                                                            Preview
                                                                        </Link>
                                                                    </>
                                                                ) : (
                                                                    <Link
                                                                        className='rounded-lg p-2 bg-purple-600 text-white hover:bg-purple-500 me-1'
                                                                        href={`/dashboard/builder?post_id=${post?._id}`}
                                                                    >
                                                                        Complete
                                                                    </Link>
                                                                )}
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <div className='flex items-center'>
                                                                    <Link
                                                                        className='border rounded-lg p-2 border-blue-500 hover:bg-blue-500 me-1'
                                                                        href={`/dashboard/update-post?post_id=${post?._id}`}
                                                                    >
                                                                        Edit
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ) : null
                                                ))
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan={6}
                                                        className="py-4 text-center md:text-2xl text-xl"
                                                    >
                                                        <div>
                                                        There are no posts at the moment
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) }
                                        </>
                                    </tbody>
                                </table>
                            ) }
                        </div>
                    </div>
                </DashboardLayout>
            ) }
        </>
    )
}

export default Dashboard
