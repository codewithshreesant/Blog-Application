
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/post'
    }),
    endpoints: (builder) => ({
        createPost: builder.mutation({
            query: (post) => ({
                url: '/create-post',
                method: 'POST',
                body: post
            })
        }),
        getPosts: builder.query({
            query: () => ({
                url: '/posts',
                method: 'GET'
            })
        }),
        getSinglePost: builder.query({
            query: (id) => ({
                url: `/posts/${id}`,
                method:'GET'
            })
        }),
        updatePost : builder.mutation({
            query:({id, post}) => ({
                url:`/update/${id}`,
                method:'PUT',
                body:post
            })
        }),
        deletePost : builder.mutation({
            query:(id) => ({
                url:`/delete/${id}`,
                method:'DELETE'
            })
        }),
        homePosts : builder.query({
            query:()=>({
                url:'/posts/home',
                method:'GET'
            })
        }),
        recommendPosts : builder.query({
            query: (id) => ({
                url:`/posts/recommended/${id}`,
                method:'GET'
            })
        })
    })
})

export const { useCreatePostMutation, useGetPostsQuery, useGetSinglePostQuery, useUpdatePostMutation, useDeletePostMutation, useHomePostsQuery, useRecommendPostsQuery } = blogApi;

export default blogApi;