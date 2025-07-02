import { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.models";
import { apiResponse } from "../utils/response";

// create a single book
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Book.create(req.body);
    apiResponse(res, 201, true, "Book created successfully", result);
  } catch (error) {
    next(error);
  }
};
