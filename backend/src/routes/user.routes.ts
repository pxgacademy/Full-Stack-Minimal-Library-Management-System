import { Router } from "express";
import { createUser, getUserByEmail } from "../controllers/user.controllers";

const userRoutes = Router();

userRoutes.post("/signup", createUser);
// userRoutes.post("/signin", );
userRoutes.get("/:email", getUserByEmail);

export default userRoutes;
