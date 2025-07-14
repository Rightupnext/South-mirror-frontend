import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from "@/components/ui/badge"
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { FaRegCalendarAlt } from "react-icons/fa"
import { Link } from 'react-router-dom'
import usericon from '@/assets/images/user.png'
import moment from 'moment'
import { RouteBlogDetails } from '@/helpers/RouteName'

const BlogCard = ({ props }) => {
    return (
        <Link to={RouteBlogDetails(props.category.slug, props.slug)}>
            <Card
                className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl bg-white transition-transform transform hover:-translate-y-2 hover:scale-[1.02] duration-300"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-70 transition-opacity duration-300 rounded-2xl z-0"></div>

                <CardContent className="p-4 flex flex-col h-full relative z-10">
                    {/* Author Section */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={props.author.avatar || usericon} />
                            </Avatar>
                            <div className="text-sm font-medium text-gray-800">{props.author.name}</div>
                        </div>
                        {props.author.role === 'admin' && (
                            <Badge variant="outline" className="bg-violet-600 text-white px-2 py-1 rounded-md shadow">
                                Admin
                            </Badge>
                        )}
                    </div>

                    {/* Featured Image */}
                    <div className="mb-3">
                        <img
                            src={props.featuredImage}
                            alt={props.title}
                            className="rounded-xl w-full h-40 object-cover hover:opacity-90 transition duration-300"
                        />
                    </div>

                    {/* Blog Content */}
                    <div className="flex flex-col flex-grow">
                        <p className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                            <FaRegCalendarAlt />
                            <span>{moment(props.createdAt).format('DD MMM, YYYY')}</span>
                        </p>

                        <h2 className="text-lg md:text-xl font-bold text-gray-800 line-clamp-2 mb-2">
                            {props.title}
                        </h2>

                        <p className="text-gray-600 text-sm line-clamp-3 flex-grow">
                            {props.excerpt ? props.excerpt : 'Read more about this article...'}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default BlogCard
