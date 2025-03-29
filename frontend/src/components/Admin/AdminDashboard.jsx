import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useGetUsersQuery } from '../../features/users/user';
import { useGetPostsQuery } from '../../features/blogs/blogApi';
import { useGetAllContactsQuery } from '../../features/contacts/contactApi';
const AdminDashboard = () => {
    const {data, error } = useGetUsersQuery();

    const { data:blogs } = useGetPostsQuery();

    const { data:contacts } = useGetAllContactsQuery();


    return (
        <div className="min-h-screen bg-gray-100">
            <aside className="bg-gray-800 text-white w-64 min-h-screen fixed">
                <div className="p-4">
                    <h2 className="text-2xl font-semibold">Admin Panel</h2>
                </div>
                <nav className="mt-4">
                    <Link to='/admin/dashboard'>
                        <button
                            className={`block py-2 px-4 w-full text-left hover:bg-gray-700 `}
                        >
                            Dashboard
                        </button>
                    </Link>
                    <Link to='/admin/dashboard/users'>
                        <button
                            className={`block py-2 px-4 w-full text-left hover:bg-gray-700 `}
                        >
                            Users
                        </button>
                    </Link>
                    <Link to='/admin/dashboard/blogs'>
                        <button
                            className={`block py-2 px-4 w-full text-left hover:bg-gray-700 `}
                        >
                            Blogs
                        </button>
                    </Link>
                    <Link to='/admin/dashboard/contacts'>
                        <button
                            className={`block py-2 px-4 w-full text-left hover:bg-gray-700 `}
                        >
                            Contact
                        </button>
                    </Link>
                    <Link to='/admin/dashboard/comments'>
                        <button
                            className={`block py-2 px-4 w-full text-left hover:bg-gray-700 `}
                        >
                            Comments 
                        </button>
                    </Link>
                    <Link to='/admin/dashboard/settings'>
                        <button
                            className={`block py-2 px-4 w-full text-left hover:bg-gray-700 `}
                        >
                            settings
                        </button>
                    </Link>
                </nav>
            </aside>

            <main className="ml-64 p-8">


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">Total Users</h2>
                        {data && <p className="text-4xl">{(data?.data).length}</p>}
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">Total Blogs</h2>
                        {blogs && <p className="text-4xl">{(blogs?.data).length}</p>}
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">Total Contacts</h2>
                        {contacts && <p className="text-4xl">{(contacts?.data).length}</p>}
                    </div>
                </div>

                <Outlet />


            </main>
        </div>
    );
};

export default AdminDashboard;