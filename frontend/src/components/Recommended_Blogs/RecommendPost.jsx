import React from 'react';
import { useRecommendPostsQuery } from '../../features/blogs/blogApi';
import { Link } from 'react-router-dom';

function RecommendPost({ postId }) {
  const { data, error, isLoading } = useRecommendPostsQuery(postId);
  const recommendPosts = data?.data;

  if (isLoading) {
    return <div className="w-[20vw] p-4">Loading recommended posts...</div>;
  }

  if (error) {
    return <div className="w-[20vw] p-4 text-red-500">Error loading recommended posts.</div>;
  }

  return (
    <div className="md:w-[20vw] w-[50vw] flex flex-col gap-4">
      <h1 className="text-xl font-semibold mb-2">Recommended Posts</h1>
      {recommendPosts &&
        recommendPosts.map((post) => (
          <Link to={`/single-post/${post._id}`}>
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={post.image}
                alt="recommended post"
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                <p className="text-sm text-gray-600">
                  {post.description.slice(0, 50)}...
                </p>
              </div>
            </div>
          </Link>

        ))
      }
    </div >
  );
}

export default RecommendPost;