import { Router } from "express";
import { createUser, getUserByEmail } from "../controllers/user.controllers";

const userRoutes = Router();

userRoutes.post("/", createUser);
userRoutes.get("/:email", getUserByEmail);

export default userRoutes;
