/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import {  TCategory, TCategoryResponse, TQueryParam, TResponseRedux } from "@/types";



const categoryManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
        query: (data) => ({
          url: "/inventory/categories/",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ['categories'], // <-- Invalidate to trigger refetch
      }),
    getAllCategory: builder.query({
      query: (args: TQueryParam[] | undefined) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/inventory/categories/",
          method: "GET",
          params,
        };
      },
      providesTags: ["categories"],
      transformResponse: (response: TCategoryResponse) => {
        return {
            
          data: response,
          // meta: response.data.meta,
        };
      },
      
    }),

    getCategoryById: builder.query({
      query: (categoryId) => ({
        url: `/categorys/${categoryId}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TCategory>) => response.data,
    }),


 

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/inventory/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['categories'], // <-- Invalidate to trigger refetch
    }),
  
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categorys/${id}`,
        method: "put",
        body: data,
      }),
      invalidatesTags: ["categories", "category"],
    }),
  }),
});

export const {
    useAddCategoryMutation,
  useGetAllCategoryQuery,
  useGetCategoryByIdQuery,

  useDeleteCategoryMutation,
 
  useUpdateCategoryMutation,
} = categoryManagementApi;
