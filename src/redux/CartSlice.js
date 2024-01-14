import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchCartCount = createAsyncThunk('cart/fetchCartCount', async (token) => {
    if (token) {
        try {
            const data = await axios.get('/api/Carts/GetCartByAccount', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            return data.data
        } catch (error) {
            throw new Error('Cannot fetch cart count');
        }
    } else {
        return null;
    }
});
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: {
            currentCart: null,
            isFetching: false,
            error: false
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartCount.fulfilled, (state, action) => {
            state.isFetching = false;
            state.currentCart = action.payload;
            state.error = false
        });
        builder.addCase(fetchCartCount.pending, (state) => {
            state.isFetching = true;
        });
        builder.addCase(fetchCartCount.rejected, (state, action) => {
            state.currentCart = action.payload;
            state.isFetching = false;
            state.error = true;
        });
    },
})

export const {
    CartSuccess, CartStart, CartFailed
} = cartSlice.actions

export default cartSlice.reducer;