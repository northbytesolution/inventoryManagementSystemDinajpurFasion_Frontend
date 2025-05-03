/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types.ts
export interface TProduct {
    _id: any; 
    name: string;
    price: number;
    count:number; // Optional, but should be managed properly
    productImg?: string;

}

// src/redux/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the cart state
interface CartState {
    cartItems: TProduct[];
}

// Define the initial state using the CartState type
const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<TProduct>) => {
            const { _id, count = 1 } = action.payload; // Default count to 1
            const existingProduct = state.cartItems.find(item => item._id === _id);
            
            if (existingProduct) {
                existingProduct.count = (existingProduct.count ?? 1) + count; // Ensure count exists
            } else {
                state.cartItems.push({ ...action.payload, count });
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
        },
        increaseItem: (state, action: PayloadAction<string>) => {
            const item = state.cartItems.find(item => item._id === action.payload);
            if (item) {
                item.count = (item.count ?? 1) + 1;
            }
        },
        decreaseItem: (state, action: PayloadAction<string>) => {
            const item = state.cartItems.find(item => item._id === action.payload);
            if (item && (item.count ?? 1) > 1) {
                item.count = (item.count ?? 1) - 1;
            }
        },
        updateQuantity: (state, action: PayloadAction<{ _id: string, count: number }>) => {
            const item = state.cartItems.find(item => item._id === action.payload._id);
            if (item) {
                item.count = action.payload.count;
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
    },
});

export const { addToCart, removeItem, increaseItem, decreaseItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
