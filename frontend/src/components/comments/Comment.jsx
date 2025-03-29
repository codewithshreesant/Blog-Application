
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCreateCommentMutation } from '../../features/comments/commentApi';

function Comment({postId, refetch}) {

  const [commentText, setCommentText] = useState('');

  const user = useSelector(state => state.user);

  const actualUser = user?.user;

  const [ createComment, { error, isLoading } ] = useCreateCommentMutation();

  const handleAddComment = async () => {

    if(!actualUser) {
      alert("please login first")
    }else {
      const commentData = {
        text:commentText,
        authorId:actualUser._id,
        postId:postId
    }
    console.log("final comment data ", commentData);

    try {
        const response = await createComment(commentData);
        console.log("comment response ", response.data);
        if(response?.data.statusCode === 200){
            alert(' comment created successfully ');
            await refetch();
            setCommentText('');
        }
    } catch (error) {
      console.log("Error occured while creating comment ", error.message) ;
    }
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Add a Comment</h2>
      <div className="mt-4">
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={handleAddComment}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}

export default Comment;
