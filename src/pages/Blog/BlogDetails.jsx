import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableHeader,
    TableHead
} from "@/components/ui/table"
import { RouteBlogAdd, RouteBlogEdit } from '@/helpers/RouteName'
import { useFetch } from '@/hooks/useFetch'
import { getEvn } from '@/helpers/getEnv'
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import Loading from '@/components/Loading'
import { useState } from 'react'
import { FiEdit } from "react-icons/fi"
import { FaRegTrashAlt } from "react-icons/fa"
import moment from 'moment'

const BlogDetails = () => {
    const [refreshData, setRefreshData] = useState(false)
    const { data: blogData, loading } = useFetch(`${getEvn('VITE_API_BASE_URL')}/blog/get-all`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData])

    const role = localStorage.getItem("userRole")

    const handleToggleVisibility = async (id) => {
        try {
            const res = await fetch(`${getEvn('VITE_API_BASE_URL')}/blog/toggle-visibility/${id}`, {
                method: 'PATCH',
                credentials: 'include'
            })
            const result = await res.json()
            if (result.success) {
                showToast("success", "Visibility updated.")
                setRefreshData(!refreshData)
            } else {
                showToast("error", "Failed to update visibility.")
            }
        } catch (err) {
            showToast("error", "Something went wrong.")
        }
    }

    const handleDelete = async (id) => {
        const response = await deleteData(`${getEvn('VITE_API_BASE_URL')}/blog/delete/${id}`)
        if (response) {
            setRefreshData(!refreshData)
            showToast('success', 'Blog deleted.')
        } else {
            showToast('error', 'Delete failed.')
        }
    }

    if (loading) return <Loading />

    return (
        <div>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center flex-wrap gap-2">
                        {role === 'admin' && (
                            <Button asChild>
                                <Link to={RouteBlogAdd}>Add News</Link>
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Author</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Dated</TableHead>
                                <TableHead>Show on Home</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogData && blogData.blog.length > 0 ? (
                                blogData.blog.map((blog) => (
                                    <TableRow key={blog._id}>
                                        <TableCell>{blog?.author?.name}</TableCell>
                                        <TableCell>{blog?.category?.name}</TableCell>
                                        <TableCell>{blog?.title}</TableCell>
                                        <TableCell>{blog?.slug}</TableCell>
                                        <TableCell>{moment(blog?.createdAt).format("DD-MM-YYYY")}</TableCell>
                                        <TableCell>
                                            <label className="inline-flex items-center cursor-pointer">
                                                <span className="mr-2">Show</span>
                                                <input
                                                    type="checkbox"
                                                    checked={blog.visibility}
                                                    onChange={() => handleToggleVisibility(blog._id)}
                                                    className="toggle-checkbox hidden"
                                                />
                                                <span className="toggle-line w-10 h-4 bg-gray-300 rounded-full relative">
                                                    <span
                                                        className="toggle-dot w-6 h-6 rounded-full absolute top-0 left-0 transition"
                                                        style={{
                                                            transform: blog.visibility ? "translateX(100%)" : "translateX(0%)",
                                                            backgroundColor: blog.visibility ? "black" : "white"
                                                        }}
                                                    ></span>
                                                </span>
                                            </label>
                                        </TableCell>
                                        <TableCell className="flex gap-3">
                                            <Button variant="outline" className="hover:bg-violet-500 hover:text-white" asChild>
                                                <Link to={RouteBlogEdit(blog._id)}>
                                                    <FiEdit />
                                                </Link>
                                            </Button>
                                            <Button onClick={() => handleDelete(blog._id)} variant="outline" className="hover:bg-violet-500 hover:text-white">
                                                <FaRegTrashAlt />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="7">No blogs found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

export default BlogDetails
