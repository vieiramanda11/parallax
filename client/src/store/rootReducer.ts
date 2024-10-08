import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import quoteReducer from '../slices/quoteSlice';
import ordersReducer from '../slices/ordersSlice';
import messageReducer from '../slices/messageSlice';

const rootReducer = combineReducers({
  quote: quoteReducer,
  orders: ordersReducer,
  message: messageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['quote'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export default rootReducer;
