import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.models";
import { apiResponse, errorResponse } from "../utils/response";

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

// get book by email
export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.params;

  try {
    const result = await User.findOne({ email });
    if (!result) {
      errorResponse(res, 404, "User not found", {
        name: "Error",
        message: "User not found",
      });
      return;
    }
    apiResponse(res, 200, true, "User retrieved successfully", result);
  } catch (error) {
    next(error);
  }
};
