import AddBooks from "@/pages/addBooks/AddBooks";
import AllBooks from "@/pages/allBooks/AllBooks";
import BorrowSummary from "@/pages/borrowSummary/BorrowSummary";
import Home from "@/pages/home/Home";
import MyBorrows from "@/pages/myBorrows/MyBorrows";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {
        index: true,
        Component: AllBooks,
      },
      {
        path: "add-books",
        Component: AddBooks,
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary,
      },
      {
        path: "my-borrows",
        Component: MyBorrows,
      },
    ],
  },
]);
