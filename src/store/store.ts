import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth/authSlice';
import { recipesReducer } from "./slices/recipes/recipesSlice";

export const store = configureStore({
  reducer: {
    Auth: authReducer,
    recipes: recipesReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
