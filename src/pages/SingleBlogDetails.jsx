import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaWhatsapp, FaFacebook, FaLink, FaShareAlt } from 'react-icons/fa'
import { decode } from 'entities'
import moment from 'moment'

// Components
import Comment from '@/components/Comment'
import CommentCount from '@/components/CommentCount'
import CommentList from '@/components/CommentList'
import LikeCount from '@/components/LikeCount'
import Loading from '@/components/Loading'
import RelatedBlog from '@/components/RelatedBlog'
import { Avatar } from '@/components/ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'

// Helpers & Hooks
import { getEvn } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'

const SingleBlogDetails = () => {
    const { blog, category } = useParams()
    const [showShareOptions, setShowShareOptions] = useState(false)

    
    const { data, loading } = useFetch(
        `${getEvn('VITE_API_BASE_URL')}/blog/get-blog/${blog}`,
        {
            method: 'get',
            credentials: 'include',
        },
        [blog, category]
    )

    const blogUrl = `${window.location.origin}/blog/${category}/${blog}`

    const handleCopyLink = () => {
        navigator.clipboard.writeText(blogUrl)
        alert('Link copied to clipboard!')
    }

    if (loading) return <Loading />

    return (
        <div className='md:flex-nowrap flex-wrap flex justify-between gap-20'>
            {data?.blog && (
                <>
                    <div className='border rounded md:w-[70%] w-full p-5'>
                        <div className='flex justify-between items-start'>
                            <h1 className='text-2xl font-bold mb-5'>{data.blog.title}</h1>

                            {/* Share Button & Options */}
                            <div className='relative'>
                                <button
                                    onClick={() => setShowShareOptions(!showShareOptions)}
                                    className='text-white bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl'
                                    title="Share"
                                >
                                    <FaShareAlt className="animate-pulse" />
                                </button>

                                {showShareOptions && (
                                    <div className='absolute right-0 mt-2 flex gap-4 bg-white p-3 rounded shadow-lg animate-fadeIn flex-wrap z-10'>
                                        <a
                                            href={`https://wa.me/?text=${encodeURIComponent(blogUrl)}`}
                                            target='_blank'
                                            rel='noreferrer'
                                            className='text-green-600 hover:scale-125 transition-transform duration-300'
                                            title="Share on WhatsApp"
                                        >
                                            <FaWhatsapp size={22} />
                                        </a>
                                        <a
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`}
                                            target='_blank'
                                            rel='noreferrer'
                                            className='text-blue-600 hover:scale-125 transition-transform duration-300'
                                            title="Share on Facebook"
                                        >
                                            <FaFacebook size={22} />
                                        </a>
                                        <button
                                            onClick={handleCopyLink}
                                            className='text-gray-700 hover:text-black hover:scale-125 transition-transform duration-300'
                                            title='Copy Link'
                                        >
                                            <FaLink size={22} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='flex justify-between items-center mb-5'>
                            <div className='flex items-center gap-5'>
                                <Avatar>
                                    <AvatarImage src={data.blog.author.avatar} />
                                </Avatar>
                                <div>
                                    <p className='font-bold'>{data.blog.author.name}</p>
                                    <p>Date: {moment(data.blog.createdAt).format('DD-MM-YYYY')}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-5'>
                                <LikeCount props={{ blogid: data.blog._id }} />
                                <CommentCount props={{ blogid: data.blog._id }} />
                            </div>
                        </div>

                        <div className='my-5'>
                            <img
                                src={data.blog.featuredImage}
                                className='rounded w-full object-cover'
                                alt="Featured"
                            />
                        </div>

                        <div
                            dangerouslySetInnerHTML={{ __html: decode(data.blog.blogContent) || '' }}
                        />

                        <div className='border-t mt-5 pt-5'>
                            <Comment props={{ blogid: data.blog._id }} />
                        </div>
                    </div>
                </>
            )}

            <div className='border rounded md:w-[30%] w-full p-5'>
                <RelatedBlog props={{ category, currentBlog: blog }} />
            </div>
        </div>
    )
}

export default SingleBlogDetails
