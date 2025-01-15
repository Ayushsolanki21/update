import { createSlice } from '@reduxjs/toolkit';

const cartsystem = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    AddCart: (state, action) => {
      const existingItem = state.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity; // Increment by the selected quantity
      } else {
        state.push({ ...action.payload }); // Add new item with its quantity
      }
    },
    deletecart: (state, action) => {
      return state.filter(item => item._id !== action.payload._id);
    },
    incrementQuantity: (state, action) => {
      const item = state.find(item => item._id === action.payload._id);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.find(item => item._id === action.payload._id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    }
  },
});

export const { AddCart, deletecart, incrementQuantity, decrementQuantity } = cartsystem.actions;
export default cartsystem.reducer;
