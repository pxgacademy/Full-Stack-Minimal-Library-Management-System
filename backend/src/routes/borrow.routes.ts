import { Router } from "express";
import {
  createBorrow,
  getAllBorrows,
  getBorrowById,
  getBorrowSummary,
  updateBorrowById,
} from "../controllers/borrow.controllers";

const borrowRoutes = Router();

borrowRoutes.post("/", createBorrow);
borrowRoutes.get("/", getAllBorrows);
borrowRoutes.get("/:userId", getBorrowById);
borrowRoutes.get("/summary", getBorrowSummary);
borrowRoutes.patch("/:borrowId", updateBorrowById);

export default borrowRoutes;
