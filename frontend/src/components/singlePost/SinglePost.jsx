
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetSinglePostQuery } from '../../features/blogs/blogApi';
import Comment from '../comments/Comment';
import { useSelector } from 'react-redux';
import RecommendPost from '../Recommended_Blogs/RecommendPost';

function SinglePost() {
    const { id } = useParams();
    console.log("single post id ", id)
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const actualUser = user?.user;
    
    const { data, refetch, error, isLoading } = useGetSinglePostQuery(id);
    const singlePost = data?.data.singlePost;
    const comments = data?.data.comments;
    console.log("single data ", data);
    
    return (
        <div className='flex md:flex-row justify-center flex-col items-center'>
            <div>
                {data &&
                    <div className='md:w-[50vw] w-[90vw] flex flex-col gap-[0.8rem]'>
                        <h1 className="text-3xl md:text-3xl lg:text-2.5xl font-extrabold text-center text-blue-600 mt-6 mb-4 shadow-md decoration-blue-400">{singlePost.title}</h1>
                        <p className='flex gap-[2rem]'>
                            <span>createdAt: {new Date(singlePost.createdAt).toLocaleString()}</span>
                            <span>postedBy: Admin</span>
                        </p>
                        <img src={singlePost.image} alt="single post" className='h-[60vh] md:w-[40vw] w-[90vw]' />
                        <p className='text-justify'>{singlePost.description}</p>
                    </div>
                }
                <div className='flex flex-col gap-[1.5rem] mt-[3rem]'>
                    <h1 className='text-[2rem]'>Comments</h1>
                    <div className='w-[60vw] flex flex-col gap-[1.5rem]'>
                       {actualUser &&  <div>
                           {
                                comments && comments.map((comment, index) => {
                                    return (
                                        <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
                                            <h1 className="font-bold text-xl text-blue-500">{actualUser ? actualUser.username : ''}</h1>
                                            <h2 className="text-gray-700 mt-2">{comment.text}</h2>
                                            <span className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleString()}</span>
                                        </div>
                                    );
                                })
                            }
                       </div>
                    }
                    </div>
                </div>
                <Comment postId={data && singlePost._id} refetch={refetch} />
            </div>
            { data &&
                <RecommendPost postId={singlePost._id}/>
            }
        </div>
    )
}


export default SinglePost