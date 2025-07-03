import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),

  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (body) => ({
        url: `/users/signup`,
        method: "POST",
        body,
      }),
    }),

    userLogin: builder.mutation({
      query: (body) => ({
        url: `/users/signin`,
        method: "POST",
        body,
      }),
    }),
  }),

  //
});

export const { useUserLoginMutation } = userApi;
