import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./api/baseApi";
import { userApi } from "./api/userApi";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (mid) => mid().concat(bookApi.middleware, bookApi.middleware),
});

//
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
