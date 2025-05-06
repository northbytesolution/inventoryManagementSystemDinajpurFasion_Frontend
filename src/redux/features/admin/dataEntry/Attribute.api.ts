/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import {    TAttributeResponse, TQueryParam } from "@/types";



const attributesManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAttributes: builder.mutation({
        query: (data) => ({
          url: "/inventory/attributes/",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ['attributes'], // <-- Invalidate to trigger refetch
      }),
    getAllAttributes: builder.query({
      query: (args: TQueryParam[] | undefined) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/inventory/attributes/",
          method: "GET",
          params,
        };
      },
      providesTags: ["attributes"],
      transformResponse: (response: TAttributeResponse) => {
        return {
            
          data: response,
        //   meta: response.meta,
        };
      },
    }),

    // getCategoryById: builder.query({
    //   query: (categoryId) => ({
    //     url: `/categorys/${categoryId}`,
    //     method: "GET",
    //   }),
    //   transformResponse: (response: TResponseRedux<TAttribute>) => response.data,
    // }),


 

    deleteAttributes: builder.mutation({
      query: (id) => ({
        url: `/inventory/attributes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['attributes'], // <-- Invalidate to trigger refetch
    }),
  
    updateAttributes: builder.mutation({
      query: ({ id, data }) => ({
        url: `/inventory/attributes/${id}`,
        method: "put",
        body: data,
      }),
      invalidatesTags: ['attributes'], // <-- Invalidate to trigger refetch
    }),
  }),
});

export const {
    useAddAttributesMutation,
  useGetAllAttributesQuery,
  // useGetCategoryByIdQuery,

  useDeleteAttributesMutation,
 
  useUpdateAttributesMutation,
} = attributesManagementApi;
