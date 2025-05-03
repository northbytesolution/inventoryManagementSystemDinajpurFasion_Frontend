/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types";

const orderManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (args: TQueryParam[] | undefined) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/orders",
          method: "GET",
          params,
        };
      },
      providesTags: ["orders"],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getMyOrders: builder.query({
      query: (email) => ({
        url: `/orders/my-orders/${email}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["orders", "products", "product"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/change-status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),
    verifyOrder: builder.query({
      query: (id) => ({
        url: `/orders/verify/${id}`,
        method: "GET",
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetMyOrdersQuery,
  useUpdateOrderStatusMutation,
  useVerifyOrderQuery,
  useDeleteOrderMutation,
} = orderManagementApi;