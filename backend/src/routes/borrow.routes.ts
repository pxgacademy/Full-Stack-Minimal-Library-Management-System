import { Router } from "express";
import {
  createBorrow,
  getBorrowSummary,
} from "../controllers/borrow.controllers";

const borrowRoutes = Router();

borrowRoutes.post("/", createBorrow);
borrowRoutes.get("/summary", getBorrowSummary);

export default borrowRoutes;
