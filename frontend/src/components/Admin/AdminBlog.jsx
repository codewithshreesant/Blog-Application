import React from 'react';
import { useGetPostsQuery, useUpdatePostMutation, useDeletePostMutation } from '../../features/blogs/blogApi';
import { Link } from 'react-router-dom';

function AdminBlog() {
  const { data, refetch, error, isLoading } = useGetPostsQuery();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const blogsData = data?.data;

  const handleUpdate = async (postId, updatedPost) => {
    try {
      const response = await updatePost({ id: postId, post: updatedPost });
      console.log("updated post response ", response);
      if (response?.data.statusCode === 200) {
        alert("Post updated successfully ");
        await refetch();
      }
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await deletePost(postId);
      console.log("deleted post response ", response);
      if (response?.data.statusCode === 200) {
        alert("Post deleted Successfully ");
        await refetch();
      }
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading blogs. {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Blogs</h1>
      <Link to='/admin/dashboard/create-blog'><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create Blog
      </button></Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Title</th>
              <th className="py-2 px-4 border-b text-left">Description</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogsData?.map((blog, index) => (
              <tr key={blog.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-2 px-4 border-b">{blog.title}</td>
                <td className="py-2 px-4 border-b text-justify">{blog.description}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex space-x-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    >
                      <Link to={`/admin/dashboard/update/${blog._id}`}>Update</Link>
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminBlog;