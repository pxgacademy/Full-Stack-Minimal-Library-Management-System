"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const userRoutes = (0, express_1.Router)();
userRoutes.post("/signup", user_controllers_1.createUser);
userRoutes.post("/signin", user_controllers_1.signInUser);
userRoutes.get("/:email", user_controllers_1.getUserByEmail);
exports.default = userRoutes;
