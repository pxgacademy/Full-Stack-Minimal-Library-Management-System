import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./api/baseApi";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
  },

  middleware: (mid) => mid().concat(bookApi.middleware),
});

//
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
