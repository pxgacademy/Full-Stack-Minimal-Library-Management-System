"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const port = process.env.PORT || 5000;
//! TODO: uncomment next line
const uri = process.env.MONGODB_URI;
// const uri: string = "mongodb://localhost:27018/assignment_4";
mongoose_1.default
    .connect(uri)
    .then(() => {
    // console.log("✅ Database connected");
    app_1.default.listen(port, () => console.log(`Server running on port ${port}`));
})
    .catch((err) => console.error("❌ MongoDB connection error:", err));
