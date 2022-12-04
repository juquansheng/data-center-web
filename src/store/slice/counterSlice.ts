import { createSlice, PayloadAction } from '@reduxjs/toolkit';
 
 
export interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}
 
const initialState: CounterState = {
  value: 0,
  status: 'idle',
};
 
                 
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state: CounterState) => {
      state.value += 1;
    },
    decrement: (state: CounterState) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state: CounterState, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});
 
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
 
export default counterSlice.reducer;
 
 