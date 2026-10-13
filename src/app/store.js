import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import cartReducer from "../features/cart/cartSlice";
import userdetailsReducer from "../features/userdetails/userdetailsSlice";
import profileReducer from "../features/userdetails/profileSlice";
import orderReducer from "../features/orderdetails/orderSlice";
import authReducer from "../features/auth/authSlice";

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['order', 'cart', 'auth'] // Only persist these reducers
};

// Combine all reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  user: userdetailsReducer,
  profile: profileReducer,
  order: orderReducer,
  auth: authReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['order/setEventDate', 'persist/PERSIST', 'persist/REHYDRATE'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.date'],
        // Ignore these paths in the state
        ignoredPaths: ['order.currentOrder.eventDate'],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

export default store;