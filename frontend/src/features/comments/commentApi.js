
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 

const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:3000/api/comment',
        credentials:'include'
    }),
    endpoints: (builder) => ({
        createComment : builder.mutation({
            query : (comment)=>({
                url:'/create-comment',
                method:'POST',
                body:comment 
            })
        }),
        getComments: builder.query({
            query : () => ({
                url:'/comments',
                method:'GET'
            })
        }),
        getSingleComment: builder.query({
            query : (id) => ({
                url:`/comments/${id}`,
                method:'GET' 
            })
        }),
        updateComment:builder.mutation({
            query : ({ id, comment }) => ({
                url:`/update/${id}`,
                method:'PUT',
                body:comment    
            })
        }),
        deleteComment : builder.mutation({
            query : (id) => ({
                url:`/delete/${id}`,
                method:'DELETE'
            })
        })
    })
})

export const { useCreateCommentMutation, useGetCommentsQuery, useGetSingleCommentQuery, useUpdateCommentMutation, useDeleteCommentMutation } = commentApi;

export default commentApi;