// 🖤 Code formatted with dark theme for readability

import React, { useEffect, useState } from 'react'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import slugify from 'slugify'
import { showToast } from '@/helpers/showToast'
import { getEvn } from '@/helpers/getEnv'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { useFetch } from '@/hooks/useFetch'
import Dropzone from 'react-dropzone'
import Editor from '@/components/Editor'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RouteBlog } from '@/helpers/RouteName'
import { decode } from 'entities'
import Loading from '@/components/Loading'
import Modal from 'react-modal'
import { FaShareAlt, FaWhatsapp, FaFacebook, FaLink } from 'react-icons/fa'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

Modal.setAppElement('#root')

const EditBlog = () => {
  const { blogid } = useParams()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const { data: categoryData } = useFetch(`${getEvn('VITE_API_BASE_URL')}/category/all-category`, {
    method: 'get',
    credentials: 'include'
  })

  const { data: blogData, loading: blogLoading } = useFetch(`${getEvn('VITE_API_BASE_URL')}/blog/edit/${blogid}`, {
    method: 'get',
    credentials: 'include'
  }, [blogid])

  const [filePreview, setPreview] = useState()
  const [file, setFile] = useState()
  const [previewOpen, setPreviewOpen] = useState(false)

  const formSchema = z.object({
    category: z.string().min(3),
    title: z.string().min(3),
    slug: z.string().min(3),
    blogContent: z.string().min(3),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: '',
      title: '',
      slug: '',
      blogContent: '',
    },
  })

  useEffect(() => {
    if (blogData) {
      setPreview(blogData.blog.featuredImage)
      form.setValue('category', blogData.blog.category._id)
      form.setValue('title', blogData.blog.title)
      form.setValue('slug', blogData.blog.slug)
      form.setValue('blogContent', decode(blogData.blog.blogContent))
    }
  }, [blogData])

  const handleEditorData = (event, editor) => {
    const data = editor.getData()
    form.setValue('blogContent', data)
  }

  const blogTitle = form.watch('title')

  useEffect(() => {
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true })
      form.setValue('slug', slug)
    }
  }, [blogTitle])

  async function onSubmit(values) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('data', JSON.stringify(values))

      const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/blog/update/${blogid}`, {
        method: 'put',
        credentials: 'include',
        body: formData
      })
      const data = await response.json()
      if (!response.ok) return showToast('error', data.message)

      form.reset()
      setFile()
      setPreview()
      navigate(RouteBlog)
      showToast('success', data.message)
    } catch (error) {
      showToast('error', error.message)
    }
  }

  const handleFileSelection = (files) => {
    const file = files[0]
    const preview = URL.createObjectURL(file)
    setFile(file)
    setPreview(preview)
  }

  if (blogLoading) return <Loading />

  const currentCategory = categoryData?.category?.find(cat => cat._id === form.getValues('category'))

  return (
    <div>
      <Card className="pt-5">
        <CardContent>
          <h1 className='text-2xl font-bold mb-4'>Edit Blog</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryData?.category?.map(category => (
                            <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="Slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='mb-3'>
                <span className='mb-2 block'>Featured Image</span>
                <Dropzone onDrop={handleFileSelection}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className='flex justify-center items-center w-36 h-28 border-2 border-dashed rounded'>
                        {filePreview && <img src={filePreview} className="h-full object-cover" />}
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>

              <FormField
                control={form.control}
                name="blogContent"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Blog Content</FormLabel>
                    <FormControl>
                      <Editor props={{ initialData: field.value, onChange: handleEditorData }} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex justify-between gap-3'>
                <Button type="button" variant="outline" className="w-1/2" onClick={() => setPreviewOpen(true)}>
                  Preview
                </Button>
                <Button type="submit" className="w-1/2">Save</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Modal
        isOpen={previewOpen}
        onRequestClose={() => setPreviewOpen(false)}
        contentLabel="Blog Preview"
        style={{
          content: {
            top: '10%',
            left: '20%',
            right: '10%',
            bottom: '10%',
            padding: '2rem',
            overflowY: 'auto'
          }
        }}
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Blog Preview</h2>
          <button
    onClick={() => setPreviewOpen(false)}
    className="absolute top-4 right-4 text-gray-500 hover:text-black text-4xl font-bold"
    aria-label="Close modal"
  >
    &times;
  </button>


          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user?.image} />
              <AvatarFallback>{user?.name?.slice(0, 2)?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{user?.name}</p>
              <p className="text-sm text-gray-500">{currentCategory?.name}</p>
            </div>
          </div>

          <h1 className="text-2xl font-bold">{form.getValues('title')}</h1>

          <img src={filePreview} alt="Blog Image" className="w-full rounded-lg object-cover h-72" />

          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: form.getValues('blogContent') }} />

          <div className="flex gap-4 mt-4">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(filePreview)}`}
              target="_blank"
              rel="noreferrer"
              className="text-green-600 hover:scale-125 transition-transform"
            >
              <FaWhatsapp size={24} />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(filePreview)}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:scale-125 transition-transform"
            >
              <FaFacebook size={24} />
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(filePreview)}
              className="text-gray-700 hover:text-black"
            >
              <FaLink size={24} />
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default EditBlog
