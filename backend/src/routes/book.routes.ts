import { Router } from "express";
import {
  createBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBookById,
  updateBookCopiesById,
} from "../controllers/book.controllers";

const bookRoutes = Router();

bookRoutes.post("/", createBook);
bookRoutes.get("/", getAllBooks);
bookRoutes.get("/:bookId", getBookById);
bookRoutes.patch("/:bookId", updateBookById);
bookRoutes.patch("/copies/:bookId", updateBookCopiesById);
bookRoutes.delete("/:bookId", deleteBookById);

export default bookRoutes;
