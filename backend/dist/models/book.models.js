"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const book_types_1 = require("../types/book.types");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: [true, "Title is required"], trim: true },
    author: {
        type: String,
        required: [true, "Author is required"],
        trim: true,
    },
    genre: {
        type: String,
        enum: {
            values: Object.values(book_types_1.BookGenre),
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
}, {
    timestamps: true,
    versionKey: false,
});
bookSchema.methods.updateAvailability = function () {
    this.available = this.copies > 0;
    return this.save();
};
bookSchema.post("findOneAndUpdate", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        doc.available = doc.copies > 0;
        yield doc.save();
        next();
    });
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
