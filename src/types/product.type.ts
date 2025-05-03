/* eslint-disable @typescript-eslint/no-explicit-any */
export type TProduct = {
    _id?: number;
    name?: string;
    price?: number;
    brand?: string;
    type?: string;
    quantity?: number;
    description?: string;
    productImg?: string;
    count?: number;
    [key: string]: any; // Add index signature
    };

    export type TProductResponse = {
        success: boolean;
        message: string;
        data: {
          meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
          };
          result: TProduct[];
        };
      };