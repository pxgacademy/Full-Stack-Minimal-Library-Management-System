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
exports.getUserByEmail = exports.signInUser = exports.createUser = void 0;
const user_models_1 = require("../models/user.models");
const response_1 = require("../utils/response");
// create a single user
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const existingUser = yield user_models_1.User.findOne({ email });
        if (existingUser) {
            (0, response_1.errorResponse)(res, 400, "User already exist", {
                name: "Error",
                message: "User already exist",
            });
            return;
        }
        const result = yield user_models_1.User.create(req.body);
        (0, response_1.apiResponse)(res, 201, true, "User created successfully", result);
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
// get a single user by email and password
const signInUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield user_models_1.User.findOne({ email });
        if (!result) {
            (0, response_1.errorResponse)(res, 404, "User not found", {
                name: "Error",
                message: "User not found by this email",
            });
            return;
        }
        if ((result === null || result === void 0 ? void 0 : result.password) !== password) {
            (0, response_1.errorResponse)(res, 400, "Invalid credentials", {
                name: "Error",
                message: "Invalid credentials",
            });
            return;
        }
        (0, response_1.apiResponse)(res, 200, true, "User signed-in successfully", result);
    }
    catch (error) {
        next(error);
    }
});
exports.signInUser = signInUser;
// get user by email
const getUserByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const result = yield user_models_1.User.findOne({ email });
        if (!result) {
            (0, response_1.errorResponse)(res, 404, "User not found", {
                name: "Error",
                message: "User not found",
            });
            return;
        }
        (0, response_1.apiResponse)(res, 200, true, "User retrieved successfully", result);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserByEmail = getUserByEmail;
