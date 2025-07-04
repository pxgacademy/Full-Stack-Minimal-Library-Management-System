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
exports.getBorrowSummary = exports.updateBorrowById = exports.getAllBorrows = exports.createBorrow = void 0;
const response_1 = require("../utils/response");
const borrow_models_1 = require("../models/borrow.models");
const checkMongoId_1 = require("../utils/checkMongoId");
// create a single book
const createBorrow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, book } = req.body;
        const bookId = (0, checkMongoId_1.checkMongoId)(res, book, "Invalid book id");
        if (!bookId)
            return;
        const userId = (0, checkMongoId_1.checkMongoId)(res, user, "Invalid user id");
        if (!userId)
            return;
        const result = yield borrow_models_1.Borrow.create(req.body);
        (0, response_1.apiResponse)(res, 201, true, "Book borrowed successfully", result);
    }
    catch (error) {
        next(error);
    }
});
exports.createBorrow = createBorrow;
// get all borrows //* isReturned=true&sortBy=createdAt&sort=desc&limit=5
const getAllBorrows = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { isReturned, sortBy = "quantity", sort = "desc", limit = undefined, } = req.query;
    const query = {};
    if (isReturned)
        query.isReturned = isReturned === "true" ? true : false;
    const SOrder = sort === "asc" ? 1 : -1;
    const limitNum = parseInt(limit);
    try {
        let result;
        if (limit)
            result = yield borrow_models_1.Borrow.find(query)
                .sort({ [sortBy]: SOrder })
                .limit(limitNum);
        else
            result = yield borrow_models_1.Borrow.find(query).sort({ [sortBy]: SOrder });
        if (!result) {
            (0, response_1.errorResponse)(res, 404, "Borrow not found", {
                name: "Error",
                message: "Borrow not found",
            });
            return;
        }
        (0, response_1.apiResponse)(res, 200, true, "Borrow retrieved successfully", result);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllBorrows = getAllBorrows;
// return borrow by ID
const updateBorrowById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { borrowId } = req.params;
    const { isReturned } = req.body;
    try {
        const id = (0, checkMongoId_1.checkMongoId)(res, borrowId, "Invalid borrow id");
        if (!id)
            return;
        const result = yield borrow_models_1.Borrow.findOneAndUpdate({ _id: id }, { isReturned }, {
            new: true,
        });
        if (!result) {
            (0, response_1.errorResponse)(res, 404, "Borrow not found", {
                name: "Error",
                message: "Borrow not found",
            });
            return;
        }
        (0, response_1.apiResponse)(res, 200, true, "Borrow updated successfully", result);
    }
    catch (error) {
        next(error);
    }
});
exports.updateBorrowById = updateBorrowById;
// get borrow summary
const getBorrowSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield borrow_models_1.Borrow.aggregate([
            { $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } } },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo",
                },
            },
            {
                $unwind: "$bookInfo",
            },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: "$bookInfo.title",
                        isbn: "$bookInfo.isbn",
                    },
                },
            },
        ]);
        if (!result) {
            (0, response_1.errorResponse)(res, 404, "Borrow not found", {
                name: "Error",
                message: "Borrow not found",
            });
            return;
        }
        (0, response_1.apiResponse)(res, 200, true, "Borrowed books summary retrieved successfully", result);
    }
    catch (error) {
        next(error);
    }
});
exports.getBorrowSummary = getBorrowSummary;
