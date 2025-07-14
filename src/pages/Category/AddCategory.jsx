import React, { useEffect } from 'react'
import {
    Form, FormControl, FormField, FormItem,
    FormLabel, FormMessage
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

const AddCategory = () => {

    // ✅ Define the schema
    const formSchema = z.object({
        name: z.string().min(3, 'Name must be at least 3 characters long.'),
        slug: z.string().min(3, 'Slug must be at least 3 characters long.'),
    })

    // ✅ Initialize the form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            slug: '',
        },
    })

    const categoryName = form.watch('name')

    // ✅ Auto-generate slug from name
    useEffect(() => {
        if (categoryName) {
            const slug = slugify(categoryName, { lower: true, strict: true })
            form.setValue('slug', slug)
        }
    }, [categoryName, form])

    // ✅ Handle form submit
    async function onSubmit(values) {
        try {
            const apiUrl = `${getEvn('VITE_API_BASE_URL')}/category/add`
            console.log("📤 Sending request to:", apiUrl, values)
    
            // Make the API call
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
    
            // Check if the response status is OK (200-299)
            if (!response.ok) {
                const data = await response.json()
                console.error("🚨 Error response:", data) // Log for debugging
                showToast('error', data.message || 'Something went wrong.')
                return // Stop further execution
            }
    
            // If successful, show success toast and reset the form
            const data = await response.json()
            showToast('success', data.message)
            form.reset()
    
        } catch (error) {
            // Catch network or unexpected errors
            console.error('❌ Add Category Error:', error) // Log the error details for debugging
            showToast('error', error.message || 'Unexpected error occurred.')
        }
    }
    

    return (
        <div>
            <Card className="pt-5 max-w-screen-md mx-auto">
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            {/* Name Field */}
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter category name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Slug Field */}
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Auto-generated slug" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" className="w-full">Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddCategory
