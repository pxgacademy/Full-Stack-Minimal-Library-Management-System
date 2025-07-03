import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface QueryParams {
  filter?: string;
  sortBy?: string;
  sort?: "asc" | "desc";
  limit?: string;
}

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["BOOK"],
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: ({ filter, sortBy, sort, limit }: QueryParams) => {
        const queryParams = new URLSearchParams();

        if (filter && filter !== "ALL") queryParams.append("filter", filter);
        if (sortBy) queryParams.append("sortBy", sortBy);
        if (sort) queryParams.append("sort", sort);
        if (limit && limit !== "all") queryParams.append("limit", limit);

        return `/books?${queryParams.toString()}`;
      },
      providesTags: ["BOOK"],
    }),

    createBook: builder.mutation({
      query: (body) => ({
        url: "/books",
        method: "POST",
        body,
      }),
      invalidatesTags: ["BOOK"],
    }),

    createBorrow: builder.mutation({
      query: (body) => ({
        url: "/borrow",
        method: "POST",
        body,
      }),
      invalidatesTags: ["BOOK"],
    }),
  }),

  //
});

export const {
  useGetAllBooksQuery,
  useCreateBookMutation,
  useCreateBorrowMutation,
} = bookApi;
