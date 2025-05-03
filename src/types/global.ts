import { BaseQueryApi } from '@reduxjs/toolkit/query';

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  result?:T;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export type TUser = {

  role: string;
  email: string;
  iat: number;
  exp: number;
};
export type TRole = "admin" | "customer";

export type TUserData = {
  name: string;
 
  role: TRole;
  email: string;
  _id: string;
  id: string;
  status: string;
  create_at: string;
};