
import { TUser } from "./global";
import { TProduct } from "./product.type";

export type TOrderStatus =
  | "pending"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "paid";

  export type TTransaction = {
    paymentId: string
    transactionStatus: string
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  }
  

export type TOrder = {
  _id: string;
  orderId: string;
  user: TUser;
  product: TProduct;
  address: string;
  quantity: number;
  status: TOrderStatus;
  totalPrice: number;
  transaction: TTransaction;
  createdAt: string;
  updatedAt: string;
  __v: number;
};