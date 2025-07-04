"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMongoId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const response_1 = require("./response");
const checkMongoId = (res, p_id, message) => {
    const id = mongoose_1.default.Types.ObjectId.isValid(p_id)
        ? new mongoose_1.default.Types.ObjectId(p_id)
        : null;
    if (!id) {
        (0, response_1.errorResponse)(res, 400, message, {
            name: "Error",
            message,
        });
        return null;
    }
    return id;
};
exports.checkMongoId = checkMongoId;
