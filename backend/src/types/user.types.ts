import { Document } from "mongoose";

export interface UserInputs extends Document {
  name: string;
  email: string;
  password: string;
}

export interface UserResponse {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
