import { Router } from "express";
import {
  createBorrow,
  getAllBorrows,
  getBorrowSummary,
} from "../controllers/borrow.controllers";

const borrowRoutes = Router();

borrowRoutes.post("/", createBorrow);
borrowRoutes.get("/", getAllBorrows);
borrowRoutes.get("/summary", getBorrowSummary);

export default borrowRoutes;
