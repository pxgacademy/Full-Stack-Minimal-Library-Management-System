"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
}, { timestamps: true, versionKey: false });
const userSchema2 = new mongoose_1.Schema({
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
exports.User = (0, mongoose_1.model)("User", userSchema);
