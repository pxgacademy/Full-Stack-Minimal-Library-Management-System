import { model, Schema } from "mongoose";
import { BorrowBookInputs } from "../types/borrow.types";

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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Borrow = model<BorrowBookInputs>("Borrow", borrowSchema);
