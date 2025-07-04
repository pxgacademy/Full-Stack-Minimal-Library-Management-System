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
exports.deleteBookById = exports.updateBookCopiesById = exports.updateBookById = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_models_1 = require("../models/book.models");
const response_1 = require("../utils/response");
const checkMongoId_1 = require("../utils/checkMongoId");
// create a single book
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_models_1.Book.create(req.body);
        (0, response_1.apiResponse)(res, 201, true, "Book created successfully", result);
    }
    catch (error) {
        next(error);
    }
});
exports.createBook = createBook;
// get books //* filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy = "createdAt", sort = "desc", limit = undefined, } = req.query;
    const query = {};
    if (filter)
        query.genre = filter;
    const SOrder = sort === "asc" ? 1 : -1;
    const limitNum = parseInt(limit);
    try {
        let result;
        if (limit)
            result = yield book_models_1.Book.find(query)
                .sort({ [sortBy]: SOrder })
                .limit(limitNum);
        else
            result = yield book_models_1.Book.find(query).sort({ [sortBy]: SOrder });
        (0, response_1.apiResponse)(res, 200, true, "Books retrieved successfully", result);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllBooks = getAllBooks;
// get book by ID
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    try {
        const id = (0, checkMongoId_1.checkMongoId)(res, bookId, "Invalid book id");
        if (!id)
            return;
        const result = yield book_models_1.Book.findById(bookId);
        if (!result) {
            (0, response_1.errorResponse)(res, 404, "Book not found", {
                name: "Error",
                message: "Book not found",
            });
            return;
        }
        (0, response_1.apiResponse)(res, 200, true, "Book retrieved successfully", result);
    }
    catch (error) {
        next(error);
    }
});
exports.getBookById = getBookById;
// update a book by ID
const updateBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const body = req.body;
    try {
        const id = (0, checkMongoId_1.checkMongoId)(res, bookId, "Invalid book id");
        if (!id)
            return;
        const result = yield book_models_1.Book.findOneAndUpdate({ _id: id }, body, {
            new: true,
        });
        if (!result) {
            (0, response_1.errorResponse)(res, 404, "Book not found", {
                name: "Error",
                message: "Book not found",
            });
            return;
        }
        (0, response_1.apiResponse)(res, 200, true, "Book updated successfully", result);
    }
    catch (error) {
        next(error);
    }
});
exports.updateBookById = updateBookById;
// update a book by ID
const updateBookCopiesById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const { copies } = req.body;
    try {
        const id = (0, checkMongoId_1.checkMongoId)(res, bookId, "Invalid book id");
        if (!id)
            return;
        const result = yield book_models_1.Book.findOneAndUpdate({ _id: id }, {
            $inc: { copies },
        });
        if (!result) {
            (0, response_1.errorResponse)(res, 404, "Book not found", {
                name: "Error",
                message: "Book not found",
            });
            return;
        }
        (0, response_1.apiResponse)(res, 200, true, "Book copies updated successfully", result);
    }
    catch (error) {
        next(error);
    }
});
exports.updateBookCopiesById = updateBookCopiesById;
// delete a book by ID
const deleteBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    try {
        const id = (0, checkMongoId_1.checkMongoId)(res, bookId, "Invalid book id");
        if (!id)
            return;
        const result = yield book_models_1.Book.findOneAndDelete({ _id: bookId });
        if (!result) {
            (0, response_1.errorResponse)(res, 404, "Book not found", {
                name: "Error",
                message: "Book not found",
            });
            return;
        }
        (0, response_1.apiResponse)(res, 200, true, "Book deleted successfully", null);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBookById = deleteBookById;
