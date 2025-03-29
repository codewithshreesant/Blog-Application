import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPostsQuery, useUpdatePostMutation } from '../../features/blogs/blogApi'; // Adjust path
// Assuming you have your ApiSlice configured.


function BlogUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, refetch, isLoading, isError } = useGetPostsQuery();
  const [updatePost] = useUpdatePostMutation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (data?.data && id) {
      const blogToUpdate = data.data.find((blog) => blog._id === id);
      console.log("blog update data ", blogToUpdate)
      if (blogToUpdate) {
        setFormData(blogToUpdate);
      }
    }
  }, [data, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updatePost({ id: id, post: formData });
      if (response?.data.statusCode === 200) {
        alert('Post updated successfully');
        await refetch()
        navigate('/admin/dashboard/blogs');
      } else {
        alert('Update failed');
      }
    } catch (err) {
      console.error('Error updating post:', err);
      alert('An error occurred');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data.</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Blog Post</h2>
      <form onSubmit={handleUpdate} className="max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}

export default BlogUpdate;