import { Types } from "mongoose";
import { BookResponse } from "./book.types";

export interface BorrowBookInputs {
  user: Types.ObjectId;
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

export interface BorrowBookResponse {
  _id: string;
  book: string | BookResponse;
  quantity: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
