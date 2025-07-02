import { Router } from "express";
import { createUser } from "../controllers/user.controllers";

const userRoutes = Router();

userRoutes.post("/", createUser);

export default userRoutes;
