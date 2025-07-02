import mongoose from "mongoose";
import { errorResponse } from "./response";
import { Response } from "express";

export const checkMongoId = (res: Response, p_id: string, message: string) => {
  const id = mongoose.Types.ObjectId.isValid(p_id)
    ? new mongoose.Types.ObjectId(p_id)
    : null;

  if (!id) {
    errorResponse(res, 400, message, {
      name: "Error",
      message,
    });
    return null;
  }

  return id;
};
