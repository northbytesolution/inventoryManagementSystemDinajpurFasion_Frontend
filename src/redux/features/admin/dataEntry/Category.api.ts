/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import {  TCategory, TQueryParam, TResponseRedux } from "@/types";



const categoryManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
        query: (data) => ({
          url: "/inventory/categories/",
          method: "POST",
          body: data,
        }),
      }),
    getAllCategorys: builder.query({
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
      transformResponse: (response: TResponseRedux<any>) => {
        return {
            
          data: response,
          meta: response.meta,
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
        url: `/categorys/${id}`,
        method: "DELETE",
      }),
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
  useGetAllCategorysQuery,
  useGetCategoryByIdQuery,

  useDeleteCategoryMutation,
 
  useUpdateCategoryMutation,
} = categoryManagementApi;
