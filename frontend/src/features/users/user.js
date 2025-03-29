 
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 

const userApi = createApi({
    reducerPath:'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:3000/api/user',
        credentials:'include'
    }),
    endpoints: ( builder ) => ({
        createUser : builder.mutation({
            query : ( user ) => ({
                url:'/register',
                method:'POST',
                body:user 
            })
        }),
        getUsers : builder.query({
            query : () => ({
                url:'/users',
                method:'GET'
            })
        }),
        loginUser : builder.mutation({
            query : ( user ) => ({
                url:'/login',
                method:'POST',
                body:user
            })
        }),
        logoutUser : builder.mutation({
            query : () => ({
                url:'/logout',
                method:'POST' 
            })
        }),
        adminLogin : builder.mutation({
            query : (admin) => ({
                url:'/admin',
                method:'POST',
                body:admin 
            })
        }),

        updateAdmin : builder.mutation({
            query : ({id, admin}) => ({
                url:`/update/${id}`,
                method:'PUT',
                body:admin
            })
        })

    })
})

export const { useCreateUserMutation, useGetUsersQuery, useLoginUserMutation, useLogoutUserMutation, useAdminLoginMutation, useUpdateAdminMutation } = userApi;


export default userApi;