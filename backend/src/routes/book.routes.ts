import { Router } from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
} from "../controllers/book.controllers";

const bookRoutes = Router();

bookRoutes.post("/", createBook);
bookRoutes.get("/", getAllBooks);
bookRoutes.get("/:bookId", getBookById);

export default bookRoutes;
