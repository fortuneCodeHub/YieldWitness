'use client'
import DashboardLayout from '@/components/ui/DashboardLayout'
import React, { useEffect, useState } from 'react'
import { FilePlus } from 'lucide-react'
import { validateFrontendCreatePost } from '@/components/helpers/validateFrontendForms'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, updatePost } from '@/components/store/postSlice'
import Notification from '@/components/ui/Notification'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const NewPostPage = () => {
    
    // Individual states for each field
    const searchParams = useSearchParams()
    const postId = searchParams.get('post_id')
    
    // state management data
    const { data: user, userError } = useSelector((state) => state.user)
    const { data: posts, postError } = useSelector((state) => state.post)
    const currentPost = posts?.find((p) => p._id === postId);
    console.log(posts);

    useEffect(() => {
        if (currentPost) {
            setTitle(currentPost.title || "");
            setExcerpt(currentPost.excerpt || "");
            setCategory(currentPost.category || "");
            setAuthor(currentPost.author || "");
            setReadTime(currentPost.readTime?.replace(" min read", "") || "");
        
            // Thumbnail preview if exists
            if (currentPost.thumbnail) {
                setThumbnailPreview(currentPost.thumbnail);
            }
        } else {
            window.location.href= "/invalid"
        }
    }, [currentPost])

    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [category, setCategory] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [author, setAuthor] = useState('');
    // const [date, setDate] = useState('');
    const [readTime, setReadTime] = useState('');

    const [errors, setErrors] = useState({})
    const [notification, setNotification] = useState(null)

    const dispatch = useDispatch()

    // useEffect(() => {
    // }, [])

    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const formData = new FormData();

        let errors = {};

        // Title
        if (!title || typeof title !== "string" || title.trim().length < 3) {
            errors.title = "Title must be at least 3 characters";
        }

        // Excerpt
        if (!excerpt || typeof excerpt !== "string" || excerpt.trim().length < 10) {
            errors.excerpt = "Excerpt must be at least 10 characters";
        }

        // Category
        const allowedCategories = ["finance", "tech", "markets", "guides", "analysis"];
        if (
            !category ||
            typeof category !== "string" ||
            !allowedCategories.includes(category)
        ) {
            errors.category = `Category must be one of: ${allowedCategories.join(", ")}`;
        }

        if (thumbnail instanceof File) {
            const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
            const maxSize = 2 * 1024 * 1024; // 2 MB
          
            if (!allowedTypes.includes(thumbnail.type)) {
              errors.thumbnail = "Only JPEG, PNG, or WebP images are allowed";
            } else if (thumbnail.size > maxSize) {
              errors.thumbnail = "Image size must be less than 2MB";
            }
        }

        // Author
        if (!author || typeof author !== "string" || author.trim().length < 2) {
            errors.author = "Author name must be at least 2 characters";
        }

        // Read Time
        if (!readTime || isNaN(Number(readTime)) || Number(readTime) <= 0) {
            errors.readTime = "Read time must be a positive number";
        }

        // Update state
        setErrors(errors);

        // Return false if errors exist
        if (Object.keys(errors).length > 0) {
            setLoading(false)
            return;
        }


        // Append data to the form data
        formData.append("title", title.trim());
        formData.append("excerpt", excerpt.trim());
        formData.append("category", category.trim());
        formData.append("author", author.trim());
        formData.append("readTime", `${readTime} min read`);

        if (thumbnail instanceof File ) {
            formData.append("thumbnail", thumbnail); // thumbnail is a File object
        }

        try {
            
            console.log(postId);
            
            // Send to Redux
            const res = await dispatch(updatePost({ id: postId, updates: formData })).unwrap();

            console.log(res);

            setLoading(false)
            // resetForm()

            if (res._id) {
                setNotification({
                    type: 'success',
                    message: 'Post updated successfully 🎉'
                })
            }
        } catch (err) {
            setNotification({
                type: 'error',
                message: 'Failed to update post unfortunately'
            })
            console.error("Update Post error:", err);
        } finally {
            setLoading(false);
        }
        // send to backend API here
    };

    const resetForm = () => {
        setTitle("");
        setExcerpt("");
        setCategory("");
        setThumbnail("");
        setAuthor("");
        setReadTime("");
    }

  return (
    <>
      <DashboardLayout
        page="New Post"
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
          <h1 className='text-4xl font-bold flex items-center'><FilePlus className="w-7 h-7 me-1" /> Update {title} post</h1>

          <div className="text-gray-800 dark:text-gray-100 min-h-screen py-5 px-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-3xl mx-auto">
                <div className='flex flex-col md:flex-row items-center justify-between'>
                    <h2 className="text-xl font-semibold mb-6">Update {title} Post</h2>
                    {currentPost?.built ? (
                        <>
                            <Link
                                className='rounded-lg p-2 bg-orange-500 text-white hover:bg-orange-500 me-1'
                                href={`/dashboard/builder?post_id=${currentPost?._id}`}
                            >
                                Preview
                            </Link>
                        </>
                    ) : (
                        <Link
                            className='rounded-lg p-2 bg-purple-600 text-white hover:bg-purple-500 me-1'
                            href={`/dashboard/builder?post_id=${currentPost?._id}`}
                        >
                            Complete
                        </Link>
                    )}
                </div>
              
              <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                    placeholder="Enter post title"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium mb-2">Excerpt</label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                    placeholder="Write a short excerpt..."
                  />
                  {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  >
                    <option value="">Select category</option>
                    <option value="finance">Finance</option>
                    <option value="tech">Tech</option>
                    <option value="markets">Markets</option>
                    <option value="guides">Guides</option>
                    <option value="analysis">Analysis</option>
                  </select>
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                {/* Thumbnail */}
                <div>
                  <label className="block text-sm font-medium mb-2">Thumbnail</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setThumbnail(file);
                        const reader = new FileReader();
                            reader.onloadend = () => {
                            setThumbnailPreview(reader.result); // store preview URL in state
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full text-sm text-gray-600 dark:text-gray-300"
                  />

                  {/* Preview */}
                  {thumbnailPreview && (
                    <div className="mt-4">
                      <p className="text-xs text-gray-500 mb-2">Image Preview:</p>
                      <div className="relative w-48 h-32 rounded-md overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setThumbnail(null);
                            setThumbnailPreview(null);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded shadow hover:bg-red-600 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                  {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>}
                </div>


                {/* Author */}
                <div>
                  <label className="block text-sm font-medium mb-2">Author</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                    placeholder="Enter author name"
                  />
                  {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
                </div>

                {/* Date */}
                {/* <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                  />
                </div> */}

                {/* Read Time */}
                <div>
                  <label className="block text-sm font-medium mb-2">Read Time (please make sure the number is in mins)</label>
                  <input
                    type="number"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                    placeholder="e.g. 5"
                  />
                  {errors.readTime && <p className="text-red-500 text-sm mt-1">{errors.readTime}</p>}
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#0EA5A4] hover:bg-[#0c8b8a] text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    {/* {loading ?  (redirect ? 'Redirecting...' : 'Updating...') : 'Update Post'} */}
                    {loading ?  'Updating...' : 'Update Post'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}

export default NewPostPage


