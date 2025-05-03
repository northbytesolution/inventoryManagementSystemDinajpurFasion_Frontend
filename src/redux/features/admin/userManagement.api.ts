/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/users/create-customer",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    getAllUsers: builder.query({
      query: (args: TQueryParam[] | undefined) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/users/all",
          method: "GET",
          params,
        };
      },
      providesTags: ["users"],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/users/single/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/change-status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["users", "user"],
    }),
  }),
});

export const {
  useSignupMutation,


  useChangePasswordMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} = userManagementApi;
