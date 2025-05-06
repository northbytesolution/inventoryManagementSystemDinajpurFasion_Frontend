/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import {  TBrand, TQueryParam } from "@/types";

const brandManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBrand: builder.mutation({
      query: (data) => ({
        url: "/inventory/brand/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["brand"], // <-- Invalidate to trigger refetch
    }),
    getAllBrand: builder.query({
      query: (args: TQueryParam[] | undefined) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/inventory/brand/",
          method: "GET",
          params,
        };
      },
      providesTags: ["brand"],
      transformResponse: (response: TBrand) => {
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

    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/inventory/brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brand"], // <-- Invalidate to trigger refetch
    }),

    updateBrand: builder.mutation({
      query: ({ id, data }) => ({
        url: `/inventory/brand/${id}`,
        method: "put",
        body: data,
      }),
      invalidatesTags: ["brand"], // <-- Invalidate to trigger refetch
    }),
  }),
});

export const {
  useAddBrandMutation,
  useGetAllBrandQuery,
  // useGetCategoryByIdQuery,

  useDeleteBrandMutation,

  useUpdateBrandMutation,
} = brandManagementApi;
