import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/rootReducer';
import { getUserOrders } from '../services/requests';
import { setMessage } from './messageSlice';

interface OrderState {
  data: any[];
  ordersUpdated: boolean;
}

const initialState: OrderState = {
  data: [],
  ordersUpdated: false,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrdersUpdated: (state, action: PayloadAction<boolean>) => {
      state.ordersUpdated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchOrders.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.data = action.payload;
      }
    );
  },
});

export const { setOrdersUpdated } = ordersSlice.actions;

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, thunkAPI) => {
    try {
      const response = await getUserOrders(
        '1a2b7426-117e-4620-b795-d0fd5872b30f'
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      thunkAPI.dispatch(
        setMessage({ message: 'Error fetching orders', type: 'error' })
      );
      throw error;
    }
  }
);

export const selectOrders = (state: RootState) => state.orders.data;

export default ordersSlice.reducer;
