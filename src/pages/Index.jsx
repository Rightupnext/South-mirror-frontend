import BlogCard from '@/components/BlogCard'
import Loading from '@/components/Loading'
import { getEvn } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'

const Index = () => {
    const { data: blogData, loading } = useFetch(`${getEvn('VITE_API_BASE_URL')}/blog/blogs`, {
        method: 'get',
        credentials: 'include'
    });

    if (loading) return <Loading />

    // ✅ Extra filter: show only blogs where visibility === true
    const visibleBlogs = blogData?.blog?.filter(blog => blog.visibility === true)

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-10 px-5">
            <div className="grid xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
                {visibleBlogs && visibleBlogs.length > 0 ? (
                    visibleBlogs.map(blog => (
                        <div
                            key={blog._id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 p-5"
                        >
                            <BlogCard props={blog} />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 text-lg">Data Not Found.</div>
                )}
            </div>
        </div>
    )
}

export default Index
