import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.models";
import { apiResponse } from "../utils/response";

// create a single user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await User.create(req.body);
    apiResponse(res, 201, true, "User created successfully", result);
  } catch (error) {
    next(error);
  }
};
