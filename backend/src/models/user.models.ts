import { model, Schema } from "mongoose";
import { UserInputs } from "../types/user.types";

const userSchema: Schema<UserInputs> = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is already exist"],
      match: [/.+\@.+\..+/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
  },
  { timestamps: true, versionKey: false }
);

const userSchema2 = new Schema({
  name: {
    type: String,
    required: [true, "tui bhai naam desnai"], // tuple
    minlength: [3, "bhai thik thak nam de"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, "bhai thik thak email daw"],
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: [18, "chuto chele meye allow na"],
  },
});

export const User = model<UserInputs>("User", userSchema);
