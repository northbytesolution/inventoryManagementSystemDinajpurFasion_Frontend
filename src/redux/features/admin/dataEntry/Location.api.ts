/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import {  TLocation, TQueryParam } from "@/types";

const locationManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addLocation: builder.mutation({
      query: (data) => ({
        url: "/inventory/location/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["location"], // <-- Invalidate to trigger refetch
    }),
    getAllLocation: builder.query({
      query: (args: TQueryParam[] | undefined) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/inventory/location/",
          method: "GET",
          params,
        };
      },
      providesTags: ["location"],
      transformResponse: (response: TLocation) => {
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

    deleteLocation: builder.mutation({
      query: (id) => ({
        url: `/inventory/location/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["location"], // <-- Invalidate to trigger refetch
    }),

    updateLocation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/inventory/location/${id}`,
        method: "put",
        body: data,
      }),
      invalidatesTags: ["location"], // <-- Invalidate to trigger refetch
    }),
  }),
});

export const {
  useAddLocationMutation,
  useGetAllLocationQuery,
  // useGetCategoryByIdQuery,

  useDeleteLocationMutation,

  useUpdateLocationMutation,
} = locationManagementApi;
