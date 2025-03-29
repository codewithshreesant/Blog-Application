
import React from 'react'
import { useGetPostsQuery } from '../../features/blogs/blogApi'
import Button from '../Button/Button';

function Blogs() {
  const { data, error, isLoading } = useGetPostsQuery();
  console.log(" all posts ", data);

  const posts = data?.data;
  console.log("posts ", posts);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {data &&
    posts.map((post, index) => (
      <div key={index} className="bg-white rounded-lg shadow-md p-4">
        <h1 className="text-xl font-semibold text-blue-600 mb-2">
          {post.title}
        </h1>
        <img
          src={post.image}
          alt="recommend post"
          className="w-full h-48 object-cover rounded-md mb-2"
        />
        <p className="text-gray-700 text-sm mb-3">
          {(post.description).slice(0, 200)}...
        </p>
        <Button name="Read Now" path={`/single-post/${post._id}`} />
      </div>
    ))}
</div>
  )
}

export default Blogs