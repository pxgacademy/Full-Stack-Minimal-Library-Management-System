import { Router } from "express";
import { createBook, getAllBooks } from "../controllers/book.controllers";

const bookRoutes = Router();

bookRoutes.post("/", createBook);
bookRoutes.get("/", getAllBooks);

export default bookRoutes;
