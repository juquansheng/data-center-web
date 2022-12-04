import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/store/slice/counterSlice.ts';
import authReducer from '@/store/slice/authSlice.ts';


export const store = configureStore({
    reducer: {
      counter: counterReducer,
      auth: authReducer,
    },
});