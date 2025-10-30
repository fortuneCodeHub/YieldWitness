'use client'
import DashboardLayout from '@/components/ui/DashboardLayout'
import { FileText } from 'lucide-react'
import React, { useState } from 'react'
import { latestPosts } from '@/constants'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, getPosts } from '@/components/store/postSlice'
import { formatDate } from '@/components/helpers/formatDate'
import Notification from '@/components/ui/Notification'

const Posts = () => {
    const { data: user, userLoading, userError } = useSelector((state) => state.user)
    const { data: posts, postLoading, postError } = useSelector((state) => state.post)
    const dispatch = useDispatch()

    const [notification, setNotification] = useState(null)
    const [loading, setLoading] = useState(false)
    const [deleted, setDeleted] = useState('')
    

    // const handleDelete = (postId) => {
        
    // }

    const handleDelete = async (id) => {
        setLoading(true)
        setDeleted(id)
        console.log("Deleting post with id:", id);
        const confirmDelete = window.confirm("⚠️ Are you sure you want to delete this rewritten mail?");
        if (!confirmDelete) {
            setLoading(false)
            return; // cancel if user clicks "No"
        }
      
        try {
            const result = await dispatch(deletePost(id)).unwrap()

            console.log(result);
            
            if (result?.success) {
                setNotification({
                    type: 'success',
                    message: '✅ Post deleted successfully'
                })
                setLoading(false)
                await dispatch(getPosts()).unwrap()
            } else {
                setNotification({
                    type: 'error',
                    message: '❌ Failed to delete rewritten mail'
                })
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
            setNotification({
                type: 'error',
                message: '❌ Something went wrong, please try again later'
            })
        }
    };
    
    

  return (
    <>
        <DashboardLayout
            page="Posts"
        >
            {notification && (
                <Notification
                    type={notification.type && notification.type}
                    message={notification.message && notification.message}
                    onClose={() => setNotification(null)}
                />
            )}
            {/* Example grid */}
            <div className="text-gray-800 dark:text-gray-100 min-h-screen py-5 lg:px-4">
                <h1 className='text-4xl font-bold flex items-center'><FileText className="w-7 h-7 me-1" /> All Posts</h1>

                {/* Latest Posts Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto mt-4">
                    <div className="p-4 border-b dark:border-gray-700">
                        <h2 className="text-lg font-semibold">All Posts</h2>
                    </div>
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
                                    {posts.length > 0 ? (
                                        posts.map((post, idx) => (
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
                                                            : post?.category === "analysis"
                                                            ? "bg-green-500"
                                                            : post?.category === "insurance"
                                                            ? "bg-red-500"
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
                                                        <button
                                                            className='border rounded-lg p-2 border-red-500 hover:bg-red-500 cursor-pointer' 
                                                            onClick={() => handleDelete(post?._id)}
                                                        >
                                                            { loading ? ( post?._id === deleted ?  'Deleting...' : 'Delete' ) : 'Delete' }
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
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
                                    )}
                                </>
                            </tbody>
                        </table>
                    ) }
                </div>
            </div>
        </DashboardLayout>
    </>
  )
}

export default Posts

