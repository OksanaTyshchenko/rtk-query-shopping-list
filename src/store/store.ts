import { configureStore } from '@reduxjs/toolkit'
import { goodsApi } from './api'


export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [goodsApi.reducerPath]: goodsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(goodsApi.middleware),
});