/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import {  TTag, TQueryParam } from "@/types";

const tagManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTag: builder.mutation({
      query: (data) => ({
        url: "/inventory/tag/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tag"], // <-- Invalidate to trigger refetch
    }),
    getAllTag: builder.query({
      query: (args: TQueryParam[] | undefined) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/inventory/tag/",
          method: "GET",
          params,
        };
      },
      providesTags: ["tag"],
      transformResponse: (response: TTag) => {
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

    deleteTag: builder.mutation({
      query: (id) => ({
        url: `/inventory/tag/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tag"], // <-- Invalidate to trigger refetch
    }),

    updateTag: builder.mutation({
      query: ({ id, data }) => ({
        url: `/inventory/tag/${id}`,
        method: "put",
        body: data,
      }),
      invalidatesTags: ["tag"], // <-- Invalidate to trigger refetch
    }),
  }),
});

export const {
  useAddTagMutation,
  useGetAllTagQuery,
  // useGetCategoryByIdQuery,

  useDeleteTagMutation,

  useUpdateTagMutation,
} = tagManagementApi;
