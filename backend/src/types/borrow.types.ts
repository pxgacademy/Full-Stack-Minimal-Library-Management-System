import { Types } from "mongoose";
import { BookResponse } from "./book.types";
import { UserResponse } from "./user.types";

export interface BorrowBookInputs {
  user: Types.ObjectId;
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
  isReturned: boolean;
}

export interface BorrowBookResponse {
  _id: string;
  user: string | UserResponse;
  book: string | BookResponse;
  quantity: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
