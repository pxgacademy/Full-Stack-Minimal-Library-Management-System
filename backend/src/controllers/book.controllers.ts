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

// get books //* filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    filter,
    sortBy = "createdAt",
    sort = "desc",
    limit = undefined,
  } = req.query;
  const query: Record<string, string> = {};
  if (filter) query.genre = filter as string;
  const SOrder = sort === "asc" ? 1 : -1;
  const limitNum = parseInt(limit as string);

  try {
    let result;

    if (limit)
      result = await Book.find(query)
        .sort({ [sortBy as string]: SOrder })
        .limit(limitNum);
    else result = await Book.find(query).sort({ [sortBy as string]: SOrder });

    apiResponse(res, 200, true, "Books retrieved successfully", result);
  } catch (error) {
    next(error);
  }
};
