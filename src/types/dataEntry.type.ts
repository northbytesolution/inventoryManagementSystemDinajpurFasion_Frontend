
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */

export type TCategory = {
    id?: number;
    name?: string;
    slug?: string;
    parentCategoryId?: number;
    quantity?: number;
    created?: string; // can be Date if parsed
    is_pations?: boolean;
    [key: string]: any; // Index signature for flexibility
  };
  
  export type TCategoryResponse = {
    // success: boolean;
    // message: string;
    // data: {
    //   meta: {
    //     page: number;
    //     limit: number;
    //     total: number;
    //     totalPage: number;
    //   };
    //   result: TCategory[];
    // };
    result: TCategory[];
  };


  export type  TAttribute ={
    id: number;
    name: string;
    slug: string;
    // items: Item[]; // Replace `Item` with the actual type of your product/item object
  }
  export type TAttributeResponse = {
    success: boolean;
    message: string;
    data: {
      meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
      };
      result: TAttribute[];
    };
  };