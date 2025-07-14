import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import logo from '@/assets/images/logo-white.png'
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { GoDot } from "react-icons/go";
import {
    RouteBlog,
    RouteBlogByCategory,
    RouteCategoryDetails,
    RouteCommentDetails,
    RouteIndex,
    RouteUser
} from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEvn } from "@/helpers/getEnv";
import { useSelector } from "react-redux";

const AppSidebar = () => {
    const user = useSelector(state => state.user);
    const { data: categoryData } = useFetch(`${getEvn('VITE_API_BASE_URL')}/category/all-category`, {
        method: 'get',
        credentials: 'include'
    });

    return (
        <Sidebar className="bg-gradient-to-b from-blue-900 to-blue-800 text-black w-64">
            {/* Sidebar Header */}
           <SidebarHeader className="bg-transparent px-4 py-10 flex justify-center">
    <img 
        src="https://res.cloudinary.com/dsgizhhfx/image/upload/v1752297629/vvv/m4mkjzx2rsvahd7cthi4.png" 
        width={120} 
        alt="Logo"
        className="lg:hidden" // 👈 hide on large screens and above
    />
</SidebarHeader>


            {/* Sidebar Content */}
            <SidebarContent className="bg-transparent py-6">
                <SidebarGroup>
                    <SidebarMenu>
                        {/* Home */}
                        <SidebarMenuItem>
                            <Link to={RouteIndex}>
                                <SidebarMenuButton className="w-full flex items-center p-3 rounded-md hover:bg-blue-700 transition duration-300">
                                    <IoHomeOutline className="mr-3 text-xl" />
                                    Home
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>

                        {/* If logged in */}
                        {user && user.isLoggedIn && (
                            <>
                                <SidebarMenuItem>
                                    <Link to={RouteBlog}>
                                        <SidebarMenuButton className="w-full flex items-center p-3 rounded-md hover:bg-blue-700 transition duration-300">
                                            <GrBlog className="mr-3 text-xl" />
                                            News
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <Link to={RouteCommentDetails}>
                                        <SidebarMenuButton className="w-full flex items-center p-3 rounded-md hover:bg-blue-700 transition duration-300">
                                            <FaRegComments className="mr-3 text-xl" />
                                            Comments
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            </>
                        )}

                        {/* Admin Only */}
                        {user && user.isLoggedIn && user.user.role === 'admin' && (
                            <>
                                <SidebarMenuItem>
                                    <Link to={RouteCategoryDetails}>
                                        <SidebarMenuButton className="w-full flex items-center p-3 rounded-md hover:bg-blue-700 transition duration-300">
                                            <BiCategoryAlt className="mr-3 text-xl" />
                                            Categories
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <Link to={RouteUser}>
                                        <SidebarMenuButton className="w-full flex items-center p-3 rounded-md hover:bg-blue-700 transition duration-300">
                                            <LuUsers className="mr-3 text-xl" />
                                            Users
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            </>
                        )}
                    </SidebarMenu>
                </SidebarGroup>

                {/* Category List */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xl font-semibold px-6 py-6 mb-5">
                        Categories
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        {categoryData?.category?.length > 0 && categoryData.category.map(category => (
                            <SidebarMenuItem key={category._id}>
                                <Link to={RouteBlogByCategory(category.slug)}>
                                    <SidebarMenuButton className="w-full flex items-center p-3 rounded-md hover:bg-blue-700 transition duration-300">
                                        <GoDot className="mr-3 text-lg" />
                                        {category.name}
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar;
