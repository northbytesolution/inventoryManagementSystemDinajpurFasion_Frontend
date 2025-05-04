import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3333/api/v1",
  //vercel
  // baseUrl: 'https://bicycle-store-amber.vercel.app/api',
  //railway
  // baseUrl: "https://bicyclestore-production.up.railway.app/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    console.log(token);
    if (token) {
      headers.set("Authorization", `Token ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    toast.error("error 404");
  }
  if (result?.error?.status === 403) {
    toast.error("error 403");
  }
  if (result?.error?.status === 401) {
    //* Send Refresh
    console.log("Sending refresh token");
    //vercel
    // const res = await fetch('https://bicycle-store-amber.vercel.app/api/auth/refresh-token', {
    //   method: 'POST',
    //   credentials: 'include',
    // });
    const res = await fetch("http://localhost:3333/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    //railway
    // const res = await fetch(
    //   "https://bicyclestore-production.up.railway.app/api/auth/refresh-token",
    //   {
    //     method: "POST",
    //     credentials: "include",
    //   }
    // );

    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      // api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: [
    "users",
    "products",
    "orders",
    "product",
    "user",
    "order",
    "brands",
    "category",
    "categories",
  ],
  endpoints: () => ({}),
});
