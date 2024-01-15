// errorSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/rootReducer';

interface MessageState {
  message: string | null;
  type: string | null;
}

const initialState: MessageState = {
  message: null,
  type: null,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (
      state,
      action: PayloadAction<{ message: string; type: string }>
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearMessage: (state) => {
      state.message = null;
      state.type = null;
    },
  },
});

export const selectMessage = (state: RootState) => state.message;

export const { setMessage, clearMessage } = messageSlice.actions;

export default messageSlice.reducer;
