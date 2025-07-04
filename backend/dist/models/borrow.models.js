"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.Borrow = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const book_models_1 = require("./book.models");
const borrowSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
    },
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book ID is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
    },
    dueDate: { type: Date, required: [true, "Due-date is required"] },
    isReturned: { type: Boolean, default: false },
}, {
    timestamps: true,
    versionKey: false,
});
// Pre middleware functions
borrowSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = yield book_models_1.Book.findById(this.book);
            if (!book) {
                const err = new mongoose_1.default.Error.ValidationError();
                err.addError("book", new mongoose_1.default.Error.ValidatorError({
                    path: "book",
                    message: "Book not found",
                }));
                return next(err);
            }
            if (book.copies < this.quantity) {
                const err = new mongoose_1.default.Error.ValidationError();
                err.addError("quantity", new mongoose_1.default.Error.ValidatorError({
                    path: "quantity",
                    message: `Not enough copies, now available ${book.copies} copies`,
                }));
                return next(err);
            }
            // reduce the available copies
            book.copies -= this.quantity;
            yield book.updateAvailability();
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
borrowSchema.post("findOneAndUpdate", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (doc.isReturned)
                yield book_models_1.Book.findByIdAndUpdate(doc.book, {
                    $inc: { copies: doc === null || doc === void 0 ? void 0 : doc.quantity },
                });
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
