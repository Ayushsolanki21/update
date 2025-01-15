import { configureStore } from '@reduxjs/toolkit';
import cartsystem from './Cartsytem';

export const store = configureStore({
  reducer: {
    cart: cartsystem, 
  },
});

export default store;
