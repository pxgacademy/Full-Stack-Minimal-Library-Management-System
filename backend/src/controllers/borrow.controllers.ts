import { NextFunction, Request, Response } from "express";
import { apiResponse, errorResponse } from "../utils/response";
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

// get all borrows //* isReturned=true&sortBy=createdAt&sort=desc&limit=5
export const getAllBorrows = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isReturned, sort = "desc" } = req.query;
  const query: Record<string, boolean> = {};
  if (isReturned) query.isReturned = isReturned === "true" ? true : false;
  const SOrder = sort === "asc" ? 1 : -1;

  try {
    let result;

    if (sort !== "random")
      result = await Borrow.find(query)
        .populate({
          path: "book",
          select: "title isbn genre",
        })
        .sort({
          quantity: SOrder,
        });
    else
      result = await Borrow.find(query).populate({
        path: "book",
        select: "title isbn genre",
      });

    if (!result) {
      errorResponse(res, 404, "Borrow not found", {
        name: "Error",
        message: "Borrow not found",
      });
      return;
    }

    apiResponse(res, 200, true, "Borrow retrieved successfully", result);
  } catch (error) {
    next(error);
  }
};

// return borrow by ID
export const updateBorrowById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { borrowId } = req.params;
  const { isReturned } = req.body;

  try {
    const id: IDT = checkMongoId(res, borrowId, "Invalid borrow id");
    if (!id) return;

    const result = await Borrow.findOneAndUpdate(
      { _id: id },
      { isReturned },
      {
        new: true,
      }
    );
    if (!result) {
      errorResponse(res, 404, "Borrow not found", {
        name: "Error",
        message: "Borrow not found",
      });
      return;
    }

    apiResponse(res, 200, true, "Borrow updated successfully", result);
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

    if (!result) {
      errorResponse(res, 404, "Borrow not found", {
        name: "Error",
        message: "Borrow not found",
      });
      return;
    }

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
