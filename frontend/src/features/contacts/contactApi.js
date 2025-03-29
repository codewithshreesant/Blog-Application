
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 

const contactApi = createApi({
    reducerPath : 'contactApi',
    baseQuery : fetchBaseQuery({
        baseUrl:'http://localhost:3000/api/contact',
       
    }),
    endpoints : (builder) => ({
        createContact : builder.mutation({
            query : (contact) => ({
                url:'/create-contact',
                method:'POST',
                body:contact
            })
        }),
        getAllContacts : builder.query({
            query:()=>({
                url:'/contacts',
                method:'GET'
            })
        }),
        updateContact : builder.mutation({
            query:({id, contact})=>({
                url:`/update/${id}`,
                method:'PUT',
                body:contact
            })
        }),
        deleteContact : builder.mutation({
            query : (id) => ({
                url: `/delete/${id}`,
                method:'DELETE'
            })
        }),
        getSingleContact : builder.query({
            query:(id)=>({
                url:`/single-contact/${id}`,
                method:'GET'
            })
        })
    })
})

export const { useCreateContactMutation, useGetAllContactsQuery, useUpdateContactMutation, useGetSingleContactQuery, useDeleteContactMutation } = contactApi;

export default contactApi;