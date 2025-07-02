import { model, Schema } from "mongoose";
import { BookDocument, BookGenre } from "../types/book.types";

const bookSchema = new Schema<BookDocument>(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    genre: {
      type: String,
      enum: {
        values: Object.values(BookGenre),
        message: "Enter a valid genre, {VALUE} is invalid",
      },
      required: [true, "Genre is required"],
      uppercase: true,
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: [true, "ISBN is already exist, enter an unique ISBN"],
    },
    description: { type: String, default: "" },
    copies: {
      type: Number,
      required: [true, "Number of copies is required"],
      min: [0, "Copies cannot be negative, must be at least 1"],
    },
    available: { type: Boolean, required: [true, "Availability is required"] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
  return this.save();
};

bookSchema.post("findOneAndUpdate", async function (doc, next) {
  doc.available = doc.copies > 0;
  await doc.save();
  next();
});

export const Book = model<BookDocument>("Book", bookSchema);
