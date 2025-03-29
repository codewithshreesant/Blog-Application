
import React from 'react'
import { useHomePostsQuery } from '../../features/blogs/blogApi'
import Button from '../Button/Button';


function Recommended() {
  const { data, error, isloading } = useHomePostsQuery();

  console.log("Home posts ", data);
  const recommendPosts = data?.data;

  return (
    <div className='my-[4rem]'>
      <div>
        <h1 className="text-2xl md:text-5xl lg:text-4xl font-extrabold text-center text-purple-500 mt-6 mb-4 shadow-lg bg-gradient-to-r from-purple-200 via-purple-400 to-purple-600 p-4 rounded-lg">
          Recommended Blogs
        </h1>

      </div>
      <div className='grid md:grid-cols-[25vw_25vw_25vw] grid-cols-[50vw] gap-[2rem]  md:gap-8 justify-center'>
        {
          data && recommendPosts.map((post, index) => {
            return <div>
              <h1 className="text-3xl md:text-3xl lg:text-2.5xl font-extrabold text-center text-blue-600 mt-6 mb-4 shadow-md decoration-blue-400">{post.title}</h1>
              <img src={post.image} alt="recommend post" className='md:w-[25vw] h-[50vh] w-[50vw]' />
              <p className='text-justify'>{(post.description).slice(0, 200)}...</p>
              <Button name='Read Now' path={`/single-post/${post._id}`}/>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Recommended 