
import { createBrowserRouter } from "react-router-dom";
import Home from "../components/pages/Home";
import Contact from "../components/pages/Contact";
import Blogs from "../components/pages/Blogs";
import App from "../App";
import About from "../components/pages/About";
import SinglePost from "../components/singlePost/SinglePost";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import AdminLogin from "../components/Admin/AdminLogin";
import AdminDataProtect from "../components/Admin/AdminDataProtect";
import UnAuthorized from "../components/unauthorized/UnAuthorized";
import AdminDashboard from "../components/Admin/AdminDashboard";
import AdminUser from "../components/Admin/AdminUser";
import AdminBlog from "../components/Admin/AdminBlog";
import AdminContact from "../components/Admin/AdminContact";
import AdminComment from "../components/Admin/AdminComment";
import CreateBlog from "../components/Admin/CreateBlog";
import AdminSettings from "../components/Admin/AdminSettings";
import AdminProtect from "../components/Admin/AdminProtect";
import BlogUpdate from "../components/Admin/BlogUpdate";
import CreateContact from "../components/Admin/CreateContact";
import ContactUpdate from "../components/Admin/ContactUpdate";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'contact',
                element: <Contact />
            },
            {
                path: 'blogs',
                element: <Blogs />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: '/single-post/:id',
                element: <SinglePost />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Register />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminProtect> <AdminLogin /> </AdminProtect>
    },
    {
        path: '/unauthorized',
        element: <UnAuthorized />
    },
    {
        path: '/admin/dashboard',
        element: <AdminProtect> <AdminDashboard /> </AdminProtect>,
        children: [
            {
                path: 'users',
                element: <AdminDataProtect>
                    <AdminUser />
                </AdminDataProtect>
            },
            {
                path: 'blogs',
                element: <AdminDataProtect>
                    <AdminBlog />
                </AdminDataProtect>
            },
            {
                path: 'contacts',
                element: <AdminDataProtect>
                    <AdminContact />
                </AdminDataProtect>
            },
            {
                path: 'comments',
                element: <AdminDataProtect>
                    <AdminComment />
                </AdminDataProtect>
            },
            {
                path: 'create-blog',
                element: <AdminDataProtect>
                    <CreateBlog />
                </AdminDataProtect>
            },
            {
                path: 'settings',
                element: <AdminDataProtect>
                    <AdminSettings />
                </AdminDataProtect>

            },
            {
                path:'update/:id',
                element:<BlogUpdate/>
            },
            {
                path:'create-contact',
                element:<CreateContact />
            },
            {
                path:'update-contact/:id',
                element:<ContactUpdate />
            }
        ]
    }
])