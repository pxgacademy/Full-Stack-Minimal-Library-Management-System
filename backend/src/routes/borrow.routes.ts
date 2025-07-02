import { Router } from "express";
import { createBorrow } from "../controllers/borrow.controllers";

const borrowRoutes = Router();

borrowRoutes.post("/", createBorrow);

export default borrowRoutes;
