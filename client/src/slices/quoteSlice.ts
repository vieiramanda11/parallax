import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/rootReducer';

interface QuoteState {
  data: {
    rate: number;
    from_currency: string;
    to_currency: string;
    id: string;
    created_at: any;
  } | null;
  expirationTime: number | null;
}

const initialState: QuoteState = {
  data: null,
  expirationTime: null,
};

const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setQuoteData: (
      state,
      action: PayloadAction<{
        rate: number;
        from_currency: string;
        to_currency: string;
        id: string;
        created_at: any;
      }>
    ) => {
      state.data = {
        ...action.payload,
        created_at: Date.parse(action.payload.created_at),
      };
      state.expirationTime = state.data.created_at + 5 * 60 * 1000;
    },
    clearQuoteData: (state) => {
      state.data = null;
      state.expirationTime = null;
    },
  },
});

export const { setQuoteData, clearQuoteData } = quoteSlice.actions;

export const selectQuoteData = (state: RootState) => state.quote.data;
export const selectExpirationTime = (state: RootState) =>
  state.quote.expirationTime;

export default quoteSlice.reducer;
