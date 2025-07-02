import mongoose, { model, Schema } from "mongoose";
import { BorrowBookInputs } from "../types/borrow.types";
import { Book } from "./book.models";

const borrowSchema = new Schema<BorrowBookInputs>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    dueDate: { type: Date, required: [true, "Due-date is required"] },
    isReturned: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Pre middleware functions
borrowSchema.pre("save", async function (next) {
  try {
    const book = await Book.findById(this.book);

    if (!book) {
      const err = new mongoose.Error.ValidationError();
      err.addError(
        "book",
        new mongoose.Error.ValidatorError({
          path: "book",
          message: "Book not found",
        })
      );
      return next(err);
    }

    if (book.copies < this.quantity) {
      const err = new mongoose.Error.ValidationError();
      err.addError(
        "quantity",
        new mongoose.Error.ValidatorError({
          path: "quantity",
          message: `Not enough copies, now available ${book.copies} copies`,
        })
      );
      return next(err);
    }

    // reduce the available copies
    book.copies -= this.quantity;
    await book.updateAvailability();
    next();
  } catch (error: any) {
    next(error);
  }
});

export const Borrow = model<BorrowBookInputs>("Borrow", borrowSchema);
