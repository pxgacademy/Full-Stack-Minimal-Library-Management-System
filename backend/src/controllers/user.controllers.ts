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
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      errorResponse(res, 400, "User already exist", {
        name: "Error",
        message: "User already exist",
      });
      return;
    }

    const result = await User.create(req.body);
    apiResponse(res, 201, true, "User created successfully", result);
  } catch (error) {
    next(error);
  }
};

// get a single user by email and password
export const signInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const result = await User.findOne({ email });
    if (!result) {
      errorResponse(res, 404, "User not found", {
        name: "Error",
        message: "User not found by this email",
      });
      return;
    }

    if (result?.password !== password) {
      errorResponse(res, 400, "Invalid credentials", {
        name: "Error",
        message: "Invalid credentials",
      });
      return;
    }

    apiResponse(res, 200, true, "User signed-in successfully", result);
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
