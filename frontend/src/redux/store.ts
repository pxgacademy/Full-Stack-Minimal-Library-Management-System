import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./api/baseApi";
import { userApi } from "./api/userApi";
import { authReducer } from "./features/authSlice";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
  },

  middleware: (mid) => mid().concat(bookApi.middleware, userApi.middleware),
});

//
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
