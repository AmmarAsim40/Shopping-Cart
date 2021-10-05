import { createSlice } from '@reduxjs/toolkit';

export type CartItemType = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
}

export type stateType = {
    cartItems: CartItemType[],
    data: CartItemType[],
    adminPanelData: CartItemType[],
    concatData: CartItemType[],
    category: string,
    orderTotal: number,
}

export const StateSlice = createSlice({
    name: 'shoppingcart',
    initialState: {
        cartItems: [] as CartItemType[],
        data: [] as CartItemType[],
        adminPanelData: [] as CartItemType[],
        concatData: [] as CartItemType[],
        category: '',
        orderTotal: 0,
    },
    reducers: {
        storeCartItems: (state, action) => {
            state.cartItems = action.payload;
        },
        storeData: (state, action) => {
            state.data = action.payload;
        },
        storeAdminPanelData: (state, action) => {
            state.adminPanelData = action.payload;
        },
        storeConcatData: (state, action) => {
            state.concatData = action.payload;
        },
        storeCategory: (state, action) => {
            state.category = action.payload;
        },
        storeOrderTotal: (state, action) => {
            state.orderTotal = action.payload;
        },
        filterConcatData: (state) => {
            state.concatData = state.concatData.filter(item => item.category === state.category);
        },
    },
})

export const { storeCartItems, storeData, storeAdminPanelData, storeConcatData, storeCategory, storeOrderTotal, filterConcatData } = StateSlice.actions

export default StateSlice.reducer
