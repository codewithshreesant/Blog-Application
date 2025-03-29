import React, { useState } from 'react';
import { useCreatePostMutation } from '../../features/blogs/blogApi';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(''); 
  const [recommended, setRecommended] = useState(false);
  const [createPost, { isLoading, isError, isSuccess }] = useCreatePostMutation();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      description,
      image: imageUrl, 
      recommended,
    };

    try {
     const response = await createPost(postData);
     console.log("create post response ", response);
     if(response?.data.statusCode === 200)
     {
      alert("Post Created Successfully ");
      setTitle('');
      setDescription('');
      setImageUrl('');
      setRecommended(false);
      navigate('/admin/dashboard/blogs');
     }
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Add Blog</h1>
      {isSuccess && <p className="text-green-500">Blog post created successfully!</p>}
      {isError && <p className="text-red-500">Error creating blog post.</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <div className="mb-2">
            <button
              type="button"
              onClick={() => handleFormat('bold')}
              className="bg-gray-200 px-2 py-1 rounded mr-1"
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => handleFormat('italic')}
              className="bg-gray-200 px-2 py-1 rounded mr-1"
            >
              Italic
            </button>
            <button
              type="button"
              onClick={() => handleFormat('underline')}
              className="bg-gray-200 px-2 py-1 rounded mr-1"
            >
              Underline
            </button>
          </div>
          <div
            contentEditable
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            onInput={(e) => setDescription(e.target.innerHTML)}
            dangerouslySetInnerHTML={{ __html: description }}
            style={{ minHeight: '150px' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter image URL"
          />
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={recommended}
              onChange={(e) => setRecommended(e.target.checked)}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span className="ml-2 text-sm text-gray-700">Recommended</span>
          </label>
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? 'Creating...' : 'Create Blog'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBlog;