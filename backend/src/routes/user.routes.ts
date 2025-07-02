import { Router } from "express";
import {
  createUser,
  getUserByEmail,
  signInUser,
} from "../controllers/user.controllers";

const userRoutes = Router();

userRoutes.post("/signup", createUser);
userRoutes.post("/signin", signInUser);
userRoutes.get("/:email", getUserByEmail);

export default userRoutes;
