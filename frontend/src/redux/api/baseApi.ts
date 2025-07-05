import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface QueryParams {
  filter?: string;
  sortBy?: string;
  sort?: "asc" | "desc";
  limit?: string;
}

export const bookApi = createApi({
  reducerPath: "bookApi",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a4-library-management.vercel.app/api",
  }),

  tagTypes: ["BOOK", "BORROW"],
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

    updateBook: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["BOOK"],
    }),

    updateBookCopies: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/books/copies/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["BOOK"],
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BOOK"],
    }),

    getAllBorrows: builder.query({
      query: () => "/borrow",
      providesTags: ["BORROW"],
    }),

    getBorrowSummary: builder.query({
      query: () => "/borrow/summary",
      providesTags: ["BORROW"],
    }),

    createBorrow: builder.mutation({
      query: (body) => ({
        url: "/borrow",
        method: "POST",
        body,
      }),
      invalidatesTags: ["BOOK", "BORROW"],
    }),

    updateBorrowReturn: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/borrow/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["BORROW"],
    }),

    getBorrowByUserId: builder.query({
      query: (param: string) => `/borrow/${param}`,
      providesTags: ["BORROW"],
    }),
  }),

  //
});

export const {
  useGetAllBooksQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useUpdateBookCopiesMutation,
  useDeleteBookMutation,
  useGetAllBorrowsQuery,
  useGetBorrowSummaryQuery,
  useCreateBorrowMutation,
  useUpdateBorrowReturnMutation,
  useGetBorrowByUserIdQuery,
} = bookApi;
