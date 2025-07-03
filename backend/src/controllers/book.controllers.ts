import { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.models";
import { apiResponse, errorResponse } from "../utils/response";
import { checkMongoId } from "../utils/checkMongoId";
import { IDT } from "../types";

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

// get book by ID
export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bookId } = req.params;

  try {
    const id: IDT = checkMongoId(res, bookId, "Invalid book id");
    if (!id) return;

    const result = await Book.findById(bookId);
    if (!result) {
      errorResponse(res, 404, "Book not found", {
        name: "Error",
        message: "Book not found",
      });
      return;
    }

    apiResponse(res, 200, true, "Book retrieved successfully", result);
  } catch (error) {
    next(error);
  }
};

// update a book by ID
export const updateBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bookId } = req.params;
  const body = req.body;

  try {
    const id: IDT = checkMongoId(res, bookId, "Invalid book id");
    if (!id) return;

    const result = await Book.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });

    if (!result) {
      errorResponse(res, 404, "Book not found", {
        name: "Error",
        message: "Book not found",
      });
      return;
    }

    apiResponse(res, 200, true, "Book updated successfully", result);
  } catch (error) {
    next(error);
  }
};

// update a book by ID
export const updateBookCopiesById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bookId } = req.params;
  const { copies } = req.body;

  try {
    const id: IDT = checkMongoId(res, bookId, "Invalid book id");
    if (!id) return;

    const result = await Book.findOneAndUpdate(
      { _id: id },
      {
        $inc: { copies },
      }
    );

    if (!result) {
      errorResponse(res, 404, "Book not found", {
        name: "Error",
        message: "Book not found",
      });
      return;
    }

    apiResponse(res, 200, true, "Book copies updated successfully", result);
  } catch (error) {
    next(error);
  }
};

// delete a book by ID
export const deleteBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bookId } = req.params;

  try {
    const id: IDT = checkMongoId(res, bookId, "Invalid book id");
    if (!id) return;

    const result = await Book.findOneAndDelete({ _id: bookId });
    if (!result) {
      errorResponse(res, 404, "Book not found", {
        name: "Error",
        message: "Book not found",
      });
      return;
    }

    apiResponse(res, 200, true, "Book deleted successfully", null);
  } catch (error) {
    next(error);
  }
};
