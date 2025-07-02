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

// get all borrows //* sortBy=quantity&sort=desc&limit=5
export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sortBy = "quantity", sort = "desc", limit = undefined } = req.query;
  const SOrder = sort === "asc" ? 1 : -1;
  const limitNum = parseInt(limit as string);

  try {
    let result;

    if (limit)
      result = await Borrow.find()
        .sort({ [sortBy as string]: SOrder })
        .limit(limitNum);
    else result = await Borrow.find().sort({ [sortBy as string]: SOrder });

    apiResponse(res, 200, true, "Borrow retrieved successfully", result);
  } catch (error) {
    next(error);
  }
};

// get borrow summary
export const getBorrowSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Borrow.aggregate([
      { $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } } },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      {
        $unwind: "$bookInfo",
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
        },
      },
    ]);

    apiResponse(
      res,
      200,
      true,
      "Borrowed books summary retrieved successfully",
      result
    );
  } catch (error) {
    next(error);
  }
};
