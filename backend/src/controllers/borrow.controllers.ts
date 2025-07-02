import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../utils/response";
import { Borrow } from "../models/borrow.models";
import { IDT } from "../types";
import { checkMongoId } from "../utils/checkMongoId";

// create a single book
export const createBorrow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, book } = req.body;

    const bookId: IDT = checkMongoId(res, book, "Invalid book id");
    if (!bookId) return;
    const userId: IDT = checkMongoId(res, user, "Invalid user id");
    if (!userId) return;

    const result = await Borrow.create(req.body);
    apiResponse(res, 201, true, "Book borrowed successfully", result);
  } catch (error) {
    next(error);
  }
};
