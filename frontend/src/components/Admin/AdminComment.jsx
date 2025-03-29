import React from 'react';
import { useGetCommentsQuery, useUpdateCommentMutation, useDeleteCommentMutation } from '../../features/comments/commentApi';

function AdminComment() {
  const { data, error, isLoading } = useGetCommentsQuery();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const commentsData = data?.data;

  const handleUpdate = async (commentId, updatedText) => {
    try {
      let response = await updateComment({ id: commentId, comment: { text: updatedText } });
      console.log("Comment response ", response);
      if(response?.data.statusCode === 200)
      {
        alert("Comment updated successfully ");
      }
    } catch (err) {
      console.error('Error updating comment:', err);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const response = await deleteComment(commentId);
      console.log("deleted comment response", response);
      if(response?.data.statusCode === 200)
      {
        alert("Comment deleted Successfully");
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading comments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error loading comments: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Comments</h1>
      {commentsData && commentsData.length > 0 ? (
        <div className="space-y-4">
          {commentsData.map((comment, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
            >
              <p className="text-gray-800 leading-relaxed">{comment.text}</p>
              {comment.author && (
                <p className="text-sm text-gray-500 mt-2">
                  Author: {comment.author}
                </p>
              )}
              {comment.createdAt && (
                <p className="text-sm text-gray-500 mt-1">
                  Created At: {new Date(comment.createdAt).toLocaleString()}
                </p>
              )}
              <div className="mt-4 flex space-x-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                  onClick={() => {
                    const updatedText = prompt('Enter updated comment:', comment.text);
                    if (updatedText) {
                      handleUpdate(comment._id, updatedText);
                    }
                  }}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                  onClick={() => handleDelete(comment._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No comments found.</p>
      )}
    </div>
  );
}

export default AdminComment;