import { Router } from "express";
import { createBook } from "../controllers/book.controllers";

const bookRoutes = Router();

bookRoutes.post("/", createBook);

export default bookRoutes;
